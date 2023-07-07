import Header from 'components/header'
import styles from 'components/layout/Layout.module.css'

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className={styles.contents}>{children}</div>
    </div>
  )
}

export default Layout
