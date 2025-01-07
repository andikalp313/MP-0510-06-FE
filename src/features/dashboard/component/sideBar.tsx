import Link from "next/link";
import { BarChart, Calendar, CreditCard, Home, Users } from "lucide-react";

export function Sidebar() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-login2.png')" }}
    >
      <div className="hidden w-64 p-4 text-white md:block">
        <Link href="/" className="text-center text-3xl font-bold">
          Explore<span className="text-sky-600">TiK</span>
        </Link>
        <nav className="pt-10">
          <ul className="space-y-5">
            <li>
              <Link
                href="/"
                className="flex items-center space-x-2 rounded p-2 hover:bg-gray-700"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 rounded p-2 hover:bg-gray-700"
              >
                <BarChart className="h-5 w-5" />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/events"
                className="flex items-center space-x-2 rounded p-2 hover:bg-gray-700"
              >
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/transactions"
                className="flex items-center space-x-2 rounded p-2 hover:bg-gray-700"
              >
                <CreditCard className="h-5 w-5" />
                <span>Transactions</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/attendees"
                className="flex items-center space-x-2 rounded p-2 hover:bg-gray-700"
              >
                <Users className="h-5 w-5" />
                <span>Attendees</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
