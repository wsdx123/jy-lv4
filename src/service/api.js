import axios from 'axios'

const getPosts = async () => {
  const posts = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
  console.log(posts.data)
}

export default getPosts
