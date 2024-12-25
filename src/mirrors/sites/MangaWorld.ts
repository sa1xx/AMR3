import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import MirrorIcon from "../icons/manga-world-optimized.png"

export class MangaWorld extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Manga World"
    canListFullMangas = false
    mirrorIcon = MirrorIcon
    languages = "en"
    domains = ["mangaworld.ac"]
    home = "https://www.mangaworld.ac"
    chapter_url = /^\/manga\/.*?\/.*?\/read\/.*/g

    async getMangaList(search: string) {
        const doc = await this.mirrorHelper.loadPage(this.home + "/archive?keyword=" + search, {
            nocache: true,
            preventimages: true
        })

        const res = []
        const _self = this
        const $ = this.parseHtml(doc)

        $(".comics-grid a.manga-title").each(function () {
            res.push([$(this).text(), $(this).attr("href")])
        })
        return res
    }

    async getListChaps(urlManga) {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })

        const res = []
        const $ = this.parseHtml(doc)
        const _self = this

        $(".chapters-wrapper a.chap").each(function (index) {
            res.push([$(this).find(".d-inline-block").text().trim(), _self.removeListMode($(this).attr("href"))])
        })
        return res
    }

    async getCurrentPageInfo(doc, curUrl) {
        const $ = this.parseHtml(doc)
        const mgtitle = $('a:contains("Ritorna a")')
        return {
            name: mgtitle.text().replace("Ritorna a", "").trim(),
            currentMangaURL: mgtitle.attr("href"),
            currentChapterURL: this.removeListMode(curUrl).split("/").slice(0, -1).join("/")
        }
    }

    async getListImages(doc, curUrl) {
        if (!curUrl.includes("?style=list")) {
            doc = await this.mirrorHelper.loadPage(this.addListMode(curUrl), { nocache: true })
        }

        const $ = this.parseHtml(doc)
        const res = []

        $("div#page img").each(function (index) {
            res.push($(this).attr("src"))
        })

        return res
    }

    isCurrentPageAChapterPage(doc) {
        return this.queryHtml(doc, "div#page img").length > 0
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }

    removeListMode(url) {
        return url.replace("?style=list", "")
    }

    addListMode(url) {
        if (url.includes("?style=list")) {
            return url
        }

        return url + "?style=list"
    }
}
