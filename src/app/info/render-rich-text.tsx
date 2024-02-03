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
          <p className="max-w-prose py-1 access-anchor">{children}</p>
        ),
        heading: ({ children }) => (
          <h3 className="max-w-prose py-1 access-anchor text-xl">{children}</h3>
        ),
      }}
    />
  );
}
