"use client";

import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

interface RenderRichTextProps {
  data: any;
}

export default function RenderRichText({ data }: RenderRichTextProps) {
  const content: BlocksContent = data.attributes.content;

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className="py-1 access-anchor">{children}</p>
        ),
        heading: ({ children }) => (
          <h3 className="py-1 access-anchor text-xl">{children}</h3>
        ),
      }}
    />
  );
}
