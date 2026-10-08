import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Icon from '../../../components/Icon';
import Button from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import '../auth.form.scss';

const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleLogin({ email, password });
    if (res) {
      navigate("/");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card-panel">
        <div className="auth-brand-head">
          <div className="brand-icon-box">
            <Icon name="target" />
          </div>
          <h2 className="auth-title">Welcome back to CareerAI</h2>
          <p className="auth-subtitle">Log in to access your career roadmap and job readiness analytics.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            id="loginEmail"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            id="loginPassword"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" fullWidth loading={loading}>
            Sign In
          </Button>
        </form>

        <p className="auth-switch-prompt">
          Don't have an account?
          <span className="auth-link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;