import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, Sun, Moon, ChevronDown, PenLine } from "lucide-react";
import Logo from "../Logo";
import LogoutButton from "../LogoutButton";
import Container from "../container/Container";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );
  const [scrolled, setScrolled] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const navItems = [
    { name: "Home", slug: "/" },
    { name: "All Posts", slug: "/all-posts" },
    ...(authStatus ? [] : [
      { name: "Login", slug: "/login" },
    ]),
  ];

  const isActive = (slug) => location.pathname === slug;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/95 backdrop-blur-md border-b border-default shadow-sm"
          : "bg-surface border-b border-default"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.slug}
                onClick={() => navigate(item.slug)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive(item.slug)
                    ? "text-amber"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item.name}
                {isActive(item.slug) && (
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-amber rounded-full" />
                )}
              </button>
            ))}

            {/* Account dropdown */}
            {authStatus && (
              <div className="relative">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-md"
                >
                  Account
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${accountOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-default rounded-xl shadow-lg overflow-hidden z-50">
                    {[
                      { label: "Profile", slug: "/profile" },
                      { label: "My Posts", slug: "/my-posts" },
                    ].map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => { navigate(item.slug); setAccountOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-surface-raised transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                    <div className="border-t border-default p-2">
                      <LogoutButton />
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-raised transition-colors"
            >
              {isDark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>

            {/* Write CTA — desktop only */}
            {authStatus && (
              <button
                onClick={() => navigate('/add-post')}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber text-[oklch(0.08_0_0)] text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                <PenLine size={14} />
                Write
              </button>
            )}

            {/* Sign up CTA — desktop only, logged out */}
            {!authStatus && (
              <button
                onClick={() => navigate('/signup')}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber text-[oklch(0.08_0_0)] text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Get started
              </button>
            )}

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-raised transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-default bg-surface">
          <Container>
            <nav className="flex flex-col py-4 gap-1">
              {navItems.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => navigate(item.slug)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.slug)
                      ? "text-amber bg-amber-glow"
                      : "text-foreground hover:bg-surface-raised"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {authStatus && (
                <>
                  <button
                    onClick={() => navigate('/profile')}
                    className="text-left px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-surface-raised transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate('/my-posts')}
                    className="text-left px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-surface-raised transition-colors"
                  >
                    My Posts
                  </button>
                  <button
                    onClick={() => navigate('/add-post')}
                    className="flex items-center gap-2 mx-4 mt-2 px-4 py-2.5 bg-amber text-[oklch(0.08_0_0)] text-sm font-medium rounded-lg justify-center"
                  >
                    <PenLine size={14} /> Write a post
                  </button>
                  <div className="px-4 mt-1">
                    <LogoutButton />
                  </div>
                </>
              )}
              {!authStatus && (
                <button
                  onClick={() => navigate('/signup')}
                  className="flex items-center justify-center mx-4 mt-2 px-4 py-2.5 bg-amber text-[oklch(0.08_0_0)] text-sm font-medium rounded-lg"
                >
                  Get started
                </button>
              )}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}

export default Header;