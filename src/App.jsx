import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient.js'

// ============= COMPONENTE DE ALERTA REUTILIZÁVEL =============
function Alert({ message, type = 'info', onClose }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onClose, 8000)
    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  const variants = {
    success: { bg: '#d4edda', border: '#c3e6cb', color: '#155724', icon: '✓' },
    error: { bg: '#f8d7da', border: '#f5c6cb', color: '#721c24', icon: '✕' },
    warning: { bg: '#fff3cd', border: '#ffeaa7', color: '#856404', icon: '⚠' },
    info: { bg: '#d1ecf1', border: '#bee5eb', color: '#0c5460', icon: 'ℹ' },
  }

  const style = variants[type] || variants.info

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        padding: '16px 20px',
        marginBottom: '24px',
        borderRadius: '16px',
        borderLeft: 6px solid ${style.border},
        background: style.bg,
        color: style.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        animation: 'slideDown 0.4s ease-out',
        fontWeight: '500',
      }}
    >
      <span>
        <strong style={{ marginRight: '10px', fontSize: '20px' }}>{style.icon}</strong>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '20px',
          cursor: 'pointer',
          opacity: 0.7,
        }}
        aria-label="Fechar alerta"
      >
        ×
      </button>
    </div>
  )
}

// ============= APP PRINCIPAL =============
export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ message: '', type: '' })

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type })
  }

  const closeAlert = () => setAlert({ message: '', type: '' })

  const handleSignUp = async () => {
    if (!email || !password) return showAlert('Preencha todos os campos', 'warning')
    if (password.length < 6) return showAlert('Senha deve ter no mínimo 6 caracteres', 'warning')

    setLoading(true)
    showAlert('Criando sua conta...', 'info')

    const { error } = await supabase.auth.signUp({ email, password })

    setLoading(false)
    if (error) {
      error.message.includes('already registered')
        ? showAlert('Este e-mail já está cadastrado', 'error')
        : showAlert(error.message, 'error')
    } else {
      showAlert('Cadastro realizado! Confira seu e-mail para confirmar 📧', 'success')
      setEmail('')
      setPassword('')
    }
  }

  const handleSignIn = async () => {
    if (!email || !password) return showAlert('Preencha todos os campos', 'warning')

    setLoading(true)
    showAlert('Entrando...', 'info')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('invalid login')) showAlert('E-mail ou senha incorretos', 'error')
      else if (msg.includes('email not confirmed')) showAlert('Confirme seu e-mail antes de entrar', 'warning')
      else showAlert(error.message, 'error')
    } else {
      showAlert('Login realizado com sucesso! Bem-vindo 🔥', 'success')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Estou Estudando</h1>
        <p style={styles.subtitle}>Login & Cadastro com Supabase</p>

        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />

        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          disabled={loading}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Senha • mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          style={styles.input}
        />

        <div style={styles.buttons}>
          <button onClick={handleSignIn} disabled={loading} style={styles.btnLogin}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
          <button onClick={handleSignUp} disabled={loading} style={styles.btnSignup}>
            {loading ? 'Carregando...' : 'Criar conta'}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  card: {
    background: 'white',
    padding: '60px 50px',
    borderRadius: '24px',
    boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
    maxWidth: '440px',
    width: '100%',
    textAlign: 'center',
  },
  title: { margin: '0 0 8px', fontSize: '36px', fontWeight: '700', color: '#222' },
  subtitle: { margin: '0 0 40px', fontSize: '16px', color: '#666' },
  input: {
    width: '100%',
    padding: '18px 20px',
    marginBottom: '18px',
    borderRadius: '14px',
    border: '2px solid #e1e5ea',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s',
  },
  buttons: { display: 'flex', gap: '16px', marginTop: '10px' },
  btnLogin: {
    flex: 1,
    padding: '18px',
    background: '#4361ee',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  btnSignup: {
    flex: 1,
    padding: '18px',
    background: '#06d6a0',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}
