'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Palette, LayoutDashboard, Code } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Logo } from '@/components/ui/Logo';

import { DotGrid, RadialGlow } from '@/components/ui/backgrounds';

export default function LandingPage() {
  const [activeTheme, setActiveTheme] = useState('tokyo-night');

  const themes = {
    'tokyo-night': { primary: '#7aa2f7', bg: '#1a1b26', name: 'Tokyo Night' },
    'catppuccin-mocha': { primary: '#cba6f7', bg: '#1e1e2e', name: 'Catppuccin' },
    'cyberpunk': { primary: '#00ff9f', bg: '#000000', name: 'Cyberpunk' },
    'nord': { primary: '#88c0d0', bg: '#2e3440', name: 'Nord' },
    'solarized-dark': { primary: '#b58900', bg: '#002b36', name: 'Solarized Dark' },
    'github-dark': { primary: '#58a6ff', bg: '#0d1117', name: 'GitHub Dark' },
  };

  const currentTheme = themes[activeTheme as keyof typeof themes];

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden selection:bg-primary/30 font-sans">
      <DotGrid />
      <RadialGlow />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#09090b]/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 shadow-[0_0_20px_rgba(88,166,255,0.4)] group-hover:shadow-[0_0_25px_rgba(137,87,229,0.6)] transition-shadow duration-300 rounded-xl">
              <Logo className="w-full h-full rounded-xl" />
            </div>
            <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Vectomark
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="https://github.com/hamzarihani/vectomark" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors">
              <FaGithub className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <Link href="/builder">
              <Button size="sm" className="rounded-full px-6">
                Launch Studio
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-white/80">The ultimate profile generator</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            Your GitHub Profile, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              Supercharged.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12"
          >
            Build ultra-modern, dynamic READMEs in seconds. Featuring animated SVGs, real-time activity charts, and gorgeous predefined themes.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/builder">
              <Button size="lg" className="rounded-full px-8 h-12 text-md font-semibold shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Launch Studio <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="https://github.com/hamzarihani/vectomark" target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-md bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white transition-all">
                <FaGithub className="w-4 h-4 mr-2" /> Star on GitHub
              </Button>
            </a>
          </motion.div>
        </section>

        {/* Call to Action Section */}
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to stand out?</h2>
          <p className="text-white/60 mb-8 text-lg">
            Join thousands of developers making their GitHub profiles pop with Vectomark. It's completely free and open-source.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builder">
              <Button size="lg" className="rounded-full px-8 h-12 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Start Building Now
              </Button>
            </Link>
            <a href="https://github.com/hamzarihani/vectomark" target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white">
                <FaGithub className="w-5 h-5 mr-2" />
                Star on GitHub
              </Button>
            </a>
          </div>
        </section>

        {/* Mock README Preview */}
        <section className="max-w-5xl mx-auto px-6 pb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl"
          >
            {/* Mac Window Controls */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-4 text-xs font-mono text-white/40">README.md</span>
            </div>
            
            {/* Mock Content */}
            <div className="p-8 md:p-12 relative overflow-hidden">
              {/* Background abstract shape */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

              <div className="flex flex-col items-center justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-purple-600 p-[2px] mb-6 shadow-xl">
                  <div className="w-full h-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
                    <span className="text-3xl">👋</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-center mb-4 text-white">Hi, I'm a Developer</h2>
                
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20 hover:bg-primary/20 transition-colors">Next.js</span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20 hover:bg-purple-500/20 transition-colors">TypeScript</span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 hover:bg-blue-500/20 transition-colors">React</span>
                </div>
              </div>
              
              <div className="relative w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-12">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl bg-white/5 border border-white/5 p-6 h-32 flex flex-col justify-between hover:bg-white/10 transition-colors">
                  <div className="w-3/4 h-4 rounded bg-white/10"></div>
                  <div className="w-1/2 h-4 rounded bg-white/10"></div>
                  <div className="w-full h-4 rounded bg-white/10"></div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/5 p-6 h-32 flex flex-col justify-between hover:bg-white/10 transition-colors">
                  <div className="w-full h-4 rounded bg-white/10"></div>
                  <div className="w-5/6 h-4 rounded bg-white/10"></div>
                  <div className="w-2/3 h-4 rounded bg-white/10"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Bento Grid Features */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-white/60">Built for developers who want their profile to stand out.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 rounded-3xl bg-[#121214] border border-white/10 p-8 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-110">
                <LayoutDashboard className="w-32 h-32 text-primary" />
              </div>
              <LayoutDashboard className="w-8 h-8 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-2">Visual Studio</h3>
              <p className="text-white/60 max-w-sm">
                No more hand-writing markdown or guessing API parameters. Build your profile visually with instant live preview.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-3xl bg-[#121214] border border-white/10 p-8 relative overflow-hidden group shadow-lg"
            >
              <Code className="w-8 h-8 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Raw Power</h3>
              <p className="text-white/60">
                Exports clean, semantic, GitHub-flavored markdown that works flawlessly anywhere.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-3xl bg-[#121214] border border-white/10 p-8 relative overflow-hidden group shadow-lg"
            >
              <Palette className="w-8 h-8 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold mb-2">Beautiful Themes</h3>
              <p className="text-white/60">
                10+ curated color palettes perfectly synced across charts and borders.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="md:col-span-2 rounded-3xl bg-[#121214] border border-white/10 p-8 relative overflow-hidden group shadow-lg cursor-pointer"
            >
               <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-primary/20 to-transparent blur-xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
               <Sparkles className="w-8 h-8 text-yellow-400 mb-6" />
               <h3 className="text-2xl font-bold mb-2">Interactive Charts</h3>
               <p className="text-white/60 max-w-sm">
                 Embed natively supported Developer Radars, Retro Terminals, 3D Isometric Git Activity, and Top Languages directly into your README.
               </p>
            </motion.div>
          </div>
        </section>

        {/* Live Theme Showcase */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="rounded-3xl border border-white/10 bg-[#121214] p-8 md:p-12 overflow-hidden flex flex-col items-center relative shadow-2xl">
            <h2 className="text-3xl font-bold mb-8 text-center relative z-10">Theme Showcase</h2>
            
            <div className="flex gap-2 p-1 bg-black/40 rounded-full mb-12 relative z-10 backdrop-blur-md border border-white/10">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => setActiveTheme(key)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTheme === key 
                      ? 'bg-white/10 text-white shadow-sm border border-white/20' 
                      : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTheme}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className="w-full max-w-3xl aspect-[2/1] rounded-2xl border flex items-center justify-center p-8 transition-colors duration-500 shadow-2xl relative z-10 overflow-hidden"
              style={{ backgroundColor: currentTheme.bg, borderColor: currentTheme.primary + '40' }}
            >
              {/* Background decoration inside showcase */}
              <div 
                className="absolute inset-0 opacity-10" 
                style={{ backgroundImage: 'radial-gradient(circle at center, ' + currentTheme.primary + ' 0%, transparent 70%)' }}
              ></div>

              <div className="text-center relative z-20">
                <div 
                  className="w-16 h-16 mx-auto rounded-2xl mb-6 shadow-2xl flex items-center justify-center"
                  style={{ backgroundColor: currentTheme.primary }}
                >
                  <Sparkles className="w-8 h-8 text-black/50" />
                </div>
                <h3 className="text-3xl font-bold mb-2 tracking-tight" style={{ color: activeTheme === 'minimalist' ? '#000' : '#fff' }}>
                  {currentTheme.name}
                </h3>
                <p className="font-medium px-4 py-1 rounded-full text-sm" 
                   style={{ 
                     color: currentTheme.primary, 
                     backgroundColor: currentTheme.primary + '20' 
                   }}>
                  Selected Profile Theme
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 text-center text-white/40">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8">
            <Logo className="w-full h-full" />
          </div>
          <span className="font-bold">Vectomark</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm">Built with Next.js & Tailwind CSS. Open Source.</p>
          <p className="text-sm">Made with <span className="text-red-500">❤️</span> by <a href="https://github.com/hamzarihani" target="_blank" rel="noreferrer" className="text-white hover:text-primary transition-colors font-medium">Hamza Rihani</a></p>
        </div>
      </footer>
    </div>
  );
}
