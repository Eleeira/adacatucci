// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import App from "./App.jsx";
import BlogPage from "@/pages/BlogPage.jsx";
import BlogPost from "@/pages/BlogPost.jsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy.jsx"; 
import "./index.css";

import { I18nProvider } from "@/i18n";
import { SfxProvider } from "@/sfx/SfxProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider defaultLang="en" persist={true} detect={false}>
      <SfxProvider defaultMuted={false}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </SfxProvider>
    </I18nProvider>
  </React.StrictMode>
);
