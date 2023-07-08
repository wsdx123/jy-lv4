import axios from 'axios'
import { useState } from 'react'

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: ''
  })

  const handleRegister = async (e) => {
    e.preventDefault()

    const { userId, password } = loginInfo
    if (userId === '' || password === '') {
      alert('아이디 비번 입력해')
      return
    }

    try {
      await axios.post(`${process.env.REACT_APP_JWT_URL}/login`, {
        id: userId,
        password
      })
    } catch (error) {
      const { message } = error.response.data
      alert(message)
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type='text'
          value={loginInfo.userId}
          onChange={(e) => setLoginInfo({ ...loginInfo, userId: e.target.value })}
        />
        <input
          type='password'
          value={loginInfo.password}
          onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
        />
        <button type='submit'>로그인</button>
      </form>
    </div>
  )
}

export default Login
