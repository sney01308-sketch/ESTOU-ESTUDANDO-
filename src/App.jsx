import { useState } from 'react'
import { supabase } from './supabaseClient.js'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {
    setMessage('Cadastrando...')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(Erro: ${error.message})
    else setMessage('Cadastrado com sucesso! Verifique seu e-mail 📧')
  }

  const handleSignIn = async () => {
    setMessage('Entrando...')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(Erro: ${error.message})
    else setMessage('Logado com sucesso! 🔥')
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '"Segoe UI", Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px 50px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 30px', color: '#333', fontSize: '28px' }}>
          Estou Estudando
        </h1>

        {message && (
          <p style={{
            padding: '12px',
            borderRadius: '8px',
            margin: '0 0 20px',
            background: message.includes('Erro') ? '#fee' : '#e6f7ee',
            color: message.includes('Erro') ? '#c33' : '#090'
          }}>
            {message}
          </p>
        )}

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <div style={{ marginTop: '30px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={handleSignIn} style={btnPrimary}>
            Entrar
          </button>
          <button onClick={handleSignUp} style={btnSuccess}>
            Cadastrar
          </button>
        </div>
      </div>
    </main>
  )
}

// Estilos reutilizáveis (fica muito mais limpo)
const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  marginBottom: '16px',
  border: '2px solid #ddd',
  borderRadius: '8px',
  fontSize: '16px',
  transition: 'border 0.2s'
}

const btnPrimary = {
  padding: '14px 32px',
  background: '#4361ee',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  cursor: 'pointer',
  flex: 1
}

const btnSuccess = {
  padding: '14px 32px',
  background: '#06d6a0',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  cursor: 'pointer',
  flex: 1
}
