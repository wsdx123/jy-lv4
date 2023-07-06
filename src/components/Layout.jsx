import React from 'react'

function Layout({ children }) {
  return (
    <div>
      <header>내가만들 페이지</header>
      {children}
    </div>
  )
}

export default Layout
