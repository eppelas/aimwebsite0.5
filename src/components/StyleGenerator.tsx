import React, { useMemo } from 'react';

// === PRNG ===
const cyrb128 = (str: string) => {
    let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067); h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213); h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067); h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213); h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
};

const sfc32 = (a: number, b: number, c: number, d: number) => {
    return () => {
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
      var t = (a + b | 0) + d | 0; d = d + 1 | 0; a = b ^ b >>> 9;
      b = c + (c << 3) | 0; c = c << 21 | c >>> 11; c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
};

const getRng = (seedStr: string) => {
  const seed = cyrb128(seedStr);
  return sfc32(seed[0], seed[1], seed[2], seed[3]);
};

// === PROPS ===
interface StyleGeneratorProps {
  styleId: number;
  categoryId: string;
  className?: string;
  isHovered?: boolean;
}

export const StyleGenerator: React.FC<StyleGeneratorProps> = ({ styleId, categoryId, className = "", isHovered = false }) => {
  const cmatch = categoryId.match(/\d+/);
  const catNum = cmatch ? parseInt(cmatch[0], 10) : 1;

  const renderGenerativeStyle = () => {
    // 1) HARDCODED EXACT MATHEMATICAL EXAMPLES FOR IDS 1 TO 20 (Visually Complex Artworks)
    if (styleId >= 1 && styleId <= 20) {
      return <MathCurve1to20 styleId={styleId} isHovered={isHovered} />;
    }
    
    // 2) PROCEDURAL GENERATORS FOR EVERYTHING ELSE (ID > 20)
    switch (catNum) {
      case 14: case 20: return <TypographyAscii styleId={styleId} isHovered={isHovered} />;
      case 13: case 7:  return <IsometricVoxels styleId={styleId} isHovered={isHovered} />;
      case 15: case 9:  return <DiagrammaticNodes styleId={styleId} isHovered={isHovered} />;
      case 16: case 10: return <Wireframe3D styleId={styleId} isHovered={isHovered} />;
      case 3: case 8: case 11: case 17: case 18: return <AtmosphericShader styleId={styleId} isHovered={isHovered} />;
      case 1: case 4: case 5: case 6: case 19: return <GeometricParametric styleId={styleId} isHovered={isHovered} />;
      case 2: case 12: default: return <DiscreteGeometry styleId={styleId} isHovered={isHovered} />;
    }
  };

  return (
    <div className={`w-full h-full relative flex items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-[#121212] ${className}`}>
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      {useMemo(() => renderGenerativeStyle(), [styleId, catNum, isHovered])}
    </div>
  );
};

// =================================================================================================
// COMPLEX MATHEMATICAL WORKS FOR 001 - 020
// =================================================================================================
const MathCurve1to20 = ({ styleId, isHovered }: { styleId: number, isHovered: boolean }) => {
  const elements = useMemo(() => {
    const list = [];
    
    switch (styleId) {
      case 1: // Parametric Curve (Complex Interlocking Butterfly curve)
        let dc1 = "";
        for (let t = 0; t <= Math.PI * 12; t += 0.05) {
          const r = Math.exp(Math.cos(t)) - 2*Math.cos(4*t) - Math.pow(Math.sin(t/12), 5);
          const x = 50 + 9 * r * Math.sin(t);
          const y = 50 - 9 * r * Math.cos(t);
          dc1 += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
        }
        list.push(<path key="c1" d={dc1} className="stroke-rose-500 stroke-[0.4]" />);
        list.push(<path key="c1-b" d={dc1} className="stroke-rose-600/30 stroke-[0.8]" transform="scale(0.8) translate(12, 12)" />);
        break;
        
      case 2: // Parametric Surface (Torus projection wireframe, fully shaded)
        const R = 22; const rT = 10;
        for (let v = 0; v < Math.PI * 2; v += Math.PI / 8) {
          let ringD = "";
          for (let u = 0; u <= Math.PI * 2.1; u += 0.1) {
            const px = (R + rT * Math.cos(v)) * Math.cos(u); const py = (R + rT * Math.cos(v)) * Math.sin(u); const pz = rT * Math.sin(v);
            const isoX = 50 + px * 0.866 - py * 0.866; const isoY = 50 + px * 0.5 + py * 0.5 - pz;
            ringD += u === 0 ? `M ${isoX} ${isoY} ` : `L ${isoX} ${isoY} `;
          }
          list.push(<path key={`u-${v}`} d={ringD} className="stroke-indigo-500/60 stroke-[0.3]" />);
        }
        for (let u = 0; u < Math.PI * 2; u += Math.PI / 12) {
          let ringD = "";
          for (let v = 0; v <= Math.PI * 2.1; v += 0.1) {
            const px = (R + rT * Math.cos(v)) * Math.cos(u); const py = (R + rT * Math.cos(v)) * Math.sin(u); const pz = rT * Math.sin(v);
            const isoX = 50 + px * 0.866 - py * 0.866; const isoY = 50 + px * 0.5 + py * 0.5 - pz;
            ringD += v === 0 ? `M ${isoX} ${isoY} ` : `L ${isoX} ${isoY} `;
          }
          list.push(<path key={`v-${u}`} d={ringD} className="stroke-emerald-500/60 stroke-[0.3]" />);
        }
        break;
        
      case 3: // Polar Curves (Family of Limaçons building a 3D-like shell)
        for (let a = 0.4; a <= 2.2; a += 0.15) {
          let dc3 = "";
          for (let t = 0; t <= Math.PI * 2.1; t += 0.05) {
            const rP = 12 * (a + Math.cos(t)); 
            const x = 50 + rP * Math.cos(t); const y = 50 + rP * Math.sin(t);
            dc3 += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
          }
          list.push(<path key={`c3-${a}`} d={dc3} className="stroke-blue-500 fill-blue-400/5 stroke-[0.4]" />);
        }
        break;

      case 4: // Rose Curves (Nested layered mandala)
        for(let i=0; i<4; i++) {
          let dR = ""; const scale = 1 - i*0.2; const rot = i * Math.PI/12;
          for (let t = 0; t <= Math.PI * 6.1; t += 0.05) {
            const rShape = 38 * scale * Math.cos((5/3) * t);
            const x = 50 + rShape * Math.cos(t + rot);
            const y = 50 + rShape * Math.sin(t + rot);
            dR += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
          }
          list.push(<path key={`c4-${i}`} d={dR} className="stroke-rose-600 fill-none stroke-[0.5]" opacity={1 - i*0.2} />);
        }
        break;

      case 5: // Spirals (Multi-arm golden spiral)
        for (let arm=0; arm<3; arm++) {
          let dSp = ""; const offset = arm * (Math.PI*2/3);
          for (let t = 0; t <= Math.PI * 6; t += 0.1) {
             const rA = 1.8 * t;
             const x = 50 + rA * Math.cos(t + offset); const y = 50 + rA * Math.sin(t + offset);
             dSp += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
          }
          list.push(<path key={`c5-${arm}`} d={dSp} className="stroke-purple-500 stroke-[0.6] fill-none" opacity={1 - arm*0.1}/>);
        }
        break;

      case 6: // Logarithmic spiral (Nautilus shell with chambers)
        let dShell = ""; const chambers = [];
        for (let t = 0; t <= Math.PI * 7; t += 0.1) {
           const rL = 0.5 * Math.exp(0.2 * t);
           const x = 50 + rL * Math.cos(t); const y = 50 + rL * Math.sin(t);
           dShell += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
           if (Math.round(t*10)%8 === 0) { 
              const innerR = 0.5 * Math.exp(0.2 * (t - Math.PI*2)); 
              const ix = 50 + innerR * Math.cos(t); const iy = 50 + innerR * Math.sin(t);
              chambers.push(<line key={`ch-${t}`} x1={x} y1={y} x2={ix} y2={iy} className="stroke-cyan-500/40 stroke-[0.3]" />);
           }
        }
        list.push(<path key="c6" d={dShell} className="stroke-cyan-500 stroke-[0.7] fill-cyan-400/5" />);
        list.push(...chambers);
        break;

      case 7: // Archimedean spirals (Rope-like interlacing)
        let da1="", da2="";
        for (let t = 0; t <= Math.PI * 16; t += 0.1) {
           const rA = 0.8 * t;
           const x1 = 50 + rA * Math.cos(t); const y1 = 50 + rA * Math.sin(t);
           const x2 = 50 + rA * Math.cos(t + Math.PI); const y2 = 50 + rA * Math.sin(t + Math.PI);
           da1 += t === 0 ? `M ${x1} ${y1} ` : `L ${x1} ${y1} `;
           da2 += t === 0 ? `M ${x2} ${y2} ` : `L ${x2} ${y2} `;
        }
        list.push(<path key="c7-1" d={da1} className="stroke-fuchsia-500 stroke-[0.6] fill-none" />);
        list.push(<path key="c7-2" d={da2} className="stroke-fuchsia-400 stroke-[0.6] stroke-dasharray-[2,2] fill-none" />);
        break;

      case 8: // Fermat spirals (Phyllotaxis Sunflower Layout - Dot Matrix)
        for (let i = 1; i <= 350; i++) {
           const theta = i * 137.508 * (Math.PI/180);
           const r = 2.0 * Math.sqrt(i);
           const x = 50 + r * Math.cos(theta); const y = 50 + r * Math.sin(theta);
           list.push(<circle key={`ph-${i}`} cx={x} cy={y} r={0.5 + i*0.005} className="fill-orange-500 drop-shadow-sm" />);
        }
        break;

      case 9: // Hypotrochoids (Extremely dense inner star / Spirograph)
        const rh1 = 25, rh2 = 16, offsetH = 12; let dh = "";
        for (let t = 0; t <= Math.PI * 80; t += 0.05) {
           const x = 50 + (rh1-rh2)*Math.cos(t) + offsetH*Math.cos((rh1-rh2)/rh2*t);
           const y = 50 + (rh1-rh2)*Math.sin(t) - offsetH*Math.sin((rh1-rh2)/rh2*t);
           dh += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
        }
        list.push(<path key="c9" d={dh} className="stroke-lime-500 stroke-[0.3]" />);
        break;

      case 10: // Epitrochoids (Outer sweeping dense multi-loops)
        const re1 = 15, re2 = 4, offsetE = 20; let de = "";
        for (let t = 0; t <= Math.PI * 40; t += 0.05) {
           const x = 50 + (re1+re2)*Math.cos(t) - offsetE*Math.cos((re1+re2)/re2*t);
           const y = 50 + (re1+re2)*Math.sin(t) - offsetE*Math.sin((re1+re2)/re2*t);
           de += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
        }
        list.push(<path key="c10" d={de} className="stroke-teal-500 stroke-[0.3] fill-teal-500/10" />);
        break;

      case 11: // Spirograph forms (4 beautiful interlaced color layers)
        [[25, 7, 18], [25, 12, 12], [25, 16, 22], [25, 9, 25]].forEach((s, idx) => {
           let spiroD = "";
           for (let t = 0; t <= Math.PI * 100; t += 0.2) {
              const x = 50 + (s[0]-s[1])*Math.cos(t) + s[2]*Math.cos((s[0]-s[1])/s[1]*t);
              const y = 50 + (s[0]-s[1])*Math.sin(t) - s[2]*Math.sin((s[0]-s[1])/s[1]*t);
              spiroD += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
           }
           list.push(<path key={`c11-${idx}`} d={spiroD} stroke={`hsl(${180 + idx*40}, 80%, 50%)`} className="stroke-[0.3]" />);
        });
        break;

      case 12: // Lissajous curves (3D rotating wireframe illusion mesh)
        for(let phase=0; phase<=Math.PI; phase+=Math.PI/10) {
          let dl = "";
          for (let t = 0; t <= Math.PI * 2.1; t += 0.05) {
             const x = 50 + 35 * Math.sin(4 * t + phase);
             const y = 50 + 35 * Math.sin(3 * t);
             dl += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
          }
          list.push(<path key={`c12-${phase}`} d={dl} className="stroke-yellow-500/40 stroke-[0.3] fill-none" />);
        }
        break;

      case 13: // Bezier systems (Full diamond String Art from lines)
        const lines = 24;
        for (let i = 0; i <= lines; i++) {
           const f = i/lines;
           list.push(<line key={`tr-${i}`} x1={50} y1={10+f*40} x2={50+f*40} y2={50} className="stroke-pink-500/70 stroke-[0.3]" />);
           list.push(<line key={`br-${i}`} x1={50} y1={90-f*40} x2={50+f*40} y2={50} className="stroke-pink-500/70 stroke-[0.3]" />);
           list.push(<line key={`tl-${i}`} x1={50} y1={10+f*40} x2={50-f*40} y2={50} className="stroke-pink-500/70 stroke-[0.3]" />);
           list.push(<line key={`bl-${i}`} x1={50} y1={90-f*40} x2={50-f*40} y2={50} className="stroke-pink-500/70 stroke-[0.3]" />);
        }
        break;

      case 14: // Splines with procedural control points (Topography/Contours)
        for(let i=0; i<6; i++) {
          const yOff = i*5;
          list.push(
             <path key={`sp-${i}`} d={`M 10 ${30+yOff} C ${30+i*5} ${10+yOff}, ${70-i*5} ${90-yOff}, 90 ${70-yOff}`} className="stroke-indigo-400 stroke-[0.8] fill-none" />
          );
          list.push(<circle key={`n1-${i}`} cx={30+i*5} cy={10+yOff} r={1} className="fill-indigo-300" />);
          list.push(<circle key={`n2-${i}`} cx={70-i*5} cy={90-yOff} r={1} className="fill-indigo-300" />);
        }
        // Background guides connecting control points
        for(let i=0; i<5; i++) {
           list.push(<line key={`gtd-${i}`} x1={30+i*5} y1={10+i*5} x2={30+(i+1)*5} y2={10+(i+1)*5} className="stroke-white/20 stroke-dasharray-[1,1] stroke-[0.3]"/>);
        }
        break;

      case 15: // Fourier drawing / Fourier epicycles (Planetary gears and path)
        const fR1 = 15, fR2 = 8, fR3 = 4; const ft = Math.PI / 4; 
        const cx1 = 50, cy1 = 50; const cx2 = cx1 + fR1 * Math.cos(ft); const cy2 = cy1 + fR1 * Math.sin(ft); const cx3 = cx2 + fR2 * Math.cos(ft * 3); const cy3 = cy2 + fR2 * Math.sin(ft * 3); const px = cx3 + fR3 * Math.cos(ft * -5); const py = cy3 + fR3 * Math.sin(ft * -5);
        let df = "";
        for(let tt=0; tt<=Math.PI*2.1; tt+=0.05) {
           const pxx = cx1 + fR1*Math.cos(tt) + fR2*Math.cos(tt*3) + fR3*Math.cos(tt*-5); const pyy = cy1 + fR1*Math.sin(tt) + fR2*Math.sin(tt*3) + fR3*Math.sin(tt*-5);
           df += tt===0?`M ${pxx} ${pyy} `:`L ${pxx} ${pyy} `;
        }
        list.push(
           <g key="c15" className="fill-none">
             <path d={df} className="stroke-orange-500 stroke-[0.8] drop-shadow-md" />
             <circle cx={cx1} cy={cy1} r={fR1} className="stroke-indigo-400/40 stroke-[0.3]" />
             <circle cx={cx2} cy={cy2} r={fR2} className="stroke-indigo-400/40 stroke-[0.3]" />
             <circle cx={cx3} cy={cy3} r={fR3} className="stroke-indigo-400/40 stroke-[0.3]" />
             <line x1={cx1} y1={cy1} x2={cx2} y2={cy2} className="stroke-indigo-400/60 stroke-[0.4]" />
             <line x1={cx2} y1={cy2} x2={cx3} y2={cy3} className="stroke-indigo-400/60 stroke-[0.4]" />
             <line x1={cx3} y1={cy3} x2={px} y2={py} className="stroke-indigo-400/60 stroke-[0.6]" />
             <circle cx={px} cy={py} r="1.5" className="fill-orange-500 stroke-none" />
           </g>
        );
        break;

      case 16: // Harmonograph (Ultra dense fine-mesh 2-pendulum system)
        let dHarm = "";
        for (let t = 0; t <= Math.PI * 120; t += 0.05) {
           const damp = Math.exp(-0.005 * t);
           const x = 50 + 38 * damp * Math.sin(t * 3.01 + Math.PI/2) + 12 * damp * Math.sin(t * 1.01);
           const y = 50 + 38 * damp * Math.sin(t * 2 + 0) + 12 * damp * Math.sin(t * 1.02);
           dHarm += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
        }
        list.push(<path key="c16" d={dHarm} className="stroke-cyan-400/40 stroke-[0.2]" />);
        break;

      case 17: // Cycloids (Dense cascading family of cyclic curves)
        for(let rC=2; rC<=8; rC+=1.5) {
          let dC = "";
          for (let t = 0; t <= Math.PI * 5; t += 0.05) {
             const x = 5 + rC * (t - Math.sin(t));
             const y = 80 - rC * (1 - Math.cos(t)); 
             dC += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
          }
          list.push(<path key={`c17-${rC}`} d={dC} className="stroke-red-500 fill-none stroke-[0.4]" opacity={1 - (rC-2)*0.1}/>);
        }
        list.push(<line key="c17-l" x1="5" y1="80" x2="95" y2="80" className="stroke-red-500/80 stroke-[0.5]" />);
        break;

      case 18: // Epicycloids (Layered multi-petal Nephroids/Cardioids)
        const nrR = 12;
        [6, 4, 3].forEach((nrr, i) => {
          let dp = "";
          for (let t = 0; t <= Math.PI * 4.1; t += 0.05) {
             const x = 50 + (nrR+nrr)*Math.cos(t) - nrr*Math.cos((nrR+nrr)/nrr * t);
             const y = 50 + (nrR+nrr)*Math.sin(t) - nrr*Math.sin((nrR+nrr)/nrr * t);
             dp += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
          }
          list.push(<path key={`c18-${i}`} d={dp} className="stroke-amber-400 fill-none stroke-[0.4]" opacity={1 - i*0.2}/>);
        });
        list.push(<circle key="c18-c" cx="50" cy="50" r={nrR} className="stroke-amber-400/20 fill-amber-300/10 stroke-[0.4]" />);
        break;

      case 19: // Hypocycloids (Layered Astroid, Deltoid, etc)
        const arR = 36;
        [9, 12, 18].forEach((arr, i) => {
          let dhy = "";
          for (let t = 0; t <= Math.PI * 4.1; t += 0.05) {
             const x = 50 + (arR-arr)*Math.cos(t) + arr*Math.cos((arR-arr)/arr * t);
             const y = 50 + (arR-arr)*Math.sin(t) - arr*Math.sin((arR-arr)/arr * t);
             dhy += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
          }
          list.push(<path key={`c19-${i}`} d={dhy} className="stroke-emerald-500 fill-none stroke-[0.4]" opacity={1 - i*0.2}/>);
        });
        list.push(<circle key="c19-c" cx="50" cy="50" r={arR} className="stroke-emerald-500/20 fill-none stroke-[0.4]" />);
        break;

      case 20: // Superellipses (Superimposed mathematical transformation from star to squircle)
        [0.4, 0.7, 1.0, 1.5, 2.0, 3.0].forEach((n, idx) => {
          let dSup = "";
          const n_pow = 2.0 / n;
          for (let t = 0; t <= Math.PI * 2.1; t += 0.05) {
             const signX = Math.cos(t) >= 0 ? 1 : -1; const signY = Math.sin(t) >= 0 ? 1 : -1;
             const x = 50 + (35 - idx*2) * signX * Math.pow(Math.abs(Math.cos(t)), n_pow);
             const y = 50 + (35 - idx*2) * signY * Math.pow(Math.abs(Math.sin(t)), n_pow);
             dSup += t === 0 ? `M ${x} ${y} ` : `L ${x} ${y} `;
          }
          list.push(<path key={`c20-${idx}`} d={dSup} className="stroke-blue-400 fill-none stroke-[0.5]" opacity={1 - idx*0.1}/>);
        });
        break;
    }
    return list;
  }, [styleId]);

  return (
    <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] fill-none">
      <g className={`transition-all duration-1000 ease-in-out origin-center ${isHovered ? 'scale-[1.15] drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)]' : 'scale-100'}`}>
        {elements}
      </g>
    </svg>
  );
};


// =================================================================================================
// PROCEDURAL GEOMETRY (ID > 20)
// =================================================================================================
const DiscreteGeometry = ({ styleId, isHovered }: { styleId: number, isHovered: boolean }) => {
  const rng = getRng(`discrete-${styleId}`);
  const hue = Math.floor(rng() * 360);
  const typeChance = rng();
  
  const structure = useMemo(() => {
    const paths = [];
    if (typeChance < 0.33) { 
      // Deep parametrized Grid (Varying density, missing segments)
      const res = 5 + Math.floor(rng() * 15); const step = 100 / res; const survivalRate = 0.5 + rng() * 0.5; 
      for (let x = 0; x <= 100; x += step) if (rng() < survivalRate) paths.push(<line key={`grid-vx-${x}`} x1={x} y1="0" x2={x} y2="100" opacity={0.5} strokeWidth={0.2} stroke="currentColor" />);
      for (let y = 0; y <= 100; y += step) if (rng() < survivalRate) paths.push(<line key={`grid-vy-${y}`} x1="0" y1={y} x2="100" y2={y} opacity={0.5} strokeWidth={0.2} stroke="currentColor" />);
      if (rng() > 0.5) paths.push(<rect key="grid-ctr" x={50 - step} y={50 - step} width={step*2} height={step*2} fill={`hsl(${hue}, 50%, 50%)`} fillOpacity="0.4" stroke="none" />);
    } else if (typeChance < 0.66) { 
      // Deep parametrized Hex or Isometric Grid
      const hexSize = 4 + rng() * 12; const w = Math.sqrt(3) * hexSize; const h = 2 * hexSize; const survivalRate = 0.4 + rng() * 0.6;
      for (let y = -20; y < 120 + h; y += h * 0.75) {
        const offset = (Math.round(y / (h*0.75)) % 2) * (w / 2);
        for (let x = -20; x < 120 + w; x += w) {
          if (rng() > survivalRate) continue;
          let d = "";
          for (let i = 0; i <= 6; i++) {
            const a = (i * Math.PI) / 3; const px = (x + offset) + Math.cos(a) * hexSize * 0.9; const py = y + Math.sin(a) * hexSize * 0.9;
            d += i === 0 ? `M ${px} ${py} ` : `L ${px} ${py} `;
          }
          paths.push(<path key={`hex-${x}-${y}`} d={d} opacity={0.8} strokeWidth={0.2} stroke="currentColor" fill={rng()>0.8 ? `hsl(${hue}, 50%, 50%)` : "none"} fillOpacity="0.2" />);
        }
      }
    } else { 
      // Scattered Voronoi / Delaunay
      const pts = []; const pointsCount = 10 + Math.floor(rng() * 40); const radialMode = rng() > 0.5;
      for (let i = 0; i < pointsCount; i++) {
        if (radialMode) { const r = rng() * 45; const a = rng() * Math.PI * 2; pts.push({ x: 50 + Math.cos(a)*r, y: 50 + Math.sin(a)*r }); }
        else { pts.push({ x: rng() * 100, y: rng() * 100 }); }
      }
      const connectMax = 10 + rng() * 30;
      pts.forEach((p, i) => {
        pts.forEach((p2, j) => {
          if (i < j) { const dist = Math.sqrt((p.x-p2.x)**2 + (p.y-p2.y)**2); if (dist < connectMax) paths.push(<line key={`v-${i}-${j}`} x1={p.x} y1={p.y} x2={p2.x} y2={p2.y} stroke="currentColor" strokeWidth={0.2} opacity={Math.max(0.1, 1-(dist/connectMax))} />); }
        });
        paths.push(<circle key={`vp-${i}`} cx={p.x} cy={p.y} r={0.5 + rng()*2} fill={`hsl(${hue}, 50%, 50%)`} className="stroke-none" />);
      });
    }
    return paths;
  }, [styleId, typeChance, hue]);

  return (
    <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] fill-none" stroke={`hsl(${hue}, 0%, 50%)`} strokeWidth={0.2 + rng()*0.6}>
      <g className={`transition-all duration-700 ${isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-80'} origin-center`}>
        {structure}
      </g>
    </svg>
  );
};

const TypographyAscii = ({ styleId, isHovered }: { styleId: number, isHovered: boolean }) => {
  const rng = getRng(`ascii-${styleId}`);
  const linesCount = 8 + Math.floor(rng() * 12);
  const strings = ['[ BASE ]', 'X X X', '< 0x0F >', '{ NODE }', '&& ||', '0---0', 'SYS_ERR', '10101', '/////', '=====', 'O', String(styleId)];
  const gridStrings = useMemo(() => Array.from({length: linesCount}).map(() => ({ text: strings[Math.floor(rng() * strings.length)], x: 10 + rng() * 80, y: 10 + rng() * 80, size: 6 + rng() * 8, opacity: 0.3 + rng() * 0.7 })), [styleId]);

  return (
    <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] font-mono uppercase">
      <g className={`transition-all duration-700 origin-center ${isHovered ? 'scale-110 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'scale-100 drop-shadow-[0_0_2px_rgba(74,222,128,0.4)]'}`}>
        {gridStrings.map((s, i) => <text key={i} x={rng() > 0.5 ? 50 : s.x} y={s.y} fill="#4ade80" fontSize={s.size} textAnchor="middle" opacity={s.opacity}>{s.text}</text>)}
        {rng() > 0.5 && <line x1="20" y1="50" x2="80" y2="50" stroke="#4ade80" strokeWidth="1" strokeDasharray="4 2" opacity={0.5} />}
        <text x="50" y="50" fill="#4ade80" fontSize="14" textAnchor="middle" fontWeight="bold">[{styleId}]</text>
      </g>
    </svg>
  );
};

const IsometricVoxels = ({ styleId, isHovered }: { styleId: number, isHovered: boolean }) => {
  const rng = getRng(`voxel-${styleId}`);
  const hue = Math.floor(rng() * 360);
  
  const cubes = useMemo(() => {
    const size = 4 + rng() * 5; const arr = []; const gridW = 3 + Math.floor(rng() * 5); const gridH = 3 + Math.floor(rng() * 5); const landscapeType = rng();
    for (let x = 0; x < gridW; x++) {
      for (let y = 0; y < gridH; y++) {
         let h = 0;
         if (landscapeType < 0.3) h = rng() > 0.5 ? 1 : 0;
         else if (landscapeType < 0.6) h = Math.floor(rng() * 4);
         else { const dx = x - gridW/2; const dy = y - gridH/2; h = Math.max(0, 4 - Math.sqrt(dx*dx + dy*dy)); }
         for (let z = 0; z <= h; z++) arr.push({ x, y, z, size });
      }
    }
    arr.sort((a,b) => (a.x + a.y + a.z) - (b.x + b.y + b.z));
    return arr;
  }, [styleId]);

  return (
    <svg viewBox="-50 -50 100 100" className="w-[85%] h-[85%] stroke-black/20 dark:stroke-white/20 stroke-[0.2]">
      <g className={`transition-transform duration-700 origin-center ${isHovered ? 'scale-110' : 'scale-100'}`}>
        {cubes.map((c, i) => {
          const px = (c.x - c.y) * c.size * 0.866; const py = (c.x + c.y) * c.size * 0.5 - (c.z * c.size * 1.1) + 15;
          const isTop = (i === cubes.length -1 || c.z === Math.max(...cubes.filter(cc => cc.x===c.x && cc.y===c.y).map(cc=>cc.z)));
          return (
            <g key={i} transform={`translate(${px}, ${py})`}>
               <path d={`M 0 0 L 0 ${c.size} L ${-c.size*0.866} ${c.size*0.5} L ${-c.size*0.866} ${-c.size*0.5} Z`} fill={`hsl(${hue}, 60%, 40%)`} />
               <path d={`M 0 0 L 0 ${c.size} L ${c.size*0.866} ${c.size*0.5} L ${c.size*0.866} ${-c.size*0.5} Z`} fill={`hsl(${hue}, 60%, 30%)`} />
               <path d={`M 0 0 L ${-c.size*0.866} ${-c.size*0.5} L 0 ${-c.size} L ${c.size*0.866} ${-c.size*0.5} Z`} fill={`hsl(${hue}, 60%, ${isTop ? '60%' : '50%'})`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const DiagrammaticNodes = ({ styleId, isHovered }: { styleId: number, isHovered: boolean }) => {
  const rng = getRng(`nodes-${styleId}`); const hue = Math.floor(rng() * 360);
  const nodes = useMemo(() => {
    const arr = []; const count = 4 + Math.floor(rng() * 15);
    for (let i = 0; i < count; i++) {
      const isRing = rng() > 0.5;
      arr.push({ x: isRing ? 50 + Math.cos(i*Math.PI*2/count) * (20+rng()*20) : 10 + rng() * 80, y: isRing ? 50 + Math.sin(i*Math.PI*2/count) * (20+rng()*20) : 10 + rng() * 80, r: 1 + rng() * 6 });
    }
    return arr;
  }, [styleId]);

  return (
    <svg viewBox="0 0 100 100" className="w-[90%] h-[90%]">
      <g className={`transition-all duration-700 origin-center ${isHovered ? 'scale-105 rotate-3' : 'scale-100 rotate-0'}`}>
        {nodes.map((n, i) => nodes.filter(n2 => {const d = Math.sqrt((n2.x-n.x)**2 + (n2.y-n.y)**2); return d > 0 && d < 40;}).map((n2, j) => (
             <line key={`node-l-${i}-${j}`} x1={n.x} y1={n.y} x2={n2.x} y2={n2.y} stroke={`hsl(${hue}, 50%, 50%)`} strokeWidth="0.3" strokeOpacity={0.4} strokeDasharray={rng()>0.6 ? "1 1" : "none"} />
        )))}
        {nodes.map((n, i) => <circle key={`node-c-${i}`} cx={n.x} cy={n.y} r={n.r} fill={`hsl(${hue}, 60%, 50%)`} stroke="none" />)}
        <circle cx="50" cy="50" r="4" className="fill-indigo-400" stroke="none" />
        <circle cx="50" cy="50" r="10" className="stroke-indigo-400/30 fill-none" strokeWidth="0.5" strokeDasharray="1 2" />
      </g>
    </svg>
  );
};

const Wireframe3D = ({ styleId, isHovered }: { styleId: number, isHovered: boolean }) => {
  const rng = getRng(`wireframe-${styleId}`); const hue = Math.floor(rng() * 360);
  const paths = useMemo(() => {
    const arr = []; const bands = 3 + Math.floor(rng() * 10); const shapeType = Math.floor(rng() * 3);
    if (shapeType === 0) {
      for (let i = 1; i < bands; i++) { const y = (i / bands) * 80 - 40; const r = Math.sqrt(40**2 - y**2); arr.push(<ellipse key={`lat-${i}`} cx="50" cy={50 + y} rx={r} ry={r * (0.2+rng()*0.5)} />); }
      for (let i = 0; i < bands; i++) { const rx = 40 * Math.cos((i/bands)*Math.PI); arr.push(<ellipse key={`lon-${i}`} cx="50" cy="50" rx={Math.abs(Math.max(1, rx))} ry="40" />); }
    } else if (shapeType === 1) {
      for (let i = 0; i <= bands; i++) { const y = 20 + i * (60/bands); arr.push(<ellipse key={`cyl-${i}`} cx="50" cy={y} rx={30} ry={10} />); }
      arr.push(<line key="w1" x1="20" y1="20" x2="20" y2="80" />); arr.push(<line key="w2" x1="80" y1="20" x2="80" y2="80" />);
    } else {
      for (let i = 0; i < bands*2; i++) arr.push(<ellipse key={`abs-${i}`} cx="50" cy="50" rx={10+rng()*30} ry={10+rng()*30} transform={`rotate(${rng()*180} 50 50)`} />);
    }
    return arr;
  }, [styleId]);

  return (
    <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] fill-none">
      <g className={`transition-all duration-1000 origin-center stroke-[0.3] ${isHovered ? 'rotate-12 scale-105' : 'rotate-[-5deg] scale-100'}`} stroke={`hsl(${hue}, 80%, 50%)`}>
        {paths}
        {rng() > 0.5 && <circle cx="50" cy="50" r="40" strokeOpacity="0.3" strokeWidth="0.5" />}
      </g>
    </svg>
  );
};

const AtmosphericShader = ({ styleId, isHovered }: { styleId: number, isHovered: boolean }) => {
  const rng = getRng(`shader-${styleId}`);
  const tId = `turb_${styleId}`; const hr = Math.floor(rng() * 360); const scale = 5 + rng() * 20;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id={`grad_${styleId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`hsl(${hr}, 80%, 60%)`} stopOpacity="0.8" />
          <stop offset="50%" stopColor={`hsl(${(hr+60)%360}, 80%, 60%)`} stopOpacity="0.4" />
          <stop offset="100%" stopColor="#121212" stopOpacity="0" />
        </radialGradient>
        <filter id={tId} x="-20%" y="-20%" width="140%" height="140%">
           <feTurbulence type="fractalNoise" baseFrequency={0.01+rng()*0.05} numOctaves={1+Math.floor(rng()*4)} result="noise" seed={styleId} />
           <feDisplacementMap in="SourceGraphic" in2="noise" scale={isHovered ? scale * 1.5 : scale} xChannelSelector="R" yChannelSelector="G" />
           <feGaussianBlur stdDeviation={1 + rng()*3} result="blur" />
           <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {rng() > 0.5 && (
        <g className="stroke-cyan-400/20 fill-none stroke-[0.2]">
          {Array.from({ length: 6 }).map((_, i) => (<circle key={`bg-${i}`} cx="50" cy="50" r={10 + i * 8} />))}
          {Array.from({ length: 12 }).map((_, i) => (<line key={`l-${i}`} x1="50" y1="50" x2={50+60*Math.cos(i*Math.PI/6)} y2={50+60*Math.sin(i*Math.PI/6)} />))}
        </g>
      )}
      <g filter={`url(#${tId})`} className="transition-all duration-1000">
        <circle cx="50" cy="50" r={10 + rng() * 20} fill={`url(#grad_${styleId})`} stroke="none" />
        {rng() > 0.5 && <circle cx={30+rng()*40} cy={30+rng()*40} r={5+rng()*10} fill={`hsl(${(hr+120)%360}, 80%, 60%)`} opacity="0.6" stroke="none" />}
      </g>
      <circle cx="50" cy="50" r={2} className="fill-white drop-shadow-md" stroke="none" />
    </svg>
  );
};

const GeometricParametric = ({ styleId, isHovered }: { styleId: number, isHovered: boolean }) => {
  const rng = getRng(`geo-${styleId}`); const hue = Math.floor(rng() * 360); const typeChance = rng();
  const paths = useMemo(() => {
    const arr = [];
    if (typeChance < 0.25) { // Rose
      const k = 2 + Math.floor(rng() * 10); const rad = 20 + rng() * 25; let d = "";
      for (let i = 0; i <= 360; i+=2) {
        const a = (i * Math.PI) / 180; const r = rad * Math.cos(k * a);
        d += i === 0 ? `M ${50+Math.cos(a)*r} ${50+Math.sin(a)*r} ` : `L ${50+Math.cos(a)*r} ${50+Math.sin(a)*r} `;
      }
      arr.push(<path key="rose" d={d} />);
    } else if (typeChance < 0.5) { // Lissajous
      const a = 1 + Math.floor(rng() * 5); const b = 2 + Math.floor(rng() * 5); const rad = 20 + rng() * 25; let d = "";
      for (let i = 0; i <= 360; i+=2) {
        const aR = (i * Math.PI) / 180;
        d += i === 0 ? `M ${50+rad*Math.sin(a*aR)} ${50+rad*Math.sin(b*aR+Math.PI/4)} ` : `L ${50+rad*Math.sin(a*aR)} ${50+rad*Math.sin(b*aR+Math.PI/4)} `;
      }
      arr.push(<path key="lissajous" d={d} />);
    } else if (typeChance < 0.75) { // Spiro
      const R = 10 + rng() * 20; const r = 3 + rng() * 15; const offset = 5 + rng() * 25; let d = "";
      for (let i = 0; i <= 360 * 10; i += 5) {
        const a = (i * Math.PI) / 180;
        const x = 50 + (R + r) * Math.cos(a) - offset * Math.cos(((R + r) / r) * a);
        const y = 50 + (R + r) * Math.sin(a) - offset * Math.sin(((R + r) / r) * a);
        if (x > 0 && x < 100 && y > 0 && y < 100) d += d === "" ? `M ${x} ${y} ` : `L ${x} ${y} `;
      }
      arr.push(<path key="spiro" d={d} />);
    } else { // Multiple polygons overlay
      const sides = 3 + Math.floor(rng() * 6); const layers = 5 + Math.floor(rng() * 15); const rotationBase = rng() * 0.5;
      for (let l = 1; l <= layers; l++) {
        let d = ""; const r = 40 * (l / layers);
        for (let i = 0; i <= sides; i++) {
          const a = (i * Math.PI * 2) / sides + (l * rotationBase);
          d += i === 0 ? `M ${50+Math.cos(a)*r} ${50+Math.sin(a)*r} ` : `L ${50+Math.cos(a)*r} ${50+Math.sin(a)*r} `;
        }
        arr.push(<path key={`poly-${l}`} d={d} opacity={0.3 + (l/layers)*0.5} strokeWidth={0.2 + (l/layers)} />);
      }
    }
    return arr;
  }, [styleId]);

  return (
    <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] overflow-visible fill-none stroke-[0.5]" stroke={`hsl(${hue}, 80%, 50%)`}>
      <g className={`transition-transform duration-1000 ease-in-out origin-center ${isHovered ? 'scale-110' : 'scale-100'}`}>
        <circle cx="50" cy="50" r="4" fill={`hsl(${hue}, 80%, 50%)`} stroke="none" />
        {paths}
      </g>
    </svg>
  );
};
