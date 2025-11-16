import { FunctionComponent } from "preact";

interface Props {
  to: string;
  text: string;
}
const LinkNext: FunctionComponent<Props> = ({ to, text }) => {
  return (
    <a
      href={to}
      class="relative group overflow-auto dark:text-gray-400 dark:hover:text-white text-gray-700 hover:text-black transition w-56 flex space-x-2 items-center"
    >
      <span className="relative font-semibold">{text}</span>
      <div class="flex items-center -space-x-3 translate-x-1">
        <div class="w-2.5 h-[1.9px] rounded bg-black scale-x-0 dark:bg-white transition duration-300 group-hover:scale-x-100" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 -translate-x-2 transition duration-300 group-hover:translate-x-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  );
};

export default LinkNext;
