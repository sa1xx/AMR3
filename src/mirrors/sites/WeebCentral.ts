import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import MangaIcon from "../icons/weeb-central-optimized.png"

export class WeebCentral extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Weeb Central"
    canListFullMangas = false
    mirrorIcon = MangaIcon
    languages = "en"
    domains = ["weebcentral.com"]
    home = "https://weebcentral.com"
    chapter_url = /^\/chapters\/.*/g

    async getMangaList(search: string) {
        const url =
            this.home +
            `search/data?author=&text=${search}&sort=Best%20Match&order=Ascending&official=Any&display_mode=Full%20Display`
        const doc = await this.mirrorHelper.loadPage(url, { nocache: true, preventimages: true })
        const $ = this.parseHtml(doc)
        const res = []

        $("article.bg-base-300").each(function (index) {
            res.push([$(this).find("section:last a").text().trim(), $(this).find("section:last a").attr("href")])
        })

        return res
    }

    async getListChaps(urlManga) {
        const url = urlManga.split("/").slice(0, 5).join("/") + "/full-chapter-list"
        const doc = await this.mirrorHelper.loadPage(url, {
            nocache: true,
            preventimages: true
        })
        const res = []
        const $ = this.parseHtml(doc)

        $("a").each(function (index) {
            const title = $(this).find("span.grow span:first").text().trim()
            const url = $(this).attr("href")
            res.push([title, url])
        })

        return res
    }

    async getCurrentPageInfo(doc, curUrl) {
        const $ = this.parseHtml(doc)
        const mg = $("main a:first")
        return {
            name: mg.text().trim(),
            currentMangaURL: mg.attr("href"),
            currentChapterURL: curUrl
        }
    }

    async getListImages(doc, curUrl, sender) {
        doc = await this.mirrorHelper.loadPage(curUrl + "/images?is_prev=False&reading_style=long_strip")
        const res = []
        const $ = this.parseHtml(doc)
        $("img").each(function (index) {
            res.push($(this).attr("src"))
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
