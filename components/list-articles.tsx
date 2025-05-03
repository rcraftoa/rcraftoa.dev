import { FunctionComponent } from "preact";
import { Post } from "../types.d.ts";

interface Props {
  rows: Post[];
  max: number;
}

interface TagImages {
  [key: string]: string;
}

export const TAGS_IMAGES_DEFAULT = "/tags/brain.svg";
export const TAGS_IMAGES: TagImages = {
  node: "/tags/node.svg",
  brain: "/tags/brain.svg",
  react: "/tags/react.svg",
  java: "/tags/java.svg",
  kotlin: "/tags/kotlin.svg",
};

const ListArticle: FunctionComponent<Props> = ({ rows, max }) => {
  const articles = rows.slice(0, max).map((post: Post) => (
    <Article
      {...post}
    />
  ));
  return <ul className="mx-0">{articles}</ul>;
};

const Article = ({ id, title, date, tags }: Post) => {
  const nameTag = tags[0];
  const tag = TAGS_IMAGES[nameTag] || TAGS_IMAGES_DEFAULT;
  return (
    <li className="list-none">
      <a href={`/blog/${id}`}>
        <article class="flex flex-row rounded-lg shadow-md dark:bg-[#ffffff10] dark:shadow-2xl bg-whipacity py-3 px-2 gap-4 my-4 w-full">
          <div class="flex items-center justify-center">
            <img src={tag} alt="tag" width={50} height={50} />
          </div>
          <div>
            <h5 class="font-medium dark:text-white leading-5">{title}</h5>
            <time class="font-light text-xs">
              {Intl.DateTimeFormat("es", { dateStyle: "long" }).format(
                date,
              )}
            </time>
          </div>
        </article>
      </a>
    </li>
  );
};

export default ListArticle;
