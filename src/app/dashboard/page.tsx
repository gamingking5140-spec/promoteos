"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [clicks, setClicks] = useState(0);
  const [signups, setSignups] = useState(0);
  const [sales, setSales] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [coins, setCoins] = useState(0);

  const [activities, setActivities] =
    useState<any[]>([]);

    const [username, setUsername] =
    useState("");
    const [upiId, setUpiId] =
    useState("");


  useEffect(() => {
    const loadDashboard = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data: promoter } =
        await supabase
          .from("promoters")
          .select("*")
          .eq("user_id", session.user.id)
          .single();

      if (!promoter) return;

      setUsername(promoter.username);
      setUpiId(promoter.upi_id || "");
      setCoins(promoter.coins || 0);

      const { data: referrals } =
  await supabase
    .from("referrals")
    .select("*")
    .eq(
      "referral_code",
      promoter.referral_code
    );

const allReferrals =
  referrals || [];

const totalClicks =
  allReferrals.length;

const totalSignups =
  allReferrals.filter(
    (r) => r.signed_up === true
  ).length;

      const { data: salesData } =
  await supabase
    .from("sales")
    .select("*")
    .eq("promoter_id", promoter.id);

const totalSales =
  salesData?.length || 0;

const totalEarnings =
  salesData?.reduce(
    (sum, sale) =>
      sum + sale.commission,
    0
  ) || 0;

      setClicks(totalClicks);
      setSignups(totalSignups);
      setSales(totalSales);
      setEarnings(totalEarnings);

      setActivities(
        [...allReferrals]
          .reverse()
          .slice(0, 5)
      );
    };

    loadDashboard();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-6">

        <div className="max-w-7xl mx-auto">

          <div className="mb-12">

            <h1 className="text-6xl font-bold mb-4">
              Welcome back 👋
            </h1>

            <p className="text-zinc-400 text-xl">
              @{username}
            </p>

{!upiId && (
  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-3xl p-6 mt-6">

    <p className="font-semibold">
  Add UPI to start earning 💸
</p>

    <input
      type="text"
      placeholder="yourupi@paytm"
      value={upiId}
      onChange={(e) =>
        setUpiId(e.target.value)
      }
      className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 mt-4"
    />

    <button
      onClick={async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.user) return;

        await supabase
          .from("promoters")
          .update({
            upi_id: upiId,
            last_upi_change:
              new Date().toISOString(),
          })
          .eq(
            "user_id",
            session.user.id
          );

        alert("UPI Saved ✅");

        window.location.reload();
      }}
      className="mt-4 bg-white text-black px-6 py-3 rounded-2xl font-bold"
    >
      Save UPI
    </button>

  </div>
)}

          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-10">

            <div className="bg-zinc-900 rounded-[32px] p-8 border border-zinc-800">
              <p className="text-zinc-500 mb-3 text-lg">
                Clicks
              </p>

              <h2 className="text-5xl font-bold">
                {clicks}
              </h2>
            </div>

            <div className="bg-zinc-900 rounded-[32px] p-8 border border-zinc-800">
              <p className="text-zinc-500 mb-3 text-lg">
                Signups
              </p>

              <h2 className="text-5xl font-bold">
                {signups}
              </h2>
            </div>

            <div className="bg-zinc-900 rounded-[32px] p-8 border border-zinc-800">
              <p className="text-zinc-500 mb-3 text-lg">
                Sales
              </p>

              <h2 className="text-5xl font-bold">
                {sales}
              </h2>
            </div>

            <div className="bg-zinc-900 rounded-[32px] p-8 border border-zinc-800">
              <p className="text-zinc-500 mb-3 text-lg">
  Available Coins
</p>

<h2 className="text-5xl font-bold text-green-400">
  ₹{coins}
</h2>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-zinc-900 rounded-[32px] p-8 border border-zinc-800">

              <h2 className="text-3xl font-bold mb-6">
                Promoter Status 🚀
              </h2>

              <div className="space-y-5">

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">
                    Current Rank
                  </span>

                  <span className="font-bold text-xl">
                    Rising Promoter
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">
                    Next Unlock
                  </span>

                  <span className="font-bold text-xl">
                    Ambassador Program
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">
                    Required Sales
                  </span>

                  <span className="font-bold text-xl">
                    10 Sales
                  </span>
                </div>

              </div>

            </div>

            <div className="bg-zinc-900 rounded-[32px] p-8 border border-zinc-800">

              <h2 className="text-3xl font-bold mb-6">
                Growth Tips 📈
              </h2>

              <div className="space-y-4 text-zinc-300 text-lg">

                <div className="bg-black rounded-2xl p-4">
                  DM small creators instead of large influencers.
                </div>

                <div className="bg-black rounded-2xl p-4">
                  Personalized outreach converts much better.
                </div>

                <div className="bg-black rounded-2xl p-4">
                  Consistency beats volume in creator outreach.
                </div>

              </div>

            </div>

          </div>

          <div className="mt-8 bg-zinc-900 rounded-[32px] p-8 border border-zinc-800">

            <h2 className="text-3xl font-bold mb-6">
              Recent Activity ⚡
            </h2>

            <div className="space-y-4">

              {activities.length === 0 && (
                <div className="bg-black rounded-2xl p-5 text-zinc-500">
                  No activity yet.
                </div>
              )}

              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-black rounded-2xl p-5 flex items-center justify-between"
                >

                  <div>

                    <p className="text-lg font-semibold">
                      Referral Click
                    </p>

                    <p className="text-zinc-500 text-sm">
                      Visitor ID: {activity.visitor_id}
                    </p>

                  </div>

                  <div className="text-zinc-400">
                    New activity
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </main>
    </>
  );
}