import Input from 'components/Input'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openAlert } from 'redux/modules/modalSlice'
import { loginJWT } from 'service/api'
import styles from 'pages/Login/Login.module.css'

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    userId: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState({ id: '', password: '' })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInput = (e) => {
    const { validity, name, value } = e.target
    if (name === 'id') {
      if (validity.valid) {
        setErrorMessage({ ...errorMessage, id: '' })
      }
      setLoginInfo({ ...loginInfo, userId: value })
    } else {
      if (validity.valid) {
        setErrorMessage({ ...errorMessage, password: '' })
      }
      setLoginInfo({ ...loginInfo, password: value })
    }
  }

  const handleFormHelpText = (e) => {
    e.preventDefault()
    const { name } = e.target

    if (name === 'id') {
      setErrorMessage({ ...errorMessage, id: '아이디를 입력해 주세요.' })
    } else {
      setErrorMessage({ ...errorMessage, password: '비밀번호를 입력해 주세요.' })
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    const { userId, password } = loginInfo
    if (userId === '' || password === '') {
      dispatch(openAlert('아이디 혹은 비밀번호를 입력해 주세요.'))
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>로그인</h2>
      <form className={styles.loginForm} onSubmit={handleRegister}>
        <div className={styles.inputContainer}>
          <Input type='id' value={loginInfo.userId} onChange={handleInput} onInvalid={handleFormHelpText} />
          {errorMessage.id && <p className={styles.helpText}>{errorMessage.id}</p>}
        </div>
        <div className={styles.inputContainer}>
          <Input type='password' value={loginInfo.password} onChange={handleInput} onInvalid={handleFormHelpText} />
          {errorMessage.password && <p className={styles.helpText}>{errorMessage.password}</p>}
        </div>
        <button type='submit'>로그인</button>
      </form>
    </div>
  )
}

export default Login
