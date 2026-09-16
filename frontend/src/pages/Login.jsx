import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/medicines" replace />;

  function submit(event) {
    event.preventDefault();
    setError('');

    if (!login(username.trim(), password)) {
      setError('Invalid credentials. Please check your username and password.');
      return;
    }

    navigate(location.state?.from || '/medicines', { replace: true });
  }

  return (
    <main className="login-page">
      <section className="login-intro">
        <p className="eyebrow">CCS112 · LABORATORY EXAM</p>
        <h1>Keep every medicine accounted for.</h1>
        <p>A focused inventory workspace powered by React, Laravel, and a real database.</p>
        <div className="login-stat"><strong>Rx</strong><span>Reliable records<br />after every refresh</span></div>
      </section>

      <section className="login-card">
        <span className="section-number">01</span>
        <p className="eyebrow dark">SECURE ACCESS</p>
        <h2>Welcome back</h2>
        <p className="muted">Sign in to manage the pharmacy catalog.</p>

        <form className="medicine-form" onSubmit={submit}>
          <label>
            <span>Username</span>
            <input autoFocus value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username" />
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
          </label>
          {error && <p className="form-alert" role="alert">{error}</p>}
          <button className="primary-button wide" type="submit">Sign in</button>
        </form>

        <p className="login-hint">Demo: <strong>pharmacist</strong> / <strong>med123</strong></p>
      </section>
    </main>
  );
}

