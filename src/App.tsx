import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LabW26PageV3 from './components/LabW26PageV3';
import CommunityPage from './components/CommunityPage';
import ConsultingPage from './components/ConsultingPage';
import ResearchPage from './components/ResearchPage';
import NonProfitPage from './components/NonProfitPage';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<LabW26PageV3 />} />
        <Route path="/v3" element={<LabW26PageV3 />} />
        
        {/* Exact URLs from aimindset.org */}
        <Route path="/ai-mindset-lab-x26" element={<Navigate to="/" replace />} />
        <Route path="/ai-mindset-consulting" element={<ConsultingPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/non-profit" element={<NonProfitPage />} />
        <Route path="/ai-mindset-community" element={<CommunityPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
