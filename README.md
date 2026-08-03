# ivanm.xyz

## Content editing

The site includes a lightweight Decap CMS admin UI at `/admin/`.

- CMS config: `static/admin/config.yml` plus root fallback `static/config.yml`
- Editable content: `src/lib/content/bio.json`
- Local CMS mode is enabled with `local_backend: true`.

To edit content locally, run the site and a Decap local backend, then open `/admin`.
For production GitHub edits, Decap uses the `klfk/website` repository on the `main` branch.
