"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { 
  Mail, Lock, Github, Chrome, 
  ArrowRight, Sparkles, Loader2 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background elements */}
      <div className="bg-mesh" />
      <div className="glow top-1/4 -left-20 bg-indigo-500/20" />
      <div className="glow bottom-1/4 -right-20 bg-purple-500/20" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative"
      >
        <div className="absolute inset-0 bg-brand-primary/10 blur-[100px] rounded-full" />
        
        <div className="relative glass p-8 md:p-10 rounded-[2.5rem] border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-heading font-bold tracking-tighter">
                Loop<span className="text-brand-primary">note</span>
              </span>
            </Link>
            <h1 className="text-2xl font-heading font-bold mb-2">Welcome Back</h1>
            <p className="text-slate-400">Continue your flow in Loopnote</p>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-primary/50 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-primary/50 transition-colors"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm pl-2"
              >
                {error}
              </motion.p>
            )}

            <button
              disabled={loading}
              className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Enter Workspace <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative px-4 bg-transparent text-xs text-slate-500 uppercase tracking-widest bg-[#0a0a0a]">
              or keep flowing with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SocialButton 
              icon={<Chrome size={20} />} 
              label="Google" 
              onClick={() => handleSocialLogin('google')} 
            />
            <SocialButton 
              icon={<Github size={20} />} 
              label="GitHub" 
              onClick={() => handleSocialLogin('github')} 
            />
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-white font-medium hover:text-brand-primary transition-colors">
              Join the flow
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function SocialButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl glass hover:bg-white/10 transition-colors group"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}
