import { useState } from 'react'
import { supabase } from './supabaseClient.js'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ message: '', type: '' }) // success | error | info

  const showAlert = (message, type = 'info', duration = 7000) => {
    setAlert({ message, type })
    if (duration > 0) {
      setTimeout(() => setAlert({ message: '', type: '' }), duration)
    }
  }

  // ==================== CADASTRO ====================
  const handleSignUp = async () => {
    if (!email || !password) return showAlert('Preencha e-mail e senha', 'error')
    if (password.length < 6) return showAlert('A senha deve ter no mínimo 6 caracteres', 'error')

    setLoading(true)
    showAlert('Criando sua conta...', 'info')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: location.origin }
    })

    setLoading(false)

    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('already registered')) showAlert('Este e-mail já está cadastrado', 'error')
      else showAlert(Erro: ${error.message}, 'error')
    } else {
      showAlert('Sucesso! Verifique seu e-mail para confirmar a conta 📧', 'success', 12000)
      setEmail('')
      setPassword('')
    }
  }

  // ==================== LOGIN ====================
  const handleSignIn = async () => {
    if (!email || !password) return showAlert('Preencha e-mail e senha', 'error')

    setLoading(true)
    showAlert('Entrando na conta...', 'info')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('invalid login credentials')) showAlert('E-mail ou senha incorretos', 'error')
      else if (msg.includes('email not confirmed')) showAlert('Confirme seu e-mail antes de entrar', 'error')
      else showAlert(Erro: ${error.message}, 'error')
    } else {
      showAlert('Bem-vindo de volta! Login realizado com sucesso 🔥', 'success')
    }
  }

  return (
    <>
      <div style={styles.backdrop}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>Estou Estudando</h1>
            <p style={styles.subtitle}>Aprendendo React + Supabase na prática</p>
          </div>

          {/* Alertas bonitos */}
          {alert.message && (
            <div style={{
              ...styles.alert,
              ...(alert.type === 'success' && styles.alertSuccess),
              ...(alert.type === 'error' && styles.alertError),
              ...(alert.type === 'info' && styles.alertInfo),
            }}>
              <span>{alert.message}</span>
            </div>
          )}

          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            disabled={loading}
            style={styles.input}
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Senha • mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            style={styles.input}
            autoComplete="current-password"
          />

          <div style={styles.actions}>
            <button onClick={handleSignIn} disabled={loading} style={styles.btnPrimary}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <button onClick={handleSignUp} disabled={loading} style={styles.btnSecondary}>
              {loading ? 'Criando...' : 'Criar conta grátis'}
            </button>
          </div>

          <footer style={styles.footer}>
            Projeto de estudo • 2025 • Feito com 💜 por quem realmente quer te ver vencer
          </footer>
        </div>
      </div>
    </>
  )
}

// =================================== ESTILOS PROFISSIONAIS ===================================
const styles = {
  backdrop: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  card: {
    background: 'white',
    padding: '60px 50px',
    borderRadius: '24px',
    boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
    maxWidth: '440px',
    width: '100%',
    textAlign: 'center',
    animation: 'fadeInUp 0.7s ease-out',
  },
  header: { marginBottom: '40px' },
  title: { margin: '0 0 8px', fontSize: '36px', fontWeight: '700', color: '#222' },
  subtitle: { margin: 0, fontSize: '16px', color: '#666' },
  input: {
    width: '100%',
    padding: '18px 20px',
    marginBottom: '18px',
    borderRadius: '14px',
    border: '2px solid #e1e5ea',
    fontSize: '16px',
    transition: 'all 0.3s',
    outline: 'none',
    ':focus': { borderColor: '#667eea' },
  },
  actions: { display: 'flex', gap: '16px', marginTop: '10px' },
  btnPrimary: {
    flex: 1,
    padding: '18px',
    background: '#4361ee',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  btnSecondary: {
    flex: 1,
    padding: '18px',
    background: '#06d6a0',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '17px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  alert: {
    padding: '16px 20px',
    borderRadius: '14px',
    marginBottom: '24px',
    fontSize: '15px',
    fontWeight: '500',
    animation: 'slideDown 0.4s ease',
  },
  alertSuccess: { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' },
  alertError: { background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' },
  alert
