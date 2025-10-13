import { createDefine } from "fresh";
import { Post, Project } from "./types.d.ts";

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.
export interface State {
  posts: Post[];
  projects: Project[];
}

export const define = createDefine<State>();
