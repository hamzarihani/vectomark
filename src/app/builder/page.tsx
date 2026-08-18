import EditorPanel from '@/components/builder/EditorPanel';
import PreviewPanel from '@/components/builder/PreviewPanel';
import ActionButtons from '@/components/builder/ActionButtons';
import { DotGrid, RadialGlow } from '@/components/ui/backgrounds';
import { Logo } from '@/components/ui/Logo';
import Link from 'next/link';

export default function BuilderStudio() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#09090b] text-white selection:bg-primary/30 font-sans">
      <DotGrid />
      <RadialGlow />

      {/* Top Navbar */}
      <header className="h-16 border-b border-white/5 bg-[#09090b]/50 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 z-50">
        <Link href="/" className="flex items-center gap-3 group hover:opacity-90 transition-opacity">
          <div className="relative flex items-center justify-center w-10 h-10">
            <Logo className="w-full h-full" />
          </div>
          <h1 className="items-center gap-1 font-bold text-2xl tracking-tight hidden sm:flex bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            Vectomark <span className="font-medium text-[#58a6ff]">Studio</span>
          </h1>
        </Link>
        <ActionButtons />
      </header>
      
      {/* Main Split Layout */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden max-w-[1600px] w-full mx-auto relative z-10">
        {/* Left Panel - Editor */}
        <section className="w-full md:w-[450px] lg:w-[500px] shrink-0 border-r border-white/5 bg-black/40 backdrop-blur-md flex flex-col h-full overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20">
          <div className="p-4 h-full overflow-y-auto custom-scrollbar">
            <EditorPanel />
          </div>
        </section>
        
        {/* Right Panel - Preview */}
        <section className="flex-1 h-full p-4 md:p-8 overflow-hidden flex items-center justify-center">
          <div className="w-full h-full max-w-5xl mx-auto rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col">
            <PreviewPanel />
          </div>
        </section>
      </main>
    </div>
  );
}
