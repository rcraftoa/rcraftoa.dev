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

export default define.page<typeof handler>((props) => {
  const { post } = props?.data || {};

  if (!post) return <div>No post found</div>;

  const { title, body, tags, date } = post;

  const nameTag = tags;
  const tag = TAGS_IMAGES[nameTag] || TAGS_IMAGES_DEFAULT;
  return (
    <article class="max-w-2xl mx-auto">
      <header class="mb-10 flex flex-col gap-4">
        <h1 class="text-4xl font-semibold">{title}</h1>
        <section className="flex items-center mx-auto w-full gap-2">
          <a
            class="flex items-center gap-1"
            href={`/blog/category/${tags}`}
          >
            <div className="size-5">
              <img src={tag} aria-label="image" />
            </div>
            <span className="uppercase underline underline-offset-2">
              {tags}
            </span>
          </a>
          <span>|</span>
          <time class="text-gray-800 dark:text-gray-400 text-lg">
            {Intl.DateTimeFormat("es", { dateStyle: "long" }).format(date)}
          </time>
        </section>
      </header>
      <Markdown body={body} />
    </article>
  );
});
