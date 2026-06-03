import React from 'react';

const PERKS = [
  { icon: '💰', title: 'Lương cạnh tranh',     desc: 'Mức lương top thị trường + thưởng hiệu suất hàng quý' },
  { icon: '🏖️', title: 'Work-life Balance',    desc: 'Giờ làm linh hoạt, nghỉ phép không giới hạn (Unlimited PTO)' },
  { icon: '📈', title: 'Cổ phần công ty',       desc: 'ESOP hấp dẫn cho tất cả nhân viên toàn thời gian' },
  { icon: '🏥', title: 'Bảo hiểm sức khoẻ',    desc: 'Bảo hiểm y tế cao cấp cho bản thân và gia đình' },
  { icon: '🎓', title: 'Học tập & Phát triển',  desc: 'Budget hàng năm cho khoá học, hội thảo và chứng chỉ' },
  { icon: '🍕', title: 'Văn hoá đội nhóm',      desc: 'Team building, hackathon, tech talks hàng tháng' },
];

const About = () => (
  <section id="about" className="about">
    <div className="container">
      <div className="section-header">
        <span className="section-badge">Về chúng tôi</span>
        <h2 className="section-title">Tại sao gia nhập TechRecruit  pro? </h2>
        <p className="section-desc">
          Chúng tôi xây dựng môi trường làm việc tốt nhất để mỗi người đều phát triển tối đa tiềm năng
        </p>
      </div>

      {/* Story + visual */}
      <div className="about__story">
        <div className="about__text">
          <h3>Chúng tôi là ai?</h3>
          <p>
            TechRecruit là công ty công nghệ hàng đầu Việt Nam, chuyên xây dựng
            các sản phẩm SaaS phục vụ hàng triệu người dùng trên khắp Đông Nam Á.
          </p>
          <p>
            Với hơn <strong>5 năm kinh nghiệm</strong> và đội ngũ{' '}
            <strong>500+ kỹ sư</strong>, chúng tôi tự hào là nơi làm việc mơ ước
            của các tài năng công nghệ Việt Nam.
          </p>

          <div className="about__badges">
            <div className="about__badge">
              <strong>Top 10</strong>
              <span>Nơi làm việc tốt nhất VN 2023</span>
            </div>
            <div className="about__badge">
              <strong>Series B</strong>
              <span>$50M funding · Tiger Global</span>
            </div>
            <div className="about__badge">
              <strong>99.99%</strong>
              <span>SLA uptime</span>
            </div>
          </div>
        </div>

        <div className="about__visual">
          <div className="about__visual-card about__visual-card--1">
            <span>👨‍💻</span>
            <p>500+ Engineers</p>
          </div>
          <div className="about__visual-card about__visual-card--2">
            <span>🌏</span>
            <p>10M+ Users SEA</p>
          </div>
          <div className="about__visual-card about__visual-card--3">
            <span>🚀</span>
            <p>Ship every week</p>
          </div>
          <div className="about__visual-bg" aria-hidden="true" />
        </div>
      </div>

      {/* Perks grid */}
      <div className="perks__grid">
        {PERKS.map((p) => (
          <div key={p.title} className="perk-card">
            <span className="perk-card__icon">{p.icon}</span>
            <h4 className="perk-card__title">{p.title}</h4>
            <p className="perk-card__desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
