import React, { useState } from 'react';

const TYPE_COLORS = {
  'Full-time':  '#059669',
  'Part-time':  '#d97706',
  'Contract':   '#7c3aed',
  'Internship': '#0284c7',
};

const DEPT_COLORS = {
  Engineering:    { bg: '#dbeafe', color: '#1d4ed8' },
  Product:        { bg: '#fce7f3', color: '#9d174d' },
  Design:         { bg: '#fef3c7', color: '#92400e' },
  Data:           { bg: '#d1fae5', color: '#065f46' },
  Infrastructure: { bg: '#ede9fe', color: '#5b21b6' },
};

const JobCard = ({ job, onApply }) => {
  const [expanded, setExpanded] = useState(false);

  const deptStyle = DEPT_COLORS[job.department] || { bg: '#f1f5f9', color: '#334155' };
  const typeColor = TYPE_COLORS[job.job_type] || '#2563eb';

  return (
    <article className="job-card">
      <div className="job-card__header">
        <span
          className="job-card__dept"
          style={{ background: deptStyle.bg, color: deptStyle.color }}
        >
          {job.department}
        </span>
        <span className="job-card__type" style={{ color: typeColor }}>
          ● {job.job_type}
        </span>
      </div>

      <h3 className="job-card__title">{job.title}</h3>

      <div className="job-card__meta">
        <span>📍 {job.location}</span>
        <span>💰 {job.salary}</span>
      </div>

      <p className="job-card__desc">{job.description}</p>

      {expanded && (
        <div className="job-card__requirements">
          <h4>Yêu cầu ứng viên</h4>
          <pre>{job.requirements}</pre>
        </div>
      )}

      <div className="job-card__actions">
        <button
          className="btn btn--ghost btn--sm"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? '▲ Thu gọn' : '▼ Xem chi tiết'}
        </button>
        <button className="btn btn--primary btn--sm" onClick={() => onApply(job)}>
          Ứng tuyển ngay →
        </button>
      </div>
    </article>
  );
};

export default JobCard;
