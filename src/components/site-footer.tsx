import { HugeiconsIcon } from "@hugeicons/react";
import {
  Facebook01Icon,
  InstagramIcon,
  NewTwitterIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons";

const socials = [
  { label: "Instagram", icon: InstagramIcon },
  { label: "X", icon: NewTwitterIcon },
  { label: "YouTube", icon: YoutubeIcon },
  { label: "Facebook", icon: Facebook01Icon },
];

const footerLinks = [
  "Collections",
  "Photography",
  "Music",
  "Fashion",
  "Design",
  "About",
  "Explore",
];

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <a className="logo" href="#">
            ARCHIVE<i>.</i>
          </a>
          <nav className="foot-nav" aria-label="Footer">
            {footerLinks.map((label) => (
              <a key={label} href="#">
                {label}
              </a>
            ))}
          </nav>
          <div className="social">
            {socials.map((social) => (
              <a key={social.label} href="#" aria-label={social.label}>
                <HugeiconsIcon icon={social.icon} size={24} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>
        <div className="foot-bot">
          <span>
            © 2025 ARCHIVE. A digital museum of Nigeria’s creative history.
          </span>
          <span className="legal">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Credits</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
