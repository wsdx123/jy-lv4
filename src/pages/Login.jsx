import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openAlert } from 'redux/modules/modalSlice'
import { loginJWT } from 'service/api'

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = async (e) => {
    e.preventDefault()

    const { userId, password } = loginInfo
    if (userId === '' || password === '') {
      dispatch(openAlert('아이디 혹은 비밀번호를 입력해주세요.'))

      return
    }

    try {
      const tmp = await loginJWT(userId, password)
      localStorage.setItem('token', JSON.stringify(tmp))
      setLoginInfo({ userId: '', password: '' })
      navigate('/')
    } catch (error) {
      const { message } = error.response.data
      dispatch(openAlert(message))
      setLoginInfo({ ...loginInfo, password: '' })
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
