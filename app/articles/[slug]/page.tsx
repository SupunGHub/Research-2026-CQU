import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, BookOpen, ExternalLink, FileText, Lightbulb, ShieldAlert } from "lucide-react";
import { articleBySlug, articles } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  return {
    title: article ? `${article.title} | Research 2026 CQU` : "Article not found | Research 2026 CQU",
    description: article?.summary,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  const related = articles.filter((item) => item.theme === article.theme && item.slug !== article.slug).slice(0, 2);

  return (
    <div className="site-shell detail-shell">
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Research 2026 CQU home"><span className="brand-mark">R<span>•</span></span><span className="brand-text">RESEARCH <strong>2026</strong><small>CQU READING LIBRARY</small></span></Link>
        <nav className="header-nav" aria-label="Main navigation"><Link href="/#library">The library</Link><Link href="/#research-focus">Research focus</Link><Link className="header-cta" href="/#library">All articles <ArrowUpRight size={15} /></Link></nav>
      </header>
      <main className="detail-main">
        <Link href="/#library" className="back-link"><ArrowLeft size={17} /> Back to all articles</Link>
        <div className="detail-layout">
          <article className="detail-content">
            <div className="detail-kicker"><span className={`theme-badge theme-${article.theme.split(" ")[0].toLowerCase()}`}>{article.theme}</span><span>{article.year} <i /> {article.type}</span></div>
            <h1>{article.title}</h1>
            <p className="detail-byline">{article.authors}</p>
            <p className="detail-journal"><em>{article.journal}</em>, {article.citation}</p>
            <div className="detail-actions"><a className="button button-primary" href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer">View original article <ExternalLink size={16} /></a>{article.hostedPdf && <a className="button button-outline" href={article.hostedPdf} target="_blank" rel="noopener noreferrer">View PDF <FileText size={16} /></a>}{article.fullTextUrl && <a className="button button-outline" href={article.fullTextUrl} target="_blank" rel="noopener noreferrer">Read at publisher <ArrowUpRight size={16} /></a>}{article.libraryUrl && <a className="button button-outline" href={article.libraryUrl} target="_blank" rel="noopener noreferrer">CQU Library record <ArrowUpRight size={16} /></a>}</div>
            <div className="detail-divider" />
            <section className="detail-section"><div className="detail-section-title"><span>01</span><h2>At a glance</h2></div><p className="lead-paragraph">{article.summary}</p></section>
            <section className="detail-section"><div className="detail-section-title"><span>02</span><h2>Key findings</h2></div><ul className="finding-list">{article.findings.map((finding) => <li key={finding}><span className="finding-icon"><Lightbulb size={18} /></span><p>{finding}</p></li>)}</ul></section>
            <section className="detail-section"><div className="detail-section-title"><span>03</span><h2>Why it matters here</h2></div><div className="relevance-box"><span>FOR THE QUEENSLAND SME STUDY</span><p>{article.relevance}</p></div></section>
            <section className="detail-section"><div className="detail-section-title"><span>04</span><h2>Read with care</h2></div><p className="caveat"><ShieldAlert size={19} />{article.caveat}</p></section>
            <div className="citation-block"><div><FileText size={18} /><strong>Source details</strong></div><p>{article.authors} ({article.year}). {article.title}. <em>{article.journal}</em>, {article.citation}. <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noopener noreferrer">https://doi.org/{article.doi}</a></p><small>Check the publisher record for your required citation style before submitting academic work. {article.hostedPdf && <>Hosted PDF: © the authors, published by MDPI under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a>.</>}</small></div>
          </article>
          <aside className="detail-aside"><div className="aside-panel"><span className="aside-heading">PAPER DETAILS</span><dl><div><dt>Published</dt><dd>{article.year}</dd></div><div><dt>Journal</dt><dd>{article.journal}</dd></div><div><dt>Study type</dt><dd>{article.type}</dd></div><div><dt>Access</dt><dd>{article.access}</dd></div><div><dt>DOI</dt><dd>{article.doi}</dd></div></dl><div className="tag-list">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="aside-tip"><BookOpen size={22} /><p>The summary is a reading aid. Use the full article to evaluate methods, evidence and limitations.</p></div></aside>
        </div>
        {related.length > 0 && <section className="related-section"><div className="section-topline"><span className="section-kicker">KEEP EXPLORING</span></div><h2>Related reading<span className="heading-dot">.</span></h2><div className="related-grid">{related.map((item) => <Link href={`/articles/${item.slug}/`} key={item.slug}><span>{item.year} / {item.theme}</span><h3>{item.title}</h3><strong>Read summary <ArrowUpRight size={15} /></strong></Link>)}</div></section>}
      </main>
      <footer className="site-footer"><span>RESEARCH 2026 <b>•</b> CQU READING LIBRARY</span><span>Built for critical reading, not a substitute for the full paper.</span></footer>
    </div>
  );
}
