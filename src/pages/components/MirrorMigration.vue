<template>
    <v-dialog :value="true" max-width="650" :persistent="busy" @input="close">
        <v-card>
            <v-card-title>{{ i18n("migration_title") }}</v-card-title>
            <v-card-text>
                <p>{{ manga.displayName || manga.name }} — {{ manga.mirror }}</p>
                <p>{{ i18n("migration_description") }}</p>
                <v-alert v-if="error" type="error" dense>{{ i18n(error) }}</v-alert>
                <v-alert v-if="done" type="success" dense>{{ i18n("migration_success") }}</v-alert>
                <v-alert v-if="syncWarning" type="warning" dense>{{ i18n("migration_sync_warning") }}</v-alert>
                <template v-if="!done">
                    <v-autocomplete
                        v-model="mirror"
                        :items="mirrors"
                        item-text="mirrorName"
                        item-value="mirrorName"
                        :label="i18n('migration_mirror')"
                        :disabled="busy"
                        @change="resetTarget" />
                    <v-text-field
                        v-model="query"
                        :label="i18n('migration_search')"
                        :disabled="busy"
                        @keydown.enter.prevent="search">
                        <template v-slot:append>
                            <v-btn
                                icon
                                :disabled="busy || !mirror || !query.trim()"
                                @click="search"
                                :aria-label="i18n('migration_search')"
                                ><v-icon>mdi-magnify</v-icon></v-btn
                            >
                        </template>
                    </v-text-field>
                    <v-select
                        v-if="results.length"
                        :items="results"
                        item-text="name"
                        item-value="url"
                        :label="i18n('migration_series')"
                        :disabled="busy"
                        @change="chooseResult" />
                    <p v-if="searched && !results.length">{{ i18n("migration_no_results") }}</p>
                    <v-text-field
                        v-model="targetUrl"
                        :label="i18n('migration_url')"
                        :disabled="busy"
                        @input="editTargetUrl"
                        @keydown.enter.prevent="loadTarget" />
                    <v-btn small :disabled="busy || !mirror || !targetUrl.trim()" @click="loadTarget">
                        {{ i18n("migration_load") }}
                    </v-btn>
                    <v-progress-linear v-if="busy" indeterminate class="mt-3" />
                    <template v-if="preview">
                        <v-select
                            v-if="languages.length > 1 || languages[0]"
                            v-model="language"
                            :items="languages"
                            :label="i18n('migration_language')"
                            :disabled="busy"
                            @change="suggestChapter" />
                        <p class="mt-4">{{ i18n("migration_progress") }}: {{ manga.lastChapterReadName || "—" }}</p>
                        <v-alert v-if="needsChoice" type="warning" dense>{{
                            i18n("migration_choose_chapter")
                        }}</v-alert>
                        <v-select
                            v-model="chapterUrl"
                            :items="chapterItems"
                            :label="i18n('migration_chapter')"
                            :disabled="busy" />
                        <v-checkbox v-model="keepSource" :label="i18n('migration_keep_source')" :disabled="busy" />
                        <p>{{ i18n("migration_bookmarks") }}</p>
                    </template>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn text :disabled="busy" @click="close">{{
                    i18n(done ? "migration_close" : "migration_cancel")
                }}</v-btn>
                <v-btn v-if="!done" color="primary" :loading="saving" :disabled="!canSave" @click="save">
                    {{ i18n("migration_title") }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import browser from "webextension-polyfill"
import i18n from "../../amr/i18n"
import { suggestMigrationChapter } from "../../shared/mirrorMigration"

export default {
    name: "MirrorMigration",
    props: ["manga"],
    data() {
        return {
            mirror: null,
            query: this.manga.name,
            results: [],
            searched: false,
            targetUrl: "",
            targetName: "",
            preview: null,
            language: "",
            chapterUrl: null,
            keepSource: true,
            loading: false,
            saving: false,
            error: "",
            done: false,
            syncWarning: false,
            requestId: 0
        }
    },
    computed: {
        mirrors() {
            return this.$store.state.mirrors.all
                .filter(mirror => !mirror.disabled && mirror.activated && mirror.mirrorName !== this.manga.mirror)
                .slice()
                .sort((a, b) => a.mirrorName.localeCompare(b.mirrorName))
        },
        busy() {
            return this.loading || this.saving
        },
        languages() {
            return Object.keys(this.preview?.chapters ?? {})
        },
        chapters() {
            return this.preview?.chapters[this.language] ?? []
        },
        chapterItems() {
            return [
                { text: i18n("migration_unread"), value: "" },
                ...this.chapters.map(([text, value]) => ({ text, value }))
            ]
        },
        needsChoice() {
            return this.chapterUrl === null
        },
        canSave() {
            return this.preview && this.chapterUrl !== null && this.chapters.length && !this.busy
        }
    },
    methods: {
        i18n,
        close() {
            if (!this.busy) this.$emit("close")
        },
        clearPreview() {
            this.preview = null
            this.chapterUrl = null
            this.error = ""
        },
        editTargetUrl() {
            this.targetName = ""
            this.clearPreview()
        },
        resetTarget() {
            this.results = []
            this.searched = false
            this.targetUrl = ""
            this.targetName = ""
            this.clearPreview()
        },
        async search() {
            if (this.busy || !this.mirror || !this.query.trim()) return
            this.resetSearch()
            this.loading = true
            const id = ++this.requestId
            try {
                const results = await browser.runtime.sendMessage({
                    action: "searchList",
                    mirror: this.mirror,
                    search: this.query.trim()
                })
                if (id !== this.requestId) return
                if (!Array.isArray(results)) throw new Error("migration_error_load")
                this.results = results
                this.searched = true
            } catch (error) {
                this.error = "migration_error_load"
            } finally {
                if (id === this.requestId) this.loading = false
            }
        },
        resetSearch() {
            this.clearPreview()
            this.results = []
            this.targetUrl = ""
            this.targetName = ""
            this.searched = false
        },
        chooseResult(url) {
            this.targetUrl = url
            this.targetName = this.results.find(result => result.url === url)?.name || this.manga.name
            this.loadTarget()
        },
        async loadTarget() {
            if (this.busy || !this.mirror || !this.targetUrl.trim()) return
            this.clearPreview()
            this.loading = true
            try {
                const result = await browser.runtime.sendMessage({
                    action: "prepareMirrorMigration",
                    key: this.manga.key,
                    mirror: this.mirror,
                    url: this.targetUrl.trim()
                })
                if (!result?.ok) {
                    this.error = result?.error || "migration_error_load"
                    return
                }
                this.preview = result.data
                this.language = this.languages.includes(this.manga.language) ? this.manga.language : this.languages[0]
                this.suggestChapter()
            } catch (error) {
                this.error = "migration_error_load"
            } finally {
                this.loading = false
            }
        },
        suggestChapter() {
            this.chapterUrl =
                suggestMigrationChapter(this.manga, this.chapters) ??
                (this.manga.lastChapterReadURL || this.manga.lastChapterReadName ? null : "")
        },
        async save() {
            if (!this.canSave) return
            this.saving = true
            this.error = ""
            try {
                const result = await browser.runtime.sendMessage({
                    action: "migrateMirrorManga",
                    key: this.manga.key,
                    mirror: this.mirror,
                    name: this.targetName || this.manga.name,
                    url: this.preview.url,
                    language: this.language,
                    chapterUrl: this.chapterUrl,
                    keepSource: this.keepSource
                })
                if (!result?.ok) {
                    this.error = result?.error || "migration_error_load"
                    return
                }
                this.done = true
                this.syncWarning = result.data.syncWarning
            } catch (error) {
                this.error = "migration_error_load"
            } finally {
                this.saving = false
            }
        }
    },
    beforeDestroy() {
        this.requestId++
    }
}
</script>
