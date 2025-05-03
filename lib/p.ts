import { extract } from "$std/front_matter/any.ts";
import { P } from "../types.d.ts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

export async function loadPost(id: string): Promise<P | null> {
  const raw = await Deno.readTextFile(`./content/p/${id}.md`).catch(() => null);

  if (!raw) return null;

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(body);

  const post: P = {
    id,
    title: params.title,
    body: String(file),
    excerpt: params.excerpt,
  };

  return post;
}
