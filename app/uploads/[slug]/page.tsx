import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Background } from "@/components/Background";
import { buildMdxComponents } from "@/components/MdxComponents";
import { formatDate } from "@/lib/dates";
import { getAllUploads, getUploadBySlug } from "@/lib/uploads";

type UploadDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const uploads = await getAllUploads();
  return uploads.map((upload) => ({ slug: upload.slug }));
}

export async function generateMetadata({ params }: UploadDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const upload = await getUploadBySlug(slug);

  if (!upload) {
    return {
      title: "Yukleme bulunamadi",
    };
  }

  return {
    title: `${upload.title} - Ders Portfolyosu`,
    description: upload.description,
  };
}

export default async function UploadDetailPage({ params }: UploadDetailPageProps) {
  const { slug } = await params;
  const upload = await getUploadBySlug(slug);

  if (!upload) {
    notFound();
  }

  const mdxComponents = buildMdxComponents({
    attachmentEnabled: upload.attachment === "yes",
  });

  return (
    <div className="site">
      <Background />

      <main className="main">
        <section className="article-wrap section">
          <Link href="/uploads" className="back-link">
            ← Yuklemelere don
          </Link>

          <article className="glass article-card">
            <header className="article-head">
              <span className="post-tag">{upload.tags[0] ?? "Yukleme"}</span>
              <h1 className="article-title">{upload.title}</h1>
              <p className="article-sub">{formatDate(upload.date)}</p>
            </header>

            <div className="prose">
              <MDXRemote
                source={upload.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
