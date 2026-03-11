import React from "react";
import { Link } from "react-router-dom";
import { Globe } from "lucide-react";
import { Container } from "../index";

function Footer() {
  const quickLinks = [
    { name: "Home", slug: "/" },
    { name: "All Posts", slug: "/all-posts" },
    { name: "Add Post", slug: "/add-post" },
    { name: "My Posts", slug: "/my-posts" },
    { name: "Profile", slug: "/profile" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-10">

          {/* Logo + About */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold">
                <span className="text-blue-600">The</span>
                <span className="text-gray-900 dark:text-white">Public</span>
                <span className="text-blue-600">Blog</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              A place for everyone to read, write, and share ideas with the
              world. Join our growing community of writers and readers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.slug}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Follow Us
            </h2>
            <div className="flex gap-4 mb-6">

              {/* Instagram */}
              <Link
                to="#"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </Link>

              {/* Twitter/X */}
              <Link
                to="#"
                className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Twitter/X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89z" />
                </svg>
              </Link>

            </div>

            <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Legal
            </h2>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="px-4 py-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} ThePublicBlog. All Rights Reserved.
          </span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;