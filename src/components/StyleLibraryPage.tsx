import React, { useState, useMemo } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generativeStyles, generativeCategories } from '../data/generativeStyles';
import { StyleCard } from './StyleCard';

export default function StyleLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter styles
  const filteredStyles = useMemo(() => {
    if (selectedCategory === 'all') return generativeStyles;
    return generativeStyles.filter(s => s.categoryId === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#f4f2ef] dark:bg-[#0a0a0a] text-black dark:text-[#f0f0f0] selection:bg-[#8DC63F] selection:text-white font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className={`fixed md:sticky top-0 left-0 w-[280px] h-screen bg-white/80 dark:bg-black/80 backdrop-blur-xl border-r border-black/10 dark:border-white/10 z-50 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col shrink-0`}>
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase hover:text-[#8DC63F] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Main Lab
            </Link>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-black uppercase tracking-widest leading-none mb-2">Style Library</h1>
            <p className="text-xs opacity-60 font-mono">400 generative states</p>
          </div>

          <div className="w-full h-px bg-black/10 dark:bg-white/10 mb-8" />

          {/* Categories */}
          <nav className="space-y-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-3 py-2 text-[11px] font-mono tracking-wider uppercase transition-colors rounded ${selectedCategory === 'all' ? 'bg-black text-white dark:bg-white dark:text-black font-bold' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100'}`}
            >
              [ ALL STATES ]
            </button>
            {generativeCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2.5 text-[11px] font-bold tracking-wider uppercase transition-colors rounded leading-tight ${selectedCategory === cat.id ? 'bg-[#8DC63F] text-white hover:bg-[#7ab22f]' : 'hover:bg-black/5 dark:hover:bg-white/10 opacity-60 hover:opacity-100'}`}
              >
                {cat.name.replace(/^\d+\)\s*/, '')}
              </button>
            ))}
          </nav>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-6 border-t border-black/10 dark:border-white/10 text-[9px] font-mono opacity-50 uppercase tracking-widest">
          SYSTEM_METAPHOR: CORE NODE<br/>
          RENDER_ENGINE: SVG_NATIVE
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col relative">
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/10 dark:border-white/10 p-4 flex justify-between items-center">
          <div className="font-black uppercase tracking-widest text-sm">Style Library</div>
          <button onClick={() => setMobileMenuOpen(true)} className="p-2">
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* Grid Container */}
        <div className="p-4 md:p-8 lg:p-12">
          {/* Section info */}
          <div className="mb-10 lg:mb-16 max-w-2xl">
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-widest mb-4">
              {selectedCategory === 'all' ? 'All Visual States' : generativeCategories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              Exploration of 400 procedural and mathematical visual states applied to the Core Node metaphor. Showing how a single idea geometrically scales across noise fields, triangulations, recursion, and L-systems.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
            {filteredStyles.map(style => (
              <StyleCard
                key={style.id}
                styleData={style}
                categoryName={generativeCategories.find(c => c.id === style.categoryId)?.name || ''}
              />
            ))}
          </div>

          {filteredStyles.length === 0 && (
            <div className="w-full py-20 text-center opacity-50 font-mono text-sm">
              [ NO STATES MATCHING QUERY ]
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
