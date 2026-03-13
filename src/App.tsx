import { useState } from 'react';
import LabW26Page from './components/LabW26Page';
import LabW26PageV2 from './components/LabW26PageV2';
import LabW26PageV3 from './components/LabW26PageV3';

export default function App() {
  const [version, setVersion] = useState<'v1' | 'v2' | 'v3'>('v3');

  return (
    <>
      {/* Floating Toggle */}
      <div className="fixed bottom-6 right-6 z-[200] flex gap-1 p-1 bg-black/80 backdrop-blur rounded-full border border-white/10 shadow-2xl">
        <button
          onClick={() => setVersion('v1')}
          className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${version === 'v1' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
        >
          V1 (STYLE)
        </button>
        <button
          onClick={() => setVersion('v2')}
          className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${version === 'v2' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
        >
          V2 (CONTRAST)
        </button>
        <button
          onClick={() => setVersion('v3')}
          className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${version === 'v3' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
        >
          V3 (GRID COL)
        </button>
      </div>

      {version === 'v1' ? <LabW26Page /> : version === 'v2' ? <LabW26PageV2 /> : <LabW26PageV3 />}
    </>
  );
}
