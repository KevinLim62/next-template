"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavItems } from "@/lib/types";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

const navItems: NavItems[] = [
  {
    title: "Forms",
    href: "/example/forms",
    description: "Form template",
  },
  {
    title: "Data Tables",
    href: "/example/datatables",
    description: "Data table template",
  },
];

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="absolute top-0 left-0 w-full bg-muted-foreground">
      <div className="flex flex-row items-center justify-between p-5">
        <NavigationMenu>
          <NavigationMenuList className="space-x-3">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Template</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {navItems.map((item) => (
                    <NavItem
                      key={item.title}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                    />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/listing" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Listing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {session ? (
          <div className="flex flex-row gap-3">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>{session.user.username}</AvatarFallback>
            </Avatar>
            <Button variant="outline" onClick={() => signOut()}>
              Sign Out
            </Button>
          </div>
        ) : (
          <>
            <Button variant="outline" onClick={() => signIn()}>
              Sign In
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const NavItem: React.FC<NavItems> = ({
  title,
  href,
  description,
  className,
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          href={href}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
