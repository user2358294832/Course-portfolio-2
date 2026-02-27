"use client";

import Link from "next/link";
import { useState } from "react";
import { UploadIcon } from "@/components/UploadIcon";
import type { UploadMeta } from "@/lib/uploads";
import { formatDate } from "@/lib/dates";

type SidePanelProps = {
  uploads: UploadMeta[];
};

export function SidePanel({ uploads }: SidePanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <aside className="panel-wrap" aria-label="Son yuklemeler paneli">
      <button
        type="button"
        className="panel-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Paneli ac veya kapat"
      />
      <div className={`panel ${open ? "open" : ""}`}>
        <div className="panel-handle">{open ? "▶" : "◀"}</div>
        <div className="panel-inner glass">
          <div className="panel-name">Yunus Emre BIRSEN</div>
          <p className="panel-number">2411216036</p>
          <div className="panel-grid">
            {uploads.length > 0 ? (
              uploads.map((upload) => (
                <Link key={upload.slug} className="panel-card" href={`/uploads/${upload.slug}`}>
                  <UploadIcon name={upload.icon} className="panel-icon" />
                  <br />
                  {upload.title}
                  <br />
                  <small>{formatDate(upload.date)}</small>
                </Link>
              ))
            ) : (
              <p className="panel-card">Henuz yukleme yok</p>
            )}
          </div>
          <Link className="panel-all" href="/uploads">
            Tum Yuklemeler
          </Link>
        </div>
      </div>
    </aside>
  );
}
