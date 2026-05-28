"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [email, setEmail] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const createFakeSale = async () => {
    const referralCode =
      localStorage.getItem("referral_code");

    if (!referralCode) {
      alert("No referral found");
      return;
    }

    const { data: promoter } = await supabase
      .from("promoters")
      .select("*")
      .eq("referral_code", referralCode)
      .single();

    if (!promoter) {
      alert("Promoter not found");
      return;
    }

    const commission =
      Number(amount) * 0.3;

    await supabase.from("sales").insert([
      {
        promoter_id: promoter.id,
        customer_email: email,
        amount: Number(amount),
        commission: commission,
        status: "completed",
      },
    ]);

    const newCoins =
      promoter.coins +
      Math.floor(commission);

    await supabase
      .from("promoters")
      .update({
        coins: newCoins,
      })
      .eq("id", promoter.id);

    await supabase
      .from("referrals")
      .update({
        signed_up: true,
      })
      .eq("referral_code", referralCode);

    alert("Sale tracked!");
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Test 🚀
      </h1>

      <div className="max-w-md space-y-4">

        <input
          type="email"
          placeholder="Customer email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-zinc-900 p-4 rounded-xl"
        />

        <input
          type="number"
          placeholder="Sale amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full bg-zinc-900 p-4 rounded-xl"
        />

        <button
          onClick={createFakeSale}
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold w-full"
        >
          Create Sale
        </button>

      </div>

    </main>
  );
}