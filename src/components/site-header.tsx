import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

const navLinks = [
  { href: "#archive", label: "Collections" },
  { href: "#featured", label: "About" },
  { href: "#thennow", label: "Explore" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <a className="logo" href="#" aria-label="ARCHIVE home">
          ARCHIVE<i>.</i>
        </a>
        <nav className="nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <button className="search" type="button" aria-label="Search">
          <HugeiconsIcon icon={Search01Icon} size={24} strokeWidth={1.6} />
        </button>
      </div>
    </header>
  );
}
