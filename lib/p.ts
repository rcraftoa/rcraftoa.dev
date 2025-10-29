import { extractYaml } from "@std/front-matter";
import { P } from "../types.d.ts";
import { render } from "@deno/gfm";

export async function loadPost(id: string): Promise<P | null> {
  const raw = await Deno.readTextFile(`./content/p/${id}.md`).catch(() => null);

  if (!raw) return null;

  const { attrs, body } = extractYaml(raw);
  const params = attrs as Record<string, string>;

  const post: P = {
    id,
    title: params.title,
    body: render(body),
    excerpt: params.excerpt,
  };

  return post;
}
