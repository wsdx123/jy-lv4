import Header from 'components/header'
import styles from 'components/layout/Layout.module.css'

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className={styles.contents}>{children}</main>
    </div>
  )
}

export default Layout
