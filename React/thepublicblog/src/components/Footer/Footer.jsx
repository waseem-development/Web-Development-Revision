import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import Container from "../container/Container";
import Logo from "../Logo";

function Footer() {
  const quickLinks = [
    { name: "Home", slug: "/" },
    { name: "All Posts", slug: "/all-posts" },
    { name: "Add Post", slug: "/add-post" },
    { name: "My Posts", slug: "/my-posts" },
    { name: "Profile", slug: "/profile" },
  ];

  return (
    <footer className="border-t border-default bg-surface mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-14 px-4">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              A place for everyone to read, write, and share ideas with the
              world. Join our growing community of writers and readers.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-2">
              {[
                {
                  label: "Instagram",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                },
                {
                  label: "X / Twitter",
                  path: "M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89z"
                },
              ].map(({ label, path }) => (
                <Link
                  key={label}
                  to="#"
                  aria-label={label}
                  className="p-2 rounded-lg border border-default text-muted hover:text-amber hover:border-amber transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ghost mb-5">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.slug}
                    className="text-sm text-muted hover:text-amber transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-ghost mb-5">
              Legal
            </h3>
            <ul className="flex flex-col gap-2.5">
              {["Privacy Policy", "Terms & Conditions"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-sm text-muted hover:text-amber transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-default py-6 px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-ghost">
            © {new Date().getFullYear()} ThePublicBlog. All rights reserved.
          </span>
          <span className="text-xs text-ghost">
            Built with passion for words.
          </span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;