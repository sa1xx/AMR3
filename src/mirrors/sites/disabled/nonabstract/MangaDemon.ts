import MirrorIcon from "../../../icons/manga-demon-optimized.png"
import { DisabledMirror } from "../DisabledMirror"

export class MangaDemon extends DisabledMirror {
    constructor() {
        super({
            mirrorName: "Manga Demon",
            canListFullMangas: false,
            mirrorIcon: MirrorIcon,
            languages: "en",
            domains: ["manga-demon.org"],
            home: "http://manga-demon.org/",
            chapter_url: /read-.*-chapter-.*/g,
            disabled: true
        })
    }
    /*
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Manga Demon"
    canListFullMangas = false
    mirrorIcon = MangaDemonIcon
    languages = "en"
    domains = ["manga-demon.org"]
    home = "https://manga-demon.org"
    chapter_url = /^\/manga\/.+\/chapter\/.+/g

    async getMangaList(search: string) {
        const doc = await this.mirrorHelper.loadPage(this.home + "/search.php?manga=" + search, {
            nocache: true,
            preventimages: true
        })

        const res = []
        const _self = this
        const $ = this.parseHtml(doc)

        $(`a[href*="/manga/"]`).each(function (ind) {
            res.push([$(this).text().trim(), _self.home + $(this).attr("href")])
        })
        return res
    }

    async getListChaps(urlManga) {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })

        const res = []
        const _self = this
        const $ = this.parseHtml(doc)

        $(`ul.chapter-list a`).each(function (index) {
            res.push([$(this).find("strong").text().trim(), _self.home + $(this).attr("href")])
        })
        return res
    }

    async getCurrentPageInfo(doc, curUrl) {
        const $ = this.parseHtml(doc)
        const link = $("h1 a:first")
        const name = link.text()
        return {
            name: name,
            currentMangaURL: this.home + link.attr("href"),
            currentChapterURL: curUrl
        }
    }

    async getListImages(doc) {
        const res = []
        const $ = this.parseHtml(doc)

        $(`article center div img`).each(function () {
            const src = $(this).attr("src")
            if (!res.includes(src)) {
                res.push(src)
            }
        })
        return res
    }

    isCurrentPageAChapterPage(doc) {
        return this.queryHtml(doc, "article center div img").length > 0
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }
    */
}
