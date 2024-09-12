import Link from "next/link";
import { CircleUser, Menu, Search } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Input } from "@repo/ui/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import Image from "next/image";
import peanutman from "../../public/peanutman.svg";

export const description =
  "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image. The main content area is divided into two rows. The first row has a grid of cards with statistics. The second row has a grid of cards with a table of recent transactions and a list of recent sales.";

const links: any[] = [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex bg-white z-10 h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col  gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <div className="flex flex-row items-center gap-2">
            <Link
              href="#"
              className="flex w-10 h-10 items-center gap-2 text-lg font-semibold md:text-base"
            >
              <div className="">
                <Image
                  className=""
                  src="/peanutman.svg"
                  alt=""
                  height={100}
                  width={100}
                />
              </div>
            </Link>
            <p className="text-3xl md:text-4xl tracking-tighter text-nowrap font-peanut">
              Peanut Explorer
            </p>
          </div>
          {links.map((link) => (
            <Link
              href={link.href}
              className="text-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Image
                  className="w-8 h-8"
                  src={peanutman}
                  alt=""
                  height={100}
                  width={100}
                />
              </Link>
              {links.map((link) => (
                <Link href={link.href} className="hover:text-foreground">
                  {link.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Create Link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
