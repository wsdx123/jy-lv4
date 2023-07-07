import 'App.css'
import Layout from 'components/layout'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Post from 'pages/Post'
import Register from 'pages/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post' element={<Post />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
