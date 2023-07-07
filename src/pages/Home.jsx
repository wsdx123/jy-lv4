import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deletePost, getPosts } from 'service/api'

function Home() {
  const [updateToggle, setUpdateToggle] = useState(false)
  const { isLoading, isError, data } = useQuery('posts', getPosts)
  const queryClient = useQueryClient()

  const mutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts')
    }
  })

  const handleDelete = (id) => {
    mutation.mutate(id)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error!</div>
  }

  return (
    <div>
      {data.map((el) => (
        <div key={el.id}>
          <div>{`${el.id} : ${el.context}`}</div>
          {updateToggle === el.id && (
            <div>
              <input defaultValue={el.context} />
              <button type='button'>완료</button>
              <button type='button' onClick={() => setUpdateToggle(false)}>
                취소
              </button>
            </div>
          )}
          <div>
            <button onClick={() => handleDelete(el.id)} type='button'>
              삭제
            </button>
            <button type='button' onClick={() => setUpdateToggle(el.id)}>
              수정
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
