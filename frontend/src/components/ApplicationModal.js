import React, { useState, useEffect } from 'react';
import { submitApplication } from '../services/api';

const INITIAL_FORM = {
  job_id:       '',
  full_name:    '',
  email:        '',
  phone:        '',
  position:     '',
  cover_letter: '',
};

const ApplicationModal = ({ job, jobs, onClose }) => {
  const [form,       setForm]       = useState({
    ...INITIAL_FORM,
    job_id:   job?.id    || '',
    position: job?.title || '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const [error,      setError]      = useState(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await submitApplication({
        ...form,
        job_id: parseInt(form.job_id, 10) || 0,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="modal">
        <button className="modal__close" onClick={onClose} aria-label="Đóng">✕</button>

        {success ? (
          <div className="modal__success">
            <div className="modal__success-icon">🎉</div>
            <h2>Hồ sơ đã gửi thành công!</h2>
            <p>
              Cảm ơn bạn đã quan tâm đến <strong>TechRecruit</strong>.
              Chúng tôi sẽ xem xét và liên hệ với bạn trong <strong>3–5 ngày làm việc</strong>.
            </p>
            <button className="btn btn--primary" onClick={onClose}>Đóng lại</button>
          </div>
        ) : (
          <>
            <div className="modal__header">
              <h2>Gửi hồ sơ ứng tuyển</h2>
              {job ? (
                <p className="modal__subtitle">
                  📌 {job.title} &nbsp;·&nbsp; {job.department}
                </p>
              ) : (
                <p className="modal__subtitle">Chọn vị trí bạn muốn ứng tuyển</p>
              )}
            </div>

            <form className="modal__form" onSubmit={handleSubmit} noValidate>
              {/* Job selector — shown only if no pre-selected job */}
              {!job && (
                <div className="form-group">
                  <label htmlFor="modal-job">Vị trí ứng tuyển *</label>
                  <select
                    id="modal-job"
                    name="job_id"
                    value={form.job_id}
                    onChange={set}
                    required
                  >
                    <option value="">— Chọn vị trí —</option>
                    {jobs.map((j) => (
                      <option key={j.id} value={j.id}>{j.title}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="modal-name">Họ và tên *</label>
                  <input
                    id="modal-name"
                    type="text"
                    name="full_name"
                    value={form.full_name}
                    onChange={set}
                    placeholder="Nguyễn Văn A"
                    required
                    autoFocus
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="modal-email">Email *</label>
                  <input
                    id="modal-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={set}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="modal-phone">Số điện thoại</label>
                <input
                  id="modal-phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={set}
                  placeholder="0901 234 567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-cover">Thư xin việc</label>
                <textarea
                  id="modal-cover"
                  name="cover_letter"
                  value={form.cover_letter}
                  onChange={set}
                  rows={5}
                  placeholder="Chia sẻ lý do bạn muốn ứng tuyển, kinh nghiệm nổi bật và điểm mạnh của bạn..."
                />
              </div>

              {error && <div className="form__error">⚠️ {error}</div>}

              <div className="modal__actions">
                <button type="button" className="btn btn--ghost" onClick={onClose}>
                  Huỷ
                </button>
                <button type="submit" className="btn btn--primary" disabled={submitting}>
                  {submitting ? (
                    <><span className="btn-spinner" /> Đang gửi...</>
                  ) : (
                    '📨 Gửi hồ sơ'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;
