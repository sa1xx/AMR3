import { MirrorHelper } from "../../MirrorHelper"
import { MirrorImplementation } from "../../../types/common"
import { Madara } from "./Madara"
import HiperdexIcon from "../../icons/hiperdex-optimized.png"
import KunMangaIcon from "../../icons/kun-manga-optimized.png"
import LHTranslationsIcon from "../../icons/lhtranslations-optimized.png"
import Manga1stOnlineIcon from "../../icons/manga1st-online-optimized.png"
import MangaSushiIcon from "../../icons/mangasushi-optimized.png"
import ManhuaFastIcon from "../../icons/manhuafast-optimized.png"
import ManhuaPlusIcon from "../../icons/manhuaplus-optimized.png"
import ManhwaTopIcon from "../../icons/manhwa-top-optimized.png"
import ManhwaClubIcon from "../../icons/manhwaclub-optimized.png"
import ManhwaHentaiIcon from "../../icons/manhwahentai-optimized.png"
import ManytoonIcon from "../../icons/manytoon-optimized.png"
import ResetScansIcon from "../../icons/reset-scans-optimized.png"
import S2MangaIcon from "../../icons/s2-manga-optimized.png"
import SetsuScansIcon from "../../icons/setsuscans-optimized.png"
import ToonilyIcon from "../../icons/toonily-optimized.png"
import TopManhuaIcon from "../../icons/topmanhua-optimized.png"
import TritiniaScansIcon from "../../icons/tritiniascans-optimized.png"
import WebtoonXyzIcon from "../../icons/webtoon-xyz-optimized.png"
import MangaClashIcon from "../../icons/manga-clash-optimized.png"
import MangaReadIcon from "../../icons/manga-read-optimized.png"
import ManhuausIcon from "../../icons/manhuaus-optimized.png"
import GourmetScansIcon from "../../icons/gourmet-scans-optimized.png"
import { ManyToon } from "./ManyToon"
import { ManhwaHentai } from "./ManhwaHentai"

/**
 * All implementations based of Madara are placed here
 * avoids the need to create new file for each implementation
 *
 * @NOTE: home or search_url option must end in "/"
 */
export const getMadaraImplementations = (mirrorHelper: MirrorHelper): MirrorImplementation[] => {
    return [
        new Madara(mirrorHelper, {
            mirrorName: "Webtoon.xyz",
            mirrorIcon: WebtoonXyzIcon,
            languages: "en",
            domains: ["webtoon.xyz"],
            home: "https://www.webtoon.xyz/",
            chapter_url: /^\/read\/.*\/.+$/g
        }),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Toonily",
                mirrorIcon: ToonilyIcon,
                languages: "en",
                domains: ["toonily.com"],
                home: "https://toonily.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|serie)\/.*\/.+$/g
            },
            {
                img_src: "data-src",
                secondary_img_src: "src"
            }
        ),
        new ManhwaHentai(
            mirrorHelper,
            {
                mirrorName: "ManhwaHentai",
                mirrorIcon: ManhwaHentaiIcon,
                languages: "en",
                domains: ["manhwahentai.me"],
                home: "https://manhwahentai.me/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
            },
            {
                search_url: "https://manhwahentai.me/",
                img_src: "src",
                secondary_img_src: "data-src",
                chapter_list_ajax: true,
                chapter_list_ajax_selctor_type: "html",
                chapter_list_ajax_selctor: "#manga-chapters-holder",
                isekai_chapter_url: false
            }
        ),
        /*new Madara(
            mirrorHelper,
            {
                mirrorName: "Dragon Tea",
                mirrorIcon: DragonTeaIcon,
                languages: "en",
                domains: ["dragontea.ink"],
                home: "https://dragontea.ink/",
                canListFullMangas: false,
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|novel)\/.*\/.+$/g
            },
            {
                search_url: "https://www.dragontea.ink/",
                chapter_list_ajax: false,
                isekai_chapter_url: false
            }
        ),*/
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Hiperdex",
                mirrorIcon: HiperdexIcon,
                languages: "en",
                domains: ["hiperdex.com", "hiperdex.top", "hipertoon.com"],
                home: "https://hipertoon.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g
            },
            {
                search_url: "https://hipertoon.com/",
                search_json: true,
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }
        ) /*,
        new Madara(
            mirrorHelper,
            {
                mirrorName: "IsekaiScans",
                mirrorIcon: IsekaiScansIcon,
                languages: "en",
                domains: ["isekaiscan.com"],
                home: "https://isekaiscan.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://isekaiscan.com/",
                img_src: "data-src",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }
        )*/,
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Kun Manga",
                mirrorIcon: KunMangaIcon,
                languages: "en",
                domains: ["kunmanga.com"],
                home: "https://kunmanga.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://kunmanga.com/"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "LHTranslations",
                mirrorIcon: LHTranslationsIcon,
                languages: "en",
                domains: ["lhtranslation.net"],
                home: "https://lhtranslation.net",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: true
            },
            {
                search_url: "https://lhtranslation.net/",
                chapter_list_ajax: true,
                isekai_chapter_url: true,
                chapters_a_sel: `li.wp-manga-chapter > a[href*="lhtranslation.net"]`
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Manga Clash",
                mirrorIcon: MangaClashIcon,
                languages: "en",
                domains: ["mangaclash.com", "toonclash.com"],
                home: "https://toonclash.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|devmax)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://toonclash.com/"
                // chapters_a_sel: "li.wp-manga-chapter .li__text a",
                // chapter_list_ajax: true,
                // isekai_chapter_url: true,
                // image_protection_plugin: true
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Manga Read",
                mirrorIcon: MangaReadIcon,
                languages: "en",
                domains: ["mangaread.org"],
                home: "https://www.mangaread.org/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|read)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://www.mangaread.org/"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Manga Sushi",
                mirrorIcon: MangaSushiIcon,
                languages: "en",
                domains: ["mangasushi.net", "mangasushi.org"],
                home: "https://mangasushi.org/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://mangasushi.org/",
                secondary_img_src: "data-src",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "ManhuaFast",
                mirrorIcon: ManhuaFastIcon,
                languages: "en",
                domains: ["manhuafast.com"],
                home: "https://manhuafast.com/",
                chapter_url: /\/manga\/.+\/chapter-.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://manhuafast.com/",
                img_src: "src",
                chapter_list_ajax: true,
                isekai_chapter_url: true
                // secondary_img_src: "data-full-url"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "ManhuaPlus",
                mirrorIcon: ManhuaPlusIcon,
                languages: "en",
                domains: ["manhuaplus.com"],
                home: "https://manhuaplus.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://manhuaplus.com/",
                search_a_sel: "div.post-title > h3 > a",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "ManhwaClub",
                mirrorIcon: ManhwaClubIcon,
                languages: "en",
                domains: ["manhwa.club"],
                home: "https://manhwa.club/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://manhwa.club/",
                secondary_img_src: "data-src"
            }
        ),
        // There are additional net request rules for manhwatop.com.
        // If you are updating this mirror, don't forget to also update MirrorNetRequestRules.ts file.
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Manhwa Top",
                mirrorIcon: ManhwaTopIcon,
                languages: "en",
                domains: ["manhwatop.com"],
                home: "https://manhwatop.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|read)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://manhwatop.com/",
                // chapter_list_ajax: true,
                img_src: "data-src"
            }
        ),
        new ManyToon(
            mirrorHelper,
            {
                mirrorName: "Manytoon",
                mirrorIcon: ManytoonIcon,
                languages: "en",
                domains: ["manytoon.com"],
                home: "https://manytoon.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://manytoon.com/",
                img_src: "src"
                // chapter_list_ajax: true,
                // isekai_chapter_url: true
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Reset Scans",
                mirrorIcon: ResetScansIcon,
                languages: "en",
                domains: [
                    "reset-scans.com",
                    "reset-scans.us",
                    "reset-scans.xyz",
                    "resetscan.com",
                    "reset-scans.co",
                    "rspro.xyz",
                    "reset-scans.org"
                ],
                home: "https://reset-scans.org/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|devmax)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://reset-scans.org/",
                chapters_a_sel: "li.wp-manga-chapter .li__text a",
                chapter_list_ignore_lock: true
                // chapter_list_ajax: true,
                // isekai_chapter_url: true
                // image_protection_plugin: true
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "S2 Manga",
                mirrorIcon: S2MangaIcon,
                languages: "en",
                domains: ["s2manga.com"],
                home: "https://s2manga.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://s2manga.com/"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Setsu Scans",
                mirrorIcon: SetsuScansIcon,
                languages: "en",
                domains: ["setsuscans.com"],
                home: "https://setsuscans.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://setsuscans.com/",
                chapter_list_ajax: true,
                isekai_chapter_url: true,
                chapter_list_ajax_selctor_type: "html",
                chapter_list_ajax_selctor: "#manga-chapters-holder"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Top Manhua",
                mirrorIcon: TopManhuaIcon,
                languages: "en",
                domains: ["topmanhua.com", "manhuatop.org"],
                home: "https://manhuatop.org/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://manhuatop.org/",
                img_src: "data-src"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Tritinia Scans",
                mirrorIcon: TritiniaScansIcon,
                languages: "en",
                domains: ["tritinia.com", "tritinia.org"],
                home: "https://tritinia.org/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://tritinia.org/",
                chapter_list_ajax: true,
                isekai_chapter_url: true
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Manga 1st Online",
                mirrorIcon: Manga1stOnlineIcon,
                languages: "en",
                domains: ["manga1st.online"],
                home: "https://manga1st.online/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://manga1st.online/"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Gourmet Scans",
                mirrorIcon: GourmetScansIcon,
                languages: "en",
                domains: ["gourmetscans.net", "gourmetsupremacy.com"],
                home: "https://gourmetsupremacy.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|project)\/.*\/.+$/,
                canListFullMangas: false
            },
            {
                search_url: "https://gourmetsupremacy.com/",
                // Adding any query parameters cause page to redirect to manga page, disable it
                add_list_to_chapter_url: false,
                image_protection_plugin: true
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Manhuaus",
                mirrorIcon: ManhuausIcon,
                languages: "en",
                domains: ["manhuaus.com"],
                home: "https://manhuaus.com/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://manhuaus.com/",
                img_src: "src",
                chapter_list_ajax: true,
                isekai_chapter_url: true,
                secondary_img_src: "data-src"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Hari Manga",
                mirrorIcon: require("../../icons/hari-manga-optimized.png"),
                languages: "en",
                domains: ["harimanga.com", "harimanga.me"],
                home: "https://harimanga.me/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                search_url: "https://harimanga.me/"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Fire Scans",
                mirrorIcon: require("../../icons/hari-manga-optimized.png"),
                languages: "en",
                domains: ["firescans.xyz"],
                home: "https://firescans.xyz/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                chapter_list_ajax: true,
                isekai_chapter_url: true,
                chapter_list_ajax_selctor_type: "html",
                chapter_list_ajax_selctor: "#manga-chapters-holder"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "UToon",
                mirrorIcon: require("../../icons/utoon-optimized.png"),
                languages: "en",
                domains: ["utoon.net"],
                home: "https://utoon.net/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
                canListFullMangas: false
            },
            {
                chapter_list_ajax: true,
                isekai_chapter_url: true,
                chapters_a_sel: "li.wp-manga-chapter a:contains('Chapter')",
                chapter_list_ignore_lock: true
                // chapter_list_ajax_selctor_type: "html",
                // chapter_list_ajax_selctor: "#manga-chapters-holder"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Evil Flowers",
                mirrorIcon: require("../../icons/evilflowers-optimized.png"),
                languages: "en",
                domains: ["evilflowers.com"],
                home: "http://evilflowers.com",
                canListFullMangas: false,
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|project)\/.*\/.+$/g
            },
            {
                chapter_list_ajax: true,
                isekai_chapter_url: true
                // mglist_selector: ".title > a[href*='/series/']"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Like Manga",
                mirrorIcon: require("../../icons/like-manga-optimized.png"),
                languages: "en",
                domains: ["likemanga.in"],
                home: "https://likemanga.in",
                canListFullMangas: false,
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|project)\/.*\/.+$/g
            },
            {
                chapter_list_ajax: true,
                isekai_chapter_url: true
                // mglist_selector: ".title > a[href*='/series/']"
            }
        ),
        new Madara(
            mirrorHelper,
            {
                mirrorName: "Manganelo",
                mirrorIcon: require("../../icons/manganelo-optimized.png"),
                languages: "en",
                domains: ["nelomanga.org"],
                home: "https://nelomanga.org/",
                canListFullMangas: false,
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series|project)\/.*\/.+$/g
            },
            {
                chapter_list_ajax: true
                // isekai_chapter_url: true
                // mglist_selector: ".title > a[href*='/series/']"
            }
        )
        // new Madara(
        //     mirrorHelper,
        //     {
        //         mirrorName: "Toon God",
        //         mirrorIcon: require("../../icons/toon-god-optimized.png"),
        //         languages: "en",
        //         domains: ["toongod.org"],
        //         home: "https://www.toongod.org/home/",
        //         chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/.+$/g,
        //         canListFullMangas: false
        //     },
        //     {
        //         // chapter_list_ajax: true,
        //         // isekai_chapter_url: true,
        //         // chapters_a_sel: "li.wp-manga-chapter a:contains('Chapter')"
        //         // chapter_list_ajax_selctor_type: "html",
        //         // chapter_list_ajax_selctor: "#manga-chapters-holder"
        //     }
        // )
    ]
}
