"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import { supabase } from "@/lib/supabaseClient";

// Define a Profile type for TypeScript safety
interface Profile {
  name: string;
  age: number | null;
  healthComplications: string;
  notifyBadWeather: boolean;
}

// Use Inter as a modern sans-serif font
const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

// ============= FALLING LEAVES ANIMATION =============
const FallingLeaves = () => {
  const leaves = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 30 + 20, // 20-50px
    delay: Math.random() * 10,
    duration: Math.random() * 8 + 6, // 6-14s fall
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute text-blue-300/40 will-change-transform animate-leaf"
          style={{
            left: leaf.left,
            top: "-10%",
            fontSize: `${leaf.size}px`,
            animation: `leafFall ${leaf.duration}s linear infinite`,
            animationDelay: `${leaf.delay}s`,
            transform: `rotate(${leaf.rotation}deg)`,
          }}
        >
          🍂
        </div>
      ))}
      <style jsx>{`
        @keyframes leafFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0.2;
          }
        }
        .animate-leaf {
          animation: leafFall linear infinite;
        }
      `}</style>
    </div>
  );
};

// ============= MAIN PROFILE COMPONENT =============
export default function UserProfilePage() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [healthComplications, setHealthComplications] = useState("");
  const [notifyBadWeather, setNotifyBadWeather] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profile: Profile = {
      name: fullName,
      age: age,
      healthComplications,
      notifyBadWeather,
    };

    const { data, error } = await supabase.from("profiles").insert([profile]);

    if (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    } else {
      console.log("Profile saved:", data);
      alert("Profile saved to Supabase!");
    }
  };

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-200 overflow-hidden ${inter.className}`}
    >
      {/* Falling leaves animation */}
      <FallingLeaves />

      {/* UI content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {/* Glassmorphism card */}
        <div className="w-full max-w-md backdrop-blur-md bg-white/30 rounded-3xl shadow-2xl border border-white/40 p-8 space-y-6">
          {/* Header */}
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-700 via-teal-600 to-blue-800 bg-clip-text text-transparent">
            User Profile
          </h1>

          {/* Profile form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition text-blue-950 placeholder-blue-600/50"
                placeholder="e.g., Jane Doe"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age ?? ""}
                onChange={(e) =>
                  setAge(e.target.value ? Number(e.target.value) : null)
                }
                className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition text-blue-950 placeholder-blue-600/50"
                placeholder="Your age"
                min="0"
                max="150"
              />
            </div>

            {/* Health Complications */}
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-1">
                Health Complications{" "}
                <span className="font-normal text-blue-700">(optional)</span>
              </label>
              <textarea
                value={healthComplications}
                onChange={(e) => setHealthComplications(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-sm border border-white/60 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition text-blue-950 placeholder-blue-600/50"
                placeholder="e.g., asthma, allergies..."
              />
            </div>

            {/* Toggle switch */}
            <div className="flex items-center justify-between bg-white/30 p-4 rounded-xl backdrop-blur-sm">
              <span className="font-medium text-blue-900">
                Notify me when weather is too bad
              </span>
              <button
                type="button"
                onClick={() => setNotifyBadWeather(!notifyBadWeather)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  notifyBadWeather
                    ? "bg-gradient-to-r from-blue-600 to-teal-500"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                    notifyBadWeather ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Save button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-teal-700 transform hover:scale-[1.02] transition-all duration-200 focus:ring-4 focus:ring-blue-300"
            >
              Save Profile
            </button>
          </form>

          {/* Extra hint */}
          <p className="text-center text-sm text-blue-800/70">
            Your profile is stored securely.
          </p>
        </div>
      </div>
    </div>
  );
}