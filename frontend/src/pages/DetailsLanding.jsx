import { Navigate, useNavigate } from 'react-router-dom';
import FeedbackState from '../components/FeedbackState';

export default function DetailsLanding() {
  const navigate = useNavigate();
  const lastId = sessionStorage.getItem('last-medicine-id');
  if (lastId) return <Navigate to={`/medicines/${lastId}`} replace />;

  return (
    <main className="page-shell narrow-shell">
      <FeedbackState type="empty" title="Choose a medicine first" message="Open a medicine from the list to view its complete details." onRetry={() => navigate('/medicines')} />
    </main>
  );
}

