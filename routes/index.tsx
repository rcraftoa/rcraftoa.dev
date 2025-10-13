import ListArticle from "../components/list-articles.tsx";
import ListWorks from "../components/list-works.tsx";
import Skills from "../components/list-skills.tsx";
import LinkNext from "../components/link.tsx";
import Social from "../components/socials.tsx";
import { Logo } from "../components/Icons/Logo.tsx";
import { define } from "../utils.ts";
import { listPosts } from "../lib/posts.ts";
import { listProjects } from "../lib/projects.ts";

export const handler = define.handlers({
  async GET(_ctx) {
    const posts = await listPosts();
    const projects = await listProjects();
    return { data: { posts, projects } };
  }
})

export default define.page<typeof handler>(function Home(props) {
  return (
    <section class="flex justify-between flex-col md:grid md:grid-cols-3 lg:grid-cols-4 lg:grid-flow-col gap-4 max-w-6xl mx-auto">
      <aside class="mx-auto md:mx-0 lg:row-span-3">
        <header>
          <div className="h-48 w-48 mb-3 dark:bg-[#ffffff10] bg-whipacity dark:bg-black rounded-full">
            <div className="p-4">
              <Logo />
            </div>
          </div>
          <h1 class="flex justify-center text-center md:text-left md:block text-4xl font-semibold dark:text-white">
            Roberto
            <br />
            Toalongo
          </h1>
        </header>
        <article class="text-center md:text-left md:block-base font-normal py-6 dark:text-white">
          (Developer/Designer)
        </article>
        <footer class="flex justify-center md:block">
          <Social />
        </footer>
      </aside>

      <section class="col-span-3 md:col-span-2 lg:col-span-3">
        <h2 class="text-xl font-semibold dark:text-white">Skills</h2>
        <Skills />
      </section>

      <section class="col-span-3 md:col-span-2 lg:col-span-2">
        <h2 class="text-xl font-semibold dark:text-white">
          Últimos artículos
        </h2>
        <ListArticle rows={props.data.posts} max={10} />
        <LinkNext to="blog" text="Artículos anteriores" />
      </section>
      <section class="row-span-2 col-span-3 md:col-span-1">
        <h2 class="text-xl font-semibold dark:text-white">
          Últimos proyectos
        </h2>
        <ListWorks rows={props.data.projects} max={5} />
        <LinkNext to="proyectos" text="Proyectos anteriores" />
      </section>
    </section>
  );
});
