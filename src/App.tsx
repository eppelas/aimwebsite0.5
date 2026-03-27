import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LabW26PageV3 from './components/LabW26PageV3';
import LabW26PageV3Alt from './components/LabW26PageV3Alt';
import LabW26PageV3Switcher from './components/LabW26PageV3Switcher';
import LabW26PageV4 from './components/LabW26PageV4';
import CommunityPage from './components/CommunityPage';
import ConsultingPage from './components/ConsultingPage';
import ResearchPage from './components/ResearchPage';
import NonProfitPage from './components/NonProfitPage';

import ProgramVariantsPage from './components/ProgramVariantsPage';
import ProgramShowcasePage from './components/ProgramShowcasePage';
import StyleLibraryPage from './components/StyleLibraryPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LabW26PageV3 />} />
        <Route path="/v3" element={<LabW26PageV3 />} />
        <Route path="/v3-original" element={<LabW26PageV3 />} />
        <Route path="/v3-alt" element={<LabW26PageV3Alt />} />
        <Route path="/v4-refined" element={<LabW26PageV4 />} />
        
        {/* Exact URLs from aimindset.org */}
        <Route path="/ai-mindset-lab-x26" element={<LabW26PageV3Switcher />} />
        <Route path="/ai-mindset-consulting" element={<ConsultingPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/non-profit" element={<NonProfitPage />} />
        <Route path="/library" element={<StyleLibraryPage />} />
        <Route path="/variants" element={<ProgramVariantsPage />} />
        <Route path="/ai-mindset-community" element={<CommunityPage />} />
        <Route path="/showcase" element={<Navigate to="/showcase-clean-white-v2" replace />} />
        <Route path="/showcase-clean-white-v2" element={<LabW26PageV3Switcher />} />
        <Route path="/test-page" element={<ProgramShowcasePage />} />
        <Route path="*" element={<LabW26PageV3Switcher />} />
      </Routes>
    </BrowserRouter>
  );
}
