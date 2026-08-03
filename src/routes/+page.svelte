<script lang="ts">
    import bio from "$lib/content/bio.json";

    type Language = "EN" | "DE";
    type ContentLanguage = "en" | "de";

    let lang = $state<Language>("EN");
    let showCopied = $state(false);

    const languageKey: Record<Language, ContentLanguage> = {
        EN: "en",
        DE: "de"
    };

    function copyEmail() {
        navigator.clipboard.writeText("ivan.matjash@gmail.com").then(() => {
            showCopied = true;
            setTimeout(() => {
                showCopied = false;
            }, 1000);
        });
    }

    function toggleLang() {
        lang = lang === "EN" ? "DE" : "EN";
    }
</script>
<main
    class="min-h-screen flex flex-col justify-center bg-black text-white font-vt323 relative overflow-y-auto px-4 py-8 sm:py-12 md:py-16"
>
    <img class="object-contain h-32 w-32 sm:h-48 sm:w-48 md:h-64 md:w-64 mb-4 sm:mb-6 md:mb-8" src="/spiral.jpeg" alt="">
    <button class="lang-toggle text-lg sm:text-xl md:text-2xl" onclick={toggleLang}>lang: {lang}</button>

    <div class="center-stack">
        <h1 class="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-mono">IVAN MATIASH</h1>
        <p class="text-sm sm:text-base md:text-xl opacity-80">
            {bio.strings.studentLine[languageKey[lang]]}
        </p>
        <br>
        <p class="text-sm sm:text-base md:text-lg">
            {bio.strings.bio[languageKey[lang]]}
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
                    {lang === "EN" ? "copied!" : "kopiert!"}
                </div>
            {/if}
        </nav>
    </div>
</main>
