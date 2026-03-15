import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SensoryJourney from './components/SensoryJourney';
import FeaturesSection from './components/FeaturesSection';
import NavigationFeatures from './components/NavigationFeatures';
import GoldenTicketSection from './components/GoldenTicketSection';
import TripsPage from './components/TripsPage';
import TripDetailsPage from './components/TripDetailsPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import GlobalBackground from './components/GlobalBackground';
import CustomCursor from './components/CustomCursor';

// Scroll to top or to hash on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function LandingPage() {
  return (
    <>
      <HeroSection />
      <div className="relative">
        {/* كل الأقسام بقت بمكانها بدون أي حذف */}
        <FeaturesSection />
        <SensoryJourney /> {/* 👈 هذا قسم الفقاعات */}

        {/* 👈 البوصلة انضافت هنا أسفل الفقاعات مباشرة */}
        <NavigationFeatures />

        <GoldenTicketSection />
      </div>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen font-cairo relative">
      {/* Global animated background — persists across ALL pages */}
      <GlobalBackground />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/trips/:id" element={<TripDetailsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;