"use client";

import { motion } from "framer-motion";
import { 
  Plus, Search, Settings, 
  LayoutDashboard, FileText, 
  Star, Archive, Trash2,
  ChevronRight, MoreHorizontal
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-black text-white font-body">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col glass">
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-heading font-bold tracking-tighter">
            Loop<span className="text-brand-primary">note</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <NavItem icon={<FileText size={20} />} label="All Notes" />
          <NavItem icon={<Star size={20} />} label="Favorites" />
          <NavItem icon={<Archive size={20} />} label="Archived" />
          <div className="pt-8 px-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
            Recent Loops
          </div>
          <NavItem label="Product Roadmap" dot="indigo" />
          <NavItem label="Personal Journal" dot="purple" />
          <NavItem label="Deep Focus Sessions" dot="emerald" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0a0a0a]">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search notes, loops, or ideas..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-brand-primary/50 transition-colors"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
              <Plus size={24} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary" />
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex-1 overflow-y-auto">
          <header className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-heading font-bold mb-2">Morning, Pavan</h1>
              <p className="text-slate-400">You have 3 loops active today. Ready to flow?</p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NoteCard 
              title="Welcome to Loopnote" 
              excerpt="This is your workspace. Feel the flow, move between ideas, and connect everything..." 
              date="Today"
              tag="Guide"
            />
             <NoteCard 
              title="Next.js 17 Exploration" 
              excerpt="New routing patterns and nested layouts are changing the game. Need to check docs..." 
              date="2h ago"
              tag="Tech"
              color="indigo"
            />
            <NoteCard 
              title="Grocery List" 
              excerpt="Smoothies, Almond milk, Blueberries, Dark chocolate, Coffee beans..." 
              date="Yesterday"
              tag="Personal"
              color="emerald"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, dot }: { icon?: React.ReactNode, label: string, active?: boolean, dot?: string }) {
  return (
    <button suppressHydrationWarning className={`
      w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all
      ${active ? 'bg-white/10 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}
    `}>
      {icon}
      {dot && <div className={`w-2 h-2 rounded-full bg-${dot}-500`} />}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function NoteCard({ title, excerpt, date, tag, color = "purple" }: { title: string, excerpt: string, date: string, tag: string, color?: string }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="p-6 rounded-3xl glass border-white/5 flex flex-col gap-4 cursor-pointer hover:bg-white/[0.07] transition-colors group"
    >
      <div className="flex justify-between items-start">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-${color}-500/20 text-${color}-400`}>
          {tag}
        </span>
        <MoreHorizontal size={18} className="text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div>
        <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-brand-primary transition-colors">{title}</h3>
        <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>{date}</span>
        <ChevronRight size={14} />
      </div>
    </motion.div>
  );
}
