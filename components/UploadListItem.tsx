import Link from "next/link";
import { UploadIcon } from "@/components/UploadIcon";
import type { UploadMeta } from "@/lib/uploads";
import { formatDate } from "@/lib/dates";

type UploadListItemProps = {
  upload: UploadMeta;
};

export function UploadListItem({ upload }: UploadListItemProps) {
  return (
    <Link href={`/uploads/${upload.slug}`} className="list-item glass">
      <div className="post-icon">
        <UploadIcon name={upload.icon} className="upload-icon" />
      </div>
      <div>
        <span className="post-tag">{upload.tags[0] ?? "Yukleme"}</span>
        <h2 className="list-title">{upload.title}</h2>
        {upload.description ? <p className="list-meta">{upload.description}</p> : null}
        <p className="post-date">{formatDate(upload.date)}</p>
      </div>
    </Link>
  );
}
