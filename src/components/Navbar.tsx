"use client";

import { ModeToggle } from "@/components/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  // const { data } = useSession();

  // const user = data?.user;

  const logout = () => signOut({});

  return (
    <nav className="sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-xl font-bold">
            Explore<span className="text-orange-500">Tix</span>
          </Link>
          <div className="hidden cursor-pointer items-center gap-8 font-medium md:flex">
            <Link href="/">Home</Link>
            <Link href="/events">Event</Link>
            <Link href="/login">Sign in</Link>
            <>
              <p onClick={() => router.push("/write")}>Create Event</p>
              <p onClick={logout}>Logout</p>
            </>
            <ModeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/events">Event</Link>
                </DropdownMenuItem>
                (
                <DropdownMenuItem>
                  <Link href="/login">Sign in</Link>
                </DropdownMenuItem>
                )
                {
                  <>
                    <DropdownMenuItem>
                      <>
                        <p onClick={() => router.push("/write")}>
                          Create Event
                        </p>
                      </>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <>
                        <p onClick={logout}>Logout</p>
                      </>
                    </DropdownMenuItem>
                  </>
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
