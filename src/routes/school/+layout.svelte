<script lang="ts">
  import { page } from '$app/state';
  import { onMount, setContext } from 'svelte';
  import SchoolSearch from '$lib/components/school/SchoolSearch.svelte';
  import { translations, type Lang } from '$lib/i18n';

  let { children } = $props();

  // ── Theme ──────────────────────────────────────────────────────────
  let theme = $state<'dark' | 'light'>('dark');
  let searchOpen = $state(false);

  // ── Language ───────────────────────────────────────────────────────
  let lang = $state<Lang>('de');

  // Expose reactive lang to all child components via context
  setContext('lang', {
    get current(): Lang { return lang; },
  });

  const t = $derived(translations[lang]);

  onMount(() => {
    // Theme
    const savedTheme = localStorage.getItem('school-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      theme = savedTheme;
    } else {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    // Language
    const savedLang = localStorage.getItem('school-lang');
    if (savedLang === 'de' || savedLang === 'en') lang = savedLang;

    // Global keyboard shortcut: ⌘K / Ctrl+K opens search
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchOpen = true;
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('school-theme', theme);
  }

  function toggleLang() {
    lang = lang === 'de' ? 'en' : 'de';
    localStorage.setItem('school-lang', lang);
  }

  const NAV = $derived([
    { href: '/school',           label: t.nav.home },
    { href: '/school/about',     label: t.nav.about },
    { href: '/school/projects',  label: t.nav.projects },
    { href: '/school/skills',    label: t.nav.skills },
    { href: '/school/documents', label: t.nav.documents },
  ]);

  function isActive(href: string): boolean {
    if (href === '/school') return page.url.pathname === '/school';
    return page.url.pathname.startsWith(href);
  }
</script>

<svelte:head>
  <meta name="author" content="Ivan Matiash" />
</svelte:head>

<div class="school-root" data-school-theme={theme} lang={lang}>
  <!-- ── Sticky navigation ─────────────────────────────────────── -->
  <header class="school-header">
    <nav class="school-nav" aria-label={t.nav_aria}>
      <ul class="nav-list" role="list">
        {#each NAV as item}
          <li>
            <a
              href={item.href}
              class="nav-link"
              class:active={isActive(item.href)}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>

      <div class="nav-actions">
        <!-- Search -->
        <button
          class="icon-btn"
          onclick={() => (searchOpen = true)}
          aria-label={t.search_open}
          title={t.search_title}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.5" />
            <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>

        <!-- Language toggle -->
        <button
          class="lang-btn"
          onclick={toggleLang}
          aria-label={t.lang_switch}
          title={t.lang_switch}
        >
          {lang === 'de' ? 'EN' : 'DE'}
        </button>

        <!-- Theme toggle -->
        <button
          class="icon-btn"
          onclick={toggleTheme}
          aria-label={theme === 'dark' ? t.theme_to_light : t.theme_to_dark}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {#if theme === 'dark'}
            <!-- Sun -->
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="7.5" cy="7.5" r="2.8" stroke="currentColor" stroke-width="1.5" />
              <line x1="7.5" y1="1" x2="7.5" y2="2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <line x1="7.5" y1="12.5" x2="7.5" y2="14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <line x1="1" y1="7.5" x2="2.5" y2="7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <line x1="12.5" y1="7.5" x2="14" y2="7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <line x1="3.2" y1="3.2" x2="4.2" y2="4.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <line x1="10.8" y1="10.8" x2="11.8" y2="11.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <line x1="11.8" y1="3.2" x2="10.8" y2="4.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <line x1="4.2" y1="10.8" x2="3.2" y2="11.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          {:else}
            <!-- Moon -->
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <path
                d="M12.5 9A6 6 0 0 1 6 2.5a6 6 0 1 0 6.5 6.5z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          {/if}
        </button>
      </div>
    </nav>
  </header>

  <!-- ── Page content ──────────────────────────────────────────── -->
  <main class="school-main" id="main-content">
    {@render children()}
  </main>

  <!-- ── Footer ───────────────────────────────────────────────── -->
  <footer class="school-footer">
    <p>
        <a href="https://ivanm.xyz">ivanm.xyz</a>
    </p>
  </footer>

  <!-- ── Search modal ─────────────────────────────────────────── -->
  {#if searchOpen}
    <SchoolSearch onclose={() => (searchOpen = false)} />
  {/if}
</div>

<style>
  /* ── CSS custom properties ──────────────────────────────────────── */

  :global([data-school-theme='dark']) {
    --s-bg:          #050505;
    --s-surface:     #0e0e0e;
    --s-surface-alt: #161616;
    --s-border:      #202020;
    --s-text:        #e6e1d6;
    --s-muted:       #9ca3af;
    --s-link:        #9bb4c8;
    --s-link-hover:  #e6e1d6;
    --s-tag-bg:      #181818;
    --s-tag-text:    #9ca3af;
    --s-bar-bg:      #1e1e1e;
    --s-bar-fill:    #c5c0b5;
    --s-btn-bg:      #131313;
    --s-btn-border:  #272727;
    --s-btn-text:    #e6e1d6;
    --s-nav-bg:      rgba(5, 5, 5, 0.9);
    --s-nav-border:  #1a1a1a;
  }

  :global([data-school-theme='light']) {
    --s-bg:          #f8f6f2;
    --s-surface:     #ffffff;
    --s-surface-alt: #f0ede8;
    --s-border:      #dedad4;
    --s-text:        #1a1918;
    --s-muted:       #6b7280;
    --s-link:        #2b4f70;
    --s-link-hover:  #1a1918;
    --s-tag-bg:      #ebe8e3;
    --s-tag-text:    #4b5563;
    --s-bar-bg:      #dedad4;
    --s-bar-fill:    #1a1918;
    --s-btn-bg:      #ffffff;
    --s-btn-border:  #dedad4;
    --s-btn-text:    #1a1918;
    --s-nav-bg:      rgba(248, 246, 242, 0.9);
    --s-nav-border:  #dedad4;
  }

  /* ── Root shell ─────────────────────────────────────────────────── */

  :global(html:has([data-school-theme])) {
    font-size: 17px;
  }

  .school-root {
    min-height: 100vh;
    background: var(--s-bg);
    color: var(--s-text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
    font-size: 17px;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-direction: column;
  }

  /* ── Header ─────────────────────────────────────────────────────── */

  .school-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--s-nav-bg);
    border-bottom: 1px solid var(--s-nav-border);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }

  .school-nav {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.1rem;
    flex-wrap: wrap;
  }

  .nav-link {
    display: block;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    text-decoration: none;
    color: var(--s-muted);
    font-size: 0.85rem;
    font-weight: 500;
    transition: color 0.15s ease, background 0.15s ease;
    white-space: nowrap;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--s-text);
    background: var(--s-surface-alt);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    flex-shrink: 0;
  }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: var(--s-muted);
    border-radius: 4px;
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;
  }

  .icon-btn:hover {
    color: var(--s-text);
    background: var(--s-surface-alt);
  }

  /* ── Language toggle ─────────────────────────────────────────────── */

  .lang-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 22px;
    padding: 0 0.45rem;
    border: 1px solid var(--s-border);
    background: transparent;
    color: var(--s-muted);
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.68rem;
    font-weight: 700;
    font-family: monospace;
    letter-spacing: 0.06em;
    transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
  }

  .lang-btn:hover {
    color: var(--s-text);
    background: var(--s-surface-alt);
    border-color: var(--s-muted);
  }

  /* ── Main ───────────────────────────────────────────────────────── */

  .school-main {
    flex: 1;
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 3rem 1.5rem 4.5rem;
  }

  /* ── Footer ─────────────────────────────────────────────────────── */

  .school-footer {
    border-top: 1px solid var(--s-border);
    padding: 1.25rem 1.5rem;
    text-align: center;
    font-size: 0.75rem;
    color: var(--s-muted);
  }

  .school-footer p {
    margin: 0;
  }

  .school-footer a {
    color: var(--s-link);
    text-decoration: none;
  }

  .school-footer a:hover {
    color: var(--s-link-hover);
    text-decoration: underline;
  }

  /* ── Responsive ─────────────────────────────────────────────────── */

  @media (max-width: 640px) {
    .school-main {
      padding: 2rem 1rem 3rem;
    }

    .nav-link {
      font-size: 0.78rem;
      padding: 0.25rem 0.45rem;
    }
  }
</style>
