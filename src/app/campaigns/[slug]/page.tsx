"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function CampaignPage() {

  const params = useParams();

  const slug =
    Array.isArray(params.slug)
      ? params.slug[0]
      : params.slug;

  const [campaign, setCampaign] =
    useState<any>(null);

  const [promoter, setPromoter] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadPage = async () => {

      console.log("PAGE LOADED");
      console.log("SLUG:", slug);

      if (!slug) {
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log("SESSION:", session);

      if (!session?.user) {
        setLoading(false);
        return;
      }

      const { data: promoterData, error: promoterError } =
        await supabase
          .from("promoters")
          .select("*")
          .eq(
            "user_id",
            session.user.id
          )
          .single();

      console.log(
        "PROMOTER:",
        promoterData
      );

      console.log(
        "PROMOTER ERROR:",
        promoterError
      );

      const { data: campaignData, error } =
        await supabase
          .from("campaigns")
          .select("*")
          .eq("slug", slug)
          .single();

      console.log(
        "CAMPAIGN:",
        campaignData
      );

      console.log(
        "CAMPAIGN ERROR:",
        error
      );

      setPromoter(promoterData);
      setCampaign(campaignData);

      setLoading(false);
    };

    loadPage();

  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading...
        </main>
      </>
    );
  }

  if (!campaign) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            Campaign not found
          </h1>
        </main>
      </>
    );
  }

  if (!promoter) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            Promoter not found
          </h1>
        </main>
      </>
    );
  }

  const referralLink =
    `https://promoteos.vercel.app/p/${campaign.slug}?ref=${promoter.referral_code}`;

  const estimated =
    Math.floor(
      campaign.price *
      (campaign.commission / 100)
    );

  const outreachScript =
    campaign.outreach_script ||
`Hey! 👋

I found an amazing SaaS tool called ${campaign.title}.

It can genuinely help creators grow faster and improve conversions.

Check it out here:
${referralLink}

There is also a special lifetime deal available right now 🚀`;

  const copyLink = async () => {

    await navigator.clipboard.writeText(
      referralLink
    );

    alert("Referral link copied!");
  };

  const copyScript = async () => {

    await navigator.clipboard.writeText(
      outreachScript
    );

    alert("Outreach script copied!");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-6">

        <div className="max-w-6xl mx-auto">

          <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-10 mb-8">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

              <div className="flex items-center gap-6">

                <img
                  src={
                    campaign.logo_url ||
                    "https://placehold.co/200x200/png"
                  }
                  alt={campaign.title}
                  className="w-28 h-28 rounded-[32px] object-cover"
                />

                <div>

                  <h1 className="text-6xl font-bold mb-3">
                    {campaign.title}
                  </h1>

                  <p className="text-zinc-400 text-xl max-w-2xl">
                    {campaign.description}
                  </p>

                </div>

              </div>

              <div className="bg-green-500/20 text-green-400 px-6 py-4 rounded-3xl text-2xl font-bold">
                {campaign.commission}% Commission
              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <div className="bg-zinc-900 rounded-3xl p-8">

              <p className="text-zinc-500 mb-3">
                Product Price
              </p>

              <h2 className="text-5xl font-bold">
                ₹{campaign.price}
              </h2>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">

              <p className="text-zinc-500 mb-3">
                You Earn Per Sale
              </p>

              <h2 className="text-5xl font-bold text-green-400">
                ₹{estimated}
              </h2>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">

              <p className="text-zinc-500 mb-3">
                Campaign Type
              </p>

              <h2 className="text-3xl font-bold">
                Lifetime Deal
              </h2>

            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-zinc-900 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-5">
                Referral Link 🔗
              </h2>

              <div className="bg-black p-5 rounded-2xl break-all mb-5 text-zinc-300">
                {referralLink}
              </div>

              <button
                onClick={copyLink}
                className="bg-white text-black px-6 py-4 rounded-2xl font-semibold w-full"
              >
                Copy Referral Link
              </button>

            </div>

            <div className="bg-zinc-900 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-5">
                Outreach Script ✍️
              </h2>

              <div className="bg-black p-5 rounded-2xl whitespace-pre-wrap text-zinc-300 mb-5 h-[220px] overflow-auto">
                {outreachScript}
              </div>

              <button
                onClick={copyScript}
                className="bg-white text-black px-6 py-4 rounded-2xl font-semibold w-full"
              >
                Copy Script
              </button>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}