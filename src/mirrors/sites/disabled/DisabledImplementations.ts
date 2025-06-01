import { DisabledMirror } from "./DisabledMirror"
import NonStopScansIcon from "../../icons/nonstopscans-optimized.png"
import LeviatanScansIcon from "../../icons/leviatanscans-optimized.png"

import { Manwha18net } from "./nonabstract/Manwha18.net"
import { UnionLeitor } from "./nonabstract/UnionLeitor"
import { MangaBTT } from "./nonabstract/MangaBTT"
import { MangaAlArab } from "./nonabstract/MangaAlArab"
import { MangaDemon } from "./nonabstract/MangaDemon"
import { Manga4Life } from "./nonabstract/Manga4Life"
import { MangaSee } from "./nonabstract/MangaSee"
import { ManhwaFreak } from "./nonabstract/ManhwaFreak"
import { ReadM } from "./nonabstract/ReadM"
import { ReaperScans } from "./nonabstract/ReaperScans"
import { SeriManga } from "./nonabstract/SeriManga"
import { ZaHardTop } from "./nonabstract/ZaHardTop"

export const getDisabledImplementations = () => {
    return [
        new DisabledMirror({
            disabled: true,
            mirrorName: "Aloalivn",
            mirrorIcon: require("../../icons/aloalivn-optimized.png"),
            languages: "en",
            domains: ["aloalivn.com"],
            home: "https://aloalivn.com/",
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
            canListFullMangas: false,
            abstract: "Madara",
            abstract_options: {
                search_url: "https://aloalivn.com/",
                chapter_list_ajax: true
            }
        }),
        new DisabledMirror({
            mirrorName: "Arang Scans",
            mirrorIcon: require("../../icons/arangscans-optimized.png"),
            languages: "en",
            domains: ["arangscans.org"],
            home: "https://arangscans.org/",
            canListFullMangas: true,
            disabled: true,
            chapter_url: /^\/chapters\/.*\/.+$/g
        }),
        new DisabledMirror({
            mirrorName: "Bacamanga",
            canListFullMangas: false,
            disabled: true,
            mirrorIcon: require("../../icons/bacamanga-optimized.png"),
            domains: ["bacamanga.co"],
            home: "https://bacamanga.co/",
            chapter_url: /^\/m[0-9]+\/$/g,
            languages: "id",
            abstract: "MangastreamAbs",
            abstract_options: {
                search_url: "https://bacamanga.co/",
                chapters_a_sel: "div.bixbox.bxcl > ul > li > span.lchx a"
            }
        }),
        new DisabledMirror({
            mirrorName: "Bang Aqua",
            mirrorIcon: require("../../icons/bangaqua-optimized.png"),
            languages: "en",
            disabled: true,
            domains: ["reader.bangaqua.com"],
            home: "http://bangaqua.com/",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://reader.bangaqua.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "CatManga",
            mirrorIcon: require("../../icons/catmanga-optimized.png"),
            languages: "en",
            domains: ["catmanga.org"],
            home: "https://catmanga.org",
            chapter_url: /^\/series\/.*?\/\d+$/g,
            abstract: "NextJs",
            canListFullMangas: true
        }),
        new DisabledMirror({
            mirrorName: "Doki Reader",
            mirrorIcon: require("../../icons/doki-optimized.png"),
            languages: "en",
            disabled: true,
            domains: ["kobato.hologfx.com"],
            home: "https://kobato.hologfx.com/",
            chapter_url: /^\/reader\/read\/.+$/g,
            canListFullMangas: false /* to avoid loading 4 pages to load all mangas */,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://kobato.hologfx.com/reader",
                search_all: false /* use FoolSlide search function */,
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Dokusha",
            mirrorIcon: require("../../icons/dokusha-optimized.png"),
            languages: "en",
            domains: ["dokusha.info"],
            home: "http://dokusha.info",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://dokusha.info",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "MangaDex",
            canListFullMangas: false,
            mirrorIcon: "mangadex.png",
            languages: [
                "en",
                "sa",
                "bd",
                "bg",
                "ct",
                "cn",
                "hk",
                "cz",
                "dk",
                "nl",
                "gb",
                "ph",
                "fi",
                "fr",
                "de",
                "gr",
                "hu",
                "id",
                "it",
                "jp",
                "kr",
                "my",
                "mn",
                "ir",
                "pl",
                "br",
                "pt",
                "ro",
                "ru",
                "rs",
                "es",
                "mx",
                "se",
                "th",
                "tr",
                "ua",
                "vn"
            ].join(","),
            domains: ["*.mangadex.org", "mangadex.org"],
            home: "https://www.mangadex.org/",
            chapter_url: /\/chapter\/.*/g,
            api: "https://api.mangadex.org/v2/",
            disabled: true
        }),
        new DisabledMirror({
            mirrorName: "Manga Reader",
            canListFullMangas: false,
            disabled: true,
            mirrorIcon: require("../../icons/mangareader-optimized.png"),
            domains: ["mangareader.net"],
            home: "http://www.mangareader.net",
            chapter_url: /\/.*\/[0-9]+.*/g,
            languages: "en"
        }),
        new DisabledMirror({
            mirrorName: "Manga Rock",
            disabled: true,
            canListFullMangas: false,
            mirrorIcon: require("../../icons/mangarock-optimized.png"),
            languages: "en",
            domains: ["mangarock.com"],
            home: "https://mangarock.com/",
            chapter_url: /\/manga\/.*\/chapter\/.*/g,
            api: "https://api.mangarockhd.com/query/web401/"
        }),
        new DisabledMirror({
            mirrorName: "MangaStream",
            mirrorIcon: require("../../icons/mangastream-optimized.png"),
            languages: "en",
            domains: ["mangastream.cc"],
            home: "https://www.mangastream.cc/",
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
            canListFullMangas: false,
            abstract: "Madara",
            disabled: true,
            abstract_options: {
                search_url: "https://www.mangastream.cc/"
            }
        }),
        new DisabledMirror({
            mirrorName: "Non Stop Scans",
            mirrorIcon: NonStopScansIcon,
            languages: "en",
            domains: ["nonstopscans.com"],
            home: "https://www.nonstopscans.com/",
            chapter_url: /^\/\d.+-.+?/g,
            canListFullMangas: false,
            abstract: "MangaStream_1_1_4",
            abstract_options: {
                base_url: "https://nonstopscans.com/"
            }
        }),
        new DisabledMirror({
            mirrorName: "The Cat Scans",
            mirrorIcon: require("../../icons/catscans-optimized.png"),
            languages: "en",
            domains: ["reader2.thecatscans.com"],
            home: "http://reader2.thecatscans.com/",
            chapter_url: /^\/read\/.+$/g,
            canListFullMangas: true,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://reader2.thecatscans.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Hasta Reader",
            mirrorIcon: require("../../icons/hastareader-optimized.png"),
            languages: "it",
            domains: ["hastareader.com"],
            home: "https://hastareader.com/",
            chapter_url: /^\/slide\/read\/.+$/g,
            canListFullMangas: false /* to avoid loading 8 pages to load all mangas */,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://hastareader.com/slide",
                search_all: false /* use FoolSlide search function */,
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Kangaryu Team",
            mirrorIcon: require("../../icons/kangaryuteam-optimized.png"),
            languages: "fr",
            domains: ["kangaryu-team.fr"],
            home: "http://kangaryu-team.fr/",
            chapter_url: /^\/manga\/.+\/\d+/g,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://kangaryu-team.fr/manga",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Kirei Cake",
            mirrorIcon: require("../../icons/kireicake-optimized.png"),
            languages: "en",
            domains: ["reader.kireicake.com"],
            home: "https://kireicake.com/",
            chapter_url: /^\/read\/.+$/g,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://reader.kireicake.com",
                series_list_url: "/reader/list/",
                mglist_selector: ".title > a[href*='/series/']",
                info_chapter_var: "baseurl"
            }
        }),
        new DisabledMirror({
            mirrorName: "Koneko Scantrad",
            mirrorIcon: require("../../icons/konekoscantrad-optimized.png"),
            languages: "fr",
            domains: ["lel.koneko-scantrad.fr"],
            home: "https://koneko-scantrad.fr",
            chapter_url: /^\/read\/.+$/g,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://lel.koneko-scantrad.fr",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Le Cercle du Scan",
            mirrorIcon: require("../../icons/lecercleduscan-optimized.png"),
            languages: "fr",
            domains: ["lel.lecercleduscan.com"],
            home: "https://lel.lecercleduscan.com",
            chapter_url: /^\/read\/.+$/g,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://lel.lecercleduscan.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Let It Go Scans",
            mirrorIcon: require("../../icons/letitgoscans-optimized.png"),
            languages: "en",
            domains: ["reader.letitgo.scans.today"],
            home: "http://letitgo-scans.blogspot.com/",
            chapter_url: /^\/read\/.+$/g,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://https://reader.letitgo.scans.today",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Vortex Scans",
            mirrorIcon: require("../../icons/vortexscans-optimized.png"),
            languages: "en",
            domains: ["reader.vortex-scans.com"],
            home: "https://vortex-scans.com/",
            chapter_url: /^\/read\/.+$/g,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://reader.vortex-scans.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Neumanga",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/neumanga-optimized.png"),
            domains: ["neumanga.tv"],
            home: "https://neumanga.tv/",
            chapter_url: /^\/m[0-9]+\/$/g,
            languages: "id",
            abstract: "MangastreamAbs",
            disabled: true,
            abstract_options: {
                search_url: "https://neumanga.tv/advanced_search",
                search_option: "&name_search_mode=contain",
                search_a_sel: "h2 > a[href*='/manga/']",
                search_field: "name_search_query",
                chapter_url_suffix: "/_/1",
                chapters_a_sel: "#scans > div > div.item-content > a",
                manga_title_attr: false,
                manga_url_sel: "#main > div.readarea > article > div.head > center > span > a",
                page_container_sel: "div[itemprop='mainContentOfPage']",
                img_sel: "img.imagechap",
                img_src: "data-src",
                search_json: false
            }
        }),
        new DisabledMirror({
            mirrorName: "Hero Manhua",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/heromanhua-optimized.png"),
            domains: ["heromanhua.com"],
            home: "https://heromanhua.com",
            chapter_url: /^\/manga\/.*\/.+$/g,
            languages: "en",
            abstract: "Madara",
            disabled: true,
            abstract_options: {
                search_url: "https://heromanhua.com/",
                img_src: "data-src",
                secondary_img_src: "src",
                chapter_list_ajax: true
            }
        }),
        new DisabledMirror({
            mirrorName: "Imperfect Comics",
            mirrorIcon: require("../../icons/imperfect-comics-optimized.png"),
            languages: "en",
            domains: ["imperfectcomic.org"],
            home: "https://imperfectcomic.org/",

            // chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
            chapter_url: /\/.*?chapter-[0-9]+.*\//g,
            canListFullMangas: false,
            abstract: "Madara",
            abstract_options: {
                search_url: "https://imperfectcomic.org/",
                page_container_sel: "div#readerarea img",
                img_sel: "div#readerarea img",
                // chapter_list_ajax: true,
                chapters_a_sel: "#chapterlist li a"
                // chapterInformationsSeriesUrl: (doc, curUrl) => {
                //     return $(".headpost a", doc).first().attr("href")
                // },
                // chapterInformationsSeriesName: (doc, curUrl) => {
                //     return $(".headpost a", doc).first().text().trim()
                // }
            }
        }),
        new DisabledMirror({
            mirrorName: "Komikgo",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/komikgo-optimized.png"),
            domains: ["komikgo.com"],
            home: "https://komikgo.com/",
            disabled: true,
            chapter_url: /^\/manga\/.*\/.+$/g,
            languages: "id",
            abstract: "Madara",
            abstract_options: {
                search_url: "https://komikgo.com/",
                img_src: "data-src"
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Manga Turf",
            mirrorIcon: require("../../icons/mangaturf-optimized.png"),
            languages: "en",
            domains: ["mangaturf.com"],
            home: "https://mangaturf.com/",
            canListFullMangas: true,
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
            abstract: "Madara",
            abstract_options: {
                search_url: "https://mangaturf.com/",
                chapter_list_ajax: true
            }
        }),
        new DisabledMirror({
            mirrorName: "MangazukiInfo",
            mirrorIcon: require("../../icons/mangazuki-optimized.png"),
            languages: "en",
            domains: ["mangazuki.info"],
            home: "https://mangazuki.info/",
            chapter_url: /^\/manga\/.*\/.+$/g,
            canListFullMangas: false,
            abstract: "Madara",
            disabled: true,
            abstract_options: {
                search_url: "https://mangazuki.info/",
                page_container_sel: "div.read-container",
                img_sel: "div.read-container img"
            }
        }),
        new DisabledMirror({
            mirrorName: "NinjaScans",
            mirrorIcon: require("../../icons/ninjascans-optimized.png"),
            languages: "en",
            disabled: true,
            domains: ["ninjascans.com"],
            home: "https://ninjascans.com/",
            chapter_url: /^\/(manga|manhua)\/.*\/.+$/g,
            canListFullMangas: false,
            abstract: "Madara",
            abstract_options: {
                search_url: "https://ninjascans.com/"
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Sam Manga",
            mirrorIcon: require("../../icons/sam-manga-optimized.png"),
            languages: "en",
            domains: ["sammanga.com"],
            home: "https://sammanga.com/",
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
            canListFullMangas: false,
            abstract: "Madara",
            abstract_options: {
                search_url: "https://sammanga.com/"
            }
        }),
        new DisabledMirror({
            mirrorName: "Shoujo Hearts",
            mirrorIcon: require("../../icons/shoujohearts-optimized.png"),
            languages: "en",
            domains: ["shoujohearts.com"],
            home: "https://shoujohearts.com/reader",
            chapter_url: /^\/reader\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,

            abstract: "Madara",
            abstract_options: {
                search_url: "https://shoujohearts.com/reader/",
                path_length: 3
                // chapter_list_ajax: true
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Social Weebs",
            mirrorIcon: require("../../icons/socialweebs-optimized.png"),
            languages: "en",
            domains: ["socialweebs.in"],
            home: "https://socialweebs.in",
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,

            abstract: "Madara",
            abstract_options: {
                search_url: "https://socialweebs.in/",
                chapter_list_ajax: true
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Vanguard Scans",
            mirrorIcon: require("../../icons/vanguardscans-optimized.png"),
            languages: "en",
            domains: ["vanguardbun.com"],
            home: "https://vanguardbun.com/",
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,

            abstract: "Madara",
            abstract_options: {
                search_url: "https://vanguardbun.com/",
                search_json: true,
                chapter_list_ajax: true
            }
        }),
        new DisabledMirror({
            mirrorName: "Yomanga",
            mirrorIcon: require("../../icons/yomanga-optimized.png"),
            languages: "en",
            domains: ["yomanga.info"],
            home: "https://yomanga.info/",
            chapter_url: /^\/manga\/.*\/.+$/g,
            canListFullMangas: false,
            disabled: true,
            abstract: "Madara",
            abstract_options: {
                search_url: "https://yomanga.info/"
            }
        }),
        new DisabledMirror({
            mirrorName: "Bang Aqua",
            mirrorIcon: require("../../icons/bangaqua-optimized.png"),
            languages: "en",
            disabled: true,
            domains: ["reader.bangaqua.com"],
            home: "http://bangaqua.com/",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://reader.bangaqua.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "The Cat Scans",
            mirrorIcon: require("../../icons/catscans-optimized.png"),
            languages: "en",
            domains: ["reader2.thecatscans.com"],
            home: "http://reader2.thecatscans.com/",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://reader2.thecatscans.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Doki Reader",
            mirrorIcon: require("../../icons/doki-optimized.png"),
            languages: "en",
            disabled: true,
            domains: ["kobato.hologfx.com"],
            home: "https://kobato.hologfx.com/",
            chapter_url: /^\/reader\/read\/.+$/g,
            canListFullMangas: false /* to avoid loading 4 pages to load all mangas */,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://kobato.hologfx.com/reader",
                search_all: false /* use FoolSlide search function */,
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Dokusha",
            mirrorIcon: require("../../icons/dokusha-optimized.png"),
            languages: "en",
            domains: ["dokusha.info"],
            home: "http://dokusha.info",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://dokusha.info",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Elpsykongroo",
            mirrorIcon: require("../../icons/elpsykongroo-optimized.png"),
            languages: "en",
            domains: ["elpsykongroo.pw"],
            home: "https://elpsykongroo.pw",
            disabled: true,
            chapter_url: /^\/r\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://elpsykongroo.pw/r",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Forgotten Scans",
            mirrorIcon: require("../../icons/fos-optimized.png"),
            languages: "en",
            domains: ["reader.fos-scans.com"],
            home: "http://fos-scans.com/",
            disabled: true,
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://reader.fos-scans.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Gekkou Scans",
            mirrorIcon: require("../../icons/gekkouscans-optimized.png"),
            languages: "pt",
            domains: ["leitor.mangascenter.com.br"],
            home: "http://leitor.mangascenter.com.br",
            chapter_url: /^\/read\/.+$/g,
            canListFullMangas: false /* to avoid loading 8 pages to load all mangas */,
            disabled: true,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://leitor.mangascenter.com.br",
                search_all: false /* use FoolSlide search function */,
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Hasta Reader",
            mirrorIcon: require("../../icons/hastareader-optimized.png"),
            languages: "it",
            domains: ["hastareader.com"],
            home: "https://hastareader.com/",
            chapter_url: /^\/slide\/read\/.+$/g,
            canListFullMangas: false /* to avoid loading 8 pages to load all mangas */,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://hastareader.com/slide",
                search_all: false /* use FoolSlide search function */,
                mglist_selector: ".title > a[href*='/series/']"
            }
            // test_options: {
            //     images_restricted_domain: true
            // }
        }),
        new DisabledMirror({
            mirrorName: "Helvetica Scans",
            mirrorIcon: require("../../icons/helvetica-optimized.png"),
            languages: "en",
            domains: ["helveticascans.com"],
            home: "https://helveticascans.com/",
            disabled: true,
            chapter_url: /^\/r\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://helveticascans.com/r",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Jaimini's Box",
            mirrorIcon: require("../../icons/jaiminisbox-optimized.png"),
            languages: "en",
            disabled: true,
            domains: ["jaiminisbox.com"],
            home: "https://jaiminisbox.com/",
            chapter_url: /^\/reader\/read\/.+$/g,
            canListFullMangas: false /* to avoid loading 3 pages to load all mangas */,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://jaiminisbox.com/reader",
                search_all: false /* use FoolSlide search function */,
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Kirei Cake",
            mirrorIcon: require("../../icons/kireicake-optimized.png"),
            languages: "en",
            domains: ["reader.kireicake.com"],
            home: "https://kireicake.com/",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://reader.kireicake.com",
                series_list_url: "/reader/list/",
                mglist_selector: ".title > a[href*='/series/']",
                info_chapter_var: "baseurl"
            }
        }),
        new DisabledMirror({
            mirrorName: "Koneko Scantrad",
            mirrorIcon: require("../../icons/konekoscantrad-optimized.png"),
            languages: "fr",
            domains: ["lel.koneko-scantrad.fr"],
            home: "https://koneko-scantrad.fr",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://lel.koneko-scantrad.fr",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Le Cercle du Scan",
            mirrorIcon: require("../../icons/lecercleduscan-optimized.png"),
            languages: "fr",
            domains: ["lel.lecercleduscan.com"],
            home: "https://lel.lecercleduscan.com",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://lel.lecercleduscan.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Let It Go Scans",
            mirrorIcon: require("../../icons/letitgoscans-optimized.png"),
            languages: "en",
            domains: ["reader.letitgo.scans.today"],
            home: "http://letitgo-scans.blogspot.com/",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://https://reader.letitgo.scans.today",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Mangaichi Scans",
            mirrorIcon: require("../../icons/mangaichiscans-optimized.png"),
            languages: "en",
            domains: ["mangaichiscans.mokkori.fr"],
            home: "http://mangaichiscans.mokkori.fr/",
            chapter_url: /^\/fs\/read\/.+$/g,
            disabled: true,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://mangaichiscans.mokkori.fr/fs",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "One Time Scans",
            mirrorIcon: require("../../icons/onetimescans-optimized.png"),
            languages: "en",
            domains: ["reader.otscans.com"],
            home: "https://otscans.com/",
            chapter_url: /^\/read\/.+$/g,
            disabled: true,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://reader.otscans.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Phoenix Serenade",
            mirrorIcon: require("../../icons/serenade-optimized.png"),
            languages: "en",
            domains: ["reader.serenade.moe"],
            home: "https://serenade.moe/",
            chapter_url: /^\/read\/.+$/g,
            disabled: true,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://reader.serenade.moe",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Roselia Scans",
            mirrorIcon: require("../../icons/roseliascans-optimized.png"),
            languages: "en",
            domains: ["reader.roseliascans.com"],
            home: "http://roseliascans.com/",
            chapter_url: /^\/read\/.+$/g,
            disabled: true,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://reader.roseliascans.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Senses Scans",
            mirrorIcon: require("../../icons/sensesscans-optimized.png"),
            languages: "en",
            domains: ["sensescans.com"],
            home: "http://sensescans.com/",
            chapter_url: /^\/reader\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://sensescans.com/reader",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Sorcerer Weekly",
            mirrorIcon: require("../../icons/sorcererweekly-optimized.png"),
            languages: "en",
            domains: ["sorcererweekly.com"],
            home: "https://sorcererweekly.com/",
            chapter_url: /^\/read\/.+$/g,
            disabled: true,
            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://sorcererweekly.com/reader",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Tappy tappy tap",
            mirrorIcon: require("../../icons/taptaptaptaptap-optimized.png"),
            languages: "en",
            domains: ["taptaptaptaptap.net"],
            home: "https://taptaptaptaptap.net/",
            chapter_url: /^\/fs\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://taptaptaptaptap.net/fs/",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Twisted Hel Scans",
            mirrorIcon: require("../../icons/twistedhelscans-optimized.png"),
            languages: "en",
            domains: ["twistedhelscans.com"],
            home: "http://www.twistedhelscans.com/",
            chapter_url: /^\/read\/.+$/g,
            disabled: true,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://www.twistedhelscans.com",
                // mglist_look_title_from_a: a => $(".card_title", $(a)).text(),
                page_container: ".isreaderc"
            }
        }),
        new DisabledMirror({
            mirrorName: "Vortex Scans",
            mirrorIcon: require("../../icons/vortexscans-optimized.png"),
            languages: "en",
            domains: ["reader.vortex-scans.com"],
            home: "https://vortex-scans.com/",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "https://reader.vortex-scans.com",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "World Three",
            mirrorIcon: require("../../icons/worldthree-optimized.png"),
            languages: "en",
            domains: ["slide.world-three.org"],
            home: "http://www.world-three.org/",
            chapter_url: /^\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://www.slide.world-three.org",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Mangashiro",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/mangashiro-optimized.png"),
            domains: ["mangashiro.co"],
            home: "https://mangashiro.co/",
            chapter_url: /^\/m[0-9]+\/$/g,
            languages: "id",
            abstract: "MangastreamAbs",
            disabled: true,
            abstract_options: {
                search_url: "https://mangashiro.co/",
                chapters_a_sel: "div.bixbox.bxcl > ul > li > span.lchx a"
            }
        }),
        new DisabledMirror({
            mirrorName: "Komikindo",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/id-optimized.png"),
            domains: ["komikindo.web.id", "komikindo.web.id"],
            home: "https://www.komikindo.web.id",
            chapter_url: /^\/m[0-9]+\/$/g,
            languages: "id",
            abstract: "MangastreamAbs",
            disabled: true,
            abstract_options: {
                search_url: "https://www.komikindo.web.id/",
                search_a_sel: "div.chlf > h2 > a",
                manga_title_attr: true
            }
        }),
        new DisabledMirror({
            mirrorName: "Pecintakomik",
            canListFullMangas: false,
            disabled: true,
            mirrorIcon: require("../../icons/pecintakomik-optimized.png"),
            domains: ["pecintakomik.net", "pecintakomik.net"],
            home: "https://www.pecintakomik.net/",
            chapter_url: /^\/m[0-9]+\/$/g,
            languages: "id",
            abstract: "MangastreamAbs",
            abstract_options: {
                search_url: "https://www.pecintakomik.net/",
                // chapters_a_sel: "div.bixbox.bxcl > ul > li > span.lchx a",
                search_a_sel: "div.luf > a",
                search_option: "&post_type=manga",
                manga_title_attr: true,
                chapters_a_sel: "div.bxcl > ul > li > span.lchx > a"
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "PM Scans",
            mirrorIcon: require("../../icons/pmscans-optimized.png"),
            languages: "en",
            domains: ["reader.pmscans.com"],
            home: "https://reader.pmscans.com/",
            chapter_url: /^\/(.*?)chapter-(.*?)$/g,

            abstract: "MangastreamAbs",
            abstract_options: {
                search_json: false,
                search_url: "https://reader.pmscans.com/",
                chapters_a_sel: "div.bixbox.bxcl ul li div.eph-num a",
                chapters_text_sel: "span.chapternum"
            }
        }),
        new DisabledMirror({
            mirrorName: "Mangashiro",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/mangashiro-optimized.png"),
            domains: ["mangashiro.co"],
            home: "https://mangashiro.co/",
            chapter_url: /^\/m[0-9]+\/$/g,
            languages: "id",
            abstract: "MangastreamAbs",
            disabled: true,
            abstract_options: {
                search_url: "https://mangashiro.co/",
                chapters_a_sel: "div.bixbox.bxcl > ul > li > span.lchx a"
            }
        }),
        new DisabledMirror({
            mirrorName: "Mangachan",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/Mangachan-optimized.png"),
            languages: "ru",
            domains: ["mangachan.me"],
            home: "http://mangachan.me",
            chapter_url: /^\/online\/.+$/g,
            disabled: true
        }),
        new DisabledMirror({
            mirrorName: "MangaLib",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/mangalib-optimized.png"),
            languages: "ru",
            domains: ["mangalib.me"],
            home: "https://mangalib.me/",
            chapter_url: /\/.*\/v[0-9]+\/c[0-9]+/g,
            disabled: true
        }),
        new DisabledMirror({
            mirrorName: "Manga Panda",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/mangapanda-optimized.png"),
            disabled: true,
            languages: "en",
            domains: ["mangapanda.com"],
            home: "http://www.mangapanda.com/",
            chapter_url: /^\/.*\/[0-9]+.+$/g
        }),
        new DisabledMirror({
            mirrorName: "Manga Turk",
            canListFullMangas: true,
            mirrorIcon: require("../../icons/mangaturk-optimized.png"),
            languages: "tr",
            domains: ["mangaoku.net"],
            home: "http://www.mangaoku.net/",
            chapter_url: /.*/g,
            /*no chapter_url, all urls are /any/ will be loaded everywhere... */
            disabled: true
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Martial Scans",
            canListFullMangas: true,
            mirrorIcon: require("../../icons/martialscans-optimized.png"),
            languages: "en",
            domains: ["martialscans.com"],
            home: "https://martialscans.com/",
            chapter_url: /\/chapter-[\d\.]+$/g
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Method Scans",
            mirrorIcon: require("../../icons/methodscans-optimized.png"),
            languages: "en",
            domains: ["methodscans.com"],
            home: "https://methodscans.com/home",
            canListFullMangas: true,
            chapter_url: /^\/comics\/.*\/.+$/g,
            abstract: "GenkanAbs",
            abstract_options: {
                base_url: "https://methodscans.com/"
            }
        }),
        new DisabledMirror({
            mirrorName: "MangaLib",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/mangalib-optimized.png"),
            languages: "ru",
            domains: ["mangalib.me"],
            home: "https://mangalib.me/",
            chapter_url: /\/.*\/v[0-9]+\/c[0-9]+/g,
            disabled: true
        }),
        new DisabledMirror({
            mirrorName: "Nani Scans",
            mirrorIcon: require("../../icons/naniscans-optimized.png"),
            canListFullMangas: true,
            languages: "en",
            domains: ["naniscans.xyz"],
            home: "https://naniscans.xyz",
            chapter_url: /^\/chapters\/\/read\/.+$/g,
            disabled: true
        }),
        new DisabledMirror({
            mirrorName: "Project Time Scans",
            mirrorIcon: require("../../icons/projecttimescans-optimized.png"),
            languages: "en",
            domains: ["read.ptscans.com"],
            home: "https://ptscans.com/",
            chapter_url: /^\/read\/.*\/.+$/g,
            disabled: true,

            abstract: "ComiCake",
            abstract_options: {
                reader_url: "https://read.ptscans.com"
            }
        }),
        new DisabledMirror({
            mirrorName: "MangaLib",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/mangalib-optimized.png"),
            languages: "ru",
            domains: ["mangalib.me"],
            home: "https://mangalib.me/",
            chapter_url: /\/.*\/v[0-9]+\/c[0-9]+/g,
            disabled: true
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Scan Trad",
            mirrorIcon: require("../../icons/scantrad-optimized.png"),
            languages: "fr",
            domains: ["scantrad.net"],
            home: "https://scantrad.net/",
            chapter_url: /^\/mangas\/.*\/[0-9]+.*$/g
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Secret Scans",
            mirrorIcon: require("../../icons/secretscans-optimized.png"),
            languages: "en",
            domains: ["secretscans.co"],
            home: "https://secretscans.co/",
            canListFullMangas: true,
            chapter_url: /^\/comics\/.*\/.+$/g,
            abstract: "GenkanAbs",
            abstract_options: {
                base_url: "https://secretscans.co/"
            }
        }),

        new DisabledMirror({
            mirrorName: "Easy Going",
            canListFullMangas: true,
            mirrorIcon: require("../../icons/easygoing-optimized.png"),
            languages: "en",
            domains: ["*.egscans.org", "*.egscans.com"],
            disabled: true,
            home: "https://egscans.com/",
            chapter_url: /.*/
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Edelgarde Scans",
            mirrorIcon: require("../../icons/edelgardescans-optimized.png"),
            languages: "en",
            domains: ["edelgardescans.com"],
            home: "https://edelgardescans.com/home",
            canListFullMangas: true,
            chapter_url: /^\/comics\/.*\/.+$/g,
            abstract: "GenkanAbs",
            abstract_options: {
                base_url: "https://edelgardescans.com/"
            }
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Glitchy Comics",
            canListFullMangas: true,
            mirrorIcon: require("../../icons/glitchycomics-optimized.png"),
            languages: "en",
            domains: ["glitchycomics.com"],
            home: "https://glitchycomics.com/",
            chapter_url: /\/chapter-.*?\/.*$/g
        }),
        new DisabledMirror({
            disabled: true,
            mirrorName: "Hatigarm Scans",
            mirrorIcon: require("../../icons/hatigarmscans-optimized.png"),
            languages: "en",
            domains: ["hatigarmscanz.net", "hatigarmscans.net"],
            home: "https://hatigarmscanz.net/",
            canListFullMangas: true,
            chapter_url: /.*/,

            abstract: "GenkanAbs",
            abstract_options: {
                base_url: "https://hatigarmscanz.net/"
            }
        }),
        new DisabledMirror({
            mirrorName: "Komikgue",
            mirrorIcon: require("../../icons/id-optimized.png"),
            languages: "id",
            domains: ["komikgue.com", "komikgue.com"],
            home: "http://www.komikgue.com",
            chapter_url: /^\/manga\/.*\/.+$/g,
            disabled: true,

            abstract: "MyMangaReaderCMS",
            abstract_options: {
                base_url: "http://www.komikgue.com",
                chapters_element: "td.chapter > a",
                img_src: "src"
            }
        }),
        new DisabledMirror({
            mirrorName: "KKJ Scans",
            mirrorIcon: require("../../icons/kkjscans-optimized.png"),
            languages: "en",
            domains: ["kkjscans.co"],
            home: "https://kkjscans.co/",
            disabled: true,
            canListFullMangas: true,
            chapter_url: /^\/comics\/.*\/.+$/g,
            abstract: "GenkanAbs",
            abstract_options: {
                base_url: "https://kkjscans.co/"
            }
        }),
        new DisabledMirror({
            mirrorName: "Love Heaven",
            canListFullMangas: true,
            mirrorIcon: require("../../icons/loveheaven-optimized.png"),
            languages: "en",
            domains: ["loveheaven.net"],
            home: "https://loveheaven.net/",
            chapter_url: /\/read-.*chapter-/g,
            disabled: true
        }),
        new DisabledMirror({
            mirrorName: "MangaHost",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/mangahost-optimized.png"),
            languages: "br,pt",
            domains: ["mangahosted.com", "mangahost-br.cc", "mangahost1.com", "mangahost2.com"],
            home: "https://mangahost2.com/",
            chapter_url: /\/manga\/.*\/.+/g,
            disabled: true
        }),
        new DisabledMirror({
            mirrorName: "ItaScan",
            mirrorIcon: require("../../icons/itascan-optimized.png"),
            languages: "it",
            disabled: true,
            domains: ["itascan.info"],
            home: "https://itascan.info/",
            chapter_url: /.*/
        }),
        new DisabledMirror({
            mirrorName: "Asura Scans TR",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/asurascans-optimized.png"),
            domains: ["tr.asurascans.com"],
            home: "https://tr.asurascans.com/",
            chapter_url: /\/.*?bolum-[0-9]+\//g,
            languages: "tr"
        }),
        new DisabledMirror({
            mirrorName: "White Cloud Pavilion",
            mirrorIcon: require("../../icons/whitecloudpavilion-optimized.png"),
            languages: "en",
            domains: ["whitecloudpavilion.com"],
            home: "https://whitecloudpavilion.com/",
            chapter_url: /^\/manga\/(?:patreon|free)\/manga\/.+?\/.*$/g,

            abstract: "MyMangaReaderCMS",
            abstract_options: {
                base_url: "https://whitecloudpavilion.com/manga/patreon"
            }
        }),
        new DisabledMirror({
            mirrorName: "Mangazuki",
            mirrorIcon: require("../../icons/mangazuki-optimized.png"),
            languages: "en",
            domains: ["mangazuki.co"],
            home: "https://mangazuki.co/",
            chapter_url: /^\/fs\/read\/.+$/g,
            canListFullMangas: true,

            abstract: "MyMangaReaderCMS",
            abstract_options: {
                base_url: "https://mangazuki.co"
            }
        }),
        new DisabledMirror({
            mirrorName: "Fallen Angels",
            mirrorIcon: require("../../icons/fallenangels-optimized.png"),
            languages: "en",
            domains: ["manga.fascans.com"],
            home: "https://manga.fascans.com/",
            chapter_url: /^\/manga\/.*\/.+$/g,

            abstract: "MyMangaReaderCMS",
            abstract_options: {
                base_url: "https://manga.fascans.com"
            }
        }),
        new DisabledMirror({
            mirrorName: "Leviatan Scans Spanish",
            mirrorIcon: LeviatanScansIcon,
            languages: "es",
            domains: ["leviatanscans.com", "es.leviatanscans.com"],
            home: "https://es.leviatanscans.com/",
            canListFullMangas: true,
            chapter_url: /\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
            disabled: true,

            abstract: "Madara",
            abstract_options: {
                search_url: "https://es.leviatanscans.com/",
                chapter_list_ajax: true,
                path_length: 2,
                sort_chapters: true,
                isekai_chapter_url: true,
                title_selector: "#manga-title > h1",
                urlProcessor: url => {
                    const t = url.split("/")
                    if (t[3] != "manga") t.splice(3, 1)
                    return t.join("/")
                }
            }
        }),
        new Manwha18net(),
        new DisabledMirror({
            mirrorName: "Hunlight Scans",
            mirrorIcon: require("../../icons/hunlightscans-optimized.png"),
            languages: "en",
            domains: ["hunlight-scans.info"],
            home: "https://hunlight-scans.info/home",
            canListFullMangas: true,
            chapter_url: /^\/comics\/.*\/.+$/g,
            abstract: "GenkanAbs",
            abstract_options: {
                base_url: "https://hunlight-scans.info/"
            }
        }),
        new DisabledMirror({
            mirrorName: "The No Names",
            mirrorIcon: require("../../icons/thenonames-optimized.png"),
            languages: "en",
            domains: ["the-nonames.com"],
            home: "https://the-nonames.com/",
            canListFullMangas: true,
            chapter_url: /^\/comics\/.*\/.+$/g,
            abstract: "GenkanAbs",
            abstract_options: {
                base_url: "https://the-nonames.com/"
            }
        }),
        new DisabledMirror({
            mirrorName: "Senses Scans",
            mirrorIcon: require("../../icons/sensesscans-optimized.png"),
            languages: "en",
            domains: ["sensescans.com"],
            home: "http://sensescans.com/",
            chapter_url: /^\/reader\/read\/.+$/g,

            abstract: "FoolSlide",
            abstract_options: {
                base_url: "http://sensescans.com/reader",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            mirrorName: "Asura Scans TR",
            mirrorIcon: require("../../icons/asurascans-optimized.png"),
            languages: "tr",
            domains: ["tr.asurascans.com"],
            home: "http://tr.asurascans.com/",
            chapter_url: /\/.*?bolum-[0-9]+\//g
        }),
        new DisabledMirror({
            mirrorName: "GuFengMH8",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/gufengmh8-optimized.png"),
            languages: "cn",
            domains: ["www.gufengmh8.com"],
            home: "https://www.gufengmh8.com/",
            chapter_url: /^\/manhua\/.*\/(\d+).html$/g
        }),
        new DisabledMirror({
            mirrorName: "Manga Fast",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/mangafast-optimized.png"),
            languages: "en",
            domains: ["mangafast.net"],
            home: "https://mangafast.net",
            chapter_url: /\/.*?chapter-[0-9]+.*\//g
        }),
        new DisabledMirror({
            mirrorName: "MerakiScans",
            canListFullMangas: true,
            mirrorIcon: require("../../icons/merakiscans-optimized.png"),
            languages: "en",
            domains: ["merakiscans.com", "www.merakiscans.com"],
            home: "https://www.merakiscans.com/",
            chapter_url: /^\/(manga|manhua)\/.*\/.+$/g
        }),
        new DisabledMirror({
            mirrorName: "SubManga",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/submanga-optimized.png"),
            languages: "es",
            domains: ["submanga.online", "submanga.com", "submanga.io"],
            home: "https://submanga.online/",
            chapter_url: /^\/manga\/.*\/.+$/g
        }),
        new DisabledMirror({
            mirrorName: "Manga Llama",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/mangallama-optimized.png"),
            languages: "en",
            domains: ["mangallama.com"],
            home: "https://mangallama.com",
            chapter_url: /\/reader\/.*\/.*/g
        }),
        new DisabledMirror({
            mirrorName: "Realm Scans",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/realm-scans-optimized.png"),
            domains: ["realmscans.xyz", "realmscans.to"],
            home: "https://realmscans.to/",
            chapter_url: /chapter-[0-9]/g,
            languages: "en",
            abstract_options: {
                // search_url: "https://realmscans.xyz/",
                // series_list_selector: '.listupd a[href*="/series/"]',
                chapter_list_selector: `.eph-num a[href*="realmscans.to"]`
            }
        }),
        new DisabledMirror({
            mirrorName: "Silent Sky Scans",
            mirrorIcon: require("../../icons/silentskyscans-optimized.png"),
            languages: "en",
            domains: ["reader.silentsky-scans.net"],
            home: "https://reader.silentsky-scans.net/",
            chapter_url: /^\/read\/.+$/g,
            abstract_options: {
                base_url: "https://reader.silentsky-scans.net",
                mglist_selector: ".title > a[href*='/series/']"
            }
        }),
        new DisabledMirror({
            // Madara
            mirrorName: "Toonily.Net",
            mirrorIcon: require("../../icons/toonilynet-optimized.png"),
            languages: "en",
            domains: ["toonily.net"],
            home: "https://toonily.net/",
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
        }),
        new DisabledMirror({
            // Madara
            mirrorName: "Leveler Scans",
            mirrorIcon: require("../../icons/leveler-scans-optimized.png"),
            languages: "en",
            domains: ["levelerscans.xyz"],
            home: "https://levelerscans.xyz/",
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
            canListFullMangas: false,
            abstract_options: {
                search_url: "https://levelerscans.xyz/",
                chapter_list_ajax: true,
                img_src: "data-src"
            }
        }),
        new DisabledMirror({
            // Madara
            mirrorName: "Manga 1st",
            mirrorIcon: require("../../icons/manga1st-optimized.png"),
            languages: "en",
            domains: ["manga1st.com"],
            home: "https://manga1st.com/",
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
            canListFullMangas: false,
            abstract_options: {
                search_url: "https://manga1st.com/",
                chapter_list_ajax: true
            }
        }),
        new DisabledMirror({
            // Madara
            mirrorName: "Manga Dods",
            mirrorIcon: require("../../icons/mangadods-optimized.png"),
            languages: "en",
            domains: ["mangadods.com"],
            home: "https://www.mangadods.com/",
            chapter_url: /\/manga\/.*\/(ch-)?\d/g,
            canListFullMangas: false,
            abstract_options: {
                search_url: "https://www.mangadods.com/",
                img_src: "src",
                chapter_list_ajax: false,
                secondary_img_src: "data-src",
                chapters_a_sel: "li.wp-manga-chapter a"
            }
        }),
        new DisabledMirror({
            // Madara
            mirrorName: "Manga Lab",
            mirrorIcon: require("../../icons/manga-lab-optimized.png"),
            languages: "en",
            domains: ["themangalab.com"],
            home: "https://themangalab.com/",
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|read)\/.*\/.+$/g,
            canListFullMangas: false,
            abstract_options: {
                search_url: "https://themangalab.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }
        }),
        new DisabledMirror({
            // Madara
            mirrorName: "Read Manhua",
            mirrorIcon: require("../../icons/readmanhua-optimized.png"),
            languages: "en",
            domains: ["readmanhua.net"],
            home: "https://readmanhua.net/",
            chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
            canListFullMangas: true,
            abstract_options: {
                search_url: "https://readmanhua.net/",
                chapter_list_ajax: true
            }
        }),
        new DisabledMirror({
            // MangaStream
            mirrorName: "Alpha Scans",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/alpha-scans-optimized.png"),
            domains: ["alpha-scans.org"],
            home: "https://alpha-scans.org",
            chapter_url: /\/.*?chapter-[0-9]+.*\//g,
            languages: "en",
            abstract_options: {
                search_url: "https://alpha-scans.org",
                chapters_a_sel: "div.bixbox.bxcl ul li a",
                chapters_text_sel: "span.chapternum"
            }
        }),
        new DisabledMirror({
            // Manga Stream
            mirrorName: "Cosmic Scans",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/cosmic-scans-optimized.png"),
            domains: ["cosmicscans.com", "cosmic-scans.com"],
            home: "https://cosmic-scans.com",
            chapter_url: /\/.*?chapter-[0-9]+.*\//g,
            languages: "en",
            abstract_options: {
                search_url: "https://cosmic-scans.com",
                chapters_a_sel: "div.bixbox.bxcl ul li a",
                chapters_text_sel: "span.chapternum"
            }
        }),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "247 Manga",
                mirrorIcon: require("../../icons/247-manga-optimized.png"),
                languages: "en",
                domains: ["247manga.com"],
                home: "https://247manga.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
            } /*,
            {
                search_url: "https://247manga.com/"
            }*/
        ),
        // From the same team as "Animated Glitched Scans". That's why it shares the same icon (for now probably)
        new DisabledMirror(
            // Manga Stream 1.1.4
            {
                mirrorName: "Animated Glitched Comics",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/anigli-scans-optimized.png"),
                domains: ["agscomics.com"],
                home: "https://agscomics.com",
                chapter_url: /.*/g,
                languages: "en"
            } /*,
            {
                chapter_list_selector: "#chapterlist .eph-num a"
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Astral Library",
                mirrorIcon: require("../../icons/astrallibrary-optimized.png"),
                languages: "en",
                domains: ["astrallibrary.net"],
                home: "https://www.astrallibrary.net/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: true
            } /*,
            {
                search_url: "https://astrallibrary.net/",
                chapter_list_ajax: true
            }*/
        ),
        new DisabledMirror(
            // Manga Stream 1.1.4
            {
                mirrorName: "Azure Manga",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/azuremanga-optimized.png"),
                domains: ["azuremanga.com"],
                home: "https://azuremanga.com/",
                chapter_url: /.\d+.+\//g,
                languages: "en"
            } /*,
            {
                base_url: "https://azuremanga.com/"
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "ChibiManga",
                mirrorIcon: require("../../icons/chibimanga-optimized.png"),
                languages: "en",
                domains: ["cmreader.info"],
                home: "https://www.cmreader.info/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
            } /*,
            {
                search_url: "https://www.cmreader.info/",
                search_json: false,
                chapter_list_ajax: true
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Comic Dom",
                mirrorIcon: require("../../icons/comic-dom-optimized.png"),
                languages: "en",
                domains: ["comicdom.org"],
                home: "https://comicdom.org/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://zinmanga.com/"
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Creepy Scans",
                mirrorIcon: require("../../icons/creepy-scans-optimized.png"),
                languages: "en",
                domains: ["creepyscans.com"],
                home: "https://creepyscans.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://creepyscans.com/"
            }*/
        ),
        new DisabledMirror(
            // Manga Stream 1.1.4
            {
                mirrorName: "Astra Scans",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/astra-scans-optimized.png"),
                domains: ["astrascans.com"],
                home: "https://astrascans.com/",
                chapter_url: /\-chapter\-\d.+\//g,
                languages: "en"
            } /*,
            {
                base_url: "https://astrascans.com/",
                urlProcessorChapter: url => {
                    const parts = url.split("/")
                    if (parts[3] == "10000") parts.splice(3, 1)
                    return parts.join("/")
                }
            }*/
        ),
        new DisabledMirror(
            // Fun Manga
            {
                mirrorName: "FunManga",
                canListFullMangas: true,
                mirrorIcon: require("../../icons/funmanga-optimized.png"),
                languages: "en",
                domains: ["funmanga.com"],
                home: "http://www.funmanga.com",
                chapter_url: /^\/.*\/[0-9]+\.?[0-9]*\/.+$/g
            } /*,
            {
                search_url: "http://www.funmanga.com/service/advanced_search",
                search_data_field: "manga-name",
                search_a_sel: ".manga-title a",
                search_default_data: {
                    type: "all",
                    status: "both",
                    "author-name": "",
                    "artist-name": ""
                },
                sendDataAsText: true,
                chapters_a_sel: "ul.chapter-list li > a",
                page_container_sel: "body > .amr-container"
            }*/
        ),
        new DisabledMirror(
            // Manga Stream
            {
                mirrorName: "Komicast",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/komicast-optimized.png"),
                domains: ["komikcast.com", "komikcast.me", "komikcast.site"],
                home: "https://komikcast.site/",
                chapter_url: /^\/chapter\/.+$/g,
                languages: "id"
            } /*,
            {
                search_url: "https://komikcast.site/",
                search_json: false,
                search_a_sel: "div.list-update_item > a",
                chapters_a_sel: "div.komik_info-chapters a.chapter-link-item",
                page_container_sel: ".main-reading-area",
                img_sel: ".main-reading-area img"
            }*/
        ),
        new DisabledMirror(
            // Manga Stream
            {
                mirrorName: "Komikav",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/komikav-optimized.png"),
                domains: ["komikav.com"],
                home: "https://komikav.com/",
                chapter_url: /^\/m[0-9]+\/$/g,
                languages: "id"
            } /*,
            {
                search_url: "https://komikav.com/",
                chapters_a_sel: "div.bixbox.bxcl > ul > li > span.lchx a"
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Lily Manga",
                mirrorIcon: require("../../icons/lilymanga-optimized.png"),
                languages: "en",
                domains: ["lilymanga.com"],
                home: "https://lilymanga.com/",
                chapter_url: /^\/ys\/.*\/.+$/g,
                canListFullMangas: true
            } /*,
            {
                search_url: "https://lilymanga.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }*/
        ),
        new DisabledMirror(
            // Manga Stream 1.1.4
            {
                mirrorName: "Luminous Scans",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/luminousscans-optimized.png"),
                domains: [
                    "luminousscans.gg",
                    "luminousscans.net",
                    "lumitoon.com",
                    "luminouscomics.org",
                    "luminous-scans.com"
                ],
                home: "https://luminous-scans.com/",
                chapter_url: /chapter-[0-9]+.*\/$/g,
                languages: "en"
            } /*,
            {
                chapter_list_selector: "#chapterlist .eph-num a",
                urlProcessorSeries: url => {
                    const parts = url.split("/")
                    const parts2 = parts[5].split("-")

                    if (!isNaN(parts2[0]) && !isNaN(parseFloat(parts2[0]))) parts2.shift()

                    parts[5] = parts2.join("-")
                    return parts.join("/")
                }
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Manga Bob",
                mirrorIcon: require("../../icons/mangabob-optimized.png"),
                languages: "en",
                domains: ["mangabob.com"],
                home: "https://mangabob.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: true
            } /*,
            {
                search_url: "https://mangabob.com/",
                chapter_list_ajax: true
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Manga Cultivator",
                mirrorIcon: require("../../icons/manga-cultivator-optimized.png"),
                languages: "en",
                domains: ["mangacultivator.com", "mangacult.org"],
                home: "https://mangacult.org/home-hi/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: true
            } /*,
            {
                search_url: "https://mangacult.org/",
                // chapter_list_ajax: true,
                // isekai_chapter_url: true,
                image_protection_plugin: true
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Manga Great",
                mirrorIcon: require("../../icons/mangagreat-optimized.png"),
                languages: "en",
                domains: ["mangagreat.com"],
                home: "https://mangagreat.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://mangagreat.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Manga Sy",
                mirrorIcon: require("../../icons/mangasy-optimized.png"),
                languages: "en",
                domains: ["mangasy.com"],
                home: "https://www.mangasy.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://www.mangasy.com/",
                chapter_list_ajax: true
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Manga TX",
                mirrorIcon: require("../../icons/mangatx-optimized.png"),
                languages: "en",
                domains: ["mangatx.com"],
                home: "https://mangatx.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://mangatx.com/",
                img_src: "data-src",
                chapter_list_ajax: true
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "MangazukiMe",
                mirrorIcon: require("../../icons/mangazuki-optimized.png"),
                languages: "en",
                domains: ["mangazuki.me"],
                home: "https://mangazuki.me",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://mangazuki.me/",
                page_container_sel: "div.read-container",
                img_sel: "div.read-container img"
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Manhuas",
                mirrorIcon: require("../../icons/manhuas-optimized.png"),
                languages: "en",
                domains: ["manhuas.net"],
                home: "https://manhuas.net/",
                chapter_url: /\/manhua\/.*\-chapter\-.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://manhuas.net/",
                img_src: "data-src",
                // chapter_list_ajax: true,
                secondary_img_src: "src"
            }*/
        ),
        new DisabledMirror(
            // ReadManga
            {
                mirrorName: "MintManga",
                mirrorIcon: require("../../icons/mintmanga-optimized.png"),
                languages: "ru",
                domains: ["mintmanga.live", "*.mintmanga.one"],
                home: "https://2.mintmanga.one",
                canListFullMangas: false,
                chapter_url: /^\/.*\/vol.*\/[0-9]+.*$/g
            }
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Mixed Manga",
                mirrorIcon: require("../../icons/mixed-manga-optimized.png"),
                languages: "en",
                domains: ["mixedmanga.com"],
                home: "https://mixedmanga.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://mixedmanga.com/",
                img_src: "data-lazy-src"
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "MM Scans",
                mirrorIcon: require("../../icons/mmscans-optimized.png"),
                languages: "en",
                domains: ["mm-scans.com", "mm-scans.org"],
                home: "https://mm-scans.org/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://mm-scans.org/",
                chapter_list_ajax: true,
                isekai_chapter_url: true,
                chapters_a_sel: "li.chapter-li > a"
            }*/
        ),
        new DisabledMirror(
            // Manga Stream 1.1.4
            {
                mirrorName: "Nocturnal Scans",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/nocturnal-scans-optimized.png"),
                domains: ["nocturnalscans.com"],
                home: "https://nocturnalscans.com",
                chapter_url: /\/.*?-[0-9]+.*\//g,
                languages: "en"
            } /*,
            {
                // search_url: "https://nocturnalscans.com",
                chapter_list_selector: "#chapterlist .eph-num a"
            }*/
        ),
        new DisabledMirror(
            // Manga Stream 1.1.4
            {
                mirrorName: "Radiant Scans",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/radiant-scans-optimized.png"),
                domains: ["radiantscans.com"],
                home: "https://radiantscans.com/",
                chapter_url: /chapter-[0-9]+.*\/$/g,
                languages: "en"
            } /*,
            {
                chapter_list_selector: "#chapterlist .eph-num a",
                urlProcessorSeries: url => {
                    const parts = url.split("/")
                    const parts2 = parts[5].split("-")

                    if (!isNaN(parts2[0]) && !isNaN(parseFloat(parts2[0]))) parts2.shift()

                    parts[5] = parts2.join("-")
                    return parts.join("/")
                }
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Random Translations",
                mirrorIcon: require("../../icons/randomtranslations-optimized.png"),
                languages: "en",
                domains: ["randomtranslations.com"],
                home: "https://randomtranslations.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://randomtranslations.com/",
                img_src: "data-src",
                chapter_list_ajax: true
            }*/
        ),
        new DisabledMirror(
            // FunManga
            {
                mirrorName: "ReadMangaToday",
                canListFullMangas: true,
                mirrorIcon: require("../../icons/readmangatoday-optimized.png"),
                languages: "en",
                domains: ["readmng.com"],
                home: "https://www.readmng.com/",
                chapter_url: /^\/.*\/[0-9]+\.?.+$/g
            } /*,
            {
                search_url: "https://www.readmng.com/search",
                search_data_field: "query",
                search_a_sel: ".content-list .title a",
                chapters_a_sel: "#chapters-tabContent a.chnumber",
                img_sel: ".readercontent"
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Ruya Manga",
                mirrorIcon: require("../../icons/ruya-manga-optimized.png"),
                languages: "en",
                domains: ["en.ruyamanga.com"],
                home: "https://en.ruyamanga.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://en.ruyamanga.com/"
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Sawamics",
                mirrorIcon: require("../../icons/sawamics-optimized.png"),
                languages: "en",
                domains: ["sawamics.com"],
                home: "https://sawamics.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://sawamics.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }*/
        ),
        new DisabledMirror(
            // MyMangaReaderCMS
            {
                mirrorName: "ScanFR",
                mirrorIcon: require("../../icons/scanfr-optimized.png"),
                languages: "fr",
                domains: ["scan-fr.cc", "scan-fr.org"],
                home: "https://www.scan-fr.cc",
                chapter_url: /^\/manga\/.*\/.+$/g
            } /*,
            {
                base_url: "https://www.scan-fr.org",
                chapters_element: "ul.chapterszozo a[href*='/manga/']"
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "SK Scans",
                mirrorIcon: require("../../icons/skscans-optimized.png"),
                languages: "en",
                domains: ["skscans.com"],
                home: "https://skscans.com/home",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
            } /*,
            {
                search_url: "https://skscans.com/",
                chapter_list_ajax: true
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Twilight Scans",
                mirrorIcon: require("../../icons/twilightscans-optimized.png"),
                languages: "en",
                domains: ["twilightscans.com"],
                home: "https://twilightscans.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://twilightscans.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true,
                secondary_img_src: "data-src"
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Ult Manga",
                mirrorIcon: require("../../icons/ultmanga-optimized.png"),
                languages: "en",
                domains: ["ultmanga.com"],
                home: "https://ultmanga.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://ultmanga.com/",
                img_src: "data-src"
                // chapter_list_ajax: true,
            }*/
        ),
        new DisabledMirror(
            // Madara
            {
                mirrorName: "Unemployed Scans",
                mirrorIcon: require("../../icons/unemployed-scans-optimized.png"),
                languages: "en",
                domains: ["unemployedscans.com"],
                home: "https://unemployedscans.com/",
                canListFullMangas: false,
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
            } /*,
            {
                search_url: "https://unemployedscans.com/",
                chapter_list_ajax: true
            }*/
        ),
        new UnionLeitor(),
        new DisabledMirror({ //MangaStream_1_1_4(
            mirrorName: "Animated Glitched Scans",
            canListFullMangas: false,
            mirrorIcon: require("../../icons/anigli-scans-optimized.png"),
            domains: ["anigliscans.com", "anigliscans.xyz"],
            home: "https://anigliscans.xyz",
            chapter_url: /.*/g,
            languages: "en"
        }),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Aqua Manga",
                mirrorIcon: require("../../icons/aqua-manga-optimized.png"),
                languages: "en",
                domains: ["aquamanga.com", "aquascans.com"],
                home: "https://aquascans.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|read)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://aquascans.com/"
            }*/
        ),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Comic Kiba",
                mirrorIcon: require("../../icons/comickiba-optimized.png"),
                languages: "en",
                domains: ["comickiba.com"],
                home: "https://www.comickiba.com/",
                canListFullMangas: true,
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
            } /*,
            {
                search_url: "https://www.comickiba.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }*/
        ),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Dark Scan",
                mirrorIcon: require("../../icons/dark-scan-optimized.png"),
                languages: "es",
                domains: ["dark-scan.com"],
                home: "https://dark-scan.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://dark-scan.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }*/
        ),
        new DisabledMirror( //Madara(
            {
                mirrorName: "GD Scans",
                mirrorIcon: require("../../icons/gd-scans-optimized.png"),
                languages: "en",
                domains: ["gdstmp.site", "gdscans.com"],
                home: "https://www.gdscans.com/",
                canListFullMangas: false,
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
            } /*,
            {
                search_url: "https://www.gdscans.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }*/
        ),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Immortal Updates",
                mirrorIcon: require("../../icons/immortalupdates-optimized.png"),
                languages: "en",
                domains: ["immortalupdates.com", "mortalsgroove.com"],
                home: "https://mortalsgroove.com/",
                canListFullMangas: false,
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
            } /*,
            {
                search_url: "https://mortalsgroove.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }*/
        ),
        new DisabledMirror( //Madara(
            {
                mirrorName: "IsekaiScans",
                mirrorIcon: require("../../icons/isekaiscans-optimized.png"),
                languages: "en",
                domains: ["isekaiscan.com"],
                home: "https://isekaiscan.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://isekaiscan.com/",
                img_src: "data-src",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }*/
        ),
        new DisabledMirror( //MangaStream(
            {
                mirrorName: "Komikstation",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/komikstation-optimized.png"),
                domains: ["komikstation.com"],
                home: "https://www.komikstation.com/",
                chapter_url: /chapter-[0-9]+\/$/g,
                languages: "id"
            } /*,
            {
                search_url: "https://www.komikstation.com/",
                chapters_a_sel: "div.bixbox.bxcl > ul > li > span.lchx a",
                search_a_sel: " div.allgreen.genrelst > ul > li> div > div.left > a",
                search_option: "&post_type=manga",
                manga_title_attr: true,
                manga_url_sel: "div.chapterbody > div > article > div.headpost a"
            }*/
        ),
        new DisabledMirror( //MangaStream(
            {
                mirrorName: "Komiku",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/komiku-optimized.png"),
                domains: ["komiku.co"],
                home: "https://komiku.co/",
                chapter_url: /^\/m[0-9]+\/$/g,
                languages: "id"
            } /*,
            {
                search_url: "https://komiku.co/",
                search_a_sel: "h4.newsjudul > a",
                search_option: "&post_type=manga",
                manga_title_attr: false,
                page_container_sel: "#readerareaimg",
                manga_url_sel: "#hot > p > a",
                chapters_a_sel: "td.judulseries > a",
                manga_name_replace: "Manga",
                img_sel: "#readerareaimg img",
                search_json: false
            }*/
        ),
        new DisabledMirror( //MyMangaReaderCMS(
            {
                mirrorName: "Komikid",
                mirrorIcon: require("../../icons/id-optimized.png"),
                languages: "id",
                domains: ["komikid.com"],
                home: "http://www.komikid.com",
                chapter_url: /^\/manga\/.*\/.+$/g
            } /*,
            {
                base_url: "http://www.komikid.com",
                chapters_element: "ul.chapters > li > h5 > a"
            }*/
        ),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Leviatan Scans",
                mirrorIcon: LeviatanScansIcon,
                languages: "en",
                domains: ["leviatanscans.com", "en.leviatanscans.com", "lscomic.com"],
                home: "https://lscomic.com/",
                chapter_url: /\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: true
            } /*,
            {
                search_url: "https://lscomic.com/",
                chapter_list_ajax: true,
                // path_length: 2,
                sort_chapters: true,
                isekai_chapter_url: true,
                title_selector: "div.post-title > h1",
                image_protection_plugin: true
                // urlProcessor: url => {
                //     let t = url.split("/")
                //     if (t[3] != "manga") t.splice(3, 1)
                //     return t.join("/")
                // }
            }*/
        ),
        new DisabledMirror({ //MangaStream_1_1_4(
            mirrorName: "Lynx Scans",
            mirrorIcon: require("../../icons/lynxscans-optimized.png"),
            languages: "en",
            domains: ["lynxscans.com"],
            home: "https://lynxscans.com/home",
            canListFullMangas: true,
            chapter_url: /^\/*\/.+$/g
        }),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Manga 347",
                mirrorIcon: require("../../icons/manga-347-optimized.png"),
                languages: "en",
                domains: ["manga347.com"],
                home: "https://manga347.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://manga347.com/",
                chapter_list_ajax: true
            }*/
        ),
        new MangaAlArab(),
        new MangaBTT(),
        new MangaDemon(),
        new DisabledMirror( //MangaStream_1_1_4(
            {
                mirrorName: "Manga Galaxy",
                mirrorIcon: require("../../icons/manga-galaxy-optimized.png"),
                languages: "en",
                domains: ["mangagalaxy.me", "mangagalaxy.org"],
                home: "https://mangagalaxy.org",
                // canListFullMangas: true,
                chapter_url: /chapter\-\d+/g
            } /*,
            {
                base_url: "https://mangagalaxy.org/",
                chapter_list_selector: "#chapterlist .eph-num a"
            }*/
        ),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Manga Komi",
                mirrorIcon: require("../../icons/mangakomi-optimized.png"),
                languages: "en",
                domains: ["mangakomi.io", "mangakomi.com"],
                home: "https://mangakomi.io/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
            } /*,
            {
                search_url: "https://mangakomi.io/",
                img_src: "src",
                secondary_img_src: "data-src"
                // chapter_list_ajax: true
            }*/
        ),
        new Manga4Life(),
        new DisabledMirror( //FunManga(
            {
                mirrorName: "MangaInn",
                canListFullMangas: true,
                mirrorIcon: require("../../icons/mangainn-optimized.png"),
                languages: "en",
                domains: ["mangainn.net"],
                home: "http://www.mangainn.net",
                chapter_url: /^\/.*\/[0-9]+\.?[0-9]*\/.+$/g
            } /*,
            {
                search_url: "http://www.mangainn.net/service/advanced_search",
                search_data_field: "manga-name",
                search_a_sel: ".manga-title a",
                search_default_data: {
                    type: "all",
                    status: "both",
                    "author-name": "",
                    "artist-name": ""
                },
                sendDataAsText: true,
                chapters_a_sel: "ul.chapter-list li > a",
                page_container_sel: "body > .amr-container"
            }*/
        ),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Mangalek",
                mirrorIcon: require("../../icons/manga-lek-optimized.png"),
                languages: "ar",
                domains: ["mangalek.com"],
                home: "https://mangalek.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://mangalek.com/"
            }*/
        ),
        new MangaSee(),
        new ManhwaFreak(),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Night Comic",
                mirrorIcon: require("../../icons/nightcomic-optimized.png"),
                languages: "en",
                domains: ["nightcomic.com"],
                home: "https://www.nightcomic.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://www.nightcomic.com/",
                img_src: "data-src",
                chapter_list_ajax: true
            }*/
        ),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Platinum Crown",
                mirrorIcon: require("../../icons/platinum-crown-optimized.png"),
                languages: "en",
                domains: ["platinumscans.com"],
                home: "https://platinumscans.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://platinumscans.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }*/
        ),
        new ReadM(),
        new ReaperScans(),
        new DisabledMirror( //MangaStream(
            {
                mirrorName: "Reaper Scans (Fake)",
                canListFullMangas: false,
                mirrorIcon: require("../../icons/reaperscans-optimized.png"),
                domains: ["reaper-scans.com"],
                home: "https://reaper-scans.com",
                chapter_url: /\/.*?chapter-[0-9]+.*\//g,
                languages: "en"
            } /*,
            {
                search_url: "reaper-scans.com",
                chapters_a_sel: "div.bixbox.bxcl ul li a",
                chapters_text_sel: "span.chapternum",
                search_json: false
            }*/
        ),
        new SeriManga(),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Shadow Trad",
                mirrorIcon: require("../../icons/shadow-trad-optimized.png"),
                languages: "fr",
                domains: ["shadowtrad.net"],
                home: "https://shadowtrad.net/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://shadowtrad.net/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }*/
        ),
        new DisabledMirror( //MangaStream_1_1_4(
            {
                mirrorName: "Surya Toon",
                mirrorIcon: require("../../icons/surya-toon-optimized.png"),
                languages: "en",
                domains: ["suryatoon.com"],
                home: "https://suryatoon.com",
                // canListFullMangas: true,
                chapter_url: /^\/*\/.+$/g
            } /*,
            {
                base_url: "https://suryatoon.com/",
                chapter_list_selector: "#chapterlist .eph-num a"
            }*/
        ),
        new ZaHardTop(),
        new DisabledMirror( //Madara(
            {
                mirrorName: "Zin Manga",
                mirrorIcon: require("../../icons/zin-manga-optimized.png"),
                languages: "en",
                domains: ["zinmanga.com"],
                home: "https://zinmanga.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            } /*,
            {
                search_url: "https://zinmanga.com/"
            }*/
        )
    ]
}
