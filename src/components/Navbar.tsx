"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logoutAction } from "@/redux/userSlice";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
// Komponen bawaan Anda
import { ModeToggle } from "@/components/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
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
    <nav className="sticky top-0 z-30 bg-transparent opacity-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Logo */}
            <Image
              src="/Logo.png"
              alt="Logo ExploreTiK"
              width={300}
              height={300}
              className="z-50 mr-2 h-auto w-[150px] object-contain"
            />
            {/* Teks tambahan (opsional) */}
            {/* <span className="text-xl font-bold transition-colors duration-300 ease-in-out hover:text-sky-600">
              Explore<span className="text-sky-600">TiK</span>
            </span> */}
          </Link>

          {/* Menu untuk layar menengah ke atas (desktop) */}
          <div className="hidden items-center gap-8 font-medium md:flex">
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

              {/* TRENDING */}
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
              
              {/* DASHBOARD */}
              <MenuItem setActive={setActive} active={active} item="Dashboard">
                <div className="flex flex-col space-y-2 text-sm">
                  <HoveredLink href="/dashboard"> Dashboard </HoveredLink>
                </div>
              </MenuItem>

              {/* EXPLORE AI */}
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
                  {!user.id && <HoveredLink href="/login">Sign In</HoveredLink>}
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

              {/* ABOUT */}
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

          {/* MENU MOBILE */}
          <div className="flex items-center gap-2 md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <IconMenu />
              </DropdownMenuTrigger>
              {/* Tambahkan className="bg-white" agar tidak transparan */}
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* HOME */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Home</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    <DropdownMenuItem asChild>
                      <Link href="/">Beranda</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* EVENTS */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Events</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    <DropdownMenuItem asChild>
                      <Link href="/events">List Event</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/create-event">Create Event</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* TRENDING */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Trending</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    {/* untuk mobile, cukup text link sederhana */}
                    <DropdownMenuItem asChild>
                      <Link href="/events">Technology</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/events">Nature</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/events">Sports</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/events">Sports 2</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* VOUCHER */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Voucher</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    <DropdownMenuItem
                      onClick={() => router.push("/create-voucher")}
                    >
                      Create Voucher
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* EXPLORE AI */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Dashboard</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* EXPLORE AI */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>ExploreAI</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    <DropdownMenuItem asChild>
                      <Link href="https://gemini.google.com/app">Gemini</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="https://claude.ai/">Claude</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="https://chat.openai.com/">ChatGPT</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* PROFILE */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Profile</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    {!user.id && (
                      <DropdownMenuItem asChild>
                        <Link href="/login">Sign In</Link>
                      </DropdownMenuItem>
                    )}
                    {!!user.id && (
                      <>
                        <DropdownMenuItem
                          onClick={() => router.push("/profile")}
                        >
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logout}>
                          Logout
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* ABOUT */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>About</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-white">
                    <DropdownMenuItem asChild>
                      <Link href="#journy">Journey</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#services">Services</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#ourteam">Team</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="#contact">Contact</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
