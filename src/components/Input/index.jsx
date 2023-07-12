import styles from 'components/Input/Input.module.css'

function Input({ type, value, onChange, onInvalid }) {
  return (
    <input
      className={styles.input}
      name={type}
      type={type === 'id' ? 'text' : 'password'}
      value={value}
      placeholder={`${type === 'id' ? '아이디' : '비밀번호'}를 입력하세요.`}
      onChange={onChange}
      required
      onInvalid={onInvalid}
    />
  )
}

export default Input
