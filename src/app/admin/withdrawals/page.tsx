"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminWithdrawalsPage() {
  const [withdrawals, setWithdrawals] =
    useState<any[]>([]);

  useEffect(() => {
    loadWithdrawals();
  }, []);

  const loadWithdrawals = async () => {
    const { data } = await supabase
      .from("withdrawals")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    setWithdrawals(data || []);
  };

  const approveWithdrawal = async (
    id: string
  ) => {
    await supabase
      .from("withdrawals")
      .update({
        status: "approved",
      })
      .eq("id", id);

    loadWithdrawals();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-6">

        <div className="max-w-5xl mx-auto">

          <div className="mb-12">

            <h1 className="text-6xl font-bold mb-4">
              Withdrawal Requests 💸
            </h1>

            <p className="text-zinc-400 text-xl">
              Review promoter payout requests.
            </p>

          </div>

          <div className="space-y-5">

            {withdrawals.map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 flex items-center justify-between"
              >

                <div>

                  <h2 className="text-3xl font-bold mb-2">
                    {withdrawal.coins} Coins
                  </h2>

                  <p className="text-zinc-400">
                    Status: {withdrawal.status}
                  </p>

                </div>

                <button
                  onClick={() =>
                    approveWithdrawal(
                      withdrawal.id
                    )
                  }
                  className="bg-white text-black px-6 py-3 rounded-2xl font-bold"
                >
                  Approve
                </button>

              </div>
            ))}

          </div>

        </div>

      </main>
    </>
  );
}