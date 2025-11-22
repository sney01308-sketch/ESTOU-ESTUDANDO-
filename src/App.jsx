import { useState } from 'react'
import { supabase } from './supabaseClient.js'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('Cadastro e login prontos! Testa aí 🚀')

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage('Erro: ' + error.message)
    else setMessage('Cadastrado com sucesso! Confira seu e-mail 📧')
  }

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage('Erro: ' + error.message)
    else setMessage('Logado com sucesso! 🔥')
  }

  return (
    <div style={{ padding: '60px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Estou Estudando</h1>
      <h2>Cadastro e Login</h2>
      <p>{message}</p>

      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '320px', padding: '12px', margin: '8px', fontSize: '16px' }}
      />
      <br />
      <input
        type="password"
        placeholder="Sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '320px', padding: '12px', margin: '8px', fontSize: '16px' }}
      />
      <br /><br />
      <button
        onClick={signIn}
        style={{ padding: '14px 40px', margin: '0 10px', fontSize: '18px', background: '#0066ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Login
      </button>
      <button
        onClick={signUp}
        style={{ padding: '14px 40px', margin: '0 10px', fontSize: '18px', background: '#00aa44', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        Cadastrar
      </button>
    </div>
  )
}

export default App
