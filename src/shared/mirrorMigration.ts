import type { AppManga, InfoResult } from "../types/common"

function chapterNumber(name: string): string | undefined {
    const match =
        name.match(/(?:chapter|chap\.?|ch\.?|episode|ep\.?)\s*[:#-]?\s*(\d+(?:\.\d+)?)/i) ??
        name.trim().match(/^(\d+(?:\.\d+)?)(?:\s|$)/)
    return match ? String(Number(match[1])) : undefined
}

/** Suggest only a unique match; numbering can differ between mirrors. */
export function suggestMigrationChapter(source: Pick<AppManga, "lastChapterReadName">, chapters: InfoResult[]) {
    const name = source.lastChapterReadName?.trim().toLowerCase()
    if (!name) return undefined
    const exact = chapters.filter(([title]) => title.trim().toLowerCase() === name)
    if (exact.length === 1) return exact[0][1]
    const number = chapterNumber(name)
    if (number === undefined) return undefined
    const matches = chapters.filter(([title]) => chapterNumber(title) === number)
    return matches.length === 1 ? matches[0][1] : undefined
}

export function buildMigratedManga(
    source: AppManga,
    target: {
        key: string
        mirror: string
        name: string
        url: string
        language?: string
        languages?: string[]
        chapters: InfoResult[]
        chapterUrl: string
    },
    reactivate: boolean
): AppManga {
    const chapter = target.chapters.find(([, url]) => url === target.chapterUrl)
    if (target.chapterUrl && !chapter) throw new Error("migration_error_chapter")
    return {
        ...source,
        key: target.key,
        mirror: target.mirror,
        name: target.name,
        url: target.url,
        language: target.language,
        languages: target.languages,
        listChaps: target.chapters,
        cats: [...source.cats],
        lastChapterReadURL: chapter?.[1] ?? "",
        lastChapterReadName: chapter?.[0] ?? "",
        currentChapter: chapter?.[1] ?? "",
        currentScanUrl: "",
        read: reactivate ? 0 : source.read,
        update: reactivate ? 1 : source.update,
        updateError: 0,
        updateErrorCode: 0,
        ts: Math.round(Date.now() / 1000),
        tsOpts: Math.round(Date.now() / 1000),
        upts: 0
    }
}
