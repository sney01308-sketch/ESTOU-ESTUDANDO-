import { useState } from 'react'
import { supabase } from './supabaseClient.js'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // success ou error

  const handleSignUp = async () => {
    if (!email || !password) return setError('Preencha e-mail e senha')
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else setSuccess('Cadastrado com sucesso! Verifique seu e-mail 📧')
  }

  const handleSignIn = async () => {
    if (!email || !password) return setError('Preencha e-mail e senha')
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else setSuccess('Logado com sucesso! 🔥')
  }

  const setSuccess = (text) => {
    setMessage(text)
    setMessageType('success')
  }

  const setError = (text) => {
    setMessage(text)
    setMessageType('error')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        padding: '50px 40px',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
        animation: 'fadeIn 0.6s ease-out'
      }}>
        <h1 style={{ margin: '0 0 8px', fontSize: '32px', color: '#333' }}>
          Estou Estudando
        </h1>
        <p style={{ margin: '0 0 40px', color: '#666', fontSize: '16px' }}>
          Cadastro e Login com Supabase
        </p>

        {message && (
          <div style={{
            padding: '14px 20px',
            borderRadius: '12px',
            marginBottom: '24px',
            background: messageType === 'success' ? '#d4edda' : '#f8d7da',
            color: messageType === 'success' ? '#155724' : '#721c24',
            border: 1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'},
            animation: 'slideDown 0.4s ease'
          }}>
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Sua senha (mín. 6 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          style={inputStyle}
        />

        <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
          <button onClick={handleSignIn} disabled={loading} style={btnLogin}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <button onClick={handleSignUp} disabled={loading} style={btnSignup}>
            {loading ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </div>

        <p style={{ marginTop: '30px', fontSize: '14px', color: '#888' }}>
          Projeto de estudo • React + Vite + Supabase
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '16px 18px',
  marginBottom: '16px',
  border: '2px solid #e1e5e9',
  borderRadius: '12px',
  fontSize: '16px',
  transition: 'all 0.3s',
  outline: 'none'
}

const btnLogin = {
  flex: 1,
  padding: '16px',
  background: '#4361ee',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s'
}

const btnSignup = {
  flex: 1,
  padding: '16px',
  background: '#06d6a0',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s'
}
