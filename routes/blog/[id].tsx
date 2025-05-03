import { Handlers, PageProps } from "$fresh/server.ts";
import { loadPost } from "../../lib/posts.ts";
import Markdown from "../../components/Markdown/Markdown.tsx";
import {
  TAGS_IMAGES,
  TAGS_IMAGES_DEFAULT,
} from "../../components/list-articles.tsx";

export const handler: Handlers = {
  async GET(request, context) {
    const { id } = context.params;
    const post = await loadPost(id);
    return context.render({ post });
  },
};
function PagePost(props: PageProps) {
  const { post: { title, body, tags, date } } = props?.data || {};
  const nameTag = tags[0];
  const tag = TAGS_IMAGES[nameTag] || TAGS_IMAGES_DEFAULT;
  return (
    <article class="max-w-2xl mx-auto">
      <header class="mb-10 flex flex-row gap-4">
        <aside className="w-28 h-28">
          <img src={tag} alt="tag image" />
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
}

export default PagePost;
