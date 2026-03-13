import React from 'react';
import { motion } from 'framer-motion';

// --- Assets & Styles ---

const PortfolioFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    .font-portfolio { font-family: 'Inter', sans-serif; }
    
    .text-balance {
      text-wrap: balance;
    }
  `}</style>
);

const Signature = () => (
  <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 md:w-48">
    <path d="M10 40 C 20 30, 40 50, 50 40 S 70 20, 80 30 S 100 50, 110 40 S 130 20, 140 30 S 160 50, 170 40" stroke="black" strokeWidth="2" fill="none" />
    <path d="M120 35 C 130 25, 140 45, 150 35" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);

const Logo = () => (
  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl tracking-tighter overflow-hidden">
    <div className="relative -left-1 transform -skew-x-12">L</div>
    <div className="relative -left-1 transform -skew-x-12">L</div>
  </div>
);

// --- Components ---

const NavItem = ({ children, bracket = false }: { children: React.ReactNode; bracket?: boolean }) => (
  <div className="flex items-center gap-2 cursor-pointer hover:opacity-60 transition-opacity font-bold text-sm md:text-base tracking-wide">
    {bracket && <span>[</span>}
    {bracket && <span className="w-4"></span>}
    {bracket && <span>]</span>}
    <span>{children}</span>
  </div>
);

const ProjectDetailRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 border-b border-black/20 py-3 md:py-4 gap-2 md:gap-0">
    <div className="font-medium opacity-80">{label}:</div>
    <div className="md:col-span-2 font-medium">{value}</div>
  </div>
);

// --- Main Page ---

export default function GreyPortfolioPage() {
  return (
    <div className="min-h-screen bg-[#D9D9D9] text-black font-portfolio selection:bg-black selection:text-white overflow-x-hidden">
      <PortfolioFonts />

      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 md:p-12">
        <Logo />
        <div className="flex gap-8 md:gap-16 uppercase">
          <NavItem>Wrks</NavItem>
          <NavItem>Abt</NavItem>
          <NavItem bracket>Hello</NavItem>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-12 py-12 md:py-24 max-w-[90rem] mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold uppercase leading-[0.9] tracking-tight text-balance">
          Bringing Together <br />
          Creative <br />
          Solutions <span className="text-white drop-shadow-sm font-serif italic font-light mx-2">&</span> Visualizing <br />
          Brand Stories
        </h1>

        <div className="mt-24 md:mt-48 flex flex-col md:flex-row justify-between items-end border-b border-black/20 pb-4">
          <div className="mb-8 md:mb-0">
            <p className="font-bold text-sm md:text-base">studio@leolin.ca</p>
            <p className="font-bold text-sm md:text-base">+1 236 867 8590</p>
          </div>
          <div className="mb-4 md:mb-0">
            <Signature />
          </div>
          <div className="font-bold text-sm md:text-base">
            Leo Lin 2022
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section className="px-6 md:px-12 py-24 max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Title */}
          <div className="lg:col-span-7">
            <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase leading-[0.85] tracking-tight mb-12">
              Wish Upon <br />
              A Star
            </h2>
            
            <div className="h-px bg-black/20 w-full my-12 lg:hidden"></div>

            <p className="text-xl md:text-3xl leading-relaxed font-medium max-w-3xl">
              Before winter arrives, shooting stars had been hung up high, just under the rooftop of Plaza 66, emitting white lights and brightening the space. "Wish upon a star" is a Christmas event held by Plaza 66 in 2019. The event involves installations, gift exchange, and acapella performances, inviting visitors to join and celebrate the winter holiday.
            </p>
          </div>

          {/* Details Table */}
          <div className="lg:col-span-5 flex flex-col justify-start pt-4">
            <div className="border-t border-black/20">
              <ProjectDetailRow label="Client" value="PLAZA66" />
              <ProjectDetailRow label="Year" value="2019" />
              <ProjectDetailRow label="Agency" value="white R studio" />
              <ProjectDetailRow 
                label="Role" 
                value={
                  <div className="flex flex-col gap-1">
                    <span>Concept Development</span>
                    <span>Visual Identity</span>
                    <span>Event Collaterals</span>
                  </div>
                } 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Image Placeholder Section */}
      <section className="w-full h-[40vh] md:h-[80vh] bg-gray-300 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2940&auto=format&fit=crop" 
          alt="Event Space" 
          className="w-full h-full object-cover grayscale opacity-80 hover:scale-105 transition-transform duration-1000 ease-out"
        />
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-24 bg-[#D9D9D9] relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          <div className="mb-24">
            <h3 className="text-4xl md:text-6xl font-bold mb-4">Let's Talk!</h3>
            <h3 className="text-4xl md:text-6xl font-bold mb-4">For any inquiries</h3>
            <h3 className="text-4xl md:text-6xl font-bold">Please contact at :</h3>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end border-t border-black/20 pt-4">
             <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
               <span className="text-2xl">©</span> Leo Lin 2022
             </div>
             
             <div className="font-bold text-lg md:text-xl mt-4 md:mt-0">
               studio@leolin.ca
             </div>

             <div className="font-bold text-lg md:text-xl mt-4 md:mt-0">
               +1 236 867 8590
             </div>

             <div className="font-bold text-lg md:text-xl mt-4 md:mt-0 flex items-center gap-4">
               <span>[</span>
               <span className="w-8"></span>
               <span>]</span>
               <span>Hello</span>
             </div>
          </div>
        </div>

        {/* Large Decorative Logo Background */}
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-10 translate-y-1/4 translate-x-1/4">
           <svg width="600" height="600" viewBox="0 0 100 100" fill="white">
             <path d="M20 20 L40 80 L60 20 M50 20 L70 80 L90 20" stroke="white" strokeWidth="20" strokeLinecap="square" />
           </svg>
        </div>
      </footer>
    </div>
  );
}
