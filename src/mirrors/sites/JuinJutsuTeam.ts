import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import MirrorIcon from "../icons/_base-icon-optimized.png"

export class JuinJutsuTeam extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Juin Jutsu Team"
    canListFullMangas = true
    mirrorIcon = MirrorIcon
    languages = "en"
    domains = ["juinjutsureader.ovh"]
    home = "https://www.juinjutsureader.ovh"
    chapter_url = /^\/read\/.*\/page\/.*/g

    async getMangaList(search: string) {
        let doc = await this.mirrorHelper.loadPage(this.home + "/directory/", {
            nocache: true,
            preventimages: true
        })

        const res = []
        const _self = this
        let $ = this.parseHtml(doc)

        res.push(...this.parseMangaListPage($))

        if ($('a.gbuttonright:contains("Fine")').length > 0) {
            const lastPageNumber = parseInt(
                $('a.gbuttonright:contains("Fine")').attr("href").split("/").slice(-2, -1).toString()
            )
            for (let page = 2; page <= lastPageNumber; page++) {
                doc = await this.mirrorHelper.loadPage(this.home + "/directory/" + page + "/", {
                    nocache: true,
                    preventimages: true
                })
                $ = this.parseHtml(doc)
                res.push(...this.parseMangaListPage($))
            }
        }

        return res
    }

    parseMangaListPage($) {
        const res = []
        $(".series_content .title a").each(function () {
            res.push([$(this).text(), $(this).attr("href")])
        })

        return res
    }

    async getListChaps(urlManga) {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })

        const res = []
        const $ = this.parseHtml(doc)

        $(".list_chapter .title_chapter a").each(function (index) {
            res.push([$(this).text(), $(this).attr("href")])
        })
        return res
    }

    async getCurrentPageInfo(doc, curUrl) {
        const $ = this.parseHtml(doc)
        const mgtitle = $(".topbar_left a:first")
        return {
            name: mgtitle.text(),
            currentMangaURL: mgtitle.attr("href"),
            currentChapterURL: curUrl.split("/").slice(0, -2).join("/") + "/"
        }
    }

    async getListImages(doc) {
        const pages = this.mirrorHelper.getVariableFromScript("pages", doc)

        return pages.map(page => page.url)
    }

    isCurrentPageAChapterPage(doc) {
        return this.queryHtml(doc, "#page .inner img").length > 0
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }
}
