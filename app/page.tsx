"use client";

import { motion } from "framer-motion";
import { NotebookPen, Repeat, Sparkles, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium">Reimagining note-taking for the modern era</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-heading font-bold mb-6 tracking-tight"
          >
            Your thoughts, <br />
            <span className="text-gradient">in constant flow.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10"
          >
            Loopnote is a premium workspace designed for clarity. Capture recurring ideas, 
            organize with loops, and experience a writing environment that feels as fluid as your mind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2"
            >
              Start Writing <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-colors">
              View Showcase
            </button>
          </motion.div>
        </div>

        {/* Hero Image / Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="relative mt-20 max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full" />
          <div className="relative glass p-4 rounded-[2rem] overflow-hidden border-white/10">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full animate-pulse-slow" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-10 left-10 text-left">
                <div className="text-2xl font-heading font-bold">The Zen Editor</div>
                <p className="text-slate-300">Minimum distraction, maximum focus.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Repeat className="w-8 h-8 text-indigo-400" />}
            title="Recursive Loops"
            description="Link thoughts in infinite loops. Your ideas aren't linear; neither should your notes be."
          />
          <FeatureCard 
            icon={<Shield className="w-8 h-8 text-emerald-400" />}
            title="Privacy First"
            description="End-to-end encrypted by default. Your private thoughts stay truly private."
          />
          <FeatureCard 
            icon={<NotebookPen className="w-8 h-8 text-amber-400" />}
            title="Haptic Writing"
            description="A customized editor that makes every keystroke feel intentional and satisfying."
          />
        </div>
      </section>

      {/* Background Orbs */}
      <div className="glow top-20 -left-20 bg-indigo-500/20" />
      <div className="glow bottom-40 -right-20 bg-purple-500/20" />
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl glass border-white/5 flex flex-col items-start gap-4"
    >
      <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
        {icon}
      </div>
      <h3 className="text-2xl font-heading font-bold">{title}</h3>
      <p className="text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
