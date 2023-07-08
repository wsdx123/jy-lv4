import { useMutationHook } from 'hooks/queryHooks'
import { useState } from 'react'
import { addPost } from 'service/api'
import { v4 } from 'uuid'

function Post() {
  const [input, setInput] = useState('')

  const mutation = useMutationHook(addPost, 'posts')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPost = { id: v4(), context: input }

    mutation.mutate(newPost)
    setInput('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type='submit'>작성</button>
      </form>
    </div>
  )
}

export default Post
