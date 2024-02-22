import React from 'react'
import {useHistory} from 'react-router-dom'
import './index.css'

const Header = ({username}) => {
  const history = useHistory()

  return (
    <div className="headerb">
      <div className="header-container">
        <div>
          <h2>Github Profile Visualizer</h2>
        </div>
        <div className="header-navigation">
          <h4 onClick={() => history.push('/')}>Home</h4>
          <h4 onClick={() => history.push(`/repository/${username}`)}>
            Repository
          </h4>
          <h4 onClick={() => history.push(`/analysis/${username}`)}>
            Analysis
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Header
