export const DesktopSidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-[280px] shrink-0 border-r border-black/10 bg-[#FAFAFA] min-h-screen sticky top-0 h-screen p-8 justify-between z-50">
      
      <div className="flex flex-col gap-16">
        {/* Logo Area */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-black flex items-center justify-center shrink-0">
             {/* Abstract Logo Icon matching the screenshot reference */}
             <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                <path d="M12 3V21" stroke="currentColor" strokeWidth="2" />
                <circle cx="8" cy="12" r="1.5" fill="currentColor" />
                <path d="M16 12C16 10.5 15 9.5 15 9.5M16 12C16 13.5 15 14.5 15 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
             </svg>
          </div>
          <span className="font-black tracking-tighter text-[13px] uppercase">AI MINDSET</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-6 font-mono text-[10px] font-bold tracking-widest uppercase text-black/60 pl-1">
          <a href="#" className="hover:text-black transition-colors flex items-center gap-3">
             {`{LABS}`} <span className="text-black/20 font-light">|</span>
          </a>
          <a href="#" className="hover:text-black transition-colors flex items-center gap-3">
             COMMUNITY {`{SPACE}`} <span className="text-black/20 font-light">|</span>
          </a>
          <a href="#" className="hover:text-black transition-colors flex items-center gap-3">
             SPECIAL PROJECTS <span className="text-black/20 font-light">|</span>
          </a>
          <a href="#" className="hover:text-black transition-colors flex items-center gap-3">
             BLOG <span className="text-black/20 font-light">|</span>
          </a>
          <a href="#" className="hover:text-black transition-colors flex items-center gap-3">
             {`{FOR TEAMS}`} <span className="text-black/20 font-light">|</span>
          </a>
          <a href="#" className="hover:text-black transition-colors flex items-center gap-3">
             {`{FOR NON-PROFIT}`} <span className="text-black/20 font-light">|</span>
          </a>
        </nav>
      </div>

      {/* CTA Button */}
      <div className="pb-4">
        <button className="w-full flex items-center justify-center py-4 bg-white border border-black/30 hover:border-black text-[10px] font-black uppercase tracking-[0.2em] text-black hover:bg-black hover:text-[#8DC63F] transition-all rounded-[2px] shadow-sm">
          ЗАПИСАТЬСЯ
        </button>
      </div>
      
    </aside>
  );
};
