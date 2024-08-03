"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navbarRoutes } from "@/lib/constants/index";
import { AlignJustify, Home, User, Settings, HelpCircle } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const icons = {
    Home: <Home />,
    User: <User />,
    Settings: <Settings />,
    Help: <HelpCircle />,
  };

  return (
    <nav className="w-full px-4 py-2 shadow-md bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Logo</div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4 items-center">
          {navbarRoutes.map((route) => (
            <Link
              key={route.name}
              href={route.route}
              className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
            >
              <span>{route.name}</span>
            </Link>
          ))}
        </div>

        <div className="md:flex hidden space-x-4">
          <Link
            href={"/login"}
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Login</span>
          </Link>
          <Link
            href={"/signup"}
            className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
          >
            Signup
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <AlignJustify />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                {navbarRoutes.map((route) => (
                  <SheetClose asChild key={route.name}>
                    <Link
                      href={route.route}
                      className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{route.name}</span>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
