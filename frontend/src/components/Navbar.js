import React, { useState, useEffect } from 'react';

const Navbar = ({ onApply }) => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        {/* Brand */}
        <div className="navbar__brand" onClick={() => scrollTo('home')} role="button" tabIndex={0}>
          <span className="navbar__logo-icon">⚡</span>
          <span className="navbar__logo-text">TechRecruit</span>
        </div>

        {/* Desktop links */}
        <div className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
          <button className="navbar__link" onClick={() => scrollTo('home')}>Trang chủ</button>
          <button className="navbar__link" onClick={() => scrollTo('jobs')}>Tuyển dụng</button>
          <button className="navbar__link" onClick={() => scrollTo('about')}>Về chúng tôi</button>
          <button className="navbar__link" onClick={() => scrollTo('footer')}>Liên hệ</button>
          <button className="btn btn--primary btn--sm" onClick={() => { setMenuOpen(false); onApply(); }}>
            Ứng tuyển ngay
          </button>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
