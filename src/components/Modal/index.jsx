import styles from 'components/Modal/Modal.module.css'

function Modal() {
  return (
    <div className={styles.container}>
      <div className={styles.outside} />
      <div className={styles.modalBody}>
        <h3 className={styles.title}>모달제목</h3>
        <p className={styles.content}>모달 내용</p>
        <button type='button' className={styles.closeBtn}>
          닫기
        </button>
      </div>
    </div>
  )
}

export default Modal
