import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import DisasterScansIcon from "../icons/disasterscans-optimized.png"

export class DisasterScans extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Disaster Scans"
    canListFullMangas = true
    mirrorIcon = DisasterScansIcon
    languages = "en"
    domains = ["disasterscans.com"]
    home = "https://disasterscans.com"
    chapter_url = /^\/.*\/.*\/.*-chapter-.*/g

    async getMangaList(search: string) {
        const doc = await this.mirrorHelper.loadPage(this.home + "/comics", {
            nocache: true,
            preventimages: true
        })

        const res = []
        const _self = this
        const $ = this.parseHtml(doc)

        $("a[href*='/comics/']").each(function () {
            res.push([$(this).text(), _self.home + $(this).attr("href")])
        })
        return res
    }

    async getListChaps(urlManga) {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })
        const res = []

        const $ = this.parseHtml(doc)

        const raw = $('script:last').text().replace('self.__next_f.push([1,"a:', '').replace('\\n"])', '').replaceAll('\\"', '"')


        const json = JSON.parse(raw)

        function findNode(json, key) {
            if (json[key]) {
                return json[key]
            }
            for (const child of Object.values(json).filter(value => value && typeof value == 'object')) {
                const res = findNode(child, key)
                if (res) {
                    return res
                }
            }
        }

        const chapters = findNode(json, 'chapters')

        chapters.forEach(element => {
            res.push([
                ("Chapter " + element.ChapterNumber + (element.ChapterName != "" ? " - " + element.ChapterName : "")).trim(),
                urlManga + "/" + element.chapterID + "-chapter-" + element.ChapterNumber
            ])  
        })
        
        
        
        /*
        const regex = /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/g
        const matches = regex.exec(doc)
        const data = JSON.parse(matches[1])


        data.props.pageProps.chapters.forEach(elem =>
            res.push([
                ("Chapter " + elem.chapterNumber + (elem.ChapterName != "" ? " - " + elem.ChapterName : "")).trim(),
                urlManga + "/" + elem.chapterID + "-chapter-" + elem.chapterNumber
            ])
        ) */


        return res

    }

    async getCurrentPageInfo(doc, curUrl) {
        const seriesUrl = curUrl.split("/").slice(0, 5).join("/")
        const doc2 = await this.mirrorHelper.loadPage(seriesUrl, { nocache: true, preventimages: true })
        const $ = this.parseHtml(doc2)
        return {
            name: $('h1:first').text().trim(),
            currentMangaURL: seriesUrl,
            currentChapterURL: curUrl
        }
    }

    async getListImages(doc) {
        const $ = this.parseHtml(doc)
        const res = []
        $("img[loading='lazy']").each(function () {
            res.push($(this).attr("src"))
        })

        return res
    }

    isCurrentPageAChapterPage(doc) {
        return this.queryHtml(doc, "img[loading='lazy']").length > 0
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }
}
