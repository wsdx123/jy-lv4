import axios from 'axios'

const getPosts = async () => {
  const posts = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
  return posts.data
}

const addPost = async (newPost) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newPost)
}

const deletePost = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`)
}

const updatePost = async (data) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/posts/${data.id}`, data)
}

const registerJWT = async (id, password) => {
  await axios.post(`${process.env.REACT_APP_JWT_URL}/register`, {
    id,
    password
  })
}

const loginJWT = async (id, password) => {
  const token = await axios.post(`${process.env.REACT_APP_JWT_URL}/login`, {
    id,
    password
  })
  return token
}

export { getPosts, addPost, deletePost, updatePost, registerJWT, loginJWT }
