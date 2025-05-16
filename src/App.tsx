import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import appStyles from "./styles/appStyles";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import ValuePropositionSection from "./sections/ValuePropositionSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import CTASection from "./sections/CTASection";
import FooterSection from "./sections/FooterSection";
import EventRegistration from "./pages/EventRegistration";
import EventParticipants from "./pages/EventParticipants";

function HomePage() {
  return (
    <>
      <div id="home">
        <HeroSection />
      </div>
      <div id="recursos">
        <ValuePropositionSection />
      </div>
      <div id="como-funciona">
        <HowItWorksSection />
      </div>
      <div id="sobre">
        <CTASection />
      </div>
      <div id="cta">
        <FooterSection />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div style={appStyles.appContainer}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/evento-fitfolio-run" element={<EventRegistration />} />
          <Route path="/event-participants" element={<EventParticipants />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
