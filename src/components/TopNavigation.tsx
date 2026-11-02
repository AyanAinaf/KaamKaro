import React from 'react';
import { Sparkles, Database, ShieldCheck, Zap } from 'lucide-react';

interface TopNavigationProps {
  onOpenTestSandbox: () => void;
  onOpenAgentManager: () => void;
  onOpenFirebaseSchema: () => void;
  onRunElectricianDemo: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  onOpenTestSandbox,
  onOpenAgentManager,
  onOpenFirebaseSchema,
  onRunElectricianDemo,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Brand wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-orange-500 flex items-center justify-center font-black text-base shadow-xs group-hover:bg-slate-800 transition-colors">
                K
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap leading-none">
                  Kaam<span className="text-orange-600">Karo</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight whitespace-nowrap mt-0.5">
                  Worker Intelligence
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={onRunElectricianDemo}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-orange-600" />
              <span>Electrician Demo</span>
            </button>
            <button
              onClick={onOpenTestSandbox}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Skill Isolation Test</span>
            </button>
            <button
              onClick={onOpenAgentManager}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Agent Availability</span>
            </button>
            <button
              onClick={onOpenFirebaseSchema}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-slate-500" />
              <span>Firebase &amp; API Specs</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenTestSandbox}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>Test Skill Isolation</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
