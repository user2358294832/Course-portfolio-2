type PdfEmbedProps = {
  src: string;
  title?: string;
  exists?: boolean;
};

export function PdfEmbed({ src, title = "PDF", exists = false }: PdfEmbedProps) {
  if (!exists) {
    return (
      <section className="pdf-embed">
        <div className="pdf-actions">
          <strong>{title}</strong>
        </div>
        <p className="pdf-missing">Bu PDF henuz sisteme yuklenmedi.</p>
      </section>
    );
  }

  return (
    <section className="pdf-embed">
      <div className="pdf-actions">
        <strong>{title}</strong>
        <span>
          <a href={src} target="_blank" rel="noopener noreferrer">
            Yeni sekmede ac
          </a>{" "}
          · <a href={src}>Indir</a>
        </span>
      </div>
      <iframe
        className="pdf-frame"
        src={`${src}#view=FitH`}
        title={title}
        loading="lazy"
      />
    </section>
  );
}
