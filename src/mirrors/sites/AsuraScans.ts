import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import mirrorIcon from "../icons/asurascans-optimized.png"

export class AsuraScans extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Asura Scans"
    canListFullMangas = false
    mirrorIcon = mirrorIcon
    languages = "en"
    domains = ["asuracomic.net"]
    home = "https://asuracomic.net"
    chapter_url = /^\/series\/.*\/chapter\//g

    async getMangaList(search: string) {
        const url = `${this.home}/series?page=1&name=Estate`
        const doc = await this.mirrorHelper.loadPage(url, { nocache: true, preventimages: true })

        const res = []
        const _self = this
        const $ = this.parseHtml(doc)

        $("div.grid a").each(function (index) {
            res.push([$(this).find("span.block").text(), $(this).attr("href")])
        })

        return res
    }

    async getListChaps(urlManga) {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })

        const res = []
        const _self = this
        const $ = this.parseHtml(doc)

        $("a[href*='/chapter/']:has(h3.text-xs)").each(function (index) {
            res.push([$(this).find("h3:first").text().trim(), _self.home + "/series/" + $(this).attr("href")])
        })

        return res
    }

    async getCurrentPageInfo(doc, curUrl) {
        const $ = this.parseHtml(doc)
        const mg = $('a[href*="/series/"]:first')
        return {
            name: mg.text(),
            currentMangaURL: this.home + mg.attr("href"),
            currentChapterURL: curUrl
        }
    }

    async getListImages(doc) {
        const res = []
        const regex = /\\\"pages\\\":\[(.*)\]\}\}\],/g
        const imageStringRaw = regex.exec(doc)[1]
        const images = JSON.parse("[" + imageStringRaw.replace(/\\\"/g, '"') + "]")

        for (const image of images) {
            res.push(image.url)
        }

        return res
    }

    isCurrentPageAChapterPage(doc, curUrl) {
        return this.chapter_url.test(new URL(curUrl).pathname)
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }
}
