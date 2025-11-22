import { useState } from 'react'
import { supabase } from './supabaseClient.js'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const showMessage = (text, duration = 6000) => {
    setMessage(text)
    if (duration > 0) setTimeout(() => setMessage(''), duration)
  }

  const signUp = async () => {
    if (!email || !password) return showMessage('⚠ Preencha e-mail e senha')
    if (password.length < 6) return showMessage('⚠ Senha deve ter no mínimo 6 caracteres')

    setLoading(true)
    showMessage('Criando conta...')

    const { error } = await supabase.auth.signUp({ email, password })

    setLoading(false)
    if (error) showMessage(❌ ${error.message})
    else showMessage('✅ Cadastro realizado! Verifique seu e-mail 📧', 10000)
  }

  const signIn = async () => {
    if (!email || !password) return showMessage('⚠ Preencha e-mail e senha')

    setLoading(true)
    showMessage('Entrando...')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (error) showMessage(❌ ${error.message})
    else showMessage('✅ Login realizado com sucesso! 🔥')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '60px 50px',
        borderRadius: '24px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
        maxWidth: '440px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 10px', fontSize: '36px', fontWeight: '700', color: '#222' }}>
          Estou Estudando
        </h1>
        <p style={{ margin: '0 0 40px', color: '#666', fontSize: '16px' }}>
          Login e Cadastro com Supabase
        </p>

        {message && (
          <div style={{
            padding: '16px 20px',
            marginBottom: '24px',
            borderRadius: '14px',
            background: message.includes('✅') ? '#d4edda' : message.includes('❌') || message.includes('⚠') ? '#f8d7da' : '#d1ecf1',
            color: message.includes('✅') ? '#155724' : message.includes('❌') || message.includes('⚠') ? '#721c24' : '#0c5460',
            border: '1px solid',
            borderColor: message.includes('✅') ? '#c3e6cb' : message.includes('❌') || message.includes('⚠') ? '#f5c6cb' : '#bee5eb',
            fontWeight: '500'
          }}>
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          disabled={loading}
          style={{ width: '100%', padding: '18px', marginBottom: '16px', borderRadius: '14px', border: '2px solid #e1e5ea', fontSize: '16px' }}
        />

        <input
          type="password"
          placeholder="Senha mínima 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          style={{ width: '100%', padding: '18px', marginBottom: '32px', borderRadius: '14px', border: '2px solid #e1e5ea', fontSize: '16px' }}
        />

        <div style={{ display: 'flex', gap: '16px' }}>
          <button
            onClick={signIn}
            disabled={loading}
            style={{ flex: 1, padding: '18px', background: '#4361ee', color: 'white', border: 'none', borderRadius: '14px', fontSize: '17px', fontWeight: '600', cursor: 'pointer' }}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
          <button
            onClick={signUp}
            disabled={loading}
            style={{ flex: 1, padding: '18px', background: '#06d6a0', color: 'white', border: 'none', borderRadius: '14px', fontSize: '17px', fontWeight: '600', cursor: 'pointer' }}
          >
            {loading ? 'Carregando...' : 'Cadastrar'}
          </button>
        </div>
      </div>
    </div>
  )
}
