import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Assets & Styles ---

const CryptoFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=VT323&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
    
    .font-crypto-mono { font-family: 'Space Mono', monospace; }
    .font-crypto-pixel { font-family: 'VT323', monospace; }
    .font-crypto-serif { font-family: 'EB Garamond', serif; }
    
    .pixel-text-lg {
      font-family: 'VT323', monospace;
      font-size: 1.2em;
      letter-spacing: -0.02em;
    }
    
    .btn-gradient {
      background: linear-gradient(90deg, #2A2A9F 0%, #3B3BBF 100%);
      box-shadow: 0 4px 0 #1A1A6F;
    }
    .btn-gradient:active {
      transform: translateY(4px);
      box-shadow: 0 0 0 #1A1A6F;
    }

    .pixel-border {
      box-shadow: 
        -2px 0 0 0 white,
        2px 0 0 0 white,
        0 -2px 0 0 white,
        0 2px 0 0 white;
    }
  `}</style>
);

// --- Icons ---

const PixelHeart = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2 align-middle">
    <path d="M4 4h4v4H4zM16 4h4v4h-4zM8 8h8v4H8zM4 12h4v4H4zM16 12h4v4h-4zM8 16h8v4H8zM10 20h4v4h-4z" fill="#F7931A" />
    <path d="M11 9h2v6h-2z" fill="white" />
  </svg>
);

const PixelJuice = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-4 top-4 opacity-80">
    <path d="M8 2h4v4H8zM14 4h2v16h-2zM6 6h2v14H6zM8 20h6v2H8z" fill="#00FFFF" fillOpacity="0.5" />
    <path d="M8 6h6v14H8z" fill="#00FFFF" />
    <text x="9" y="16" fontFamily="monospace" fontSize="6" fill="black" fontWeight="bold">012</text>
  </svg>
);

const PixelCoins = () => (
  <div className="relative w-32 h-32">
    <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-[#5546FF] border-4 border-white/20 flex items-center justify-center">
      <span className="font-crypto-mono text-2xl text-white">Ӿ</span>
    </div>
    <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-[#3326CC] border-4 border-white/20 flex items-center justify-center z-10">
      <span className="font-crypto-mono text-2xl text-white">Ӿ</span>
    </div>
    <div className="absolute top-4 left-16 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full z-20"></div>
  </div>
);

// --- Components ---

const SectionNum = ({ num }: { num: string }) => (
  <div className="font-crypto-pixel text-6xl md:text-8xl opacity-50 mb-8 block text-white/40">
    {num}.
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    className={`bg-[#0A0A1F] border border-white/20 rounded-xl p-8 relative overflow-hidden ${className}`}
    whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.5)" }}
  >
    {children}
  </motion.div>
);

// --- Main Page ---

export default function ProgrammableBitcoinPage() {
  return (
    <div className="min-h-screen bg-[#02020A] text-white font-crypto-serif selection:bg-[#5546FF] selection:text-white overflow-x-hidden">
      <CryptoFonts />

      {/* Hero Section */}
      <div className="min-h-[90vh] flex flex-col justify-center items-center px-6 relative border-b border-white/10">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-12">
              Start writing smart contracts for <span className="font-crypto-pixel text-[#fff]">Bitcoin</span>
            </h1>
          </div>
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto lg:ml-auto">
            <button className="btn-gradient w-full py-6 rounded-full text-xl font-crypto-mono flex justify-between px-8 hover:brightness-110 transition-all">
              <span>Download Clarinet</span>
              <span>↗</span>
            </button>
            <button className="btn-gradient w-full py-6 rounded-full text-xl font-crypto-mono flex justify-between px-8 hover:brightness-110 transition-all opacity-80 hover:opacity-100">
              <span>Learn more about Clarinet</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section 01: Intro */}
      <div className="py-32 px-6 max-w-7xl mx-auto">
        <SectionNum num="01" />
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-crypto-pixel leading-tight">
            Say hello to <span className="font-crypto-serif italic">programmable</span> Bitcoin that never leaves the <span className="font-crypto-serif italic">Bitcoin</span> ecosystem. <PixelHeart />
          </h2>
          
          <div className="mt-12 inline-block bg-[#1A1A3A] px-6 py-2 rounded-full font-crypto-mono text-sm text-[#8888AA] border border-[#333355]">
            <span className="text-[#5546FF]">const</span> <span className="text-[#F7931A]">bitcoin</span> = <span className="text-green-400">true</span>;
          </div>
        </div>
      </div>

      {/* Cards Scroll Section */}
      <div className="py-24 overflow-x-auto px-6">
        <div className="flex gap-8 w-max mx-auto">
          <Card className="w-[80vw] md:w-[400px] h-[500px] flex flex-col justify-between bg-gradient-to-b from-[#0A0A1F] to-[#050510]">
            <div>
              <h3 className="text-3xl font-crypto-serif mb-4">Arkadiko</h3>
              <p className="text-xl opacity-80 leading-relaxed">
                Lending protocol generated <span className="font-crypto-pixel text-3xl text-[#5546FF]">$50M+</span> locked within two weeks of launch.
              </p>
            </div>
            <div className="mt-8">
               <button className="bg-white text-black px-6 py-2 rounded-full font-crypto-mono text-sm hover:bg-gray-200 transition-colors">
                 Arkadiko ↗
               </button>
            </div>
          </Card>

          <Card className="w-[80vw] md:w-[400px] h-[500px] flex flex-col justify-between bg-gradient-to-b from-[#0A0A1F] to-[#050510]">
            <div>
              <h3 className="text-3xl font-crypto-serif mb-4">ALEX</h3>
              <p className="text-xl opacity-80 leading-relaxed">
                Decentralized exchange has community <span className="font-crypto-pixel text-3xl text-[#5546FF]">15,000+</span> pre-launch users ready to trade.
              </p>
            </div>
            <div className="mt-8">
               <button className="bg-white text-black px-6 py-2 rounded-full font-crypto-mono text-sm hover:bg-gray-200 transition-colors">
                 ALEX ↗
               </button>
            </div>
          </Card>
          
           <Card className="w-[80vw] md:w-[400px] h-[500px] flex flex-col justify-center items-center bg-[#5546FF] border-none">
            <div className="text-center">
              <p className="text-2xl font-crypto-serif italic mb-6">
                "What's really missing is the notion of Bitcoin as an ecosystem."
              </p>
              <button className="bg-black text-white px-6 py-2 rounded-full font-crypto-mono text-sm hover:bg-gray-900 transition-colors">
                 Messari ↗
               </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Section 02: Stats */}
      <div className="py-32 px-6 max-w-7xl mx-auto border-t border-white/10">
        <SectionNum num="02" />
        <div className="flex flex-col items-center justify-center py-24">
          <div className="relative">
            <h2 className="text-6xl md:text-9xl font-crypto-pixel tracking-tighter z-10 relative">
              +50,000
            </h2>
            <div className="absolute -right-12 -top-12 opacity-50 animate-pulse">
              <PixelCoins />
            </div>
          </div>
          <p className="mt-8 font-crypto-mono text-white/40 tracking-widest uppercase text-sm md:text-base">
            Hiro Wallet Downloads
          </p>
        </div>
      </div>

      {/* Section 03: Features */}
      <div className="py-32 px-6 max-w-7xl mx-auto border-t border-white/10">
        <SectionNum num="03" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="min-h-[400px]">
            <PixelJuice />
            <h3 className="text-6xl font-crypto-pixel mb-6">SIP-012</h3>
            <p className="text-3xl font-crypto-serif leading-tight">
              improved <span className="font-crypto-pixel">10X</span> the Stacks network capacity
            </p>
            <div className="absolute bottom-8 left-8">
               <button className="border border-white/30 px-6 py-2 rounded-full font-crypto-mono text-sm hover:bg-white hover:text-black transition-colors">
                 Source ↗
               </button>
            </div>
          </Card>

          <Card className="min-h-[400px]">
            <h3 className="text-6xl font-crypto-pixel mb-6">Microblocks</h3>
            <p className="text-3xl font-crypto-serif leading-tight">
              reduce transaction confirmation times from minutes to <span className="text-[#5546FF]">seconds</span>
            </p>
            <div className="absolute bottom-8 left-8">
               <button className="border border-white/30 px-6 py-2 rounded-full font-crypto-mono text-sm hover:bg-white hover:text-black transition-colors">
                 Learn More ↗
               </button>
            </div>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 text-center font-crypto-mono text-xs text-white/30">
        MADE WITH READYMAG (INSPIRED)
      </div>

    </div>
  );
}
