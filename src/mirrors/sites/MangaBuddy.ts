import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import MangaBuddyIcon from "../icons/manga-btt-optimized.png"

export class MangaBuddy extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Manga Buddy"
    canListFullMangas = false
    mirrorIcon = MangaBuddyIcon
    languages = "en"
    domains = ["mangabuddy.com"]
    home = "https://mangabuddy.com/home"
    baseUrl = "https://mangabuddy.com"
    chapter_url = /^\/.+\/chapter-\d+$/g
    imageServer = "https://sb.mbcdn.xyz"
    mangaIdRegex = /var bookId = (?<mangaId>\d+);/

    async getMangaList(search: string) {
        const doc = await this.mirrorHelper.loadPage(this.home + "/search?q=" + search, {
            nocache: true,
            preventimages: true
        })

        const res = []
        const _self = this
        const $ = this.parseHtml(doc)

        $(".manga-list .title h3 a").each(function () {
            res.push([$(this).text().trim(), _self.baseUrl + $(this).attr("href")])
        })
        return res
    }

    getMangaId(doc: string): string {
        return doc.match(this.mangaIdRegex).groups.mangaId
    }

    async getListChaps(urlManga) {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })
        const mangaId = this.getMangaId(doc)
        const chaptersRequestUrl = `${this.baseUrl}/api/manga/${mangaId}/chapters?source=detail`
        const chaptersDoc = await this.mirrorHelper.loadPage(chaptersRequestUrl, { nocache: true, preventimages: true })

        const res = []
        const _self = this
        const $ = this.parseHtml(chaptersDoc)

        $("ul.chapter-list a").each(function (index) {
            res.push([$(".chapter-title", this).text().trim(), _self.baseUrl + $(this).attr("href")])
        })
        return res
    }

    async getCurrentPageInfo(doc, curUrl) {
        const $ = this.parseHtml(doc)
        var mgtitle = $($("#breadcrumbs-container .breadcrumbs-item")[1]).find("a")

        return {
            name: mgtitle.text(),
            currentMangaURL: this.baseUrl + mgtitle.attr("href"),
            currentChapterURL: curUrl
        }
    }

    async getListImages(doc, curUrl, sender) {
        const res = []
        const $ = this.parseHtml(doc)

        const images = await this.getVariable({ variableName: "chapImages ", doc })
            .split(",")
            .map(url => {
                const path = url.split("/manga/")[1]
                return `${this.imageServer}/manga/${path}`
            })
        return images
    }

    isCurrentPageAChapterPage(doc, curUrl) {
        return this.queryHtml(doc, "div#chapter-images div.chapter-image").length > 0
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }
}
