import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getMedicines } from '../api/medicines';
import FeedbackState from '../components/FeedbackState';

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const loadMedicines = useCallback(async () => {
    setStatus('loading');
    setError('');
    try {
      const response = await getMedicines();
      setMedicines(response.data);
      setStatus('ready');
    } catch (requestError) {
      setError(requestError.message);
      setStatus('error');
    }
  }, []);

  useEffect(() => { loadMedicines(); }, [loadMedicines]);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return medicines;
    return medicines.filter((medicine) =>
      [medicine.brand_name, medicine.generic_name, medicine.category]
        .filter(Boolean).some((value) => value.toLowerCase().includes(keyword)),
    );
  }, [medicines, search]);

  const lowStock = medicines.filter((medicine) => medicine.stock <= 10).length;

  return (
    <main className="page-shell">
      <section className="hero-panel compact-hero">
        <div>
          <p className="eyebrow">PHARMACY CATALOG · JOHN HOWELL J. SY</p>
          <h1>Know what is on every shelf.</h1>
          <p className="hero-copy">View persistent medicine records and open any item for its complete details.</p>
        </div>
        <div className="hero-stats">
          <div><strong>{medicines.length}</strong><span>medicines</span></div>
          <div><strong>{lowStock}</strong><span>low stock</span></div>
        </div>
      </section>

      <section className="content-card">
        {location.state?.message && <p className="success-message">{location.state.message}</p>}
        <div className="section-heading split-heading">
          <div className="heading-copy">
            <span className="section-number">02</span>
            <div><h2>Medicine List</h2><p>Tap any medicine to see its full record.</p></div>
          </div>
          <input className="search-input" aria-label="Search medicines" placeholder="Search medicines" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {status === 'loading' && <FeedbackState title="Loading medicines" message="Getting the latest records from the database…" />}
        {status === 'error' && <FeedbackState type="error" title="Could not load medicines" message={error} onRetry={loadMedicines} />}
        {status === 'ready' && filtered.length === 0 && (
          <FeedbackState type="empty" title="No medicines found" message={medicines.length ? 'Try a different search.' : 'Add the first medicine to your inventory.'} />
        )}

        {status === 'ready' && filtered.length > 0 && (
          <div className="medicine-grid">
            {filtered.map((medicine) => (
              <button className="medicine-card" key={medicine.id} onClick={() => navigate(`/medicines/${medicine.id}`)} type="button">
                <div className="medicine-card-top">
                  <span className="medicine-icon">Rx</span>
                  <span className={`stock-pill ${medicine.stock <= 10 ? 'low' : ''}`}>{medicine.stock} in stock</span>
                </div>
                <h3>{medicine.brand_name}</h3>
                <p>{medicine.generic_name || 'Generic name not provided'}</p>
                <div className="medicine-meta"><span>{medicine.category}</span><span>{medicine.quantity}</span></div>
              </button>
            ))}
          </div>
        )}
      </section>

      <Link className="floating-add" to="/medicines/add" aria-label="Add medicine">+</Link>
    </main>
  );
}
