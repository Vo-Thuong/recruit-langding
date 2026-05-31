const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const fetchJobs = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.department) params.append('department', filters.department);
  if (filters.type)       params.append('type',       filters.type);
  if (filters.search)     params.append('search',     filters.search);

  const res = await fetch(`${API_BASE}/api/jobs?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Unknown error');
  return data.data || [];
};

export const submitApplication = async (application) => {
  const res = await fetch(`${API_BASE}/api/applications`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(application),
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Gửi hồ sơ thất bại');
  return data;
};
