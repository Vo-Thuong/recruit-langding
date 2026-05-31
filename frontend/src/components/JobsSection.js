import React from 'react';
import JobCard from './JobCard';

const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Data', 'Infrastructure'];
const JOB_TYPES   = ['Full-time', 'Part-time', 'Contract', 'Internship'];

const JobsSection = ({ jobs, loading, error, filters, onFilterChange, onApply }) => {
  const set = (key, value) => onFilterChange({ ...filters, [key]: value });

  return (
    <section id="jobs" className="jobs">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Tuyển dụng</span>
          <h2 className="section-title">Vị trí đang tuyển dụng</h2>
          <p className="section-desc">
            Tìm kiếm vị trí phù hợp với kỹ năng và đam mê của bạn
          </p>
        </div>

        {/* Filter bar */}
        <div className="jobs__filters">
          <div className="jobs__search">
            <span className="jobs__search-icon">🔍</span>
            <input
              type="text"
              placeholder="Tìm kiếm vị trí, bộ phận..."
              value={filters.search}
              onChange={(e) => set('search', e.target.value)}
            />
          </div>

          <select
            className="jobs__select"
            value={filters.department}
            onChange={(e) => set('department', e.target.value)}
          >
            <option value="">Tất cả bộ phận</option>
            {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>

          <select
            className="jobs__select"
            value={filters.type}
            onChange={(e) => set('type', e.target.value)}
          >
            <option value="">Tất cả hình thức</option>
            {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>

          {!loading && (
            <span className="jobs__count">
              {jobs.length} vị trí
            </span>
          )}
        </div>

        {/* Grid */}
        <div className="jobs__grid">
          {loading ? (
            <div className="jobs__state">
              <div className="loading-spinner" />
              <p>Đang tải danh sách vị trí...</p>
            </div>
          ) : error ? (
            <div className="jobs__state">
              <span className="jobs__state-icon">⚠️</span>
              <p>Không thể kết nối đến server: <em>{error}</em></p>
              <p className="jobs__state-hint">Kiểm tra backend đang chạy chưa?</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="jobs__state">
              <span className="jobs__state-icon">🔍</span>
              <p>Không tìm thấy vị trí phù hợp.</p>
              <button
                className="btn btn--ghost btn--sm"
                onClick={() => onFilterChange({ search: '', department: '', type: '' })}
              >
                Xoá bộ lọc
              </button>
            </div>
          ) : (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={onApply} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
