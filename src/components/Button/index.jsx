function Button({ type, handler, children }) {
  return (
    <button onClick={handler} type={type || 'button'}>
      {children}
    </button>
  )
}

export default Button
