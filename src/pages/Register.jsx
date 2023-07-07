import { useState } from 'react'
import { registerJWT } from 'service/api'

function Register() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    registerJWT(userId, password)
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input type='text' value={userId} onChange={(e) => setUserId(e.target.value)} />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>회원가입</button>
      </form>
    </div>
  )
}

export default Register
