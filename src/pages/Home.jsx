import { useEffect } from 'react'
import getPosts from 'service/api'

function Home() {
  useEffect(() => {
    getPosts()
  }, [])
  return <div>Home</div>
}

export default Home
