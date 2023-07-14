import Card from 'components/Card'
import { useQuery } from 'react-query'
import { getPosts } from 'service/api'
import styles from 'pages/Home/Home.module.css'

function Home() {
  const { isLoading, isError, data } = useQuery('posts', getPosts)

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Error!</div>
  }

  return (
    <div className={styles.container}>
      {data.map((el) => (
        <Card key={el.id} data={el} />
      ))}
    </div>
  )
}

export default Home
