type AttachmentLinkProps = {
  href: string;
  label: string;
  exists?: boolean;
};

export function AttachmentLink({ href, label, exists = false }: AttachmentLinkProps) {
  if (!exists) {
    return (
      <span className="attachment-link attachment-missing" aria-disabled="true">
        {label} (henuz yuklenmedi)
      </span>
    );
  }

  return (
    <a className="attachment-link" href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}
