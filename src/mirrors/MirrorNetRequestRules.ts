import browser from "webextension-polyfill"
import { MirrorNetRequestConfig } from "../types/common"

const thisExtensionId: string = browser.i18n.getMessage("@@extension_id")

function createRuleForMirror(id: number, config: MirrorNetRequestConfig): browser.DeclarativeNetRequest.Rule {
    return {
        id: id,
        action: {
            // Replaces Referer and Origin request headers to bypass site's protection
            type: "modifyHeaders" as const,
            requestHeaders: [
                {
                    header: "Referer",
                    operation: "set" as const,
                    value: `${config.mainUrl}/`
                },
                {
                    header: "Origin",
                    operation: "set" as const,
                    value: config.mainUrl
                }
            ]
        },
        condition: {
            // applies only to requests from this extension
            initiatorDomains: [thisExtensionId],
            // for URLs that match the following filter
            urlFilter: config.urlFilter,
            // or for URLs that match the following regex
            regexFilter: config.regexUrlFilter,
            // and only for our fetch requests
            resourceTypes: ["xmlhttprequest" as const]
        }
    }
}

export function createNetRequestRulesForMirrors(
    configs: MirrorNetRequestConfig[]
): browser.DeclarativeNetRequest.Rule[] {
    return configs.map((config, configId) => createRuleForMirror(configId + 1, config))
}
