import React from 'react'
import { gql, graphql, fetchPolicy } from 'react-apollo'
import { withRouter } from 'react-router'
import ListPage from '../containers/ListPage'
import Nav from './Nav'
import { Button, Container, Row, Col } from 'reactstrap'
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
      <div className="startpage-wrapper">
      <Container className="startpage" fluid>
        <Row className="greet-section startpage-logo-wrapper">
          <Col >
            <div className="">
              <img className="startpage-logo" src="/images/icon1.gif"/>
            </div>
            <div className="welcome-title">Welcome to coolGAG!</div>
          </Col>
        </Row>
        <div className='loggin-section'>
          <Row>
            <Col md={{size:3, offset: 3}} className='pv3'>
              <span>
                <Button type="button"
                onClick={this._showLogin}
                className='dib pa3 white bg-blue dim pointer btn-login'
                >Login
                </Button>{" "}
              </span>
            </Col>
            <Col md={{size:5, offset: 1}} className='pv3'>
                <span>
                  <Button
                  onClick={this._showSignup}
                  className='dib pa3 white bg-blue dim pointer btn-signup'>
                  Signup
                  </Button>
                </span>
              </Col>
            </Row>
          </div>
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

export default graphql(userQuery, fetchPolicy: "network-only")(withRouter(Home))
