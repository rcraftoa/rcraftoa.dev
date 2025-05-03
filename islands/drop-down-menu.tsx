import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import { DropdownMenuProps } from "../components/menu.tsx";

const DropdownMenu: FunctionComponent<DropdownMenuProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="block sm:hidden">
      <div className="dropdown items-center">
        <button
          type="button"
          className="p-1 w-9 h-9"
          onClick={toggleMenu}
          aria-label="Menu de navegación"
        >
          <MenuIcon />
        </button>
        <div
          className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="rounded-md bg-white dark:bg-[#1d1817] shadow-xs">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {menuItems.map(({ href, label }) => (
                <a
                  href={href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black dark:hover:bg-[#ffffff10] dark:hover:text-white"
                  key={href}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="dark:fill-white fill-white fill-current"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
    </g>
    <g id="SVGRepo_iconCarrier">
      <g id="style=stroke">
        <g id="menu-hotdog">
          <path
            id="vector (Stroke)"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.25 6C4.25 5.58579 4.51691 5.25 4.84615 5.25H19.1538C19.4831 5.25 19.75 5.58579 19.75 6C19.75 6.41421 19.4831 6.75 19.1538 6.75H4.84615C4.51691 6.75 4.25 6.41421 4.25 6Z"
          >
          </path>{" "}
          <path
            id="vector (Stroke)_2"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H3C2.58579 12.75 2.25 12.4142 2.25 12Z"
          >
          </path>{" "}
          <path
            id="vector (Stroke)_3"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.25 18C4.25 17.5858 4.51691 17.25 4.84615 17.25H19.1538C19.4831 17.25 19.75 17.5858 19.75 18C19.75 18.4142 19.4831 18.75 19.1538 18.75H4.84615C4.51691 18.75 4.25 18.4142 4.25 18Z"
          >
          </path>
        </g>
      </g>
    </g>
  </svg>
);

export default DropdownMenu;
