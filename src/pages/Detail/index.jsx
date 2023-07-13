import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import { getPost } from 'service/api'
import styles from 'pages/Detail/Detail.module.css'

function Detail() {
  const params = useParams().postId

  const { isLoading, data } = useQuery(['post', params], () => getPost(params))

  if (isLoading) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data.title}</h2>
      <img className={styles.picture} src={data.picture} alt={`picture_${data.id}`} />
      <p>{data.context}</p>
      <div className={styles.buttonBox}>
        <Link to={`/update/${data.id}`}>수정</Link>
        <button type='button'>삭제</button>
      </div>
    </div>
  )
}

export default Detail
