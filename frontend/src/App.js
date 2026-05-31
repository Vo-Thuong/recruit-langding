import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import JobsSection from './components/JobsSection';
import About from './components/About';
import Footer from './components/Footer';
import ApplicationModal from './components/ApplicationModal';
import { fetchJobs } from './services/api';
import './App.css';

function App() {
  const [jobs, setJobs]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters]         = useState({ search: '', department: '', type: '' });

  // Debounce search; immediate for select filters
  useEffect(() => {
    const delay = filters.search ? 400 : 0;
    const timer = setTimeout(() => loadJobs(), delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchJobs(filters);
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const scrollToJobs = () => {
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Navbar onApply={handleOpenModal} />
      <Hero onExploreJobs={scrollToJobs} />
      <Stats jobCount={jobs.length} />
      <JobsSection
        jobs={jobs}
        loading={loading}
        error={error}
        filters={filters}
        onFilterChange={setFilters}
        onApply={handleApply}
      />
      <About />
      <Footer />

      {isModalOpen && (
        <ApplicationModal
          job={selectedJob}
          jobs={jobs}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
