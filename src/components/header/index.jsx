import Button from 'components/Button'
import styles from 'components/header/Header.module.css'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { openAlert } from 'redux/modules/modalSlice'
import { authorizeJWT } from 'service/api'

function Header() {
  const [islogin, setIsLogin] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleLogOut = () => {
    localStorage.removeItem('token')
    dispatch(openAlert('로그아웃되었습니다.'))
    navigate('/login')
  }

  const authorUser = useCallback(async () => {
    try {
      await authorizeJWT(JSON.parse(localStorage.getItem('token')))
      setIsLogin(true)
      if (location.pathname === '/register' || location.pathname === '/login') {
        navigate('/')
      }
    } catch (error) {
      setIsLogin(false)
      if (location.pathname === '/register' || location.pathname === '/login') return
      if (localStorage.getItem('token')) {
        dispatch(openAlert('토큰이 만료되었습니다. 다시 로그인 바랍니다.'))
        localStorage.removeItem('token')
      } else {
        dispatch(openAlert('로그인 후 이용바랍니다'))
      }
      navigate('/login')
    }
  }, [dispatch, location.pathname, navigate])

  useEffect(() => {
    authorUser()
  }, [authorUser])

  return (
    <div className={styles.container}>
      <Link to='/' className={styles.title}>
        Share Experience
      </Link>
      {islogin ? (
        <div className={styles.btnContainer}>
          <Link className={styles.linkBtn} to='/post'>
            글쓰기
          </Link>
          <Button onClick={handleLogOut}>로그아웃</Button>
        </div>
      ) : (
        <div className={styles.btnContainer}>
          <Link to='/register' className={styles.linkBtn}>
            회원가입
          </Link>
          <Link to='/login' className={styles.linkBtn}>
            로그인
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
