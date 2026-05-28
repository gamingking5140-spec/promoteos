"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();

    router.push("/");
  };

  return (
    <nav className="w-full border-b border-zinc-800 bg-black">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          href="/dashboard"
          className="text-2xl font-bold"
        >
          PromoteOS 🚀
        </Link>

        <div className="flex items-center gap-4 flex-wrap">

          <Link
            href="/dashboard"
            className="text-zinc-300 hover:text-white transition"
          >
            Dashboard
          </Link>

          <Link
            href="/campaigns"
            className="text-zinc-300 hover:text-white transition"
          >
            Campaigns
          </Link>

          <Link
            href="/leaderboard"
            className="text-zinc-300 hover:text-white transition"
          >
            Leaderboard
          </Link>

          <Link
            href="/withdrawals"
            className="text-zinc-300 hover:text-white transition"
          >
            Withdrawals
          </Link>

          <button
            onClick={logout}
            className="bg-white text-black px-4 py-2 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}