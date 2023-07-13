import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getPost } from 'service/api'

function Detail() {
  const params = useParams().postId

  const { isLoading, isError, data } = useQuery(['post', params], () => getPost(params))
  console.log(data)
  return <div>Detail</div>
}

export default Detail
