import { useState } from 'react'
import { supabase } from './supabaseClient.js'

function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('Cadastro e login prontos! Testa aí 🚀')

  const cadastrar = async () => {
    const { error } = await supabase.auth.signUp({ email, password: senha })
    if (error) setMensagem('Erro: ' + error.message)
    else setMensagem('Cadastrado com sucesso! Verifique seu e-mail 📧')
  }

  const conectar = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) setMensagem('Erro: ' + error.message)
    else setMensagem('Logado com sucesso! 🔥')
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Estou Estudando - Cadastro e Login</h1>
      <p>{mensagem}</p>
      
      <input
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '300px', padding: '12px', margin: '10px', fontSize: '16px' }}
      />
      <br />
      <input
        type="password"
        placeholder="Sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        style={{ width: '300px', padding: '12px', margin: '10px', fontSize: '16px' }}
      />
      <br /><br />
      <button onClick={conectar} style={{ padding: '12px 30px', margin: '0 10px', fontSize: '16px', background: '#0066ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Login
      </button>
      <button onClick={cadastrar} style={{ padding: '12px 30px', margin: '0 10px', fontSize: '16px', background: '#00aa44', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Cadastrar
      </button>
    </div>
  )
}

export default App
