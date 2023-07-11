import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginJWT } from 'service/api'

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    const { userId, password } = loginInfo
    if (userId === '' || password === '') {
      alert('아이디 비번 입력해')
      return
    }

    try {
      const tmp = await loginJWT(userId, password)
      localStorage.setItem('token', JSON.stringify(tmp))
      setLoginInfo({ userId: '', password: '' })
      navigate('/')
    } catch (error) {
      const { message } = error.response.data
      alert(message)
    }
  }

  // const tmp = async () => {
  //   try {
  //     const response = await authorizeJWT(token)
  //     console.log(response.data.message)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

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
      {/* <button type='button' onClick={tmp}>
        인증
      </button> */}
    </div>
  )
}

export default Login
