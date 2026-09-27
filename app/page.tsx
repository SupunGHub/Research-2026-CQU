"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, ChevronDown, FileText, Search, SlidersHorizontal } from "lucide-react";
import { articles, themes, type Theme } from "@/lib/articles";

type Filter = "All papers" | Theme;

export default function Home() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<Filter>("All papers");
  const [sort, setSort] = useState("relevance");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = articles.filter((article) => {
      const matchesTheme = theme === "All papers" || article.theme === theme;
      const haystack = [article.title, article.authors, article.journal, article.summary, ...article.tags].join(" ").toLowerCase();
      return matchesTheme && (!q || haystack.includes(q));
    });
    if (sort === "newest") return [...filtered].sort((a, b) => b.year - a.year);
    if (sort === "oldest") return [...filtered].sort((a, b) => a.year - b.year);
    return filtered;
  }, [query, theme, sort]);

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Research 2026 CQU home">
          <span className="brand-mark">R<span>•</span></span>
          <span className="brand-text">RESEARCH <strong>2026</strong><small>CQU READING LIBRARY</small></span>
        </Link>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#library">The library</a>
          <a href="#research-focus">Research focus</a>
          <a className="header-cta" href="#library">Explore papers <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="research-focus">
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-line" /> ANNOTATED RESEARCH COLLECTION <span className="eyebrow-line" /></div>
            <h1>Smarter projects.<br /><em>Fewer delays.</em></h1>
            <p className="hero-description">A focused reading library for assessing how ready regional Queensland construction SMEs are to adopt AI-enabled project management tools for construction delay mitigation.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#library">Browse the articles <ArrowUpRight size={17} /></a>
              <a className="button button-ghost" href="#about">About this collection</a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="blueprint-grid" />
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="art-center"><span>AI</span><small>PROJECT INTELLIGENCE</small></div>
            <div className="art-label label-a"><i /> READINESS</div>
            <div className="art-label label-b"><i /> SCHEDULING</div>
            <div className="art-label label-c"><i /> RISK SIGNALS</div>
          </div>
        </section>

        <section className="overview" id="about">
          <div className="overview-intro"><span className="section-kicker">THE RESEARCH QUESTION</span><h2>Three ideas.<br />One connected picture.</h2></div>
          <div className="overview-grid">
            <div className="overview-item"><span className="overview-number">01</span><h3>Local context</h3><p>What does digital adoption look like in Australian construction, especially among smaller and regional firms?</p></div>
            <div className="overview-item"><span className="overview-number">02</span><h3>Adoption readiness</h3><p>Which skills, resources, data practices and organisational conditions affect SME adoption of AI?</p></div>
            <div className="overview-item"><span className="overview-number">03</span><h3>Delay mitigation</h3><p>How could AI tools identify schedule drift and delay risk early enough for teams to act?</p></div>
          </div>
        </section>

        <section className="library-section" id="library">
          <div className="section-topline"><span className="section-kicker">CURATED JOURNAL ARTICLES</span><span className="issue-number">VOL. 01 — 2026</span></div>
          <div className="library-heading"><div><h2>The reading library<span className="heading-dot">.</span></h2><p>Explore the evidence, follow the sources, and compare what each study contributes.</p></div><div className="paper-count"><strong>{articles.length}</strong><span>PEER-REVIEWED<br />ARTICLES</span></div></div>

          <div className="library-controls">
            <div className="search-field"><Search size={19} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, authors, themes..." aria-label="Search articles" />{query && <button onClick={() => setQuery("")} aria-label="Clear search">×</button>}</div>
            <label className="sort-field"><SlidersHorizontal size={17} aria-hidden="true" /><span>Sort:</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort articles"><option value="relevance">Recommended</option><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select><ChevronDown size={14} aria-hidden="true" /></label>
          </div>
          <div className="theme-tabs" role="group" aria-label="Filter by research theme">
            {(["All papers", ...themes] as Filter[]).map((item) => <button key={item} className={theme === item ? "active" : ""} onClick={() => setTheme(item)} aria-pressed={theme === item}>{item}<span>{item === "All papers" ? articles.length : articles.filter((article) => article.theme === item).length}</span></button>)}
          </div>
          <div className="results-label"><span>SHOWING {results.length} OF {articles.length} PAPERS</span><span>2022 — 2026</span></div>
          <div className="article-grid">
            {results.map((article, index) => <Link href={`/articles/${article.slug}/`} className="article-card" key={article.slug}>
              <div className="card-top"><span className={`theme-badge theme-${article.theme.split(" ")[0].toLowerCase()}`}>{article.theme}</span><ArrowUpRight size={18} /></div>
              <div className="card-index">{String(index + 1).padStart(2, "0")} <span>/ {article.year}</span></div>
              <h3>{article.title}</h3>
              <p className="card-summary">{article.summary}</p>
              <div className="card-bottom"><div><span className="card-authors">{article.authors}</span><span className="card-journal">{article.journal}</span></div><span className="card-arrow">→</span></div>
            </Link>)}
          </div>
          {results.length === 0 && <div className="empty-state"><FileText size={28} /><h3>No papers match that search</h3><p>Try a broader term or select all papers.</p><button onClick={() => { setQuery(""); setTheme("All papers"); }}>Reset filters</button></div>}
        </section>

        <section className="footer-note"><BookOpen size={24} /><div><strong>Read the original study</strong><p>Each article page links to its DOI and available publisher or library access. Article PDFs are not redistributed on this public site.</p></div></section>
      </main>
      <footer className="site-footer"><span>RESEARCH 2026 <b>•</b> CQU READING LIBRARY</span><span>Built for critical reading, not a substitute for the full paper.</span></footer>
    </div>
  );
}
