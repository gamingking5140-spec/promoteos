"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] =
    useState<any[]>([]);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    const { data } = await supabase
      .from("campaigns")
      .select("*");

    setCampaigns(data || []);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-6">

        <div className="max-w-7xl mx-auto">

          <div className="mb-12">

            <h1 className="text-6xl font-bold mb-4">
              Campaigns 🚀
            </h1>

            <p className="text-zinc-400 text-xl">
              Promote high-converting SaaS products.
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {campaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/campaigns/${campaign.slug}`}
                className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 hover:border-zinc-600 transition"
              >

                <div className="mb-6">

                  <div className="inline-flex bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    {campaign.commission}% Commission
                  </div>

                  <h2 className="text-4xl font-bold mb-4">
                    {campaign.title}
                  </h2>

                  <p className="text-zinc-400 text-lg leading-relaxed">
                    {campaign.description}
                  </p>

                </div>

                <div className="text-white font-bold text-lg">
                  View Campaign →
                </div>

              </Link>
            ))}

          </div>

        </div>

      </main>
    </>
  );
}