import axios from 'axios'
import { useState } from 'react'

function Login() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_JWT_URL}/login`, {
      id: userId,
      password
    })
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input type='text' value={userId} onChange={(e) => setUserId(e.target.value)} />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>로그인</button>
      </form>
    </div>
  )
}

export default Login
