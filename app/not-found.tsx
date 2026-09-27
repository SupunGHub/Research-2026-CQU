import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><h1>Article not found</h1><p>Return to the reading library to browse all papers.</p><Link className="button button-primary" href="/">View library</Link></main>;
}
