import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomizeStory from "../pages/CustomizeStory";
import GenerateStory from "../pages/GenerateStory";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomizeStory />} />
        <Route path="/generate" element={<GenerateStory />} />
      </Routes>
    </BrowserRouter>
  );
}