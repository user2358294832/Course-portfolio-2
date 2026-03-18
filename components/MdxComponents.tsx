import { AttachmentLink } from './AttachmentLink';
import { PdfEmbed } from './PdfEmbed';

export const components = {
  AttachmentLink,
  PdfEmbed,
};

type BuildMdxComponentsOptions = {
  attachmentEnabled: boolean;
};

export function buildMdxComponents({
  attachmentEnabled,
}: BuildMdxComponentsOptions) {
  return {
    AttachmentLink: (props: any) => (
      <AttachmentLink {...props} exists={props.exists ?? attachmentEnabled} />
    ),
    PdfEmbed: (props: any) => {
      if (!attachmentEnabled) {
        return null;
      }
      return <PdfEmbed {...props} exists={props.exists ?? true} />;
    },
    a: (props: any) => {
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
