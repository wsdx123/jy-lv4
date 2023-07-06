import getData from 'service/api'
import React, { useEffect } from 'react'

function Home() {
  useEffect(() => {
    getData()
  }, [])
  return <div>Home</div>
}

export default Home
