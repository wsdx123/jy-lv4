import styles from 'components/header/Header.module.css'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authorizeJWT } from 'service/api'

function Header() {
  const [islogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogOut = () => {
    localStorage.removeItem('token')
    alert('로그아웃되었습니다.')
    navigate('/login')
  }

  useEffect(() => {
    const authorUser = async () => {
      try {
        await authorizeJWT(JSON.parse(localStorage.getItem('token')))
        setIsLogin(true)
        if (location.pathname === '/register' || location.pathname === '/login') {
          navigate('/')
        }
      } catch (error) {
        console.log(error.response.data.message)
        setIsLogin(false)
        if (location.pathname === '/register' || location.pathname === '/login') return
        if (localStorage.getItem('token')) {
          alert('토큰이 만료되었습니다. 다시 로그인 바랍니다.')
          localStorage.removeItem('token')
        } else {
          alert('로그인 후 이용바랍니다')
        }
        navigate('/login')
      }
    }
    authorUser()
  }, [location.pathname, navigate])
  return (
    <div className={styles.container}>
      <Link to='/' className={styles.title}>
        Share Experience
      </Link>
      {islogin ? (
        <div>
          <button onClick={handleLogOut} type='button'>
            로그아웃
          </button>
        </div>
      ) : (
        <div>
          <Link to='/register' className={styles.registerBtn}>
            회원가입
          </Link>
          <Link to='/login' className={styles.registerBtn}>
            로그인
          </Link>
        </div>
      )}
    </div>
  )
}

export default Header
