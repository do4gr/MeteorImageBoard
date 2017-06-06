import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'
import ListPage from '../containers/ListPage'
import Nav from './Nav'
import {Container, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'

class Home extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
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
      <div className="center-text">
      <Container fluid>
      <Row>
        <Col className="greet-title">
          <h2>Welcome to coolGAG!</h2>
          <h3>Please Login or Signin.</h3>
        </Col>
      </Row>
      <Row>
        <Col className='pv3'>

            <span
              onClick={this._showLogin}
              className='dib pa3 white bg-blue dim pointer btn-login'>
              Login
            </span>

           </Col>
        </Row>
         <Row>
        <Col className='pv3'>

            <span
              onClick={this._showSignup}
              className='dib pa3 white bg-blue dim pointer btn-singup'>
              Signup
            </span>


          </Col>
        </Row>
        </Container>
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
