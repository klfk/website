<script lang="ts">
    import bio from "$lib/content/bio.json";

    type Language = "en" | "de" | "fr" | "yue" | "hi" | "binary";
    type ContentLanguage = "en" | "de" | "fr" | "yue" | "hi" | "binary";

    let lang = $state<Language>("en");
    let showCopied = $state(false);
    let languageMenuOpen = $state(false);

    const languages: { value: Language; label: string; contentLanguage: ContentLanguage }[] = [
        { value: "en", label: "English", contentLanguage: "en" },
        { value: "de", label: "Deutsch", contentLanguage: "de" },
        { value: "fr", label: "Français", contentLanguage: "fr" },
        { value: "yue", label: "粵語", contentLanguage: "yue" },
        { value: "hi", label: "हिन्दी", contentLanguage: "hi" },
        { value: "binary", label: "Binary", contentLanguage: "binary" }
    ];

    const selectedLanguage = $derived(languages.find((language) => language.value === lang) ?? languages[0]);
    const languageKey = $derived(selectedLanguage.contentLanguage);

    function copyEmail() {
        navigator.clipboard.writeText("ivan.matjash@gmail.com").then(() => {
            showCopied = true;
            setTimeout(() => {
                showCopied = false;
            }, 1000);
        });
    }

    function selectLanguage(value: Language) {
        lang = value;
        languageMenuOpen = false;
    }

    function handleLanguageKeydown(event: KeyboardEvent, value: Language) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectLanguage(value);
        }
    }

    function closeLanguageMenu(event: MouseEvent) {
        const target = event.target;
        if (target instanceof HTMLElement && !target.closest(".lang-menu")) {
            languageMenuOpen = false;
        }
    }

</script>
<svelte:window onclick={closeLanguageMenu} />

<main
    class="min-h-screen flex flex-col justify-center bg-black text-white font-vt323 relative overflow-y-auto px-4 py-8 sm:py-12 md:py-16"
>
    <img class="object-contain h-32 w-32 sm:h-48 sm:w-48 md:h-64 md:w-64 mb-4 sm:mb-6 md:mb-8" src="/spiral.jpeg" alt="">
    <div class="lang-menu text-lg sm:text-xl md:text-2xl">
        <button
            class="lang-menu-trigger"
            type="button"
            aria-haspopup="listbox"
            aria-expanded={languageMenuOpen}
            onclick={(event) => {
                event.stopPropagation();
                languageMenuOpen = !languageMenuOpen;
            }}
        >
            <span aria-hidden="true">lang:</span>
            <span>{selectedLanguage.label}</span>
            <span class="lang-menu-caret" aria-hidden="true">▾</span>
        </button>

        {#if languageMenuOpen}
            <div class="lang-menu-list" role="listbox" aria-label="language" tabindex="-1">
                {#each languages as language}
                    <button
                        class="lang-menu-option"
                        class:active={language.value === lang}
                        type="button"
                        role="option"
                        aria-selected={language.value === lang}
                        onclick={() => selectLanguage(language.value)}
                        onkeydown={(event) => handleLanguageKeydown(event, language.value)}
                    >
                        <span>{language.label}</span>
                        {#if language.value === lang}
                            <span aria-hidden="true">*</span>
                        {/if}
                    </button>
                {/each}
            </div>
        {/if}
    </div>

    <div class="center-stack">
        <h1 class="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-mono">IVAN MATIASH</h1>
        <p class="text-sm sm:text-base md:text-xl opacity-80">
            {bio.strings.studentLine[languageKey]}
        </p>
        <br>
        <p class="text-sm sm:text-base md:text-lg">
            {bio.strings.bio[languageKey]}
        </p>

        <nav class="mt-6 sm:mt-8 space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base">
            <div>
                <a href="https://github.com/klfk" target="_blank" class="hover:underline">github: @klfk</a>
            </div>
            <div>
                <a href="https://www.linkedin.com/in/ivan-matiash-4947a9381/" target="_blank" class="hover:underline">linkedin</a>
            </div>
            <div class="relative">
                <button onclick={copyEmail} class="button-clean hover:underline">
                    contact: ivan[dot]matjash(at)gmail(dot)com
                </button>
            </div>
            {#if showCopied}
                <div class="fixed transform text-white font-vt323 text-2xl ">
                    {lang === "de" ? "kopiert!" : "copied!"}
                </div>
            {/if}
        </nav>
    </div>
</main>
