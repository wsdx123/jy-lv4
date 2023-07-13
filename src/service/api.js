import axios from 'axios'

const getPosts = async () => {
  const posts = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`)
  return posts.data
}

const getPost = async (id) => {
  const post = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`)
  return post.data
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
  const response = await axios.post(`${process.env.REACT_APP_JWT_URL}/login`, {
    id,
    password
  })
  return response.data.token
}

const authorizeJWT = async (token) => {
  const response = await axios.get(`${process.env.REACT_APP_JWT_URL}/user`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  return response
}

export { getPosts, getPost, addPost, deletePost, updatePost, registerJWT, loginJWT, authorizeJWT }
