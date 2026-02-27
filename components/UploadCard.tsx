import Link from "next/link";
import { UploadIcon } from "@/components/UploadIcon";
import type { UploadMeta } from "@/lib/uploads";
import { formatDate } from "@/lib/dates";

type UploadCardProps = {
  upload: UploadMeta;
};

export function UploadCard({ upload }: UploadCardProps) {
  return (
    <Link href={`/uploads/${upload.slug}`} className="featured-card glass">
      <div>
        <span className="post-tag">{upload.tags[0] ?? "Yukleme"}</span>
        <h2 className="post-title">{upload.title}</h2>
        {upload.description ? <p className="post-desc">{upload.description}</p> : null}
        <p className="post-date">{formatDate(upload.date)}</p>
      </div>
      <div className="post-icon">
        <UploadIcon name={upload.icon} className="upload-icon" />
      </div>
    </Link>
  );
}
