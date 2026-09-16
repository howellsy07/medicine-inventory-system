import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMedicine } from '../api/medicines';
import FeedbackState from '../components/FeedbackState';

export default function MedicineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const loadMedicine = useCallback(async () => {
    setStatus('loading');
    try {
      const response = await getMedicine(id);
      setMedicine(response.data);
      sessionStorage.setItem('last-medicine-id', id);
      setStatus('ready');
    } catch (requestError) {
      setError(requestError.status === 404 ? 'That medicine record does not exist.' : requestError.message);
      setStatus('error');
    }
  }, [id]);

  useEffect(() => { loadMedicine(); }, [loadMedicine]);

  return (
    <main className="page-shell narrow-shell">
      {status === 'loading' && <FeedbackState title="Loading medicine details" message="Reading the complete record from the database…" />}
      {status === 'error' && <FeedbackState type="error" title="Could not open this medicine" message={error} onRetry={loadMedicine} />}
      {status === 'ready' && medicine && (
        <section className="details-card">
          <button className="back-button" onClick={() => navigate('/medicines')} type="button">← Back to Medicine List</button>
          <div className="details-hero">
            <span className="details-icon">Rx</span>
            <div><p className="eyebrow">MEDICINE DETAILS · RECORD #{medicine.id}</p><h1>{medicine.brand_name}</h1><p>{medicine.generic_name || 'No generic name provided'}</p></div>
            <span className={`stock-pill large ${medicine.stock <= 10 ? 'low' : ''}`}>{medicine.stock} in stock</span>
          </div>
          <dl className="details-grid">
            <Detail label="Category" value={medicine.category} />
            <Detail label="Quantity" value={medicine.quantity} />
            <Detail label="Manufacturer" value={medicine.manufacturer || 'Not provided'} />
            <Detail label="Expiry Date" value={medicine.expiry_date ? formatDate(medicine.expiry_date) : 'Not provided'} />
            <Detail label="Date Added" value={formatDate(medicine.created_at)} />
            <Detail label="Last Updated" value={formatDate(medicine.updated_at)} />
            <Detail label="Description" value={medicine.description || 'No description provided.'} wide />
          </dl>
        </section>
      )}
    </main>
  );
}

function Detail({ label, value, wide = false }) {
  return <div className={wide ? 'wide-detail' : ''}><dt>{label}</dt><dd>{value}</dd></div>;
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));
}

