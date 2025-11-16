import { HttpError } from "fresh";
import ListArticle from "../../../components/list-articles.tsx";
import { listPostsByTag } from "../../../lib/posts.ts";
import { define } from "../../../utils.ts";

export const handler = define.handlers({
  async GET(ctx) {
    const { id } = ctx.params;
    const posts = await listPostsByTag(id);

    if (!posts.length) {
      throw new HttpError(404);
    }

    return { data: { posts, id } };
  },
});

export default define.page<typeof handler>((props) => {
  return (
    <section class="max-w-2xl mx-auto">
      <h2 class="text-xl font-semibold">
        Últimos artículos - {props.data.id}
      </h2>
      <ListArticle rows={props.data.posts} max={100} />
    </section>
  );
});
