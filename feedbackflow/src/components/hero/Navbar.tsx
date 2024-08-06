"use client";

import * as React from "react";
import Link from "next/link";
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
import { getCookies } from '@/lib/serverActions/auth-actions'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { menuItems } from '@/lib/constants'

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isUserSignedUp, setIsUserSignedUp] = React.useState(false)

  async function getUserCookie() {
    try {
      const userCookie = await getCookies('userCookie')
      if (userCookie) {
        setIsUserSignedUp(true)
      }  
    } catch(error) {
      console.log('Error with fetching cookies', error)
    }
      
  }

  React.useEffect(() => {
    getUserCookie()
  }, [])

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
              <route.icon  className="w-4 h-4"/>
              <span>{route.name}</span>
            </Link>
          ))}
        </div>

        <div className="md:flex hidden space-x-4">
          { isUserSignedUp ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {menuItems.map((item, index) => (
                    item.isSubMenu ? (
                      <DropdownMenuSub key={index}>
                        <DropdownMenuSubTrigger>
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.text}</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {item.subItems.map((subItem, subIndex) => (
                              <DropdownMenuItem key={subIndex} disabled={subItem.disabled}>
                                <subItem.icon className="mr-2 h-4 w-4" />
                                <span>{subItem.text}</span>
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    ) : (
                      <DropdownMenuItem key={index} disabled={item.disabled}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.text}</span>
                      </DropdownMenuItem>
                    )
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
            ) : (
          <>
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
          </>) }
          
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
                      <route.icon  className="w-4 h-4"/>
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
