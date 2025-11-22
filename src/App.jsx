import { useState } from 'react'
import { supabase } from './supabaseClient.js'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const signUp = async () => {
    if (!email || !password) return setMessage('⚠ Preencha e-mail e senha')
    setLoading(true)
    setMessage('Cadastrando...')
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    setMessage(error ? Erro: ${error.message} : 'Cadastrado! Confira seu e-mail 📧')
  }

  const signIn = async () => {
    if (!email || !password) return setMessage('⚠ Preencha e-mail e senha')
    setLoading(true)
    setMessage('Entrando...')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    setMessage(error ? Erro: ${error.message} : 'Logado com sucesso! 🔥')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Estou Estudando</h1>
        <p style={styles.subtitle}>Login e Cadastro</p>

        {message && (
          <p style={message.includes('Erro') || message.includes('⚠') ? styles.error : styles.success}>
            {message}
          </p>
        )}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          style={styles.input}
        />

        <div style={styles.buttons}>
          <button onClick={signIn} disabled={loading} style={styles.btnLogin}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
          <button onClick={signUp} disabled={loading} style={styles.btnSignup}>
            {loading ? 'Carregando...' : 'Cadastrar'}
          </button>
        </div>
      </div>
    </div>
  )
}

// Estilos profissionais e limpos
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    background: 'white',
    padding: '50px 40px',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center'
  },
  title: { margin: '0 0 10px', fontSize: '32px', color: '#333' },
  subtitle: { margin: '0 0 40px', color: '#777', fontSize: '16px' },
  input: {
    width: '100%',
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '2px solid #ddd',
    fontSize: '16px',
    outline: 'none'
  },
  buttons: { display: 'flex', gap: '16px', marginTop: '20px' },
  btnLogin: {
    flex: 1,
    padding: '16px',
    background: '#4361ee',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
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
    cursor: 'pointer'
  },
  success: { padding: '14px', background: '#d4edda', color: '#155724', borderRadius: '8px', marginBottom: '20px' },
  error: { padding: '14px', background: '#f8d7da', color: '#721c24', borderRadius: '8px', marginBottom: '20px' }
}
