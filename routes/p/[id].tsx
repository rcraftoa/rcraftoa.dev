import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost } from "../../lib/p.ts";
import Markdown from "../../components/Markdown/Markdown.tsx";

export const handler: Handlers = {
  async GET(request, context) {
    const { id } = context.params;
    const post = await loadPost(id);
    return context.render({ post });
  },
};
function PagePost(props: PageProps) {
  const { post } = props?.data || {};
  return (
    <section class="max-w-2xl mx-auto">
      <header class="mb-6">
        <h1 class="text-3xl font-bold">{post.title}</h1>
      </header>
      <Markdown body={post.body} />
    </section>
  );
}

export default PagePost;
