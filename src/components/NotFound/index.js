import React from 'react'
import {useHistory} from 'react-router-dom' // Import useHistory hook
import './index.css' // Adjusted CSS import

const NotFound = () => {
  const history = useHistory() // Initialize useHistory hook

  const handleClick = () => {
    history.push('/') // Use history.push to navigate to the home route
  }

  return (
    <div className="not-found-container">
      <h2>Page Not Found</h2>
      <img
        src="https://www.figma.com/file/9LiB5x6qaZ7EskY8tcAZSe/Github-Profile-Visualizer?type=design&node-id=2361-424&mode=design&t=qUIhkSkbWV6u8Xfh-4"
        alt="Page Not Found"
      />
      <button onClick={handleClick}>Go Home</button>
    </div>
  )
}

export default NotFound
