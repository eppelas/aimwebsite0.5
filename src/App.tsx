import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LabW26PageV3 from './components/LabW26PageV3';

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
      <Routes>
        <Route path="/" element={<LabW26PageV3 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
