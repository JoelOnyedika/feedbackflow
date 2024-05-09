"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {navbarRoutes} from "@/lib/constants/index"
import { AlignJustify } from 'lucide-react';


const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
  <div>
    <span>Logo</span>
  </div>
  <div className="flex">
    <div>
      <div className="flex justify-end">
        <Sheet>
      <SheetTrigger asChild>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {navbarRoutes.map((route: any) => (
      <SheetTitle>
        <Link href={route.route}>{route.name}</Link></SheetTitle>
          ))}
          
          
        </SheetHeader>
        <div className="grid gap-4 py-4">
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
    </div>
  </div>
  </div>
</div>
  )
}

export default Navbar;