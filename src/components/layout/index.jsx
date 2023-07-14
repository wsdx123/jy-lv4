import Modal from 'components/Modal'
import ModalPortal from 'components/Modal/Portal'
import Header from 'components/header'
import styles from 'components/layout/Layout.module.css'

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className={styles.contents}>{children}</main>
      <ModalPortal>
        <Modal />
      </ModalPortal>
    </div>
  )
}

export default Layout
