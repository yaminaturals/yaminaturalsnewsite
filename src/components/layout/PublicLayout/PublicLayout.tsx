import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { MobileNav } from '../MobileNav/MobileNav';

export const PublicLayout: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('testDrawer') === 'true') {
      setMobileNavOpen(true);
    }
  }, [location.search]);

  return (
    <div className="public-shell">
      <Header onOpenMobileNav={() => setMobileNavOpen(true)} />
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
