import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <h1>Welcome to our home page!</h1>
      <Link to="/Converter">Go to Converter</Link>
    </div>
  )
}

export default HomePage
