import { useEffect, useRef } from 'react';

const BASE_URL = import.meta.env.BASE_URL;
const LOGO_SRC = `${BASE_URL}assets/ai-mindset-logo.png`;

interface VoxelPoint {
  homeX: number;
  homeY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  firmness: number;
  size: number;
  phase: number;
  drift: number;
}

type InvertedVoxelLogoFaceProps = {
  scale?: number;
  opacity?: number;
  className?: string;
};

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function getIntroPosition(homeX: number, homeY: number, drawX: number, drawY: number, drawSize: number) {
  const centerX = drawX + drawSize / 2;
  const centerY = drawY + drawSize / 2;
  const angle = Math.random() * Math.PI * 2;
  const radius = drawSize * (0.72 + Math.random() * 0.24);
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
  };
}

export function InvertedVoxelLogoFace({ scale = 1, opacity = 1, className = '' }: InvertedVoxelLogoFaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const internalSize = 680;
    const drawSize = 560;
    const drawX = (internalSize - drawSize) / 2;
    const drawY = (internalSize - drawSize) / 2;
    const cellSize = 5;
    const gap = 2;
    const step = cellSize + gap;
    const seamInset = 6;
    const seamX = drawX + drawSize / 2;
    const rightHalfStart = seamX - cellSize - seamInset;
    const repulsionRadius = 88;
    const edgeRadius = Math.max(1.6, cellSize * 0.2);
    const scrollAmplitude = 5;
    const randomCull = 0.2;

    canvas.width = internalSize;
    canvas.height = internalSize;

    const image = new Image();
    const offscreen = document.createElement('canvas');
    offscreen.width = internalSize;
    offscreen.height = internalSize;
    const offscreenContext = offscreen.getContext('2d', { willReadFrequently: true });

    const leftMaskCanvas = document.createElement('canvas');
    leftMaskCanvas.width = internalSize;
    leftMaskCanvas.height = internalSize;
    const leftMaskContext = leftMaskCanvas.getContext('2d');

    let frameId = 0;
    let disposed = false;
    let introProgress = 0;
    let voxels: VoxelPoint[] = [];

    const setPointerFromEvent = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * internalSize,
        y: ((event.clientY - rect.top) / rect.height) * internalSize,
      };
    };

    const clearResetTimer = () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      clearResetTimer();
      setPointerFromEvent(event);
    };

    const onPointerDown = (event: PointerEvent) => {
      clearResetTimer();
      setPointerFromEvent(event);
    };

    const onPointerLeave = () => {
      pointerRef.current = { x: -9999, y: -9999 };
    };

    const onPointerUp = () => {
      clearResetTimer();
      resetTimerRef.current = window.setTimeout(() => {
        pointerRef.current = { x: -9999, y: -9999 };
        resetTimerRef.current = null;
      }, 420);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const isInsideEyeZone = (x: number, y: number) => {
      const normalizedX = (x - drawX) / drawSize;
      const normalizedY = (y - drawY) / drawSize;
      return normalizedX > 0.62 && normalizedX < 0.9 && normalizedY > 0.43 && normalizedY < 0.61;
    };

    const isInsideEyeContourZone = (x: number, y: number) => {
      const normalizedX = (x - drawX) / drawSize;
      const normalizedY = (y - drawY) / drawSize;
      return normalizedX > 0.6 && normalizedX < 0.92 && normalizedY > 0.41 && normalizedY < 0.63;
    };

    const getSeamShift = (x: number) => {
      const contourProgress = Math.max(0, Math.min(1, (x - rightHalfStart) / Math.max(1, drawX + drawSize - rightHalfStart)));
      return 5 * Math.pow(1 - contourProgress, 1.75);
    };

    const getCoverage = (imageData: Uint8ClampedArray, x: number, y: number) => {
      let brightHits = 0;
      let samples = 0;
      const sampleStep = Math.max(1, Math.floor(cellSize / 2));
      const endX = Math.min(internalSize - 1, x + cellSize);
      const endY = Math.min(internalSize - 1, y + cellSize);

      for (let sampleY = y; sampleY < endY; sampleY += sampleStep) {
        for (let sampleX = Math.max(x, Math.floor(seamX) + 1); sampleX < endX; sampleX += sampleStep) {
          const index = (sampleY * internalSize + sampleX) * 4;
          const r = imageData[index] ?? 0;
          const g = imageData[index + 1] ?? 0;
          const b = imageData[index + 2] ?? 0;
          const alpha = imageData[index + 3] ?? 0;
          const brightness = (r + g + b) / 3;
          samples += 1;
          if (alpha > 40 && brightness > 160) brightHits += 1;
        }
      }

      return samples > 0 ? brightHits / samples : 0;
    };

    const getDarkCoverage = (imageData: Uint8ClampedArray, x: number, y: number) => {
      const centerX = Math.max(0, Math.min(internalSize - 1, Math.round(x + cellSize * 0.5)));
      const centerY = Math.max(0, Math.min(internalSize - 1, Math.round(y + cellSize * 0.5)));
      let darkHits = 0;
      let samples = 0;

      for (let offsetY = -6; offsetY <= 6; offsetY += 2) {
        for (let offsetX = -7; offsetX <= 7; offsetX += 2) {
          const sampleX = Math.max(0, Math.min(internalSize - 1, centerX + offsetX));
          const sampleY = Math.max(0, Math.min(internalSize - 1, centerY + offsetY));
          const index = (sampleY * internalSize + sampleX) * 4;
          const r = imageData[index] ?? 0;
          const g = imageData[index + 1] ?? 0;
          const b = imageData[index + 2] ?? 0;
          const alpha = imageData[index + 3] ?? 0;
          const brightness = (r + g + b) / 3;
          samples += 1;
          if (alpha > 40 && brightness < 96) darkHits += 1;
        }
      }

      return samples > 0 ? darkHits / samples : 0;
    };

    const buildLeftMask = (imageData: Uint8ClampedArray) => {
      if (!leftMaskContext) return;
      const maskImage = leftMaskContext.createImageData(internalSize, internalSize);

      for (let y = 0; y < internalSize; y += 1) {
        for (let x = 0; x < internalSize; x += 1) {
          const index = (y * internalSize + x) * 4;
          const r = imageData[index] ?? 0;
          const g = imageData[index + 1] ?? 0;
          const b = imageData[index + 2] ?? 0;
          const alpha = imageData[index + 3] ?? 0;
          const brightness = (r + g + b) / 3;
          const isLogoPixel = x < seamX && alpha > 40 && brightness > 160;

          maskImage.data[index] = 24;
          maskImage.data[index + 1] = 22;
          maskImage.data[index + 2] = 22;
          maskImage.data[index + 3] = isLogoPixel ? 255 : 0;
        }
      }

      leftMaskContext.clearRect(0, 0, internalSize, internalSize);
      leftMaskContext.putImageData(maskImage, 0, 0);
    };

    const buildVoxels = (imageData: Uint8ClampedArray) => {
      voxels = [];

      for (let y = drawY; y < drawY + drawSize; y += step) {
        for (let x = rightHalfStart; x < drawX + drawSize; x += step) {
          const normalizedX = (x - drawX) / drawSize;
          const normalizedY = (y - drawY) / drawSize;
          const coverage = getCoverage(imageData, x, y);
          const nearSeam = x < drawX + drawSize / 2 + step * 2;
          const nearTail = y > drawY + drawSize * 0.78;
          const nearOuter = normalizedX > 0.82;
          const nearTopCurve = normalizedX > 0.7 && normalizedY < 0.24;
          const nearEyeContour = isInsideEyeContourZone(x + cellSize * 0.5, y + cellSize * 0.5);
          const insideEye = isInsideEyeZone(x + cellSize * 0.5, y + cellSize * 0.5) && getDarkCoverage(imageData, x, y) > 0.32;
          const preserveDensity = nearSeam || nearTail || nearOuter || nearTopCurve || nearEyeContour;
          const threshold = preserveDensity ? 0.04 : 0.14;

          if (coverage <= threshold) continue;
          if (!preserveDensity && Math.random() < randomCull) continue;
          if (insideEye) continue;

          const introPosition = getIntroPosition(x, y, drawX, drawY, drawSize);
          voxels.push({
            homeX: x - getSeamShift(x),
            homeY: y,
            x: introPosition.x,
            y: introPosition.y,
            vx: 0,
            vy: 0,
            firmness: 0.06 + Math.random() * 0.024,
            size: cellSize,
            phase: Math.random() * Math.PI * 2,
            drift: 0.45 + Math.random() * 0.75,
          });
        }
      }
    };

    const draw = () => {
      if (disposed) return;

      introProgress = Math.min(1, introProgress + 0.02);
      context.clearRect(0, 0, internalSize, internalSize);

      if (leftMaskContext) {
        context.drawImage(leftMaskCanvas, 0, 0);
      }

      context.fillStyle = '#181616';
      context.shadowColor = 'rgba(24, 22, 22, 0.12)';
      context.shadowBlur = 1.5;

      for (const voxel of voxels) {
        const dx = voxel.x - pointerRef.current.x;
        const dy = voxel.y - pointerRef.current.y;
        const distance = Math.hypot(dx, dy) || 1;

        if (distance < repulsionRadius) {
          const force = (1 - distance / repulsionRadius) * 1.8;
          voxel.vx += (dx / distance) * force;
          voxel.vy += (dy / distance) * force;
        }

        const scrollWave = Math.sin(scrollRef.current * 0.012 + voxel.phase + voxel.homeY * 0.016) * scrollAmplitude * voxel.drift;
        const targetX = voxel.homeX + scrollWave * 0.45;
        const targetY = voxel.homeY + scrollWave * 0.18;
        const introPull = 0.72 - introProgress * 0.72;

        voxel.vx += (targetX - voxel.x) * (voxel.firmness + introPull * 0.02);
        voxel.vy += (targetY - voxel.y) * (voxel.firmness + introPull * 0.02);
        voxel.vx *= 0.84;
        voxel.vy *= 0.84;
        voxel.x += voxel.vx;
        voxel.y += voxel.vy;

        roundedRect(context, voxel.x, voxel.y, voxel.size, voxel.size, edgeRadius);
        context.fill();
      }

      context.shadowBlur = 0;
      frameId = window.requestAnimationFrame(draw);
    };

    image.onload = () => {
      if (!offscreenContext || disposed) return;
      offscreenContext.clearRect(0, 0, internalSize, internalSize);
      offscreenContext.drawImage(image, drawX, drawY, drawSize, drawSize);
      const imageData = offscreenContext.getImageData(0, 0, internalSize, internalSize).data;
      buildLeftMask(imageData);
      buildVoxels(imageData);
      draw();
    };

    image.src = LOGO_SRC;
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      disposed = true;
      clearResetTimer();
      window.cancelAnimationFrame(frameId);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className={`aspect-square ${className}`} style={{ transform: `scale(${scale})`, opacity }}>
      <canvas ref={canvasRef} width={680} height={680} className="w-full h-full object-contain" />
    </div>
  );
}
