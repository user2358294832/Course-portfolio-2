import Link from "next/link";
import { Background } from "@/components/Background";
import { SidePanel } from "@/components/SidePanel";
import { UploadCard } from "@/components/UploadCard";
import { getAllUploads } from "@/lib/uploads";

export default async function Home() {
  const uploads = await getAllUploads();
  const latest = uploads[0];

  return (
    <div className="site">
      <Background />
      <SidePanel uploads={uploads.slice(0, 2)} />

      <main className="main">
        <header className="header">
          <p className="eyebrow">Ogretim Teknolojileri ve Materyal Tasarimi</p>
          <h1 className="hero-title">Ders Portfolyosu</h1>
          <nav className="nav">
            <Link className="pill active" href="/">
              Ana Sayfa
            </Link>
            <Link className="pill" href="/uploads">
              Yuklemeler
            </Link>
          </nav>
        </header>

        <section className="section">
          <p className="section-label">Son Yukleme</p>
          {latest ? (
            <UploadCard upload={latest} />
          ) : (
            <article className="glass featured-card">
              <p className="post-desc">Henuz yukleme yok.</p>
            </article>
          )}
        </section>

        <footer className="footer">2026 · Ogretim Teknolojileri ve Materyal Tasarimi Dersi</footer>
        {/*dn: Bu Satırı Silme!*/}
        <span hidden data-easter-egg="Tebrikler! Bir yumurta buldun 🥚🍳">
          egg
        </span>
      </main>
    </div>
  );
}
