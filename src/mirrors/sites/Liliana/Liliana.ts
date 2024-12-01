import { BaseMirror } from "../abstract/BaseMirror"
import { MirrorImplementation, MirrorObject } from "../../../types/common"
import { MirrorHelper } from "../../MirrorHelper"

const defaultOptions = {
    base_url: "",
    chapter_list_selector: "li.chapter a",
    chapter_list_name_action: elem => {
        return elem.text().trim()
    },
    chapter_list_url_action: elem => {
        return elem.attr("href")
    },

    chapter_information_selector: "h1 a",
    images_selector: "img"
}

export class LilianaAbs extends BaseMirror implements MirrorImplementation {
    canListFullMangas = false

    chapter_url: RegExp
    domains: string[]
    home: string
    languages: string
    mirrorIcon: string
    mirrorName: string
    disabled: boolean | undefined

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

        this.options = {
            ...defaultOptions,
            base_url: mirror.home,
            ...options
        }
    }

    async getMangaList(search) {
        search = search.replace(/ /g, "_")
        const res = []
        const url = this.options.base_url + (this.options.base_url.endsWith("/") ? "" : "/") + "ajax/search"
        const json = await this.mirrorHelper.loadJson(url, {
            nocache: true,
            method: "POST",
            data: { search }
        })

        for (const series of json.list) {
            res.push([series.name.trim(), series.url])
        }

        return res
    }

    async getListChaps(urlManga) {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })
        const res = []
        const $ = this.parseHtml(doc)
        const self = this

        $(this.options.chapter_list_selector).each(function (index) {
            res.push([self.options.chapter_list_name_action($(this)), self.options.chapter_list_url_action($(this))])
        })

        return res
    }

    async getCurrentPageInfo(doc: string, curUrl: string) {
        const link = this.queryHtml(doc, this.options.chapter_information_selector)
        return {
            name: link.text().trim(),
            currentMangaURL: link.attr("href"),
            currentChapterURL: curUrl
        }
    }

    async getListImages(doc, curUrl) {
        const res = []
        let $ = this.parseHtml(doc)

        const chapter_id = this.mirrorHelper.getVariableFromScript("CHAPTER_ID", doc)

        const json = await this.mirrorHelper.loadJson(
            this.options.base_url +
                (this.options.base_url.endsWith("/") ? "" : "/") +
                "ajax/image/list/chap/" +
                chapter_id,
            {
                method: "POST",
                nocache: true
            }
        )

        $ = this.parseHtml(json.html)

        $(this.options.images_selector).each(function () {
            res.push($(this).attr("src"))
        })
        return res
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }

    isCurrentPageAChapterPage(_doc: string, curUrl: string): boolean {
        return this.chapter_url.test(new URL(curUrl).pathname)
    }
}
