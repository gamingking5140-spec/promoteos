"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  const signIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000",
      },
    });
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center flex-col">
      <h1 className="text-5xl font-bold mb-6">
        PromoteOS 🚀
      </h1>

      <button
        onClick={signIn}
        className="bg-white text-black px-6 py-3 rounded-xl"
      >
        Continue with Google
      </button>
    </main>
  );
}