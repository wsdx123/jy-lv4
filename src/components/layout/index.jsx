import Modal from 'components/Modal'
import ModalPortal from 'components/Modal/Portal'
import Header from 'components/header'
import styles from 'components/layout/Layout.module.css'

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className={styles.contents}>{children}</div>
      <ModalPortal>
        <Modal />
      </ModalPortal>
    </div>
  )
}

export default Layout
