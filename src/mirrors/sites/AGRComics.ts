import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import MangaIcon from "../icons/agr-comics-optimized.png"

export class AGRComics extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "AGR Comics"
    canListFullMangas = true
    mirrorIcon = MangaIcon
    languages = "en"
    domains = ["agrcomics.com"]
    home = "https://agrcomics.com"
    chapter_url = /^\/chapter\/.*\/$/g

    async getMangaList(search: string) {
        const url = this.home + "/series"
        const doc = await this.mirrorHelper.loadPage(url, { nocache: true, preventimages: true })
        const $ = this.parseHtml(doc)
        const res = []
        const _self = this

        $("#searched_series_page button div div a").each(function (index) {
            res.push([
                $(this).text().trim(), 
                _self.home + $(this).attr("href")
            ])
        })
        
        
        return res
    }

    async getListChaps(urlManga) {
        const doc = await this.mirrorHelper.loadPage(urlManga, {
            nocache: true,
            preventimages: true
        })
        const res = []
        const _self = this
        const $ = this.parseHtml(doc)

        $("#chapters a").each(function (index) {
            if ($(this).find('noload[src*="/assets/images/Coin.svg"]').length == 0) {
                res.push([
                    $(this).attr("title").trim(), 
                    _self.home + $(this).attr("href")
                ])
            }
        })

        return res
    }

    async getCurrentPageInfo(doc, curUrl) {
        const $ = this.parseHtml(doc)
        const mg = $("#chapter_header a")
        return {
            name: mg.attr("title").trim(),
            currentMangaURL: this.home + mg.attr("href"),
            currentChapterURL: curUrl
        }
    }

    async getListImages(doc, curUrl, sender) {
        const res = []
        const _self = this
        const $ = this.parseHtml(doc)
        $("#pages_panel img").each(function (index) {
            res.push('https://cdn.meowing.org/uploads/' + $(this).attr("uid"))
        })
        return res
    }

    isCurrentPageAChapterPage(doc, curUrl) {
        const $ = this.parseHtml(doc)
        return $("#pages_panel img").length > 0
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }
}
