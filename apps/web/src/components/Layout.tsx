"use client";

import Link from "next/link";
import { CircleUser, Menu } from "lucide-react";
import { Button } from "@peanut/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@peanut/ui/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@peanut/ui/components/ui/sheet";
import Image from "next/image";
import peanutman from "../../public/peanutman.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@peanut/ui/components/ui/select";
import {
  constants,
  SupportedChainsIds,
} from "../../../../packages/peanute-common/dist";
import { useExplorerChain } from "../context/ChainContext";
import { getChainImageURL } from "../helpers";
import { HTMLAttributeAnchorTarget } from "react";
import BlurryBackground from './BlurryBackground';

export const description =
  "An application shell with a header and main content area. The header has a navbar, a search input and and a user nav dropdown. The user nav is toggled by a button with an avatar image. The main content area is divided into two rows. The first row has a grid of cards with statistics. The second row has a grid of cards with a table of recent transactions and a list of recent sales.";

const networkNames: Record<SupportedChainsIds, string> = {
  "10": "Optimism",
  "137": "Polygon",
  "42161": "Arbitrum",
  "8453": "Base",
  "324": "ZKsync Era",
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { setChainId, chainId: explorerChainId } = useExplorerChain();

  const links: {
    name: string;
    href: string;
    target?: HTMLAttributeAnchorTarget;
  }[] = [
    {
      name: "API Playground",
      href: constants.subgraphURLs[explorerChainId],
      target: "_blank",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <BlurryBackground />
      <header className="sticky top-0 flex bg-white/70 z-10 h-16 items-center gap-4 border-b bg-background/70 backdrop-blur-md px-4 md:px-6">
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
              key={link.href}
              href={link.href}
              target={link.target ?? "_self"}
              className="text-foreground transition-colors hover:text-foreground text-nowrap"
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
                <p className="text-3xl md:text-4xl tracking-tighter text-nowrap font-peanut">
                  Peanut Explorer
                </p>
              </Link>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.target ?? "_self"}
                  className="hover:text-foreground text-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link
          href="#"
          className="flex md:hidden items-center gap-2 text-lg font-semibold"
        >
          <Image
            className="w-8 h-8"
            src={peanutman}
            alt=""
            height={100}
            width={100}
          />
        </Link>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 justify-end">
          <Image
            src={getChainImageURL(explorerChainId.toString())}
            height={100}
            width={100}
            alt=""
            className="w-6 h-6"
          />
          <Select
            onValueChange={(value) => {
              setChainId(parseInt(value) as SupportedChainsIds);
            }}
          >
            <SelectTrigger className="w-[180px]">
              {networkNames[explorerChainId]}
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Networks</SelectLabel>
                {Object.keys(constants.subgraphURLs).map((chainId) => (
                  <SelectItem value={chainId} key={chainId}>
                    <div className="flex flex-row items-center justify-start gap-2">
                      <Image
                        src={getChainImageURL(chainId)}
                        height={100}
                        width={100}
                        alt=""
                        className="w-6 h-6"
                      />
                      {networkNames[parseInt(chainId) as SupportedChainsIds]}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>{" "}
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
