import { useState } from "react";
import { Container, Logo, LogoutButton } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"; 

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet"; 

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Sign up", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: true },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const handleNavigate = (slug) => {
    navigate(slug);
    setIsOpen(false);
  };   // navigates to the page AND closes the mobile drawer. Without this, the drawer would stay open after tapping a link.

  return (
    <header className="py-3 shadow bg-gray-900 text-white sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <Logo className="w-[70px]" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems
                  .filter((item) => item.active)
                  .map((item) => (
                    <NavigationMenuItem key={item.name}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        onClick={() => navigate(item.slug)}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}

                {authStatus && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Account</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        <li>
                          <NavigationMenuLink
                            className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                            onClick={() => navigate("/profile")}
                          >
                            Profile
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink
                            className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer"
                            onClick={() => navigate("/my-posts")}
                          >
                            My Posts
                          </NavigationMenuLink>
                        </li>
                        <li className="pt-2 border-t border-gray-700">
                          <LogoutButton />
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md hover:bg-gray-800 transition-colors">
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gray-900 text-white border-gray-800">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  {navItems
                    .filter((item) => item.active)
                    .map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavigate(item.slug)}
                        className="text-left text-lg font-medium hover:text-blue-400 transition-colors py-2"
                      >
                        {item.name}
                      </button>
                    ))}

                  {authStatus && (
                    <>
                      <button
                        onClick={() => handleNavigate("/profile")}
                        className="text-left text-lg font-medium hover:text-blue-400 transition-colors py-2"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => handleNavigate("/my-posts")}
                        className="text-left text-lg font-medium hover:text-blue-400 transition-colors py-2"
                      >
                        My Posts
                      </button>
                      <div className="pt-2">
                        <LogoutButton />
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;