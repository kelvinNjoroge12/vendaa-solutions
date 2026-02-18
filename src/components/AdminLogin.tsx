import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const useSupabaseAuth = isSupabaseConfigured && supabase;

  // Move animation to useEffect to prevent re-running on every render (causing shake)
  useEffect(() => {
    gsap.fromTo(
      '.login-card',
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!useSupabaseAuth) {
        toast.error('Supabase is not configured. Please check your environment variables.');
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase!.auth.signInWithPassword({
        email: credentials.email.trim(),
        password: credentials.password,
      });

      if (error) {
        toast.error(error.message || 'Invalid credentials.');
        setIsLoading(false);
        return;
      }

      if (data.session) {
        toast.success('Welcome back, Admin!');
        onLogin();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] flex items-center justify-center p-4">
      <div className="login-card w-full max-w-md opacity-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#F4F1EC] mb-2">Vendaa</h1>
          <p className="text-[#F4F1EC]/50">Admin Dashboard</p>
        </div>

        <div className="bg-[#F4F1EC]/5 rounded-[22px] border border-[#F4F1EC]/10 p-8">
          <h2 className="text-xl font-semibold text-[#F4F1EC] mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm text-[#F4F1EC]/70 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F4F1EC]/40" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#0B0B0D] border border-[#F4F1EC]/10 rounded-xl text-[#F4F1EC] placeholder:text-[#F4F1EC]/30 focus:outline-none focus:border-[#C8A45C]/50 transition-colors"
                  placeholder="Admin email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-[#F4F1EC]/70 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F4F1EC]/40" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-[#0B0B0D] border border-[#F4F1EC]/10 rounded-xl text-[#F4F1EC] placeholder:text-[#F4F1EC]/30 focus:outline-none focus:border-[#C8A45C]/50 transition-colors"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#C8A45C] text-[#0B0B0D] rounded-xl font-semibold hover:bg-[#D4B76A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#0B0B0D]/30 border-t-[#0B0B0D] rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F4F1EC]/10 text-center">
            <p className="text-sm text-[#F4F1EC]/40">
              Enter your administrator credentials to continue.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-[#F4F1EC]/50 hover:text-[#C8A45C] transition-colors">
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
}
