"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <nav className="flex items-center justify-between mb-24">

          <h1 className="text-3xl font-bold">
            PromoteOS 🚀
          </h1>

          <Link
            href="/login"
            className="bg-white text-black px-6 py-3 rounded-2xl font-semibold"
          >
            Login
          </Link>

        </nav>

        <div className="max-w-4xl">

          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-5 py-3 rounded-full mb-8">

            <div className="w-3 h-3 rounded-full bg-green-400"></div>

            <span className="text-zinc-300">
              Creator Growth Marketplace
            </span>

          </div>

          <h1 className="text-6xl md:text-8xl font-bold leading-[0.95] mb-8">

            Promote SaaS.
            <br />

            Earn Real Money.

          </h1>

          <p className="text-zinc-400 text-xl md:text-2xl leading-relaxed max-w-2xl mb-12">

            Join the next-generation promoter network helping SaaS founders grow through creator outreach.

          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-24">

            <Link
              href="/login"
              className="bg-white text-black px-8 py-5 rounded-3xl font-bold text-xl text-center"
            >
              Start Promoting →
            </Link>

            <Link
              href="/campaigns"
              className="border border-zinc-700 px-8 py-5 rounded-3xl font-bold text-xl text-center"
            >
              View Campaigns
            </Link>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8">

            <h2 className="text-3xl font-bold mb-4">
              Promote
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Share curated SaaS products with creators and audiences.
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8">

            <h2 className="text-3xl font-bold mb-4">
              Earn
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Receive commissions for every successful signup or sale.
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8">

            <h2 className="text-3xl font-bold mb-4">
              Scale
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Top performers unlock ambassador privileges and higher opportunities.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}