import Button from 'components/Button'
import styles from 'components/Modal/Modal.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { closeAlert } from 'redux/modules/modalSlice'

function Modal() {
  const data = useSelector((state) => state.modal)
  const dispatch = useDispatch()

  if (!data.isOpen) return null

  return (
    <div className={styles.container}>
      <div className={styles.outside} />
      <div className={styles.modalBody}>
        <p className={styles.content}>{data.content}</p>
        <Button onClick={() => dispatch(closeAlert(false))}>닫기</Button>
      </div>
    </div>
  )
}

export default Modal
