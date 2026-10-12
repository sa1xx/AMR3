const test = require("node:test")
const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const vm = require("node:vm")
const ts = require("typescript")

const root = path.resolve(__dirname, "../..")
function load(file, imports = {}, sourceOverride) {
    const source = sourceOverride ?? fs.readFileSync(path.join(root, file), "utf8")
    const exports = {}
    const result = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021, esModuleInterop: true },
        reportDiagnostics: true
    })
    assert.equal(result.diagnostics.length, 0)
    vm.runInNewContext(result.outputText, { exports, URL, console, require: name => imports[name] ?? {} })
    return exports
}
const migration = load("src/shared/mirrorMigration.ts")
const Manga = load("src/amr/manga.js").default
const source = Object.freeze(
    new Manga(
        {
            name: "Example",
            mirror: "Old",
            url: "https://old.test/example",
            cats: ["Favorites"],
            lastChapterReadName: "Chapter 12.5: The return",
            lastChapterReadURL: "https://old.test/read-12-5",
            read: 1,
            update: 0,
            displayName: "My title",
            layout: 1,
            zoom: 125,
            webtoon: true,
            scaleUp: 1,
            currentChapter: "https://old.test/read-12-5",
            currentScanUrl: "https://old.test/page-4.jpg",
            language: "fr"
        },
        "Old/example"
    )
)
const chapters = [
    ["Chapter 13", "https://new.test/example/13"],
    ["Ch. 12.5", "https://new.test/example/12-5"]
]
const target = {
    key: "New/example",
    mirror: "New",
    name: "Example new",
    url: "https://new.test/example",
    chapters,
    chapterUrl: chapters[1][1]
}

test("suggests unique decimal chapter and ignores volume number", () => {
    assert.equal(migration.suggestMigrationChapter(source, chapters), chapters[1][1])
    assert.equal(
        migration.suggestMigrationChapter({ lastChapterReadName: "Vol. 3 Chapter 13" }, chapters),
        chapters[0][1]
    )
})
test("requires manual choice for absent or ambiguous chapter numbers", () => {
    assert.equal(migration.suggestMigrationChapter({ lastChapterReadName: "Chapter 14" }, chapters), undefined)
    assert.equal(migration.suggestMigrationChapter(source, [...chapters, ["Chapter 12.5 special", "other"]]), undefined)
    assert.equal(migration.suggestMigrationChapter({ lastChapterReadName: "Special" }, chapters), undefined)
})
test("copies settings and categories, replaces mirror URLs and resets old image position", () => {
    const migrated = migration.buildMigratedManga(source, target, true)
    for (const key of ["displayName", "layout", "zoom", "webtoon", "scaleUp"]) assert.equal(migrated[key], source[key])
    assert.equal(migrated.cats[0], "Favorites")
    assert.notEqual(migrated.cats, source.cats)
    assert.equal(migrated.lastChapterReadURL, chapters[1][1])
    assert.equal(migrated.currentScanUrl, "")
    assert.equal(migrated.language, undefined)
    assert.equal(migrated.read, 0)
    assert.equal(migrated.update, 1)
    assert.equal(source.currentScanUrl, "https://old.test/page-4.jpg")
})
test("preserves deliberate paused status on active source mirrors", () => {
    const migrated = migration.buildMigratedManga(source, target, false)
    assert.equal(migrated.read, 1)
    assert.equal(migrated.update, 0)
})
test("supports explicitly unread series and rejects stale chapters", () => {
    assert.equal(migration.buildMigratedManga(source, { ...target, chapterUrl: "" }, true).lastChapterReadURL, "")
    assert.throws(
        () => migration.buildMigratedManga(source, { ...target, chapterUrl: "missing" }, true),
        /migration_error_chapter/
    )
})

function setup({
    lists = chapters,
    disabled = false,
    failure,
    existing = false,
    keepSource = true,
    language = ""
} = {}) {
    const writes = []
    const module = load("src/store/modules/mangas.js", {
        vue: { delete: (object, key) => delete object[key] },
        "../../amr/manga": { __esModule: true, default: Manga },
        "../../amr/storedb": {
            migrateManga: async payload => {
                if (failure) throw new Error(failure)
                writes.push(payload)
            }
        },
        "../../shared/mirrorMigration": migration,
        "../../shared/utils": {
            matchDomain: (host, domain) => host === domain,
            mangaKey: ({ language }) => target.key + (language ? "_" + language : "")
        },
        "../../mirrors/MirrorLoader": {
            getMirrorLoader: () => ({ getImpl: async () => ({ getListChaps: async () => lists }) })
        },
        "../../mirrors/MirrorHelper": { getMirrorHelper: () => ({}) },
        "../../shared/AppLogger": { getAppLogger: () => ({ error() {} }) },
        "../../amr/icon-helper": { getIconHelper: () => ({ refreshBadgeAndIcon() {} }) },
        "../../amr/sync/sync-manager": { getSyncManager: () => ({ async setToRemote() {}, async deleteManga() {} }) }
    }).default
    module.state.all = [source, ...(existing ? [{ key: target.key }] : [])]
    const context = {
        rootState: {
            mangas: module.state,
            mirrors: {
                all: [
                    { mirrorName: "Old", disabled: true },
                    { mirrorName: "New", disabled, activated: true, domains: ["new.test"] }
                ]
            },
            options: {}
        },
        getters: {},
        commit: (name, payload) => module.mutations[name](module.state, payload),
        dispatch: async (name, payload) =>
            name === "prepareMirrorMigration" ? module.actions[name](context, payload) : undefined
    }
    const message = {
        key: source.key,
        mirror: "New",
        name: target.name,
        url: target.url,
        chapterUrl: target.chapterUrl,
        language,
        keepSource
    }
    return { module, context, message, writes, run: () => module.actions.migrateMirrorManga(context, message) }
}
test("prepares multilingual lists and migrates the selected language only", async () => {
    const env = setup({ lists: { en: chapters, fr: [["Chapitre 12", "https://new.test/fr/12"]] }, language: "fr" })
    env.message.chapterUrl = "https://new.test/fr/12"
    await env.run()
    assert.equal(env.writes[0].manga.language, "fr")
    assert.equal(env.writes[0].manga.listChaps.length, 1)
    assert.equal(env.module.state.all.length, 2)
})
test("optionally removes the original after successful storage", async () => {
    const env = setup({ keepSource: false })
    await env.run()
    assert.equal(env.module.state.all.length, 1)
    assert.equal(env.module.state.all[0].key, target.key)
})
test("load, storage, duplicate and disabled-target failures leave source untouched", async () => {
    for (const settings of [{ lists: [] }, { failure: "Disk full" }, { existing: true }, { disabled: true }]) {
        const env = setup({ ...settings, keepSource: false })
        await assert.rejects(env.run)
        assert.equal(env.module.state.all[0], source)
        assert.equal(env.writes.length, 0)
    }
})
test("rejects an unrelated URL or an unavailable language before writing", async () => {
    const wrongUrl = setup()
    wrongUrl.message.url = "https://unrelated.test/example"
    await assert.rejects(wrongUrl.run, /migration_error_mirror/)
    const wrongLanguage = setup({ language: "de" })
    await assert.rejects(wrongLanguage.run, /migration_error_chapter/)
    assert.equal(wrongLanguage.writes.length, 0)
})

test("a post-save export failure reports a warning without losing the migrated entry", async () => {
    const env = setup()
    const dispatch = env.context.dispatch
    env.context.dispatch = async (name, payload) => {
        if (name === "exportManga") throw new Error("Export unavailable")
        return dispatch(name, payload)
    }
    const result = await env.run()
    assert.equal(result.syncWarning, true)
    assert.equal(env.writes.length, 1)
    assert.equal(env.module.state.all.length, 2)
})

test("dialog requires explicit chapter choice on an unmatched series and sends the chosen progress", async () => {
    const messages = []
    const file = "src/pages/components/MirrorMigration.vue"
    const script = fs.readFileSync(path.join(root, file), "utf8").match(/<script>([\s\S]*?)<\/script>/)[1]
    const options = load(
        file,
        {
            "webextension-polyfill": {
                runtime: {
                    sendMessage: async message => {
                        messages.push(message)
                        return message.action === "prepareMirrorMigration"
                            ? {
                                  ok: true,
                                  data: { url: target.url, chapters: { en: [["Chapter 20", "https://new.test/20"]] } }
                              }
                            : { ok: true, data: { syncWarning: false } }
                    }
                }
            },
            "../../amr/i18n": value => value,
            "../../shared/mirrorMigration": migration
        },
        script
    ).default
    const instance = { manga: source, $store: { state: { mirrors: { all: [] } } } }
    Object.assign(instance, options.data.call(instance))
    for (const [name, method] of Object.entries(options.methods)) instance[name] = method.bind(instance)
    for (const [name, computed] of Object.entries(options.computed))
        Object.defineProperty(instance, name, { get: computed.bind(instance) })
    instance.mirror = "New"
    instance.targetUrl = target.url
    await instance.loadTarget()
    assert.equal(instance.language, "en")
    assert.equal(instance.chapterUrl, null)
    assert.equal(instance.canSave, false)
    await instance.save()
    assert.equal(messages.length, 1)
    instance.chapterUrl = "https://new.test/20"
    await instance.save()
    assert.equal(messages[1].chapterUrl, "https://new.test/20")
    assert.equal(messages[1].keepSource, true)
    assert.equal(instance.done, true)
})
