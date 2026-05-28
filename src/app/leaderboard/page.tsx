"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LeaderboardPage() {
  const [promoters, setPromoters] =
    useState<any[]>([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const { data } = await supabase
        .from("promoters")
        .select("*");

      setPromoters(data || []);
    };

    loadLeaderboard();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-6">

        <div className="max-w-5xl mx-auto">

          <div className="mb-12">

            <h1 className="text-6xl font-bold mb-4">
              Leaderboard 🏆
            </h1>

            <p className="text-zinc-400 text-xl">
              Top promoters on PromoteOS.
            </p>

          </div>

          <div className="space-y-5">

            {promoters.map((promoter, index) => (
              <div
                key={promoter.id}
                className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 flex items-center justify-between"
              >

                <div className="flex items-center gap-6">

                  <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center text-2xl font-bold">
                    #{index + 1}
                  </div>

                  <div>

                    <h2 className="text-3xl font-bold">
                      @{promoter.username}
                    </h2>

                    <p className="text-zinc-400">
                      Rising Promoter
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <h3 className="text-4xl font-bold text-green-400">
                    ₹0
                  </h3>

                  <p className="text-zinc-500">
                    Earnings
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </main>
    </>
  );
}