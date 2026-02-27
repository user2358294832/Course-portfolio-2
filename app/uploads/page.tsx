import Link from "next/link";
import { Background } from "@/components/Background";
import { SidePanel } from "@/components/SidePanel";
import { UploadListItem } from "@/components/UploadListItem";
import { getAllUploads } from "@/lib/uploads";

export default async function UploadsPage() {
  const uploads = await getAllUploads();

  return (
    <div className="site">
      <Background />
      <SidePanel uploads={uploads.slice(0, 2)} />

      <main className="main">
        <header className="header">
          <p className="eyebrow">Ogretim Teknolojileri ve Materyal Tasarimi</p>
          <h1 className="hero-title">Yuklemeler</h1>
          <nav className="nav">
            <Link className="pill" href="/">
              Ana Sayfa
            </Link>
            <Link className="pill active" href="/uploads">
              Yuklemeler
            </Link>
          </nav>
        </header>

        <section className="section">
          <p className="section-label">Tum Yuklemeler</p>
          <div className="list">
            {uploads.length > 0 ? (
              uploads.map((upload) => <UploadListItem key={upload.slug} upload={upload} />)
            ) : (
              <article className="glass list-item">
                <p className="post-desc">Henuz yukleme yok.</p>
              </article>
            )}
          </div>
        </section>

        <footer className="footer">2026 · Ogretim Teknolojileri ve Materyal Tasarimi Dersi</footer>
      </main>
    </div>
  );
}
