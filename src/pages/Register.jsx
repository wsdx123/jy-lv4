import { useState } from 'react'
import { registerJWT } from 'service/api'

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    userId: '',
    password: ''
  })

  const handleRegister = async (e) => {
    e.preventDefault()
    const { userId, password } = registerInfo
    try {
      await registerJWT(userId, password)
      setRegisterInfo({ userId: '', password: '' })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type='text'
          value={registerInfo.userId}
          onChange={(e) => setRegisterInfo({ ...registerInfo, userId: e.target.value })}
        />
        <input
          type='password'
          value={registerInfo.password}
          onChange={(e) => setRegisterInfo({ ...registerInfo, password: e.target.value })}
        />
        <button type='submit'>회원가입</button>
      </form>
    </div>
  )
}

export default Register
