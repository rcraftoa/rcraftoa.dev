import { Handlers, PageProps } from "$fresh/server.ts";
import { loadProject } from "../../lib/projects.ts";
import Markdown from "../../components/Markdown/Markdown.tsx";

export const handler: Handlers = {
  async GET(request, context) {
    const { id } = context.params;
    const post = await loadProject(id);
    return context.render({ post });
  },
};
function PageProject(props: PageProps) {
  const { post: { title, body, image } } = props?.data || {};
  return (
    <article class="max-w-2xl mx-auto divide-y divide-black dark:divide-white">
      <header class="mb-6 flex flex-col">
        <picture>
          <source srcset={`/projects/${image}.avif`} type="image/avif" />
          <img
            src={`/projects/${image}.webp`}
            className="rounded-lg cover my-1"
            alt={image}
            width="1440"
            height="720"
          />
        </picture>
        <h1 class="text-3xl font-semibold">{title}</h1>
      </header>
      <article className="mt-9">
        <br />
        <Markdown body={body} />
      </article>
    </article>
  );
}

export default PageProject;
