import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'
import ListPage from '../containers/ListPage'
import Nav from './Nav'

class Home extends React.Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  

  _showLogin = () => {
    this.props.router.push('/login')
  }

  _showSignup = () => {
    this.props.router.push('/signup')
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }

//refactor methods into logged in and logged out components
  renderLoggedIn() {
    return (
      <div>
        <ListPage />
      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div>
        <div className="greet-title">
          <h2>Welcome to coolGAG!</h2>
          <h3>Please Log In or Sign In.</h3>
        </div>
        <div className='pv3'>
          <div>
            <span
              onClick={this._showLogin}
              className='dib pa3 white bg-blue dim pointer'
            >
              Log in with Email
            </span>
          </div>
          <span>Log in to view and create posts</span>
          <div>
            <span
              onClick={this._showSignup}
              className='dib pa3 white bg-blue dim pointer'
            >
              Sign up with Email
            </span>
          </div>
        </div>
      </div>
    )
  }
}

const userQuery = gql`
  query {
    user {
      id
      name
    }
  }
`

export default graphql(userQuery, { options: {forceFetch: true }})(withRouter(Home))
