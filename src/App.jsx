import Layout from 'components/layout'
import Detail from 'pages/Detail'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Post from 'pages/Post'
import Register from 'pages/Register'
import Update from 'pages/Update'
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
          <Route path='/detail/:postId' element={<Detail />} />
          <Route path='/update/:postId' element={<Update />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
