import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from 'react-router-dom'
import './App.css'
import HomePage from './HomePage'
import DesktopNav from './components/DesktopNav'
import Input from './components/Input'
import LoginPage from './LoginPage'
import MobileNav from './components/MobileNav'

class App extends Component {
  state = {
    totalRecipients: 700,
    notifications: [
      {
        title: 'Flood warning',
        sentAt: Date.now(),
        received: 50,
        failed: 10,
        responded: 10,
        body:
          'Please note that there has been an announcement about a flood coming.',
        group: {
          country: 'France',
          status: 'Student'
        }
      },
      {
        title: 'Heat wave',
        sentAt: Date.now(),
        received: 50,
        failed: 10,
        responded: 10,
        body:
          'Please note that there has been an announcement about a heat wave.'
      }
    ],
    announcements: [
      {
        title: 'Flood warning',
        sentAt: Date.now(),
        body:
          'Please note that there has been an announcement about a flood coming.'
      },
      {
        title: 'Heat wave',
        sentAt: Date.now(),
        body:
          'Please note that there has been an announcement about a heat wave.'
      }
    ]
  }

  render() {
    const { notifications, announcements } = this.state
    return (
      <Router>
        <div className="App">
          <Switch>
<<<<<<< HEAD

            {/* Login */}
            <Route path='/login' exact render={() => (
              <LoginPage />
            )} />

            {/* Home */}
            <Route path='/home' exact render={() => (
              <h1>Homepage</h1>
            )} />

            {/* Route not found */}
            <Route render={({ location }) => (
              <h2
                className='text-center text-danger'
              >
                Page not found: {location.pathname}
              </h2>
            )} />

=======
            {/* Login */}
            <Route path="/login" exact render={() => <LoginPage />} />
            <Route
              path="/"
              exact
              render={() => (
                <HomePage
                  notifications={notifications}
                  announcements={announcements}
                />
              )}
            />
            <Route
              render={({ location }) => (
                <h2 className="text-center text-danger">
                  Page not found: {location.pathname}
                </h2>
              )}
            />
>>>>>>> 97ef1c5cb70866af1d12b8a86368c252822390f9
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
