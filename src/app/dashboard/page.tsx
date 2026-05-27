"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase.auth.getSession();

      console.log(data);
      console.log(error);

      if (!data.session) {
        window.location.href = "/";
        return;
      }

      const user = data.session.user;

      const username =
        (user.email?.split("@")[0] || "user") +
        Math.floor(Math.random() * 1000);

      await supabase.from("promoters").upsert({
        user_id: user.id,
        email: user.email,
        username,
        referral_code: username,
      });

      setLoading(false);
    };

    run();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold">
        Dashboard 🚀
      </h1>
    </main>
  );
}