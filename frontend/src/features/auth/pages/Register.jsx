import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Icon from '../../../components/Icon';
import Button from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import '../auth.form.scss';

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setError("");
    setSubmitting(true);

    try {
      const res = await handleRegister({ username, email, password });
      if (res) {
        navigate("/");
      }
    } catch (err) {
      console.error("Register attempt failed:", err);
      const msg = err.customMessage || err.response?.data?.message || err.message || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card-panel">
        <div className="auth-brand-head">
          <div className="brand-icon-box">
            <Icon name="target" />
          </div>
          <h2 className="auth-title">Create your CareerAI Account</h2>
          <p className="auth-subtitle">Join candidates building personalized AI career roadmaps.</p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            id="regUsername"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={submitting}
            required
          />

          <Input
            label="Email Address"
            id="regEmail"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
          />

          <Input
            label="Password"
            id="regPassword"
            type="password"
            placeholder="Create a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={submitting}
            required
          />

          <Button type="submit" variant="primary" fullWidth loading={submitting} disabled={submitting}>
            {submitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <p className="auth-switch-prompt">
          Already have an account?
          <span className="auth-link" onClick={() => !submitting && navigate("/login")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
