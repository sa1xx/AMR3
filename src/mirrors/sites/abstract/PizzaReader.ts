import { BaseMirror } from "./BaseMirror"
import { CurrentPageInfo, InfoResult, MirrorImplementation, MirrorObject } from "../../../types/common"
import { MirrorHelper } from "../../MirrorHelper"
import { stripTrailingSlash } from "../../../shared/utils"

const defaultOptions = {
    api_url: ""
}

class PizzaReader extends BaseMirror implements MirrorImplementation {
    canListFullMangas = false

    chapter_url: RegExp
    domains: string[]
    home: string
    languages: string
    mirrorIcon: string
    mirrorName: string
    disabled: boolean | undefined

    baseUrl: string

    private readonly options: typeof defaultOptions

    constructor(mirrorHelper: MirrorHelper, mirror: MirrorObject, options: Partial<typeof defaultOptions> = {}) {
        super(mirrorHelper)

        this.mirrorName = mirror.mirrorName
        this.mirrorIcon = mirror.mirrorIcon
        this.domains = mirror.domains
        this.home = mirror.home
        this.chapter_url = mirror.chapter_url
        this.languages = mirror.languages
        this.disabled = mirror.disabled

        this.baseUrl = stripTrailingSlash(mirror.home)

        this.options = {
            ...defaultOptions,
            ...options
        }
    }

    public async getMangaList(search?: string): Promise<InfoResult[]> {
        const json = await this.mirrorHelper.loadJson(this.options.api_url + "search/" + search)
        const res = []

        for (const comic of json.comics) {
            res.push([comic.title.trim(), this.home + comic.url])
        }
        return res
    }

    public async getListChaps(urlManga: string) {
        const slug = urlManga.split("/")[4]
        const json = await this.mirrorHelper.loadJson(this.options.api_url + "comics/" + slug + "?licensed=true", {
            nocache: true
        })
        const res = []

        for (const chapter of json.comic.chapters) {
            res.push([chapter.full_title.trim(), this.home + chapter.url])
        }
        return res
    }

    public async getCurrentPageInfo(doc: string, curUrl: string): Promise<CurrentPageInfo> {
        const url = new URL(curUrl)
        const json = await this.mirrorHelper.loadJson(this.options.api_url + url.pathname.substring(1))

        return {
            name: json.comic.title.trim(),
            currentMangaURL: this.home + json.comic.url,
            currentChapterURL: this.home + json.chapter.url
        }
    }

    public async getListImages(doc: string, curUrl: string): Promise<string[]> {
        const url = new URL(curUrl)
        const json = await this.mirrorHelper.loadJson(this.options.api_url + url.pathname.substring(1))
        const res = []

        for (const image of json.chapter.pages) {
            res.push(image)
        }

        return res
    }

    public async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }

    isCurrentPageAChapterPage(doc: string, curUrl: string): boolean {
        return this.chapter_url.test(new URL(curUrl).pathname)
    }
}

export const getPizzaReaderImplementations = (mirrorHelper: MirrorHelper): MirrorImplementation[] => {
    return [
        new PizzaReader(
            mirrorHelper,
            {
                mirrorName: "Phoenix Scans",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/phoenix-scans-optimized.png"),
                languages: "it",
                domains: ["phoenixscans.com"],
                home: "https://www.phoenixscans.com",
                chapter_url: /^\/read\/.+\/ch\/\d+/g
            },
            {
                api_url: "https://www.phoenixscans.com/api/"
            }
        )
    ]
}
