type UploadIconProps = {
  name?: string;
  className?: string;
};

function iconClassFromName(name?: string): string {
  const value = (name ?? "").toLowerCase();

  if (
    value.includes("chart") ||
    value.includes("table") ||
    value.includes("graph") ||
    value.includes("tablo") ||
    value === "📊"
  ) {
    return "bx-bar-chart-alt-2";
  }

  return "bx-file";
}

export function UploadIcon({ name, className }: UploadIconProps) {
  const iconClass = iconClassFromName(name);
  const mergedClassName = ["bx", iconClass, className].filter(Boolean).join(" ");

  return <i className={mergedClassName} aria-hidden="true" />;
}
