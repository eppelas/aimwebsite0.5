import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LabW26Page from './components/LabW26Page';
import LabW26PageV2 from './components/LabW26PageV2';
import LabW26PageV3 from './components/LabW26PageV3';
import LabW26PageV3Alt from './components/LabW26PageV3Alt';
import LabW26PageV3Switcher from './components/LabW26PageV3Switcher';
import LabW26PageV4 from './components/LabW26PageV4';

import ProgramVariantsPage from './components/ProgramVariantsPage';
import ProgramShowcasePage from './components/ProgramShowcasePage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LabW26PageV3Switcher />} />
        <Route path="/v1" element={<LabW26Page />} />
        <Route path="/v2" element={<LabW26PageV2 />} />
        <Route path="/v3" element={<LabW26PageV3Switcher />} />
        <Route path="/v3-original" element={<LabW26PageV3 />} />
        <Route path="/v3-alt" element={<LabW26PageV3Alt />} />
        <Route path="/v4-refined" element={<LabW26PageV4 />} />
        <Route path="/variants" element={<ProgramVariantsPage />} />
        <Route path="/showcase" element={<Navigate to="/showcase-clean-white-v2" replace />} />
        <Route path="/showcase-clean-white-v2" element={<LabW26PageV3Switcher />} />
        <Route path="/test-page" element={<ProgramShowcasePage />} />
        <Route path="*" element={<LabW26PageV3Switcher />} />
      </Routes>
    </BrowserRouter>
  );
}
