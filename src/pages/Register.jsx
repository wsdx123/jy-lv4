import Input from 'components/Input'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { openAlert } from 'redux/modules/modalSlice'
import { registerJWT } from 'service/api'

function Register() {
  const [registerInfo, setRegisterInfo] = useState({
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
      setRegisterInfo({ ...registerInfo, userId: value })
    } else {
      if (validity.valid) {
        setErrorMessage({ ...errorMessage, password: '' })
      }
      setRegisterInfo({ ...registerInfo, password: value })
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
    const { userId, password } = registerInfo
    if (userId === '' || password === '') {
      dispatch(openAlert('아이디 혹은 비밀번호를 입력해 주세요.'))
      return
    }
    try {
      await registerJWT(userId, password)
      setRegisterInfo({ userId: '', password: '' })
      dispatch(openAlert('회원가입 완료! 로그인 후 사용해 주세요.'))
      navigate('/login')
    } catch (error) {
      dispatch(openAlert(error.response.data.message))
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <Input type='id' value={registerInfo.userId} onChange={handleInput} onInvalid={handleFormHelpText} />
        <Input type='password' value={registerInfo.password} onChange={handleInput} onInvalid={handleFormHelpText} />
        <button type='submit'>회원가입</button>
      </form>
      {errorMessage.id && <p>{errorMessage.id}</p>}
      {errorMessage.password && <p>{errorMessage.password}</p>}
    </div>
  )
}

export default Register
