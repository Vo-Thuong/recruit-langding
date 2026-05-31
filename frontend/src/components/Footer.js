import React from 'react';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const Footer = () => (
  <footer id="footer" className="footer">
    <div className="container">
      <div className="footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">⚡ TechRecruit</div>
          <p>Xây dựng đội ngũ công nghệ xuất sắc cho tương lai Đông Nam Á.</p>
          <div className="footer__social">
            <a href="https://linkedin.com"  target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com"    target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://facebook.com"  target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>

        {/* Quick links */}
        <div className="footer__col">
          <h4>Công ty</h4>
          <button onClick={() => scrollTo('about')}>Về chúng tôi</button>
          <button onClick={() => scrollTo('jobs')}>Vị trí tuyển dụng</button>
          <a href="#blog">Blog kỹ thuật</a>
          <a href="#news">Tin tức</a>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4>Liên hệ</h4>
          <a href="mailto:hr@techrecruit.vn">hr@techrecruit.vn</a>
          <a href="tel:+84901234567">0901 234 567</a>
          <p>
            Tòa nhà Techspace,<br />
            123 Nguyễn Văn Linh, Đà Nẵng
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} TechRecruit. All rights reserved.</p>
        <div>
          <a href="#privacy">Chính sách bảo mật</a>
          <a href="#terms">Điều khoản sử dụng</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
