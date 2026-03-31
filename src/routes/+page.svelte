<script lang="ts">
    let lang = $state<"EN" | "DE">("EN");
    let showCopied = $state(false);

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

    console.log("hello");
</script>
<main
    class="min-h-screen flex flex-col justify-center bg-black text-white font-vt323 relative overflow-y-auto px-4 py-8 sm:py-12 md:py-16"
>
    <img class="object-contain h-32 w-32 sm:h-48 sm:w-48 md:h-64 md:w-64 mb-4 sm:mb-6 md:mb-8" src="/spiral.jpeg" alt="">
    <button class="lang-toggle text-lg sm:text-xl md:text-2xl" onclick={toggleLang}>lang: {lang}</button>

    <div class="center-stack">
        <h1 class="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-mono">IVAN MATIASH</h1>
        <p class="text-sm sm:text-base md:text-xl opacity-80">
            {lang === "EN"
                ? "student at Informatikmittelschule Basel (2024 - 2028)"
                : "Schüler an der Informatikmittelschule Basel (2024 - 2028)"}
        </p>
        <br>
        <p class="text-sm sm:text-base md:text-lg">{#if lang === "EN"}
            Hello! I am Ivan, 17 years old, located in Basel. I am an IT student
            currently interested in low-level programming (C, Rust). So far I
            have some experience working with Python, PHP, database systems like
            MySQL and MongoDB and I have some OOP basics down. Outside of the
            tech realm I play drums in jazz groups. I am also into linguistics,
            psychology, vim and arthouse cinema.
            {:else} 
            Hallo! Ich bin Ivan, 17 Jahre alt und komme aus Basel. Ich bin Informatikstudent und interessiere mich 
            derzeit für Low-Level-Programmierung (C, Rust). Bisher habe ich bereits Erfahrung mit Python, 
            PHP und Datenbanksystemen wie MySQL und MongoDB gesammelt und beherrsche die Grundlagen der 
            objektorientierten Programmierung. Neben der Informatik spiele ich Schlagzeug in Jazzbands. 
            Ausserdem interessiere ich mich für Linguistik, Psychologie, Vim und Arthouse-Filme.
            {/if}
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
