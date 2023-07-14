import { useState } from 'react'

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const reset = () => {
    setValue(initialValue)
  }

  return { value, onChange, reset }
}

export default useInput
