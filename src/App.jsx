import { useState } from 'react'
import { supabase } from './supabaseClient.js'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const showMessage = (text, isError = false) => {
    setMessage(text)
    setTimeout(() => setMessage(''), isError ? 8000 : 5000)
  }

  const handleSignUp = async () => {
    if (!email || !password) {
      showMessage('⚠ Preencha e-mail e senha', true)
      return
    }

    setLoading(true)
    setMessage('Cadastrando usuário...')

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      showMessage(❌ Erro no cadastro: ${error.message}, true)
    } else {
      showMessage('✅ Cadastrado com sucesso! Verifique seu e-mail para confirmar.')
    }
  }

  const handleSignIn = async () => {
    if (!email || !password) {
      showMessage('⚠ Preencha e-mail e senha', true)
      return
    }

    setLoading(true)
    setMessage('Entrando na conta...')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      showMessage(❌ Erro ao entrar: ${error.message}, true)
    } else {
      showMessage('✅ Login realizado com sucesso! Bem-vindo de volta 🔥')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Estou Estudando</h1>
        <p style={styles.subtitle}>Cadastro e Login com Supabase</p>

        {message && (
          <div style={message.includes('❌') || message.includes('⚠') ? styles.alertError : styles.alertSuccess}>
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          disabled={loading}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Sua senha (mín. 6 caracteres)"
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

        <footer style={{ marginTop: '40px', fontSize: '14px', color: '#888' }}>
          Projeto de estudo • React + Vite + Supabase
        </footer>
      </div>
    </div>
  )
}

// Estilos limpos e profissionais
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '"Segoe UI", Arial, sans-serif',
  },
  card: {
    background: 'white',
    padding: '50px 40px',
    borderRadius: '20px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'center',
  },
  title: { margin: '0 0 10px', fontSize: '32px', color: '#333' },
  subtitle: { margin: '0 0 40px', color: '#666', fontSize: '16px' },
  input: {
    width: '100%',
    padding: '16px 18px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '2px solid #e0e0e0',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s',
  },
  buttons: { display: 'flex', gap: '16px', marginTop: '10px' },
  btnLogin: {
    flex: 1,
    padding: '16px',
    background: '#4361ee',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  btnSignup: {
    flex: 1,
    padding: '16px',
    background: '#06d6a0',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  alertSuccess: {
    padding: '14px 20px',
    background: '#d4edda',
    color: '#155724',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid #c3e6cb',
  },
  alertError: {
    padding: '14px 20px',
    background: '#f8d7da',
    color: '#721c24',
    borderRadius: '12px',
    marginBottom: '24px',
    border: '1px solid #f5c6cb',
  },
}
