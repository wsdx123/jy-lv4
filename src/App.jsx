import 'App.css'
import Layout from 'components/Layout'
import Home from 'pages/Home'
import Post from 'pages/Post'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post' element={<Post />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
