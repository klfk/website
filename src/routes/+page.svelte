<script lang="ts">
    let lang = $state<"EN" | "DE">("EN");
    let showCopied = $state(false);

    function copyEmail() {
        navigator.clipboard.writeText("ivan.matjash@gmail.com");
        showCopied = true;
        setTimeout(() => {
            showCopied = false;
        }, 1000);
    }

    function toggleLang() {
        lang = lang === "EN" ? "DE" : "EN";
    }

    console.log("hello");
</script>
<div>
    <img class="object-contain h-70 w-70" src="/spiral.jpeg" alt="">
</div>
<main
    class="mt-20 flex items-center justify-center bg-black text-white font-vt323 relative"
>
    <button class="lang-toggle text-2xl" onclick={toggleLang}>lang: {lang}</button>

    <div class="center-stack">
        <h1 class="text-5xl font-mono">IVAN MATIASH</h1>
        <p class="text-2xl opacity-80">
            {lang === "EN"
                ? "student at Informatikmittelschule Basel (2024 - 2028)"
                : "Schüler an der Informatikmittelschule Basel (2024 - 2028)"}
        </p>
        <br>
        <p class = "text-2xl">{#if lang === "EN"}
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

        <nav class="mt-8 space-y-3 text-2xl">
            <a href="https://github.com/klfk" class="block hover:underline">github: @klfk</a>
            <a href="https://www.linkedin.com/in/ivan-matiash-4947a9381/" class="hover:underline">linkedin</a>
            <br>
            <div class="relative">
                <button onclick={copyEmail} class="button-clean hover:underline">
                    contact: ivan[dot]matjash(at)gmail(dot)com
                </button>
                {#if showCopied}
                    <div class="absolute top-full left-0 mt-1 text-white font-vt323 text-lg">
                        {lang === "EN" ? "copied!" : "kopiert!"}
                    </div>
                {/if}
            </div>
        </nav>
    </div>
</main>
