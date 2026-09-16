import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function AppShell() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function signOut() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/medicines">
          <span className="brand-mark">Rx</span>
          <span><strong>MediStock</strong><small>Medicine Inventory</small></span>
        </NavLink>

        <nav aria-label="Main navigation">
          <NavLink end to="/medicines">Medicine List</NavLink>
          <NavLink to="/medicines/add">Add Medicine</NavLink>
          <NavLink to="/medicines/details">Medicine Details</NavLink>
        </nav>

        <button className="logout-button" onClick={signOut} type="button">Log out</button>
      </header>

      <Outlet />
    </div>
  );
}

