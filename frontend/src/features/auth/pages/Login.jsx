import React from 'react'
import '../auth.form.scss'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'




const Login = () => {
  const navigate = useNavigate()
  const { loading, handleLogin } = useAuth()

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleLogin({ email, password });
    console.log("LOGIN RESULT:", res);
    if (res) {
      navigate("/");
    }
  }

  if (loading) {
    return (
      <main>
        <p>Logging in...</p>
      </main>
    );
  }


  return (
    <main>
      <div className="form-container">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder='Enter email address' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className='button primary-button' disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="switch-text">
          Don't have an account?
          <span className="link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>

      </div>
    </main>
  )
}

export default Login