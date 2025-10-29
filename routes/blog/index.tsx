import { listPosts } from "../../lib/posts.ts";
import ListArticle from "../../components/list-articles.tsx";
import { define } from "../../utils.ts";

export const handler = define.handlers({
  async GET(_ctx) {
    const posts = await listPosts();
    return { data: { posts } };
  },
});

export default define.page<typeof handler>(function Blog(props) {
  return (
    <section class="max-w-2xl mx-auto">
      <h2 class="text-xl font-semibold">
        Últimos artículos
      </h2>
      <ListArticle rows={props.data.posts} max={100} />
    </section>
  );
});
