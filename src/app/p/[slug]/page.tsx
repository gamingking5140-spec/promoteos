"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  useParams,
  useSearchParams,
} from "next/navigation";

export default function ProductPage() {
  const params = useParams();

  const searchParams =
    useSearchParams();

  const ref =
    searchParams.get("ref");

  const [campaign, setCampaign] =
    useState<any>(null);

  useEffect(() => {
    const loadCampaign = async () => {

      const { data, error } =
        await supabase
          .from("campaigns")
          .select("*")
          .eq("slug", params.slug)
          .single();

      console.log(data);
      console.log(data.checkout_url);
      console.log(error);

      if (!data) return;

      setCampaign(data);

      if (ref) {

        localStorage.setItem(
          "referral_code",
          ref
        );

        const visitorId =
          crypto.randomUUID();

        console.log(
          "TRACKING REFERRAL"
        );

        const { error } =
          await supabase
            .from("referrals")
            .insert([
              {
                referral_code: ref,
                product_id: data.id,
                visitor_id: visitorId,
                clicked_at:
                  new Date().toISOString(),
                signed_up: false,
              },
            ]);

        console.log(error);
      }
    };

    loadCampaign();

  }, [params.slug, ref]);

  if (!campaign) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      <div className="max-w-5xl mx-auto py-20">

        <div className="text-center mb-16">

          <img
            src={
              campaign.logo_url ||
              "https://placehold.co/160x160/png"
            }
            alt={campaign.title}
            className="w-32 h-32 rounded-[32px] mx-auto mb-8"
          />

          <h1 className="text-7xl font-bold mb-6">
            {campaign.title}
          </h1>

          <p className="text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {campaign.description}
          </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-[40px] p-12 mb-12 text-center">

          <div className="text-zinc-500 text-xl mb-4">
            Lifetime Deal
          </div>

          <div className="text-7xl font-bold mb-8">
            ₹{campaign.price}
          </div>

          <a
  href={
    campaign.checkout_url ||
    "#"
  }
  target="_blank"
  className="bg-white text-black px-10 py-5 rounded-3xl text-2xl font-bold hover:scale-105 transition inline-block"
>
  Buy Now 🚀
</a>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Fast Setup
            </h2>

            <p className="text-zinc-400">
              Launch workflows in minutes without technical headaches.
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Creator Focused
            </h2>

            <p className="text-zinc-400">
              Designed specifically for creators, indie founders and marketers.
            </p>

          </div>

          <div className="bg-zinc-900 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Lifetime Access
            </h2>

            <p className="text-zinc-400">
              Pay once and keep access forever with future updates included.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}