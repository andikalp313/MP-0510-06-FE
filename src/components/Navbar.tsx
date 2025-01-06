"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutAction } from "@/redux/slices/userslice";
import { useAppSelector } from "@/redux/hooks";

// Komponen bawaan Anda
import { ModeToggle } from "@/components/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brain, Cloud, Menu as IconMenu, MessageSquare } from "lucide-react";

// Komponen menu dari kode demo
import {
  Menu,
  MenuItem,
  HoveredLink,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null);

  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.user);

  const logout = () => {
    // contoh logout sederhana
    localStorage.removeItem("exploretix-storage");
    dispatch(logoutAction());
    router.push("/login");
  };

  // Rute-rute yang tidak perlu menampilkan Navbar
  const hideNavbarRoutes = [
    "/dashboard",
    "/dashboard/events",
    "/dashboard/transactions",
    "/dashboard/attendees",
    "/dashboard/profile",
  ];

  if (hideNavbarRoutes.includes(pathName)) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-30 bg-white opacity-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold transition-colors duration-300 ease-in-out hover:text-sky-600"
          >
            Explore<span className="text-sky-600">TiK</span>
          </Link>

          {/* Menu untuk layar menengah ke atas (md) */}
          <div className="hidden items-center gap-8 font-medium md:flex">
            {/* Contoh penerapan Menu yang Anda inginkan */}
            <Menu setActive={setActive}>
              {/* HOME */}
              <MenuItem setActive={setActive} active={active} item="Home">
                <div className="flex flex-col space-y-2 text-sm">
                  <HoveredLink href="/">Beranda</HoveredLink>
                </div>
              </MenuItem>

              {/* EVENTS */}
              <MenuItem setActive={setActive} active={active} item="Events">
                <div className="flex flex-col space-y-2 text-sm">
                  <HoveredLink href="/events">List Event</HoveredLink>
                  <HoveredLink href="/create-event">Create Event</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Trending">
                <div className="grid grid-cols-2 gap-10 p-4 text-sm">
                  <ProductItem
                    title="Technology"
                    href="/events"
                    src="https://res.cloudinary.com/andikalp/image/upload/v1736131518/ai_y9ayum.png"
                    description="Prepare for tech interviews like never before."
                  />
                  <ProductItem
                    title="Nature"
                    href="/events"
                    src="https://res.cloudinary.com/andikalp/image/upload/v1736131413/Biru_Putih_Minimalis_Seminar_Hari_Laut_Banner_yccben.png"
                    description="Production ready Tailwind css components."
                  />
                  <ProductItem
                    title="Sports"
                    href="/events"
                    src="https://res.cloudinary.com/andikalp/image/upload/v1736131413/Orange_Yellow_Green_Creative_Sportsfest_Banner_pwd4x0.png"
                    description="Never write from scratch again."
                  />
                  <ProductItem
                    title="Sports"
                    href="/events"
                    src="https://res.cloudinary.com/andikalp/image/upload/v1736131413/Beige_Red_Black_Illustrative_Basketball_Tournament_Banner_ywhuta.png"
                    description="Respond to government RFPs 10x faster using AI"
                  />
                </div>
              </MenuItem>

              {/* VOUCHER */}
              <MenuItem setActive={setActive} active={active} item="Voucher">
                <div className="flex flex-col space-y-2 text-sm">
                  <HoveredLink href="/create-voucher">
                    Create Voucher
                  </HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="ExploreAI">
                <div className="flex flex-col space-y-2 text-sm">
                  <HoveredLink href="https://gemini.google.com/app">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      <span>Gemini</span>
                    </div>
                  </HoveredLink>

                  <HoveredLink href="https://claude.ai/">
                    <div className="flex items-center gap-2">
                      <Cloud className="h-4 w-4" />
                      <span>Claude</span>
                    </div>
                  </HoveredLink>

                  <HoveredLink href="https://chat.openai.com/">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>ChatGPT</span>
                    </div>
                  </HoveredLink>
                </div>
              </MenuItem>

              {/* PROFILE */}
              <MenuItem setActive={setActive} active={active} item="Profile">
                <div className="flex flex-col space-y-2 text-sm">
                  {/* Jika belum login, tampilkan Sign In */}
                  {!user.id && <HoveredLink href="/login">Sign In</HoveredLink>}

                  {/* Jika sudah login, tampilkan Profile & Logout */}
                  {!!user.id && (
                    <>
                      <HoveredLink href="/profile">Profile</HoveredLink>
                      <p
                        onClick={logout}
                        className="cursor-pointer hover:text-sky-600"
                      >
                        Logout
                      </p>
                    </>
                  )}
                </div>
              </MenuItem>

              <Link href="/about">
                <MenuItem setActive={setActive} active={active} item="About">
                  <div className="flex flex-col space-y-2 text-sm">
                    <HoveredLink href="#journy">Journey</HoveredLink>
                    <HoveredLink href="#services">Services</HoveredLink>
                    <HoveredLink href="#ourteam">Team</HoveredLink>
                    <HoveredLink href="#contact">Contact</HoveredLink>
                  </div>
                </MenuItem>
              </Link>
            </Menu>
          </div>

          {/* Menu dropdown untuk layar kecil (mobile) */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IconMenu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* HOME */}
                <DropdownMenuItem asChild>
                  <Link href="/">Home</Link>
                </DropdownMenuItem>

                {/* EVENT */}
                <DropdownMenuItem asChild>
                  <Link href="/events">Event</Link>
                </DropdownMenuItem>

                {/* CREATE EVENT */}
                <DropdownMenuItem onClick={() => router.push("/create-event")}>
                  Create Event
                </DropdownMenuItem>

                {/* VOUCHER */}
                <DropdownMenuItem
                  onClick={() => router.push("/create-voucher")}
                >
                  Create Voucher
                </DropdownMenuItem>

                {/* PROFILE & LOGIN/LOGOUT */}
                {!user.id && (
                  <DropdownMenuItem asChild>
                    <Link href="/login">Sign in</Link>
                  </DropdownMenuItem>
                )}
                {!!user.id && (
                  <>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
