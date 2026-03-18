import { AttachmentLink } from './AttachmentLink';
import { PdfEmbed } from './PdfEmbed';
import Quiz from './Quiz'; // 1. Adım: Import edildi

export const components = {
  AttachmentLink,
  PdfEmbed,
  Quiz, // 2. Adım: Obje içine eklendi
};

type BuildMdxComponentsOptions = {
  attachmentEnabled: boolean;
};

export function buildMdxComponents({
  attachmentEnabled,
}: BuildMdxComponentsOptions) {
  return {
    // 3. Adım: Buraya Quiz'i ekliyoruz ki sistem render edebilsin
    Quiz: (props: any) => <Quiz {...props} />, 
    
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
