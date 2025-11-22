import { useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('Cadastro e login prontos! Testa aí 🚀')

  async function cadastrar() {
    const { error } = await supabase.auth.signUp({ email, password: senha })
    if (error) setMensagem('Erro: ' + error.message)
    else setMensagem('Cadastrado com sucesso! Cheque seu e-mail 📧')
  }

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) setMensagem('Erro: ' + error.message)
    else setMensagem('Logado com sucesso! 🔥')
  }

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>Estou Estudando - Cadastro e Login</h1>
      <p>{mensagem}</p>
      <input type="email" placeholder="seu@email.com" onChange={(e) => setEmail(e.target.value)} style={{width: '300px', padding: '10px', margin: '10px'}} /><br/>
      <input type="password" placeholder="senha (mínimo 6 caracteres)" onChange={(e) => setSenha(e.target.value)} style={{width: '300px', padding: '10px', margin: '10px'}} /><br/><br/>
      <button onClick={cadastrar} style={{padding: '15px 30px', margin: '10px', fontSize: '18px', background: '#00ff00', border: 'none', borderRadius: '10px', cursor: 'pointer'}}>Cadastrar</button>
      <button onClick={login} style={{padding: '15px 30px', margin: '10px', fontSize: '18px', background: '#0066ff', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer'}}>Login</button>
    </div>
  )
}

export default App
