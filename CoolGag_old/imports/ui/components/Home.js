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
        <Row className="greet-section ">
          <Col className="startpage-logo-wrapper">
            <div className="img-logo-holder">
              <img className="img-responsive " src="/images/icon2.gif"/>
            </div>
            <div className="welcome-title">Welcome to coolGAG!</div>
          </Col>
        </Row>
          <Row className='loggin-section'>
            <Col xs="12" sm="6" className="btn text-center">
              <span>
                <Button type="button"
                onClick={this._showLogin}
                className='btn-responsive center btn-login'
                >Login
                </Button>{" "}
              </span>
            </Col>
            <Col  xs="12" sm="6" className="btn text-center" >
                <span>
                  <Button
                  onClick={this._showSignup}
                  className='btn-responsive  btn-signup'>
                  Signup
                  </Button>
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

export default graphql(userQuery, fetchPolicy: "network-only")(withRouter(Home))
