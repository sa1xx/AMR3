import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import mirrorIcon from "../icons/dragon-tea-optimized.png"

export class DragonTea extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Dragon Tea"
    canListFullMangas = false
    mirrorIcon = mirrorIcon
    languages = "en"
    domains = ["dragontea.ink"]
    home = "https://dragontea.ink/"
    chapter_url = /^\/(manhwa|comic|manga|webtoon|manhua|series|novel)\/.*\/.+$/g

    /* Todo: novels are encrypted, figure out how to decrypt them x.x 
        https://dragontea.ink/novel/marvel-unlimited-possession/chapter-450/
     */

    async getMangaList(search: string) {
        const doc = await this.mirrorHelper.loadPage(this.home + "?s=" + search + "&post_type=wp-manga", {
            nocache: true,
            preventimages: true
        })

        const res = []
        const $ = this.parseHtml(doc)

        $(".tab-summary h3 a").each(function () {
            res.push([$(this).text(), $(this).attr("href")])
        })
        return res
    }

    async getListChaps(urlManga) {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })

        const res = []
        const _self = this
        const $ = this.parseHtml(doc)

        $("li.wp-manga-chapter.free-chap a").each(function (index) {
            res.push([$(this).text(), $(this).attr("href")])
        })
        res.reverse()
        return res
    }

    async getCurrentPageInfo(doc, curUrl) {
        const $ = this.parseHtml(doc)
        const mgtitle = $("breadcrumb:first a:last")
        return {
            name: mgtitle.text(),
            currentMangaURL: mgtitle.attr("href"),
            currentChapterURL: curUrl
        }
    }

    async getListImages(doc) {
        const res = []
        const $ = this.parseHtml(doc)

        $("div.reading-content img").each(function () {
            res.push($(this).attr("data-src"))
        })

        return res
    }

    isCurrentPageAChapterPage(doc, curUrl) {
        return this.chapter_url.test(new URL(curUrl).pathname)
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }
}
