import { PageProps } from "fresh";
import { Logo } from "../components/Icons/Logo.tsx";
import Menu from "../components/menu.tsx";
import { footerLinks, navbarLinks } from "../constanst/navigation.ts";
import ToggleButton from "../islands/toggle-button.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <>
      <Navbar />
      <main className="pt-20 px-4">
        <Component />
      </main>
      <Footer />
    </>
  );
}

function Navbar() {
  return (
    <header class="fixed w-full py-2 dark:bg-[#00000000] bg-[#ffffff50] backdrop-blur-xl z-20">
      <div class="max-w-4xl mx-auto">
        <div className="flex px-4">
          <a href="/" className="flex items-center">
            <div class="w-10">
              <Logo />
            </div>
            <span className="text-xl font-bold ml-2">
              Roberto Toalongo
            </span>
          </a>
          <div class="flex-1"></div>
          <div className="flex flex-row">
            <ToggleButton />
            <Menu menuItems={navbarLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="text-gray-800 py-4 flex justify-center">
      <ul class="flex justify-center">
        {footerLinks.map(({ label, to }) => (
          <li class="list-none" key={label}>
            <a
              class="p-4 text-sm-2 hover:underline hover:underline-offset-2 dark:text-white"
              href={to}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
