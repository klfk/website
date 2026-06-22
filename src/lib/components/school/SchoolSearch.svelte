<script lang="ts">
  import { onMount } from 'svelte';

  let { onclose }: { onclose: () => void } = $props();

  let query = $state('');
  let inputEl: HTMLInputElement;

  // Static search index — covers all pages, projects, skills, and CV facts.
  // Extend this array whenever content changes.
  const INDEX = [
    // ── Pages ────────────────────────────────────────────────────────
    { type: 'Seite', title: 'Home', desc: 'Kurzprofil und Überblick', href: '/school' },
    { type: 'Seite', title: 'Über mich', desc: 'Vollständiger Lebenslauf', href: '/school/about' },
    { type: 'Seite', title: 'Projekte', desc: 'Schul- und Privatprojekte', href: '/school/projects' },
    { type: 'Seite', title: 'Kenntnisse', desc: 'ICT-Kompetenzübersicht', href: '/school/skills' },
    { type: 'Seite', title: 'Dokumente', desc: 'Bewerbungsunterlagen (geschützt)', href: '/school/documents' },

    // ── Projects ─────────────────────────────────────────────────────
    { type: 'Projekt', title: 'Librebooks', desc: 'CRUD-Webapplikation für eine Bibliothek. PHP, MySQL, JavaScript.', href: '/school/projects' },
    { type: 'Projekt', title: 'ivanm.xyz', desc: 'Persönliche Webseite mit Svelte und Cloudflare Pages.', href: '/school/projects' },
    { type: 'Projekt', title: 'Typing-Tester (CLI)', desc: 'Kleines Tool im Terminal zur Messung der Tippgeschwindigkeit. Python.', href: '/school/projects' },
    { type: 'Projekt', title: 'Dotfiles & Neovim', desc: 'Persönliche Editor-Umgebung, Lua und Shell-Skripte.', href: '/school/projects' },

    // ── Skills ───────────────────────────────────────────────────────
    { type: 'Kenntnisse', title: 'HTML / CSS', desc: '4/5 — Programmiersprachen', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'JavaScript', desc: '3/5 — Programmiersprachen', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'PHP', desc: '3/5 — Programmiersprachen', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'Python', desc: '3/5 — Programmiersprachen', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'Java (OOP)', desc: '3/5 — Programmiersprachen', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'SQL', desc: '3/5 — Programmiersprachen', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'C', desc: '2/5 — Programmiersprachen', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'Rust', desc: '2/5 — Programmiersprachen', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'Lua', desc: '2/5 — Programmiersprachen', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'Git / GitHub', desc: '4/5 — Tools & DevOps', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'Neovim', desc: '4/5 — Editoren / Workflow', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'Svelte / SvelteKit', desc: '3/5 — Frameworks', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'Docker', desc: '2/5 — Tools & DevOps', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'MySQL', desc: '3/5 — Datenbanken', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'Typst', desc: '4/5 — Tools & DevOps', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'macOS', desc: '4/5 — Betriebssysteme', href: '/school/skills' },
    { type: 'Kenntnisse', title: 'Linux', desc: '3/5 — Betriebssysteme', href: '/school/skills' },

    // ── CV facts ─────────────────────────────────────────────────────
    { type: 'CV', title: 'IMS Basel', desc: 'Informatikmittelschule, Klasse I-2a, 2024–2028', href: '/school/about' },
    { type: 'CV', title: 'Schnupperlehre Adobe', desc: 'Frontend, Python, Design — 2024', href: '/school/about' },
    { type: 'CV', title: 'Bauernhof St. Gallen', desc: 'Ferienjob Sommer 2025 — Alpwirtschaft', href: '/school/about' },
    { type: 'CV', title: 'Sprachen', desc: 'Ukrainisch, Russisch, Englisch C1, Deutsch B1, Französisch B2', href: '/school/about' },
    { type: 'CV', title: 'Freizeit', desc: 'Schlagzeug, Krafttraining, Lesen, Kino, Coding', href: '/school/about' },
  ] as const;

  const results = $derived(
    query.trim().length < 2
      ? ([] as typeof INDEX[number][])
      : INDEX.filter((item) => {
          const q = query.toLowerCase();
          return (
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.type.toLowerCase().includes(q)
          );
        }).slice(0, 12)
  );

  function handleBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('backdrop')) onclose();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onclose();
  }

  onMount(() => {
    inputEl?.focus();
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
  class="backdrop"
  role="dialog"
  aria-modal="true"
  aria-label="Suche"
  tabindex="-1"
  onclick={handleBackdrop}
  onkeydown={handleKeydown}
>
  <div class="panel">
    <div class="input-row">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="search-icon">
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.5" />
        <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <input
        bind:this={inputEl}
        bind:value={query}
        type="search"
        class="search-input"
        placeholder="Suchen…"
        autocomplete="off"
        spellcheck="false"
        aria-label="Suchbegriff eingeben"
      />
      <button class="esc-btn" onclick={onclose} aria-label="Suche schliessen">Esc</button>
    </div>

    <div class="results-area">
      {#if query.trim().length < 2}
        <p class="hint">Mindestens 2 Zeichen eingeben.</p>
      {:else if results.length === 0}
        <p class="hint">Keine Ergebnisse für „{query}".</p>
      {:else}
        <ul class="result-list" role="listbox" aria-label="Suchergebnisse">
          {#each results as item}
            <li role="option" aria-selected="false">
              <a href={item.href} class="result" onclick={onclose}>
                <span class="result-type">{item.type}</span>
                <span class="result-body">
                  <span class="result-title">{item.title}</span>
                  <span class="result-desc">{item.desc}</span>
                </span>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(3px);
    -webkit-backdrop-filter: blur(3px);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: 12vh;
  }

  .panel {
    width: min(580px, 92vw);
    background: var(--s-surface);
    border: 1px solid var(--s-border);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1rem;
    border-bottom: 1px solid var(--s-border);
  }

  .search-icon {
    color: var(--s-muted);
    flex-shrink: 0;
  }

  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--s-text);
    font-size: 0.95rem;
    font-family: inherit;
    -webkit-appearance: none;
    appearance: none;
  }

  .search-input::placeholder {
    color: var(--s-muted);
  }

  .esc-btn {
    background: var(--s-surface-alt);
    border: 1px solid var(--s-border);
    color: var(--s-muted);
    font-size: 0.68rem;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
    cursor: pointer;
    font-family: monospace;
    letter-spacing: 0.04em;
    flex-shrink: 0;
  }

  .results-area {
    max-height: 380px;
    overflow-y: auto;
  }

  .hint {
    padding: 1.25rem 1rem;
    color: var(--s-muted);
    font-size: 0.875rem;
    text-align: center;
    margin: 0;
  }

  .result-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .result-list li {
    border-bottom: 1px solid var(--s-border);
  }

  .result-list li:last-child {
    border-bottom: none;
  }

  .result {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 0.75rem;
    padding: 0.7rem 1rem;
    text-decoration: none;
    color: var(--s-text);
    transition: background 0.1s ease;
    align-items: center;
  }

  .result:hover {
    background: var(--s-surface-alt);
  }

  .result-type {
    font-size: 0.66rem;
    color: var(--s-muted);
    font-family: monospace;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    line-height: 1;
    text-align: right;
    padding-right: 0.25rem;
    border-right: 1px solid var(--s-border);
    align-self: center;
  }

  .result-body {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    min-width: 0;
  }

  .result-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--s-text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .result-desc {
    font-size: 0.76rem;
    color: var(--s-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
