import { FunctionalComponent } from "preact";
import { Project } from "../types.d.ts";

interface Props {
  rows: Project[];
  max: number;
}
const ListWorks: FunctionalComponent<Props> = ({ rows, max }) => {
  const projects = rows.slice(0, max).map((project: Project) => (
    <Works {...project} />
  ));
  return max < 10
    ? <ul class="mx-0">{projects}</ul>
    : <ul class="mx-0 grid grid-cols-1 md:grid-cols-2 gap-4">{projects}</ul>;
};

const Works = ({ id, image, title }: Project) => {
  return (
    <li class="list-none">
      <a href={`/proyectos/${id}`}>
        <article class="rounded-lg shadow-md dark:bg-[#ffffff10] dark:shadow-2xl bg-whipacity py-2 px-3 my-4 w-full">
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
          <h5 class="font-medium mt-2 leading-normal dark:text-white">
            {title}
          </h5>
        </article>
      </a>
    </li>
  );
};
export default ListWorks;
