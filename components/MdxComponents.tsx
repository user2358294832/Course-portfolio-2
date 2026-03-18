import { AttachmentLink } from './AttachmentLink';
import { PdfEmbed } from './PdfEmbed';
import Quiz from './Quiz'; // 1. Adım: Quiz bileşenini import et

// ... varsa diğer importlar

export const components = {
  AttachmentLink,
  PdfEmbed,
  Quiz, // 2. Adım: Bileşeni buraya ekle
  // ... varsa diğer bileşenler
};

type BuildMdxComponentsOptions = {
  attachmentEnabled: boolean;
};

export function buildMdxComponents({
  attachmentEnabled,
}: BuildMdxComponentsOptions): MDXComponents {
  return {
    AttachmentLink: (props) => (
      <AttachmentLink {...props} exists={props.exists ?? attachmentEnabled} />
    ),
    PdfEmbed: (props) => {
      if (!attachmentEnabled) {
        return null;
      }

      return <PdfEmbed {...props} exists={props.exists ?? true} />;
    },
    a: (props) => {
      const isExternal = props.href?.startsWith("http");
      return (
        <a
          {...props}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        />
      );
    },
  };
}
