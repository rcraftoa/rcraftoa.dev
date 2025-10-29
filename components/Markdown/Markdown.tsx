import { CSS } from "@deno/gfm";

import "prismjs/components/prism-json.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-tsx.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-diff.js";

interface MarkdownProps {
  body: string;
}

const Markdown = ({ body }: MarkdownProps) => (
  <div>
    <style
      dangerouslySetInnerHTML={{ __html: CSS }}
    />
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </div>
);

export default Markdown;
