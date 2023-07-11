import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerJWT } from 'service/api'

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    userId: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const { userId, password } = registerInfo
    try {
      await registerJWT(userId, password)
      setRegisterInfo({ userId: '', password: '' })
      alert('회원가입 완료! 로그인 후 사용해주세요')
      navigate('/login')
    } catch (error) {
      alert(error.response.data.message)
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
