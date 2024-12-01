import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import MangaIcon from "../icons/nami-comi-optimized.png"

export class NamiComi extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Nami Comi"
    canListFullMangas = true
    mirrorIcon = MangaIcon
    languages = "en"
    domains = ["namicomi.com"]
    home = "https://namicomi.com/en"
    chapter_url = /^\/en\/chapter\/.*/g
    apiUrl = "https://api.namicomi.com"

    async getMangaList(search: string) {
        const url = this.apiUrl + `title/search?title=${search}&limit=100&includes[]=cover_art`
        const json = await this.mirrorHelper.loadJson(url, { nocache: true })

        const res = []

        for (const series of json.data) {
            res.push([series.attributes.title.en, `${this.home}/title/${series.id}/${series.attributes.slug}`])
        }

        return res
    }

    async getListChaps(urlManga) {
        const parts = urlManga.split("/")
        const url =
            this.apiUrl +
            `/chapter?titleId=${parts[5]}&includes[]=organization&includes[]=user&order[natural]=desc&limit=1000&offset=0&translatedLanguages[]=en`

        const json = await this.mirrorHelper.loadJson(url, { nocache: true })
        const res = []

        for (const chapter of json.data) {
            res.push([
                "Chapter " +
                    chapter.attributes.chapter +
                    (chapter.attributes.name ? " - " + chapter.attributes.name : ""),
                `${this.home}/chapter/${chapter.id}`
            ])
        }

        return res
    }

    async getCurrentPageInfo(doc, curUrl) {
        const parts = curUrl.split("/")
        const url = this.apiUrl + `/chapter/${parts[5]}?includes[]=title`
        const json = await this.mirrorHelper.loadJson(url, { nocache: true })
        const obj = json.data.relationships.find(e => e.type == "title")

        return {
            name: obj.attributes.title.en,
            currentMangaURL: `${this.home}/title/${obj.id}/${obj.attributes.slug}`,
            currentChapterURL: curUrl
        }
    }

    async getListImages(doc, curUrl, sender) {
        const parts = curUrl.split("/")
        const url = this.apiUrl + `/images/chapter/${parts[5]}?newQualities=true`

        const json = await this.mirrorHelper.loadJson(url, { nocache: true })
        const res = []

        const baseUrl = json.data.baseUrl
        const hash = json.data.hash

        for (const image of json.data.source) {
            res.push(new URL(`/chapter/${parts[5]}/${hash}/high/${image.filename}`, baseUrl))
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
