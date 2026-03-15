import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LabW26Page from './components/LabW26Page';
import LabW26PageV2 from './components/LabW26PageV2';
import LabW26PageV3 from './components/LabW26PageV3';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/v1" element={<LabW26Page />} />
        <Route path="/v2" element={<LabW26PageV2 />} />
        <Route path="/v3" element={<LabW26PageV3 />} />
        <Route path="/" element={<Navigate to="/v3" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
