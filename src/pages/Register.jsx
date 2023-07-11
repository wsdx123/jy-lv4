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
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRegister = async (e) => {
    e.preventDefault()
    const { userId, password } = registerInfo
    if (userId === '' || password === '') {
      dispatch(openAlert('아이디 혹은 비밀번호를 입력해주세요.'))
      return
    }
    try {
      await registerJWT(userId, password)
      setRegisterInfo({ userId: '', password: '' })
      dispatch(openAlert('회원가입 완료! 로그인 후 사용해주세요'))
      navigate('/login')
    } catch (error) {
      dispatch(openAlert(error.response.data.message))
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
