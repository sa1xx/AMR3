import { MirrorHelper } from "../../MirrorHelper"
import { MirrorImplementation } from "../../../types/common"
import { LilianaAbs } from "./Liliana"

export const getLilianaImplementations = (mirrorHelper: MirrorHelper): MirrorImplementation[] => {
    return [
        new LilianaAbs(
            mirrorHelper,
            {
                mirrorName: "ManhuaPlus.org",
                mirrorIcon: require("../../icons/manhuaplus-optimized.png"),
                languages: "en",
                domains: ["manhuaplus.org"],
                home: "https://manhuaplus.org/",
                chapter_url: /^\/(manhwa|comic|manga|webtoon|manhua|series)\/.*\/chapter-.+$/g,
                canListFullMangas: false
            },
            {}
        )
    ]
}
