<script lang="ts">
  import ProjectCard from '$lib/components/school/ProjectCard.svelte';

  const projects = [
    {
      title: 'Librebooks',
      description:
        'CRUD-Webapplikation für eine kleine Bibliothek. Datenmodellierung, Backend, Frontend, Dokumentation. Schulprojekt.',
      tech: ['PHP', 'MySQL', 'JavaScript'] as string[],
      learned:
        'Saubere Planung zahlt sich später aus — das Datenmodell zuerst zu skizzieren hat mir später viel Refactoring erspart.',
      link: null as string | null,
      linkLabel: null as string | null,
    },
    {
      title: 'ivanm.xyz',
      description:
        'Meine persönliche Webseite. Mit Svelte gebaut, Cloudflare-Hosting. Aktuell rein Frontend, ich plane eine kleine Backend-Erweiterung.',
      tech: ['Svelte', 'Cloudflare Pages'] as string[],
      learned:
        'Wie man ein eigenes Setup von Domain bis Deployment durchzieht, ohne fertige Plattformen.',
      link: 'https://ivanm.xyz' as string | null,
      linkLabel: 'ivanm.xyz' as string | null,
    },
    {
      title: 'Typing-Tester (CLI)',
      description:
        'Kleines Übungs-Tool im Terminal, um meine Tippgeschwindigkeit zu messen. Eigene Idee, in der Freizeit gebaut.',
      tech: ['Python'] as string[],
      learned: 'Saubere CLI-UX ist anspruchsvoller als gedacht.',
      link: null as string | null,
      linkLabel: null as string | null,
    },
    {
      title: 'Dotfiles & Neovim-Konfiguration',
      description:
        'Meine persönliche Editor-Umgebung, inkl. eigener kleiner Skripte und Plugins.',
      tech: ['Lua', 'Shell'] as string[],
      learned:
        'Tooling-Anpassung lohnt sich — ich arbeite deutlich schneller in einem Setup, das genau mir gehört.',
      link: 'github.com/klfk' as string | null,
      linkLabel: 'github.com/klfk' as string | null,
    },
  ];
</script>

<svelte:head>
  <title>Projekte — Ivan Matiash</title>
  <meta
    name="description"
    content="Schul- und Privatprojekte von Ivan Matiash: Librebooks, ivanm.xyz, Typing-Tester, Dotfiles."
  />
  <meta property="og:title" content="Projekte — Ivan Matiash" />
  <meta property="og:type"  content="website" />
</svelte:head>

<header class="page-head">
  <h1>Projekte</h1>
  <p class="lead">Eine Auswahl meiner Schul- und Privatprojekte.</p>
</header>

<div class="grid" role="list">
  {#each projects as p}
    <div role="listitem">
      <ProjectCard
        title={p.title}
        description={p.description}
        tech={p.tech}
        learned={p.learned}
        link={p.link}
        linkLabel={p.linkLabel}
      />
    </div>
  {/each}
</div>

<div class="more">
  <a
    href="https://github.com/klfk"
    target="_blank"
    rel="noopener noreferrer"
    class="btn"
  >
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
           0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
           -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
           .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
           -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
           1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
           1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
           1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
    Mehr auf GitHub
  </a>
</div>

<style>
  .page-head {
    margin-bottom: 2rem;
  }

  h1 {
    font-family: 'VT323', monospace;
    font-size: 2.2rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0 0 0.35rem;
    color: var(--s-text);
  }

  .lead {
    color: var(--s-muted);
    font-size: 0.875rem;
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .more {
    margin-top: 0.5rem;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.48rem 1rem;
    border: 1px solid var(--s-btn-border);
    background: var(--s-btn-bg);
    color: var(--s-btn-text);
    border-radius: 5px;
    font-size: 0.85rem;
    font-weight: 500;
    text-decoration: none;
    transition: background 0.15s, border-color 0.15s;
  }

  .btn:hover {
    background: var(--s-surface-alt);
    border-color: var(--s-text);
    color: var(--s-text);
  }

  @media (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
