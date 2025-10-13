import { listProjects } from "../../lib/projects.ts";
import ListWorks from "../../components/list-works.tsx";
import { define } from "../../utils.ts";

export const handler = define.handlers({
  async GET(_ctx) {
    const projects = await listProjects();
    return { data: { projects } };
  },
});

export default define.page<typeof handler>(function Project(props) {
  return (
    <section class="max-w-2xl mx-auto">
      <h2 class="text-xl font-semibold">
        Últimos proyectos
      </h2>
      <ListWorks rows={props.data.projects} max={100} />
    </section>
  );
});
