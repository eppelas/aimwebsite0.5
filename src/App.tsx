import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LabW26PageV3 from './components/LabW26PageV3';
import LabW26PageV3Alt from './components/LabW26PageV3Alt';
import LabW26PageV3Switcher from './components/LabW26PageV3Switcher';
import LabW26PageV4 from './components/LabW26PageV4';

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
        <Route path="/lab-w26/v3" element={<LabW26PageV3 />} />
        <Route path="/lab-w26/v3-alt" element={<LabW26PageV3Alt />} />
        <Route path="/lab-w26/v3-switcher" element={<LabW26PageV3Switcher />} />
        <Route path="/lab-w26/v4" element={<LabW26PageV4 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
