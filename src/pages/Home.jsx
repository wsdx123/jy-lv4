import { useMutationHook } from 'hooks/queryHooks'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { openAlert } from 'redux/modules/modalSlice'
import { deletePost, getPosts, updatePost } from 'service/api'

function Home() {
  const [updateToggle, setUpdateToggle] = useState(false)
  const [updateInput, setUpdateInput] = useState('')

  const dispatch = useDispatch()

  const { isLoading, isError, data } = useQuery('posts', getPosts)

  const deleteMutation = useMutationHook(deletePost, 'posts')

  const UpdateMutation = useMutationHook(updatePost, 'posts')

  const handleDelete = (id) => {
    dispatch(openAlert('test alert'))
    deleteMutation.mutate(id)
  }

  const handleUpdate = (item) => {
    const updateData = {
      ...item,
      context: updateInput
    }
    UpdateMutation.mutate(updateData)
    setUpdateToggle(false)
  }

  // useEffect(() => {
  //   if (!localStorage.getItem('token')) {
  //     alert('로그인하셈')
  //     navigate('/login')
  //     return
  //   }
  //   useAuthorUser()
  // }, [navigate])

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error!</div>
  }

  return (
    <div>
      <Link to='/post'>작성</Link>
      {data.map((el) => (
        <div key={el.id}>
          <div>{`${el.id} : ${el.context}`}</div>
          {updateToggle === el.id && (
            <div>
              <input value={updateInput} onChange={(e) => setUpdateInput(e.target.value)} />
              <button type='button' onClick={() => handleUpdate(el)}>
                완료
              </button>
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
