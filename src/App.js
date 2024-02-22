import React, {useState} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Home from './components/Home'
import Repository from './components/Repository'
import RepositoryItem from './components/RepositoryItem'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound' // Custom 404 page
import './App.css'

const App = () => {
  const [user, setuser] = useState('')

  return (
    <Router className="bg1">
      <div>
        <header>
          <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
            <h1>GitHub Profile Visualizer</h1>
          </Link>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to={`/repositories/${user}`}>Repositories</Link>
              </li>
              s
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/" exact>
            <Home setuser={setuser} />
          </Route>
          <Route path="/repositories/:reponame">
            <Repository user={user} />
          </Route>
          <Route path="/repository-item-details/:user/:repo">
            <RepositoryItem user={user} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
