import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePost, getPost } from 'service/api'
import styles from 'pages/Detail/Detail.module.css'
import { useMutationHook } from 'hooks/queryHooks'
import { useDispatch } from 'react-redux'
import { openAlert } from 'redux/modules/modalSlice'
import Button from 'components/Button'

function Detail() {
  const params = useParams().postId
  const { isLoading, isError, data } = useQuery(['post', params], () => getPost(params))

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteMutation = useMutationHook(deletePost, 'posts')

  const handleDelete = () => {
    deleteMutation.mutate(params)
    dispatch(openAlert('삭제되었습니다.'))
    navigate('/')
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error!</div>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data.title}</h2>
      <img className={styles.picture} src={data.picture} alt={`picture_${data.id}`} />
      <p>{data.context}</p>
      <div className={styles.buttonBox}>
        <Link className={styles.modify} to={`/update/${data.id}`}>
          수정
        </Link>
        <Button onClick={handleDelete}>삭제</Button>
      </div>
    </div>
  )
}

export default Detail
