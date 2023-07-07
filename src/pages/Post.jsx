import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { addPost } from 'service/api'
import { v4 } from 'uuid'

function Post() {
  const [input, setInput] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
      console.log('성공')
    }
  })

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
