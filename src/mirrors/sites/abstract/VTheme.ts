import { BaseMirror } from "./BaseMirror"
import { CurrentPageInfo, InfoResult, MirrorImplementation, MirrorObject } from "../../../types/common"
import { MirrorHelper } from "../../MirrorHelper"
import { stripTrailingSlash } from "../../../shared/utils"

const defaultOptions = {}

class VTheme extends BaseMirror implements MirrorImplementation {
    canListFullMangas = false

    chapter_url: RegExp
    domains: string[]
    home: string
    languages: string
    mirrorIcon: string
    mirrorName: string
    disabled: boolean | undefined

    baseUrl: string
    apiUrl: string

    private readonly options: typeof defaultOptions

    constructor(mirrorHelper: MirrorHelper, mirror: MirrorObject, options: Partial<typeof defaultOptions> = {}) {
        super(mirrorHelper)

        this.mirrorName = mirror.mirrorName
        this.mirrorIcon = mirror.mirrorIcon
        this.domains = mirror.domains
        this.home = mirror.home
        this.chapter_url = mirror.chapter_url
        this.languages = mirror.languages
        this.disabled = mirror.disabled

        this.baseUrl = stripTrailingSlash(mirror.home)
        this.apiUrl = this.baseUrl + "/api/"

        this.options = {
            ...defaultOptions,
            ...options
        }
    }

    public async getMangaList(search?: string): Promise<InfoResult[]> {
        const json = await this.mirrorHelper.loadJson(this.apiUrl + `query?searchTerm=${search}&perPage=100`)
        const res = []

        for (const series of json.posts) {
            res.push([series.postTitle.trim(), `${this.home}/series/${series.slug}`])
        }
        return res
    }

    public async getListChaps(urlManga: string) {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })
        const regex = /{\\\"postId\\\":(\d+)}]/g
        const matches = regex.exec(doc)
        const seriesId = matches[1]
        const seriesUrl = `${this.apiUrl}chapters?postId=${seriesId}&skip=0&take=1000&order=desc`
        const json = await this.mirrorHelper.loadJson(seriesUrl)
        const res = []

        for (const chapter of json.post.chapters) {
            res.push([`Chapter ${chapter.number}`, `${this.home}/series/${chapter.mangaPost.slug}/${chapter.slug}`])
        }
        return res
    }

    public async getCurrentPageInfo(doc: string, curUrl: string): Promise<CurrentPageInfo> {
        const parts = curUrl.split("/")
        const $ = this.parseHtml(doc)
        const seriesUrl = parts.slice(0, -1).join("/")
        const doc2 = await this.mirrorHelper.loadPage(seriesUrl, { nocache: true })
        const $$ = this.parseHtml(doc2)

        return {
            name: $$("h1").text().trim(),
            currentMangaURL: seriesUrl,
            currentChapterURL: curUrl
        }
    }

    public async getListImages(doc: string, curUrl: string): Promise<string[]> {
        const res = []
        const regex = /\\\"images\\\":(.*),\\\"nextChapter\\\"/g
        const imageStringRaw = regex.exec(doc)[1]
        const images = JSON.parse(imageStringRaw.replace(/\\\"/g, '"'))

        for (const image of images) {
            res.push(image.url)
        }

        return res
    }

    public async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }

    isCurrentPageAChapterPage(doc: string, curUrl: string): boolean {
        return this.chapter_url.test(new URL(curUrl).pathname)
    }
}

export const getVThemeImplementations = (mirrorHelper: MirrorHelper): MirrorImplementation[] => {
    return [
        new VTheme(mirrorHelper, {
            mirrorName: "Void Scans",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/phoenix-scans-optimized.png"),
            languages: "en",
            domains: ["hivecomic.com"],
            home: "https://www.hivecomic.com",
            chapter_url: /^\/series\/.*\/chapter-\d+/g
        })
    ]
}
