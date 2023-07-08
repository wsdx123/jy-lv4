import styles from 'components/header/Header.module.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className={styles.container}>
      <Link to='/' className={styles.title}>
        Share Experience
      </Link>
      <div>
        <Link to='/register' className={styles.registerBtn}>
          회원가입
        </Link>
        <Link to='/login' className={styles.registerBtn}>
          로그인
        </Link>
      </div>
    </div>
  )
}

export default Header
