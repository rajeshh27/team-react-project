import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password })
      onLogin(data)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login')
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Login</h1>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <p className="auth-footer">
          Don't have an account? <Link to="/account/signup">Sign Up</Link>
        </p>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .error-msg {
          color: #ef4444;
          background: #fef2f2;
          padding: 0.75rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .auth-footer {
          margin-top: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          color: #64748b;
        }
        .auth-footer a {
          color: #3b82f6;
          font-weight: 700;
        }
      `}} />
    </main>
  )
}

export default Login

