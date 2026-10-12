import { BaseMirror } from "./abstract/BaseMirror"
import { InfoResult, MirrorImplementation, MirrorNetRequestConfig } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"
import MangaBuddyIcon from "../icons/manga-buddy-optimized.png"

interface ComizyTitle {
    id: string
    name: string
    url: string
}

interface ComizyPageData {
    ssrItems?: ComizyTitle[]
    initialManga?: ComizyTitle
    initialChapter?: { url: string; images: string[] }
}

export class MangaBuddy extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Manga Buddy"
    canListFullMangas = false
    mirrorIcon = MangaBuddyIcon
    languages = "en"
    domains = ["mangabuddy.com", "comizy.io"]
    home = "https://comizy.io/home"
    baseUrl = "https://comizy.io"
    chapter_url = /^\/[^/]+\/(?:vol-[^/?#]+-)?chapter-[^/?#]+(?:[?#].*)?$/

    getNetRequestConfig(): MirrorNetRequestConfig {
        return {
            mainUrl: this.baseUrl,
            regexUrlFilter: "^https://(?:api\\.comizy\\.io|x[0-9]+\\.cmzcdn\\.org)/"
        }
    }

    private getPageData(doc: string): ComizyPageData {
        const data = this.queryHtml(doc, "script#__NEXT_DATA__").text()
        return data ? JSON.parse(data).props.pageProps : {}
    }

    async getMangaList(search: string): Promise<InfoResult[]> {
        const doc = await this.mirrorHelper.loadPage(this.baseUrl + "/search?q=" + encodeURIComponent(search), {
            nocache: true,
            preventimages: true
        })

        return (this.getPageData(doc).ssrItems ?? []).map(manga => [
            manga.name.trim(),
            new URL(manga.url, this.baseUrl).href
        ])
    }

    async getListChaps(urlManga): Promise<InfoResult[]> {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })
        const manga = this.getPageData(doc).initialManga
        if (!manga) throw new Error("Manga Buddy: manga data not found")

        // The series page embeds only the latest 50 chapters; the API returns the complete list.
        const chapters = await this.mirrorHelper.loadJson(
            `https://api.comizy.io/titles/${encodeURIComponent(manga.id)}/chapters`,
            { nocache: true }
        )
        if (!Array.isArray(chapters.data?.chapters)) throw new Error("Manga Buddy: chapter list not found")
        return chapters.data.chapters.map(chapter => [chapter.name.trim(), new URL(chapter.url, this.baseUrl).href])
    }

    async getCurrentPageInfo(doc, curUrl) {
        const { initialManga: manga, initialChapter: chapter } = this.getPageData(doc)
        if (!manga || !chapter) throw new Error("Manga Buddy: chapter data not found")

        return {
            name: manga.name,
            currentMangaURL: new URL(manga.url, this.baseUrl).href,
            currentChapterURL: new URL(chapter.url, this.baseUrl).href
        }
    }

    async getListImages(doc, curUrl, sender) {
        return this.getPageData(doc).initialChapter?.images ?? []
    }

    isCurrentPageAChapterPage(doc, curUrl) {
        return (this.getPageData(doc).initialChapter?.images?.length ?? 0) > 0
    }

    async getImageUrlFromPage(urlImage: string): Promise<string> {
        return urlImage
    }
}
