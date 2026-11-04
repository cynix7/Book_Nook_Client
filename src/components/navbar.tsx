"use client";

import { BookOpen, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/all-books", label: "All Books" },
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function navLinkClassName(active: boolean) {
  return cn(
    "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
    active && "text-foreground underline decoration-2 underline-offset-4",
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex h-16 container items-center justify-between px-4">

        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-orange-500 to-red-600 text-white">
            <BookOpen className="size-5" />
          </span>
          <span className="font-heading text-lg font-bold">
            Book<span className="text-orange-600">Nook</span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden flex-1 items-center justify-center gap-6 sm:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={navLinkClassName(isActive(pathname, link.href))}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link
            href="/login"
            className={buttonVariants({ variant: "ghost" })}
          >
            Login
          </Link>
          <Link href="/register" className={buttonVariants()}>
            Register
          </Link>
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Open menu"
                className="sm:hidden"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation menu
              </SheetDescription>
            </SheetHeader>
            <nav
              aria-label="Mobile"
              className="flex flex-col gap-4 px-4"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClassName(isActive(pathname, link.href))}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 p-4">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className={buttonVariants({ variant: "ghost", className: "w-full" })}
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className={buttonVariants({ className: "w-full" })}
              >
                Register
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
