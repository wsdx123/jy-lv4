import styles from 'components/Button/Button.module.css'

function Button({ type, onClick, children }) {
  return (
    <button className={styles.container} onClick={onClick} type={type || 'button'}>
      {children}
    </button>
  )
}

export default Button
