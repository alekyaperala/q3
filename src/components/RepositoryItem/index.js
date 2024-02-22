import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Loader from '../Loader'
import './index.css'

const RepositoryItem = () => {
  const {user, repo} = useParams()
  const apiKey = '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'
  const [repository, setRepository] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  console.log('hello', repo, user, 'in details')

  useEffect(() => {
    const fetchRepositoryDetails = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://apis2.ccbp.in/gpv/specific-repo/${user}/${repo}?api_key=${apiKey}`,
        )
        if (!response.ok) {
          throw new Error('Failed to fetch repository details')
        }
        const data = await response.json()
        console.log(data, 'details data')
        setRepository(data)
        setError(null)
      } catch (e) {
        setError(e.message)
      }
      setIsLoading(false)
    }

    fetchRepositoryDetails()
  }, [user, repo, apiKey])

  if (isLoading) {
    return <Loader data-testid="loader" />
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>Something went wrong. Please try again.</p>
      </div>
    )
  }

  if (!repository) {
    return (
      <div>
        <h1>No Repository Found</h1>
      </div>
    )
  }

  return (
    <div className="repository-item-container">
      <h1 className="repository-name">{repository?.name}</h1>
      <p>Description: {repository?.description || 'N/A'}</p>
      <p>Stars: {repository?.stargazers_count}</p>
      <p>Forks: {repository?.forks_count}</p>
      <p>
        Created at: {new Date(repository?.created_at)?.toLocaleDateString()}
      </p>
      <p>
        Updated at: {new Date(repository?.updated_at)?.toLocaleDateString()}
      </p>
      <p>Watchers Counts</p>
      <p>{repository?.watchers_count}</p>
      <p>Issues Counts</p>
      <p>{repository?.open_issues_count}</p>
      <h1>Contributors</h1>
      <h1>Languages</h1>
      <h1>{repository?.name}</h1>
      <p>{repository?.language || 'N/A'}</p>
    </div>
  )
}

export default RepositoryItem
