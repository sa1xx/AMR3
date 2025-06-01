import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import MangaIcon from "../icons/agr-comics-optimized.png"

export class IsekaiScan extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "IsekaiScans"
    // canListFullMangas = true
    mirrorIcon = MangaIcon
    languages = "en"
    domains = ["isekaiscan.top"]
    home = "https://www.isekaiscan.top"
    chapter_url = /.*-chapter.*/g

    async getMangaList(search: string) {
        const url = this.home + `/search?s=${search}&post_type=wp-manga`
        const doc = await this.mirrorHelper.loadPage(url, { nocache: true, preventimages: true })
        const $ = this.parseHtml(doc)
        const res = []
        const _self = this

        $(".search-wrap .post-title a").each(function (index) {
            res.push([$(this).text().trim(), $(this).attr("href")])
        })

        return res
    }

    async getListChaps(urlManga) {
        let doc = await this.mirrorHelper.loadPage(urlManga, {
            nocache: true,
            preventimages: true
        })
        const res = []
        const _self = this
        let $ = this.parseHtml(doc)
        const mangaID = $("#manga-chapters-holder").attr("data-id")

        doc = await this.mirrorHelper.loadPage(this.home + `/ajax-list-chapter?mangaID=${mangaID}`, { nocache: true })
        $ = this.parseHtml(doc)

        $(".wp-manga-chapter a").each(function (index) {
            res.push([$(this).text().trim(), $(this).attr("href")])
        })

        return res
    }

    async getCurrentPageInfo(doc, curUrl) {
        const $ = this.parseHtml(doc)
        const mg = $("h1#chapter-heading a")
        return {
            name: mg.attr("title").trim(),
            currentMangaURL: mg.attr("href"),
            currentChapterURL: curUrl
        }
    }

    async getListImages(doc, curUrl, sender) {
        const $ = this.parseHtml(doc)
        const images = $("p#arraydata").text().split(",")
        if (images.length > 0) {
            return images
        }
        return []
    }

    isCurrentPageAChapterPage(doc, curUrl) {
        const $ = this.parseHtml(doc)
        return $("p#arraydata").text().split(",").length > 0
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }
}
