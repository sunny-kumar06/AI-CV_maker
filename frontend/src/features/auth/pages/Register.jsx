import React, { useState } from 'react'
import '../auth.form.scss'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({ username, email, password })
    navigate("/")
  }

  if (loading) {
    return (
      <main>
        <p>Registering...</p>
      </main>
    )
  }
  return (
    <main>
      <div className="form-container">
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button className="button primary-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="switch-text">
          Already have an account? <span className="link" onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </main>
  )
}

export default Register
