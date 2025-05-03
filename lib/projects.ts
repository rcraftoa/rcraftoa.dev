import type { Project } from "../types.d.ts";
import { extract } from "$std/front_matter/any.ts";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

export async function loadProject(id: string): Promise<Project | null> {
  const raw = await Deno.readTextFile(`./content/projects/${id}.md`).catch(
    () => null,
  );

  if (!raw) return null;

  const { attrs, body } = extract(raw);
  const params = attrs as Record<string, string>;
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(body);
  const project: Project = {
    id,
    title: params.title,
    body: String(file),
    image: params.image,
    date: new Date(params.date),
    excerpt: params.excerpt,
  };

  return project;
}

export async function listProjects(): Promise<Project[]> {
  const promises = [];

  for await (const entry of Deno.readDir("./content/projects")) {
    const { name } = entry;
    const [id] = name.split(".");
    if (id) promises.push(loadProject(id));
  }

  const projects = (await Promise.all(promises)) as Project[];

  projects.sort((a, b) => {
    return b.date.getTime() - a.date.getTime();
  });

  return projects;
}

export async function listProjectsSequencially(): Promise<Project[]> {
  const projects = [];
  for await (const entry of Deno.readDir("./content/projects")) {
    const { name } = entry;
    const [id] = name.split(".");
    const project = await loadProject(id);
    if (!project) continue;
    projects.push(project);
  }
  return projects;
}
