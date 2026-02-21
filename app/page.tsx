"use client";

import React from "react";
import Link from "next/link";
import {
  Cloud,
  Search,
  User,
  Bell,
  Activity,
  Menu,
  X,
} from "lucide-react";

// --- Reusable Components ---
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 px-3 py-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}

function FeatureCard({
  href,
  icon,
  title,
  description,
  gradient,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-start gap-3 p-6 rounded-xl shadow-lg bg-gradient-to-r ${gradient} text-white hover:scale-105 transition-transform`}
    >
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </Link>
  );
}

// --- Main Home Page ---
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/30 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-400/30 dark:bg-teal-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-emerald-400/30 dark:bg-emerald-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 w-full backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border-b border-white/20 dark:border-slate-700/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                VitalAir
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/city">Search</NavLink>
              <NavLink href="/alerts">Alerts</NavLink>
              <NavLink href="/risk">Health Risk</NavLink>
              <Link
                href="/profile"
                className="px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-sm hover:shadow-lg transition-all"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 p-4 flex flex-col gap-4 shadow-xl">
            <MobileNavLink href="/city" icon={<Search className="w-5 h-5" />} label="City Search" />
            <MobileNavLink href="/alerts" icon={<Bell className="w-5 h-5" />} label="Alerts" />
            <MobileNavLink href="/risk" icon={<Activity className="w-5 h-5" />} label="Health Risk" />
            <MobileNavLink href="/profile" icon={<User className="w-5 h-5" />} label="Profile" />
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-sm font-medium mb-2">
            <Cloud className="w-4 h-4" />
            <span>Breathe Better Today</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            VitalAir
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Track Weather & Air Quality Instantly. <br className="hidden md:block" />
            <span className="font-medium text-blue-600 dark:text-blue-400">
              Real-time insights for a healthier life.
            </span>
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          <FeatureCard
            href="/city"
            icon={<Search className="w-8 h-8 text-blue-500" />}
            title="City Search"
            description="Find air quality data for any location worldwide."
            gradient="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            href="/profile"
            icon={<User className="w-8 h-8 text-purple-500" />}
            title="User Profile"
            description="Manage your preferences and saved locations."
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            href="/alerts"
            icon={<Bell className="w-8 h-8 text-amber-500" />}
            title="Alerts"
            description="Get notified when air quality drops in your area."
            gradient="from-amber-500 to-orange-500"
          />
          <FeatureCard
            href="/risk"
            icon={<Activity className="w-8 h-8 text-emerald-500" />}
            title="Health Risk"
            description="Understand how pollution affects your health."
            gradient="from-emerald-500 to-teal-500"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} VitalAir. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}