# Research 2026 CQU

A small reading library for the research topic **Assessing the Readiness of Regional Queensland Construction SMEs to Adopt AI-Enabled Project Management Tools for Construction Delay Mitigation**.

The site has 12 journal article profiles with bibliographic details, short summaries, key findings, relevance to the proposed study, and limitations. It includes search, theme filters, and source links. Summaries are reading aids; verify each point against the original article before citing it.

## Run locally

```bash
pnpm install
pnpm dev
```

## Build and deploy

```bash
pnpm build
```

Next.js exports a static site to `out/`. Netlify uses `netlify.toml` to publish that directory.

## Article files and access

The public site links to DOI, publisher, open-access, and CQU Library pages. Downloaded PDFs are kept in `full-text-local/` on the researcher's computer and are excluded from Git. The folder is for personal research use; licensed library PDFs must not be redistributed through the public site or repository.

Article metadata and notes are maintained in `lib/articles.ts`.
