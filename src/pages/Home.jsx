import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>Home

      <Link to="/dashboard" className="text-blue-600 font-medium hover:underline">
            Go to Dashboard
          </Link>
    </div>
  )
}

export default Home