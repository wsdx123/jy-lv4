import reactDom from 'react-dom'

function ModalPortal({ children }) {
  const el = document.getElementById('modal')

  return reactDom.createPortal(children, el)
}

export default ModalPortal
