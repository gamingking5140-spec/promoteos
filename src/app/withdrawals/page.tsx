"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WithdrawalsPage() {

  const [coins, setCoins] =
    useState(0);

  const [withdrawals, setWithdrawals] =
    useState<any[]>([]);

  useEffect(() => {

    const loadCoins = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data: promoter } =
        await supabase
          .from("promoters")
          .select("*")
          .eq(
            "user_id",
            session.user.id
          )
          .single();

      if (!promoter) return;

      setCoins(promoter.coins || 0);

      const {
        data: withdrawalData,
      } = await supabase
        .from("withdrawals")
        .select("*")
        .eq(
          "promoter_id",
          promoter.id
        )
        .order("created_at", {
          ascending: false,
        });

      setWithdrawals(
        withdrawalData || []
      );
    };

    loadCoins();

  }, []);

  const withdraw = async () => {

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return;

    const { data: promoter } =
      await supabase
        .from("promoters")
        .select("*")
        .eq(
          "user_id",
          session.user.id
        )
        .single();

    if (!promoter) return;

    if (coins < 500) {

      alert(
        "Minimum withdrawal is 500 coins"
      );

      return;
    }

    await supabase
      .from("withdrawals")
      .insert([
        {
          promoter_id: promoter.id,
          coins: coins,
          amount: coins,
          status: "pending",
        },
      ]);

    await supabase
      .from("promoters")
      .update({
        coins: 0,
      })
      .eq("id", promoter.id);

    setCoins(0);

    alert(
      "Withdrawal request submitted 🚀"
    );

    location.reload();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-6">

        <div className="max-w-4xl mx-auto">

          <div className="mb-12">

            <h1 className="text-6xl font-bold mb-4">
              Withdrawals 💸
            </h1>

            <p className="text-zinc-400 text-xl">
              Convert your earnings into real payouts.
            </p>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-10 mb-8">

            <p className="text-zinc-500 text-xl mb-4">
              Available Coins
            </p>

            <h2 className="text-7xl font-bold mb-6">
              {coins}
            </h2>

            <div className="bg-black rounded-3xl p-6 mb-6">

              <p className="text-zinc-400 text-lg leading-relaxed">
                100 coins = ₹100 payout.
                <br />
                Minimum withdrawal: 500 coins.
              </p>

            </div>

            <button
              onClick={withdraw}
              className="bg-white text-black px-8 py-5 rounded-3xl font-bold text-xl w-full"
            >
              Request Withdrawal
            </button>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-8 mb-8">

            <h2 className="text-3xl font-bold mb-6">
              Withdrawal History 💸
            </h2>

            <div className="space-y-4">

              {withdrawals.length === 0 && (
                <div className="bg-black rounded-2xl p-5 text-zinc-500">
                  No withdrawals yet.
                </div>
              )}

              {withdrawals.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-black rounded-2xl p-5 flex items-center justify-between"
                  >

                    <div>

                      <p className="text-xl font-semibold">
                        ₹{item.amount}
                      </p>

                      <p className="text-zinc-500 text-sm capitalize">
                        {item.status}
                      </p>

                    </div>

                    <div className="text-zinc-400 text-sm">
                      Withdrawal Request
                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-8">

            <h2 className="text-3xl font-bold mb-6">
              Payout Information 🏦
            </h2>

            <div className="space-y-4 text-zinc-300 text-lg">

              <div className="bg-black rounded-2xl p-5">
                Payouts are reviewed manually for security.
              </div>

              <div className="bg-black rounded-2xl p-5">
                Most withdrawals are processed within 24 hours.
              </div>

              <div className="bg-black rounded-2xl p-5">
                Fake or fraudulent referrals may result in account suspension.
              </div>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}