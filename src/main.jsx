// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/i18n";            
import { SfxProvider } from "@/sfx/SfxProvider";  
import App from "./App.jsx";
import BlogPage from "@/pages/BlogPage.jsx";
import BlogPost from "@/pages/BlogPost.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider defaultLang="en" persist detect={false}>
      <SfxProvider defaultMuted={false}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </BrowserRouter>
      </SfxProvider>
    </I18nProvider>
  </React.StrictMode>
);
