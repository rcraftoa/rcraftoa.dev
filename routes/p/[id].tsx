import { loadPost } from "../../lib/p.ts";
import Markdown from "../../components/Markdown/Markdown.tsx";
import { define } from "../../utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const { id } = ctx.params;
    const post = await loadPost(id);
    return { data: { post } };
  },
});

export default define.page<typeof handler>(function PagePost(props) {
  const { post } = props?.data || {};

  if (!post) return <div>No post found</div>;

  return (
    <section class="max-w-2xl mx-auto">
      <header class="mb-6">
        <h1 class="text-3xl font-bold">{post.title}</h1>
      </header>
      <Markdown body={post.body} />
    </section>
  );
});
