"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminWithdrawalsPage() {

  const [withdrawals, setWithdrawals] =
    useState<any[]>([]);

  useEffect(() => {

    const loadWithdrawals = async () => {

      const { data } =
  await supabase
    .from("withdrawals")
    .select(`
      *,
      promoters(*)
    `)
          .order("created_at", {
            ascending: false,
          });

      setWithdrawals(data || []);
    };

    loadWithdrawals();

  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-6">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-6xl font-bold mb-4">
            Withdrawal Requests 💸
          </h1>

          <p className="text-zinc-400 text-xl mb-10">
            Review promoter payouts.
          </p>

          <div className="space-y-4">

            {withdrawals.map((item) => (

              <div
                key={item.id}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex items-center justify-between"
              >

                <div>

  <p className="text-lg font-bold">
  Promoter ID: {item.promoter_id}
</p>

  <h2 className="text-2xl font-bold mt-2">
    ₹{item.amount}
  </h2>

  <p className="text-zinc-500 mb-3">
    {item.status}
  </p>

  {item.status === "pending" && (

    <button
      onClick={async () => {

        await supabase
          .from("withdrawals")
          .update({
            status: "paid",
          })
          .eq("id", item.id);

        window.location.reload();

      }}
      className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold"
    >
      Mark Paid
    </button>

  )}

</div>

              </div>

            ))}

          </div>

        </div>

      </main>
    </>
  );
}