import React from 'react';
import appStyles from './styles/appStyles';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import ValuePropositionSection from './sections/ValuePropositionSection';
import HowItWorksSection from './sections/HowItWorksSection';
import CTASection from './sections/CTASection';
import FooterSection from './sections/FooterSection';

function App() {
  return (
    <div style={appStyles.appContainer}>
      <Navbar />
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
    </div>
  );
}

export default App;