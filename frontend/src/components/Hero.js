import React from 'react';

const Hero = ({ onExploreJobs }) => (
  <section id="home" className="hero">
    <div className="hero__particles" aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`hero__particle hero__particle--${i + 1}`} />
      ))}
    </div>

    <div className="hero__content">
      <div className="hero__badge">
        <span className="hero__badge-dot" />
        Đang tuyển dụng 2024 · 6 vị trí mở
      </div>

      <h1 className="hero__title">
        Tìm Kiếm{' '}
        <span className="hero__title--gradient">Cơ Hội</span>
        <br />
        Nghề Nghiệp Của Bạn
      </h1>

      <p className="hero__subtitle">
        Gia nhập đội ngũ hơn <strong>500+ chuyên gia</strong> công nghệ.
        Chúng tôi tìm kiếm những tài năng xuất sắc để cùng xây dựng
        sản phẩm công nghệ thay đổi Đông Nam Á.
      </p>

      <div className="hero__actions">
        <button className="btn btn--primary btn--lg" onClick={onExploreJobs}>
          🚀 Xem vị trí tuyển dụng
        </button>
        <button
          className="btn btn--outline-white btn--lg"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Tìm hiểu thêm
        </button>
      </div>

      <div className="hero__tags">
        {['Remote friendly', 'Lương cạnh tranh', 'Stock options', 'Bảo hiểm y tế'].map((tag) => (
          <span key={tag} className="hero__tag">✓ {tag}</span>
        ))}
      </div>
    </div>

    <div className="hero__scroll-hint" onClick={onExploreJobs} aria-hidden="true">
      <span>Cuộn xuống</span>
      <div className="hero__scroll-arrow" />
    </div>
  </section>
);

export default Hero;
