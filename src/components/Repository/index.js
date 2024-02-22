import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Loader from '../Loader'
import NotFound from '../NotFound'
import './index.css'

const Repository = ({location}) => {
  const [repositories, setRepositories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const {reponame: user} = useParams()
  const apiKey = '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'
  const history = useHistory()

  console.log(user, 'here in repository')
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `https://apis2.ccbp.in/gpv/repos/${user}?api_key=${apiKey}`,
      )
      if (!response.ok) {
        throw new Error('Failed to fetch repository details')
      }
      const data = await response.json()
      setRepositories(data)
      setError(null) // Reset error state on successful fetch
    } catch (e) {
      setError(e)
      setRepositories([]) // Reset repositories array on error
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [user])

  const handleTryAgain = () => {
    // Refetch data when Try Again button is clicked
    fetchData()
  }

  const handleGoHome = () => {
    // Navigate to home
    history.push('/')
  }

  const navigateToRepositoryItem = repo => {
    history.push(`/repository-item-details/${user}/${repo}`)
  }

  if (!user) {
    return (
      <div className="container">
        <NotFound />
        <button onClick={handleGoHome}>Go to Home</button>
      </div>
    )
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="container">
        <img src="failure-view-image-url" alt="failure view" />
        <h1>Error: {error.message}</h1>
        <p>Something went wrong. Please try again</p>
        <button onClick={handleTryAgain}>Try Again</button>
      </div>
    )
  }

  if (!repositories?.length) {
    return (
      <div className="container">
        <img src="no-repositories-image-url" alt="no repositories" />
        <h1>No Repositories Found</h1>
      </div>
    )
  }

  return (
    <div className="container">
      <h2 className="repository-heading">Repositories</h2>
      {repositories?.length &&
        repositories?.map((repo, index) => (
          <div
            className="repository-container"
            onClick={() => navigateToRepositoryItem(repo?.name)}
            role="button"
            key={repo?.id}
            tabIndex={0}
          >
            <div className="repository-details">
              <div className="repoName">Name: {repo?.name}</div>
              <div className="description">
                Description: {repo?.description || 'N/A'}
              </div>
              <div className="languages">
                Languages:{' '}
                {repo?.languages?.length
                  ? repo?.languages?.map(lang => (
                      <span key={lang?.value} className={`languages ${lang}`}>
                        {lang?.name}
                      </span>
                    ))
                  : ''}
              </div>
              <div className="starfork">
                <div className="padding">Stars: {repo?.stargazers_count}</div>
                <div>Fork: {repo?.forks_count}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Repository
