import React from 'react'
import Nav from '../components/Nav'
import { fetchPolicy, gql, graphql } from 'react-apollo'
import { withRouter } from 'react-router'

/*
  Props:
    router
    location (from react-router)
    data (from apollo)
*/
class App extends React.Component {
  componentDidMount() {
    this.checkRedirect(this.props)
  }
  checkRedirect(props) {
    if (props.data && props.data.user === null
        && props.location.pathname !== '/'
        && props.location.pathname !== '/login'
        &&props.location.pathname !== '/signup' ) {
      window.localStorage.removeItem('graphcoolToken')
      location.href = '/'
    }
  }
  componentWillReceiveProps(nextProps) {
    this.checkRedirect(nextProps)
  }
  render() {
    return (
      <div className='app'>
        <div className='header'>
          <Nav />
        </div>
        <div className='body'>
          {this.props.children}
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

export default graphql(userQuery, fetchPolicy: 'network-only')(withRouter(App))
