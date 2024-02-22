import React, {useState} from 'react'
import {FaSearch, FaGithub} from 'react-icons/fa'
import {useHistory, Link} from 'react-router-dom'
import Loader from '../Loader'
import NotFound from '../NotFound'
import './index.css'

const Home = ({setuser}) => {
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [inputError, setInputError] = useState(null)
  const [username, setuserInput] = useState('')
  const history = useHistory()

  const apiKey = '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'

  const fetchUserProfile = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=${apiKey}`,
      )
      if (response.ok) {
        const userDataResponse = await response.json()
        setUserData(userDataResponse)
        setuser(userDataResponse.login)
        setInputError(null)
        setError(null)
      } else {
        throw new Error(
          'Invalid username. Please enter a valid GitHub username.',
        )
      }
    } catch (e) {
      if (
        e.message === 'Invalid username. Please enter a valid GitHub username.'
      ) {
        setError(e.message)
        setUserData(null)
      } else {
        setError('Something went wrong. Please try again.')
        setUserData(null)
        setuser('') // Reset the username when an unexpected error occurs
      }
    }
    setLoading(false)
  }

  const handleSearch = () => {
    if (username.trim() !== '') {
      fetchUserProfile()
      setuserInput('')
    } else {
      setInputError('Please enter a valid GitHub username')
    }
  }

  const handleTryAgain = () => {
    fetchUserProfile()
  }

  return (
    <div className="bg">
      <input
        className="searchbar"
        type="text"
        value={username}
        onChange={e => setuserInput(e.target.value)}
        placeholder="Enter GitHub username"
        aria-label="Enter GitHub username"
      />
      <button onClick={handleSearch} aria-label="Search">
        <FaSearch />
      </button>
      {inputError && <p>{inputError}</p>}
      <h1>
        <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>
          GitHub Profile Visualizer
        </Link>
      </h1>
      {loading && <Loader />}
      {!userData && (
        <img
          src="https://res.cloudinary.com/di264konk/image/upload/v1708577151/home1_yusmci.jpg"
          id="img1"
          alt="github profile visualizer home page"
          style={{borderRadius: '0%'}}
        />
      )}
      {userData && (
        <div>
          <img
            src={userData.avatar_url}
            alt="Avatar"
            style={{borderRadius: '50%'}}
          />
          <h1>{userData.login}</h1>
          <div className="bg2">
            <div className="rowitem">
              <div>
                <p className="p1">FOLLOWERS</p>
                <h1 className="h1">{userData.followers}</h1>
              </div>
              <div>
                <p className="p1">FOLLOWING</p>
                <h1 className="h1">{userData.following}</h1>
              </div>
              <div>
                <p className="p1">PUBLIC REPOS</p>
                <h1 className="h1">{userData.public_repos}</h1>
              </div>
            </div>
            <div className="rowitem">
              <div>
                <p className="p1">Company</p>
                <h1 className="h1">{userData.company}</h1>
              </div>
              <div>
                <p className="p1">Blog</p>
                <h1 className="h1">{userData.blog}</h1>
              </div>
              <div>
                <p className="p1">Location</p>
                <h1 className="h1">{userData.location}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="error-container">
          <img src="failure-view-image-url" alt="failure view" />
          <h1>Error: {error}</h1>
          <p>Something went wrong. Please try again</p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  )
}
export default Home
