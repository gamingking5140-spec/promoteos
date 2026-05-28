"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CreateCampaignPage() {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [commission, setCommission] =
    useState("");

  const createCampaign = async () => {
    await supabase
      .from("campaigns")
      .insert([
        {
          title,
          description,
          commission:
            Number(commission),
          slug: title
            .toLowerCase()
            .replaceAll(" ", "-"),
        },
      ]);

    alert("Campaign created 🚀");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white p-6">

        <div className="max-w-3xl mx-auto">

          <div className="mb-12">

            <h1 className="text-6xl font-bold mb-4">
              Create Campaign 🚀
            </h1>

            <p className="text-zinc-400 text-xl">
              Launch a new SaaS promotion campaign.
            </p>

          </div>

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Campaign title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-5 text-xl"
            />

            <textarea
              placeholder="Campaign description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-5 text-xl h-40"
            />

            <input
              type="number"
              placeholder="Commission %"
              value={commission}
              onChange={(e) =>
                setCommission(
                  e.target.value
                )
              }
              className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-5 text-xl"
            />

            <button
              onClick={createCampaign}
              className="bg-white text-black px-8 py-5 rounded-3xl font-bold text-xl w-full"
            >
              Create Campaign
            </button>

          </div>

        </div>

      </main>
    </>
  );
}