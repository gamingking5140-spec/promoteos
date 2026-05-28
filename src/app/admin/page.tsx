"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AdminPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-6">

        <div className="max-w-7xl mx-auto">

          <div className="mb-12">

            <h1 className="text-6xl font-bold mb-4">
              Admin Dashboard ⚙️
            </h1>

            <p className="text-zinc-400 text-xl">
              Manage campaigns, payouts, and platform growth.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <Link
              href="/admin/test-sales"
              className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 hover:border-zinc-600 transition"
            >

              <h2 className="text-3xl font-bold mb-4">
                Test Sales 🧪
              </h2>

              <p className="text-zinc-400 text-lg">
                Simulate purchases and commissions.
              </p>

            </Link>

            <Link
              href="/campaigns"
              className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 hover:border-zinc-600 transition"
            >

              <h2 className="text-3xl font-bold mb-4">
                Campaigns 🚀
              </h2>

              <p className="text-zinc-400 text-lg">
                View active SaaS campaigns.
              </p>

            </Link>

            <Link
              href="/leaderboard"
              className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 hover:border-zinc-600 transition"
            >

              <h2 className="text-3xl font-bold mb-4">
                Promoters 🏆
              </h2>

              <p className="text-zinc-400 text-lg">
                Track promoter rankings and growth.
              </p>

            </Link>

          </div>

        </div>

      </main>
    </>
  );
}