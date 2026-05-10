import { HashRouter, Routes, Route } from "react-router-dom";

import CustomizeStory from "../pages/CustomizeStory";
import GenerateStory from "../pages/GenerateStory";

export default function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CustomizeStory />} />
        <Route path="/generate" element={<GenerateStory />} />
      </Routes>
    </HashRouter>
  );
}