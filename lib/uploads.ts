import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type UploadMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  icon?: string;
  description?: string;
  attachment: "yes" | "no";
};

export type UploadEntry = UploadMeta & {
  content: string;
};

const uploadsDir = path.join(process.cwd(), "content", "uploads");

function normalizeMeta(slug: string, data: Record<string, unknown>): UploadMeta {
  const title = typeof data.title === "string" ? data.title : slug;
  const date = typeof data.date === "string" ? data.date : "1970-01-01";
  const icon = typeof data.icon === "string" ? data.icon : "file";
  const description = typeof data.description === "string" ? data.description : "";
  const attachment = data.attachment === "yes" ? "yes" : "no";
  const tags = Array.isArray(data.tags)
    ? data.tags.filter((item): item is string => typeof item === "string")
    : [];

  return {
    slug,
    title,
    date,
    tags,
    icon,
    description,
    attachment,
  };
}

function byNewestDate(a: UploadMeta, b: UploadMeta): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export async function getAllUploads(): Promise<UploadMeta[]> {
  try {
    const files = await fs.readdir(uploadsDir);
    const entries = await Promise.all(
      files
        .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx?$/, "");
          const source = await fs.readFile(path.join(uploadsDir, file), "utf8");
          const { data } = matter(source);
          return normalizeMeta(slug, data as Record<string, unknown>);
        }),
    );
    return entries.sort(byNewestDate);
  } catch {
    return [];
  }
}

export async function getUploadBySlug(slug: string): Promise<UploadEntry | null> {
  const mdxPath = path.join(uploadsDir, `${slug}.mdx`);
  const mdPath = path.join(uploadsDir, `${slug}.md`);

  let source = "";
  try {
    source = await fs.readFile(mdxPath, "utf8");
  } catch {
    try {
      source = await fs.readFile(mdPath, "utf8");
    } catch {
      return null;
    }
  }

  const { data, content } = matter(source);
  return {
    ...normalizeMeta(slug, data as Record<string, unknown>),
    content,
  };
}
