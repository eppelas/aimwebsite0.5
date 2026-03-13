import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const ArchiveStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600&display=swap');
    
    .font-grotesk { font-family: 'Space Grotesk', sans-serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    
    .archive-grid {
      display: grid;
      grid-template-columns: 40px 1.5fr 1.5fr 2fr 1fr 60px;
      gap: 16px;
    }

    @media (max-width: 768px) {
      .archive-grid {
        grid-template-columns: 40px 1fr;
        gap: 8px;
      }
      .archive-hide-mobile {
        display: none;
      }
    }

    .noise-overlay {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15'/%3E%3C/svg%3E");
    }
  `}</style>
);

const NavItem = ({ text }: { text: string }) => (
  <a href="#" className="text-[10px] font-inter font-medium tracking-widest uppercase hover:text-black/50 transition-colors">
    {text}
  </a>
);

const ArchiveRow = ({ id, name, client, desc, category, year }: any) => (
  <div className="archive-grid py-3 border-b border-black/10 hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer group items-baseline">
    <div className="font-mono text-xs opacity-50 group-hover:opacity-100">{id}</div>
    <div className="font-inter font-medium text-sm truncate">{name}</div>
    <div className="font-inter text-xs opacity-70 truncate archive-hide-mobile">{client}</div>
    <div className="font-inter text-xs opacity-70 truncate archive-hide-mobile">{desc}</div>
    <div className="font-inter text-xs opacity-70 archive-hide-mobile">{category}</div>
    <div className="font-mono text-xs text-right opacity-50 group-hover:opacity-100">{year}</div>
  </div>
);

const InfoColumn = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="flex flex-col gap-4">
    <h3 className="font-grotesk text-sm uppercase tracking-wider border-b border-black pb-2 mb-2">{title}</h3>
    <div className="font-inter text-xs leading-relaxed opacity-80 space-y-4 text-justify">
      {children}
    </div>
  </div>
);

export default function StudioArchivePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const archiveData = [
    { id: 178, name: "—", client: "Fashion brand", desc: "—", category: "Identity", year: "2022" },
    { id: 177, name: "Away", client: "Relocation initiative", desc: "“A way up” podcast", category: "Cover", year: "2022" },
    { id: 176, name: "Away", client: "Relocation initiative", desc: "—", category: "Digital", year: "2022" },
    { id: 175, name: "Away", client: "Relocation initiative", desc: "—", category: "Digital", year: "2022" },
    { id: 174, name: "Away", client: "Relocation initiative", desc: "—", category: "Identity", year: "2022" },
    { id: 173, name: "Non-Objective × Random Projects", client: "Accessories brand", desc: "Collaboration for the Lucky Coin cardholder", category: "Object", year: "2022" },
    { id: 172, name: "Dot Comms", client: "PR & communications", desc: "Dot Friends community logo", category: "Logotype", year: "2022" },
    { id: 171, name: "Dot Comms", client: "PR & communications", desc: "Dot Days event", category: "Design", year: "2022" },
    { id: 170, name: "Dot Comms", client: "PR & communications", desc: "—", category: "Digital", year: "2022" },
    { id: 169, name: "Dot Comms", client: "PR & communications", desc: "—", category: "Identity", year: "2022" },
    { id: 168, name: "Non-Objective × Lu.Co.", client: "Cafe", desc: "Hosting a “typographic brunch”", category: "Event", year: "2022" },
    { id: 167, name: "DevCrowd", client: "IT researcher", desc: "—", category: "Digital", year: "2022" },
    { id: 166, name: "DevCrowd", client: "IT researcher", desc: "—", category: "Identity", year: "2022" },
    { id: 165, name: "Presente", client: "Ceramics & art store", desc: "—", category: "Design", year: "2022" },
    { id: 164, name: "Presente", client: "Ceramics & art store", desc: "Identity for the Barcelona-based store", category: "Identity", year: "2022" },
    { id: 163, name: "Libo/Libo", client: "Podcast studio", desc: "—", category: "Cover", year: "2022" },
    { id: 162, name: "Fragment", client: "Florist studio", desc: "—", category: "Identity", year: "2022" },
    { id: 161, name: "TEMP", client: "Cultural space & gallery", desc: "—", category: "Design", year: "2022" },
    { id: 160, name: "TEMP", client: "Cultural space & gallery", desc: "Identity for the hottest spot in Makhachkala", category: "Identity", year: "2022" },
    { id: 159, name: "Foye", client: "Cafe", desc: "—", category: "Identity", year: "2022" },
    { id: 158, name: "Temporary Space 5", client: "Studio space", desc: "—", category: "Identity", year: "2022" },
    { id: 157, name: "My Hygge Box", client: "Gifts brand", desc: "Rebranding that was unusual for us — yet very impactful", category: "Identity", year: "2022" },
    { id: 156, name: "Random Mess", client: "Bags brand", desc: "—", category: "Identity", year: "2022" },
    { id: 155, name: "—", client: "Beverage company", desc: "Annual report", category: "Digital", year: "2022" },
    { id: 154, name: "On The Non-Objective Nature", client: "Visual research", desc: "Celebrating 2 years of Non-Objective with a digital installation", category: "Curation", year: "2022" },
    { id: 153, name: "Mill Bistro", client: "Italian bistro", desc: "Praxis(abc) collaboration for the uniform", category: "Merch", year: "2022" },
    { id: 152, name: "Mill Bistro", client: "Italian bistro", desc: "Dough-like identity for the new pizza spot", category: "Identity", year: "2022" },
    { id: 151, name: "alvaar", client: "Jewelry brand", desc: "Alvaar Paper 2 editorial design", category: "Editorial", year: "2022" },
    { id: 150, name: "Libo/Libo", client: "Podcast studio", desc: "—", category: "Cover", year: "2022" },
    { id: 149, name: "Vsevolod Khomenko", client: "Artist", desc: "—", category: "Cover", year: "2022" },
    { id: 148, name: "Vsevolod Khomenko", client: "Artist", desc: "—", category: "Cover", year: "2022" },
    { id: 147, name: "Harvard Business Review", client: "Business media", desc: "Graphics for the articles", category: "Graphics", year: "2022" },
    { id: 146, name: "Meal Burgers", client: "Pop-up restaurant", desc: "—", category: "Identity", year: "2022" },
    { id: 145, name: "Stradarium", client: "Educational project", desc: "Ouroboros-inspired logo for the unusual school", category: "Logotype", year: "2022" },
    { id: 144, name: "Terpeniye", client: "Artist", desc: "Stage design for the concert at Mutabor", category: "Spatial", year: "2022" },
    { id: 143, name: "Igor Dyachenko", client: "Artist", desc: "Graphics for the “Objects” vinyl", category: "Cover", year: "2022" },
    { id: 142, name: "Mental Health Film Festival", client: "Film festival", desc: "Reminders that mental health matters that you can wear", category: "Merch", year: "2022" },
    { id: 141, name: "Mental Health Film Festival", client: "Film festival", desc: "Merch store for the film fest", category: "Digital", year: "2022" },
    { id: 140, name: "Arsight", client: "Design studio", desc: "Website art direction", category: "Consulting", year: "2022" },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-inter selection:bg-black selection:text-white overflow-x-hidden" ref={containerRef}>
      <ArchiveStyles />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start z-50 mix-blend-difference text-white md:text-black md:mix-blend-normal pointer-events-none">
        <div className="hidden md:block w-1/3 pointer-events-auto">
          <span className="text-[10px] font-inter font-bold tracking-widest uppercase">Non-Objective</span>
        </div>
        
        <div className="hidden md:flex justify-center gap-8 w-1/3 pointer-events-auto">
          <NavItem text="Gallery" />
          <NavItem text="Archive" />
          <NavItem text="Studio" />
          <NavItem text="Extensions" />
        </div>

        <div className="flex justify-end gap-6 w-full md:w-1/3 pointer-events-auto">
          <div className="hidden md:flex gap-6">
            <NavItem text="Email" />
            <NavItem text="Instagram" />
          </div>
          <button className="md:hidden text-black" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white text-black z-40 flex flex-col items-center justify-center gap-8 md:hidden">
          <NavItem text="Gallery" />
          <NavItem text="Archive" />
          <NavItem text="Studio" />
          <NavItem text="Extensions" />
        </div>
      )}

      {/* Hero Image Section */}
      <section className="h-[80vh] w-full relative overflow-hidden bg-[#F0F0F0]">
        <div className="absolute inset-0 noise-overlay pointer-events-none z-10" />
        <img 
          src="https://picsum.photos/seed/studio/1920/1080?grayscale" 
          alt="Studio Team" 
          className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Center Nav Overlay (Visual only to match design) */}
          <div className="hidden md:flex gap-8 text-[10px] font-inter font-bold tracking-widest uppercase text-black mix-blend-difference">
            <span>Gallery</span>
            <span>Archive</span>
            <span>Studio</span>
            <span>Extensions</span>
          </div>
        </div>
      </section>

      {/* Info Grid Section */}
      <section className="py-24 px-6 md:px-12 border-b border-black/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            <InfoColumn title="Studio">
              <p>
                Non-Objective is an international studio¹ developing conceptual and visual languages. These languages unfold through a variety of forms — visual identities and design systems, websites and publications, brand vision and strategies, texts and photography, objects and installations, art and curatorial projects. The studio exists as an evolving dialogue², not a static entity.
              </p>
              <p>
                Founded in 2020 by Artem Matyushkin, and shaped by a like-minded team with deep expertise in creative direction, design, and communication, the studio’s practice extends beyond design consultancy into research, art, education, and media. These facets operate both digitally and physically, expanding the discourse of design into broader cultural territories.
              </p>
              <p>
                In both commissioned and self-initiated projects, the studio does not define itself by a singular field. It operates across cultural, educational, social, and media contexts, engaging with niche and mass brands. The primary criterion is alignment: ethical, aesthetic, intellectual. Design, here, is not a service, but a conversation.
              </p>
            </InfoColumn>

            <InfoColumn title="Ideology">
              <p>
                The foundation of Non-Objective is an ideology that has taken shape over years of practice. We prioritize cultural impact¹, research², co-authorship³, experimentation³, and respect for expertise³ — principles that guide both process and outcome.
              </p>
              <p>
                Our practice is positioned to contribute to contemporary culture. Each commission is considered through the lens of impact — on individuals, institutions, and environments. Design has the ability to alter perception, whether at a systemic level or through micro-interventions in everyday life.
              </p>
              <p>
                Alongside commercial work, we initiate independent projects in art, education, media, industrial design, and photography. These projects function as spaces for critical inquiry — design not as surface, but as a tool for constructing meaning and fostering connection. They allow us to explore the modalities of design, expanding its role beyond convention.
              </p>
              <p>
                Our methodology challenges assumptions. Research destabilizes the expected. Co-authorship reshapes authorship. Flexibility and experimentation define the process. We reject design as a picture-first practice, prioritizing ideas, words, and systems.
              </p>
            </InfoColumn>

            <InfoColumn title="Expertise">
              <p>
                We develop conceptual¹ and visual² languages — and focus on their implementation³, where theory and execution converge.
              </p>
              <p>
                Conceptual languages include ideation and concept development, brand vision, strategy and consulting, creative direction, positioning, tone of voice, communication strategy, curation, and architecture.
              </p>
              <p>
                Visual languages encompass visual identity, design systems, typography, visual strategy, art direction, interior design, and photo and video direction.
              </p>
              <p>
                These languages materialize through graphic design, digital design, spatial design, editorial design, cover design, objects and merch, industrial and product design, (accidental) naming, writing, and artworks.
              </p>
            </InfoColumn>

            <InfoColumn title="Geography">
              <p>
                Non-Objective exists beyond geography. Based across Paris, Seoul, Tbilisi, Vienna, and elsewhere, we function as an international practice¹ — location is not a constraint but an evolving context. At the same time, we remain committed to physicality. We take every opportunity to bring ideas into physical spaces — through exhibitions, pop-up projects, book launches, lectures, and workshops — encountering new places and expanding our research through direct experience.
              </p>
              <p>
                The studio operates across time as well as space — GMT+2, +3, +4, +8, and +9.
              </p>
            </InfoColumn>

          </div>
        </div>
      </section>

      {/* Archive List Section */}
      <section className="py-24 px-6 md:px-12 bg-[#FAFAFA]">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Header Row */}
          <div className="archive-grid pb-4 border-b border-black text-[10px] font-mono uppercase tracking-widest opacity-40 sticky top-20 bg-[#FAFAFA] z-20">
            <div>No.</div>
            <div>Project</div>
            <div className="archive-hide-mobile">Client / Context</div>
            <div className="archive-hide-mobile">Description</div>
            <div className="archive-hide-mobile">Category</div>
            <div className="text-right">Year</div>
          </div>

          {/* Data Rows */}
          <div className="mt-4">
            {archiveData.map((item) => (
              <ArchiveRow key={item.id} {...item} />
            ))}
          </div>

          {/* Pagination / Footer */}
          <div className="mt-12 pt-12 border-t border-black/10 flex justify-between items-center text-xs font-mono opacity-50">
            <div>Showing 1-{archiveData.length} of 178</div>
            <div className="flex gap-4">
              <button className="hover:text-black">PREV</button>
              <span className="text-black">1</span>
              <button className="hover:text-black">2</button>
              <button className="hover:text-black">3</button>
              <button className="hover:text-black">4</button>
              <button className="hover:text-black">NEXT</button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-[10px] font-inter uppercase tracking-widest">
             Non-Objective © 2026
           </div>
           <div className="flex gap-8 text-[10px] font-inter uppercase tracking-widest opacity-60">
             <a href="#" className="hover:text-white hover:opacity-100">Instagram</a>
             <a href="#" className="hover:text-white hover:opacity-100">Are.na</a>
             <a href="#" className="hover:text-white hover:opacity-100">Email</a>
           </div>
        </div>
      </footer>

    </div>
  );
}
