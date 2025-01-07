"use client";

import { Button } from "@/components/ui/button";
import { logoutAction } from "@/redux/userSlice";
import { Bell, LogOut, Settings, User, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useState } from "react";

export function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const logOut = () => {
    localStorage.removeItem("blog-storage");
    dispatch(logoutAction());
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-sm">
      <h2 className="text-xl font-bold">Event Management Dashboard</h2>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="relative">
          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <User className="h-5 w-5" />
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-lg bg-white shadow-lg">
              <ul className="py-2 text-sm text-gray-700">
                <li
                  className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => router.push("/profile")}
                >
                  <UserCircle2 className="mr-2 h-4 w-4 text-gray-500" />
                  Profile
                </li>
                <li
                  className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
                  onClick={() => router.push("/dashboard/profile")}
                >
                  <Settings className="mr-2 h-4 w-4 text-gray-500" />
                  Setting Account
                </li>
                <li className="flex cursor-pointer items-center px-4 py-2 text-red-500 hover:bg-gray-100">
                  <p onClick={logOut} className="mr-2 h-4 w-4 text-red-500" />
                  Log Out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
