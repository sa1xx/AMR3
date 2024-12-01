import { BaseMirror } from "./abstract/BaseMirror"
import { MirrorImplementation } from "../../types/common"
import { MirrorHelper } from "../MirrorHelper"

export class FlameComics extends BaseMirror implements MirrorImplementation {
    constructor(amrLoader: MirrorHelper) {
        super(amrLoader)
    }

    mirrorName = "Flame Scans"
    canListFullMangas = true
    mirrorIcon = require("../icons/flamescans-optimized.png")
    languages = "en"
    domains = ["flamecomics.xyz"]
    home = "https://flamecomics.xyz"
    chapter_url =  /\/series\/\d+\/.*$/g

    async getMangaList(search: string) {
        const doc = await this.mirrorHelper.loadPage(this.home + "/comics", {
            nocache: true,
            preventimages: true
        })

        const res = []

        const regex = /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/g
        const matches = regex.exec(doc)
        const data = JSON.parse(matches[1])


        data.props.pageProps.series.forEach(element =>
            res.push([
                element.title.trim(),
                this.home + '/series/' + element.series_id
            ])
        )
        return res
    }

    async getListChaps(urlManga) {
        const doc = await this.mirrorHelper.loadPage(urlManga, { nocache: true, preventimages: true })
        const res = []

        const regex = /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/g
        const matches = regex.exec(doc)
        const data = JSON.parse(matches[1])


        data.props.pageProps.chapters.forEach(element =>
            res.push([
                ("Chapter " + element.chapter).trim(),
                urlManga + "/" + element.token
            ])
        )


        return res

    }

    async getCurrentPageInfo(doc, curUrl) {
        const regex = /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/g
        const matches = regex.exec(doc)
        const data = JSON.parse(matches[1])
        return {
            name: data.props.pageProps.chapter.title,
            currentMangaURL: this.home + '/series/' + data.props.pageProps.chapter.series_id,
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

/*
<img alt="AGS_74_00.jpg" fit="contain" my="none" fetchpriority="high" width="1778" height="1000" decoding="async" data-nimg="1" style="color:transparent;width:100%;height:auto" sizes="100vw" 
srcSet="/_next/image?url=https%3A%2F%2Fcdn.flamecomics.xyz%2Fseries%2F127%2Fa8638fb107d46b0f%2FAGS_74_00.jpg%3F1732178940&amp;w=640&amp;q=100 640w, /_next/image?url=https%3A%2F%2Fcdn.flamecomics.xyz%2Fseries%2F127%2Fa8638fb107d46b0f%2FAGS_74_00.jpg%3F1732178940&amp;w=750&amp;q=100 750w, /_next/image?url=https%3A%2F%2Fcdn.flamecomics.xyz%2Fseries%2F127%2Fa8638fb107d46b0f%2FAGS_74_00.jpg%3F1732178940&amp;w=828&amp;q=100 828w, /_next/image?url=https%3A%2F%2Fcdn.flamecomics.xyz%2Fseries%2F127%2Fa8638fb107d46b0f%2FAGS_74_00.jpg%3F1732178940&amp;w=1080&amp;q=100 1080w, /_next/image?url=https%3A%2F%2Fcdn.flamecomics.xyz%2Fseries%2F127%2Fa8638fb107d46b0f%2FAGS_74_00.jpg%3F1732178940&amp;w=1200&amp;q=100 1200w, /_next/image?url=https%3A%2F%2Fcdn.flamecomics.xyz%2Fseries%2F127%2Fa8638fb107d46b0f%2FAGS_74_00.jpg%3F1732178940&amp;w=1920&amp;q=100 1920w, /_next/image?url=https%3A%2F%2Fcdn.flamecomics.xyz%2Fseries%2F127%2Fa8638fb107d46b0f%2FAGS_74_00.jpg%3F1732178940&amp;w=2048&amp;q=100 2048w, /_next/image?url=https%3A%2F%2Fcdn.flamecomics.xyz%2Fseries%2F127%2Fa8638fb107d46b0f%2FAGS_74_00.jpg%3F1732178940&amp;w=3840&amp;q=100 3840w" 
src="/_next/image?url=https%3A%2F%2Fcdn.flamecomics.xyz%2Fseries%2F127%2Fa8638fb107d46b0f%2FAGS_74_00.jpg%3F1732178940&amp;w=3840&amp;q=100"/>

*/