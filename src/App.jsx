import { useState } from 'react'
import { supabase } from './supabaseClient.js'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ text: '', type: '' })

  const showAlert = (text, type = 'info') => {
    setAlert({ text, type })
    setTimeout(() => setAlert({ text: '', type: '' }), type === 'success' ? 6000 : 8000)
  }

  const signUp = async () => {
    if (!email || !password) return showAlert('Preencha e-mail e senha', 'error')
    if (password.length < 6) return showAlert('Senha precisa ter no mínimo 6 caracteres', 'error')

    setLoading(true)
    showAlert('Criando sua conta...', 'info')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: location.origin }
    })

    setLoading(false)
    if (error) {
      error.message.includes('already registered')
        ? showAlert('Este e-mail já está cadastrado', 'error')
        : showAlert(error.message, 'error')
    } else {
      showAlert('Cadastro concluído! Verifique seu e-mail para confirmar a conta 📧', 'success')
      setEmail('')
      setPassword('')
    }
  }

  const signIn = async () => {
    if (!email || !password) return showAlert('Preencha e-mail e senha', 'error')

    setLoading(true)
    showAlert('Entrando na conta...', 'info')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('invalid login credentials')) showAlert('E-mail ou senha incorretos', 'error')
      else if (msg.includes('email not confirmed')) showAlert('Confira seu e-mail e confirme a conta antes de entrar', 'error')
      else showAlert(error.message, 'error')
    } else {
      showAlert('Login realizado com sucesso! Bem-vindo de volta 🔥', 'success')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Estou Estudando</h1>
          <p style={styles.subtitle}>O melhor projeto de login que você já viu em 2025</p>
        </div>

        {alert.text && (
          <div style={{
            ...styles.alert,
            ...(alert.type === 'success' && styles.alertSuccess),
            ...(alert.type === 'error' && styles.alertError),
            ...(alert.type === 'info' && styles.alertInfo)
          }}>
            <span>{alert.text}</span>
          </div>
        )}

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

        <div style={styles.actions}>
          <button onClick={signIn} disabled={loading} style={styles.btnLogin}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <button onClick={signUp} disabled={loading} style={styles.btnSignup}>
            {loading ? 'Criando conta...' : 'Criar conta grátis'}
          </button>
        </div>

        <p style={styles.footer}>
          Feito com React + Vite + Supabase • 2025
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '64px 48px',
    borderRadius: '28px',
    boxShadow: '0 32px 80px rgba(0, 0, 0, 0.25)',
    maxWidth: '460px',
    width: '100%',
    textAlign: 'center',
    animation: 'fadeIn 0.8s ease-out',
  },
  header: { marginBottom: '48px' },
  title: { margin: '0 0 12px', fontSize: '40px', fontWeight: '800', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  subtitle: { margin: 0, fontSize: '17px', color: '#64748b', fontWeight: '500' },
  input: {
    width: '100%',
    padding: '18px 20px',
    marginBottom: '20px',
    borderRadius: '16px',
    border: '2px solid #e2e8f0',
    fontSize: '16px',
    transition: 'all 0.3s',
    outline: 'none',
    background: '#f8fafc',
  },
  actions: { display: 'flex', gap: '18px', marginTop: '12px' },
  btnLogin: {
    flex: 1,
    padding: '18px',
    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(79, 70, 229, 0.3)',
    transition: 'all 0.3s',
  },
  btnSignup: {
    flex: 1,
    padding: '18px',
    background: 'linear-gradient(135deg, #0d9488, #14b8a6)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(13, 148, 136, 0.3)',
    transition: 'all 0.3s',
  },
  alert: {
    padding: '18px 22px',
    marginBottom: '28px',
    borderRadius: '16px',
    fontSize: '15px',
    fontWeight: '500',
    animation: 'slideDown 0.4s ease-out',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  alertSuccess: { background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0' },
  alertError: { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' },
  alertInfo: { background: '#f0f9ff', color: '#0c4a6e', border: '1px solid #bae6fd' },
  footer: { marginTop: '48px', fontSize: '14px', color: '#94a3b8' },
}
