import { loadPost } from "../../lib/posts.ts";
import Markdown from "../../components/Markdown/Markdown.tsx";
import {
  TAGS_IMAGES,
  TAGS_IMAGES_DEFAULT,
} from "../../components/list-articles.tsx";
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

  const { title, body, tags, date } = post;

  const nameTag = tags[0];
  const tag = TAGS_IMAGES[nameTag] || TAGS_IMAGES_DEFAULT;
  return (
    <article class="max-w-2xl mx-auto">
      <header class="mb-10 flex flex-row gap-4">
        <aside className="w-28 h-28">
          <img src={tag} aria-label="image" />
        </aside>
        <section>
          <h1 class="text-4xl font-semibold">{title}</h1>
          <time class="text-gray-800 dark:text-gray-400 text-sm">
            {Intl.DateTimeFormat("es", { dateStyle: "long" }).format(
              date,
            )}
          </time>
        </section>
      </header>
      <Markdown body={body} />
    </article>
  );
});
