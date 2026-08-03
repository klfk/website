<script lang="ts">
  import { getContext } from 'svelte';
  import { translations, type Lang } from '$lib/i18n';
  import ProjectCard from '$lib/components/school/ProjectCard.svelte';

  const langCtx = getContext<{ current: Lang }>('lang');
  const t = $derived(translations[langCtx.current].projects);

  const projectLinks = [
    { link: null,                    linkLabel: null },
    { link: 'https://ivanm.xyz',     linkLabel: 'ivanm.xyz' },
    { link: null,                    linkLabel: null },
    { link: 'github.com/klfk',       linkLabel: 'github.com/klfk' },
  ];

  const tech = [
    ['PHP', 'MySQL', 'JavaScript'],
    ['Svelte', 'Cloudflare Pages'],
    ['Python'],
    ['Lua', 'Shell'],
  ];
</script>

<svelte:head>
  <title>{t.meta_title}</title>
  <meta name="description" content={t.meta_desc} />
  <meta property="og:title" content={t.og_title} />
  <meta property="og:type"  content="website" />
</svelte:head>

<header class="page-head">
  <h1>{t.heading}</h1>
  <p class="lead">{t.lead}</p>
</header>

<div class="grid" role="list">
  {#each t.items as item, i}
    <div role="listitem">
      <ProjectCard
        title={item.title}
        description={item.description}
        tech={tech[i]}
        learned={item.learned}
        link={projectLinks[i].link}
        linkLabel={projectLinks[i].linkLabel}
        lang={langCtx.current}
      />
    </div>
  {/each}
</div>

<div class="more">
  <a href="https://github.com/klfk" target="_blank" rel="noopener noreferrer" class="btn">
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
               0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
               -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
               .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
               -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68
               0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
               1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
               1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
    {t.more_github}
  </a>
</div>

<style>
  .page-head { margin-bottom: 2rem; }

  h1 {
    font-family: 'VT323', monospace;
    font-size: 2.2rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0 0 0.35rem;
    color: var(--s-text);
  }

  .lead { color: var(--s-muted); font-size: 0.875rem; margin: 0; }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .more { margin-top: 0.5rem; }

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
    .grid { grid-template-columns: 1fr; }
  }
</style>
