import { FunctionComponent } from "preact";
import DropdownMenu from "../islands/drop-down-menu.tsx";

export interface DropdownMenuItemProps {
  href: string;
  label: string;
}

export interface DropdownMenuProps {
  menuItems: DropdownMenuItemProps[];
}
const Menu: FunctionComponent<DropdownMenuProps> = ({ menuItems }) => {
  return (
    <>
      <nav className="hidden sm:block">
        <ul className="flex space-x-2">
          {menuItems.map(({ href, label }) => (
            <li class="list-none" key={href}>
              <a
                href={href}
                class="hover:ring-2 ring-black p-2 rounded-lg flex text-sm flex-col dark:text-gray-300 dark:hover:text-white dark:ring-white items-center transition hover:text-black text-gray-700"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <DropdownMenu menuItems={menuItems} />
    </>
  );
};

export default Menu;
