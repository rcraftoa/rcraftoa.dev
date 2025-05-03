import { listPosts } from "./posts.ts";
import { listProjects } from "./projects.ts";

export async function listsHome() {
  const posts = await listPosts();
  const projects = await listProjects();
  return { posts: posts, projects: projects };
}
