"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const login = async () => {

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {

      alert(error.message);

      setLoading(false);
      return;
    }

    window.location.href = "/dashboard";
  };

  const signup = async () => {

    setLoading(true);

    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {

      alert(error.message);

      setLoading(false);
      return;
    }

    if (data.user) {

      await supabase
        .from("promoters")
        .insert([
          {
            user_id: data.user.id,
            referral_code:
              Math.random()
                .toString(36)
                .substring(2, 8),
            coins: 0,
            clicks: 0,
            signups: 0,
            sales: 0,
          },
        ]);
    }

    alert(
      "Account created successfully 🚀"
    );

    window.location.href = "/dashboard";
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

        <div className="w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-[40px] p-10">

          <h1 className="text-5xl font-bold mb-4">
            Welcome 👋
          </h1>

          <p className="text-zinc-400 text-lg mb-10">
            Login or create your promoter account.
          </p>

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 text-lg outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-black border border-zinc-800 rounded-2xl px-5 py-4 text-lg outline-none"
            />

            <button
              onClick={login}
              disabled={loading}
              className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg"
            >
              Login
            </button>

            <button
              onClick={signup}
              disabled={loading}
              className="w-full border border-zinc-700 py-4 rounded-2xl font-bold text-lg"
            >
              Create Account
            </button>

          </div>

        </div>

      </main>
    </>
  );
}