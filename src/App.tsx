import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LabW26PageV3 from './components/LabW26PageV3';

const LabW26PageV3Alt = lazy(() => import('./components/LabW26PageV3Alt'));
const LabW26PageV3Switcher = lazy(() => import('./components/LabW26PageV3Switcher'));
const LabW26PageV4 = lazy(() => import('./components/LabW26PageV4'));

function RouteLoadingFallback() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#f9f9f7',
        color: '#332b2b',
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '12px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
      }}
    >
      Loading
    </main>
  );
}

function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        fontFamily: '"IBM Plex Mono", monospace',
        letterSpacing: '0.08em',
      }}
    >
      404
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<LabW26PageV3 />} />
          <Route path="/lab-w26/v3" element={<LabW26PageV3 />} />
          <Route path="/lab-w26/v3-alt" element={<LabW26PageV3Alt />} />
          <Route path="/lab-w26/v3-switcher" element={<LabW26PageV3Switcher />} />
          <Route path="/lab-w26/v4" element={<LabW26PageV4 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
