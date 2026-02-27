import type { MDXComponents } from "mdx/types";
import { AttachmentLink } from "@/components/AttachmentLink";
import { PdfEmbed } from "@/components/PdfEmbed";

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
