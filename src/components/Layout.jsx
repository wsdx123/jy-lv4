import Header from 'pages/Header'

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default Layout
