import React from 'react';

const STATS = [
  { icon: '💼', value: null,  label: 'Vị trí đang tuyển',   suffix: '' },
  { icon: '👥', value: '500+', label: 'Nhân viên',           suffix: '' },
  { icon: '🏆', value: '5+',   label: 'Năm hoạt động',      suffix: '' },
  { icon: '⭐', value: '98%',  label: 'Nhân viên hài lòng', suffix: '' },
];

const Stats = ({ jobCount }) => (
  <section className="stats">
    <div className="container">
      <div className="stats__grid">
        {STATS.map((s, i) => (
          <div key={s.label} className="stat-card">
            <span className="stat-card__icon">{s.icon}</span>
            <span className="stat-card__value">
              {i === 0 ? (jobCount || '6') : s.value}
            </span>
            <span className="stat-card__label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
