import React from 'react'
import { withRouter } from 'react-router'
import {gql,  graphql, fetchPolicy } from 'react-apollo'
import PropTypes from 'prop-types'
import { Button, Container, Row, Col} from 'reactstrap';

class CreateLogin extends React.Component {

  static propTypes = {
    router: PropTypes.object.isRequired,
    signinUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  isSubmittable() {
    return this.state.email && this.state.password;
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.data.user) {
      console.warn('already logged in')
      this.props.router.replace('/')
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
        <form onSubmit={this.handleSubmit}>
          <input
            className='w-100 pa3 mv2'
            value={this.state.email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />

          <Button type="submit" disabled={(this.isSubmittable() ? "" : "disabled")} className={'pa3 bn ttu pointer' + (this.isSubmittable() ? " bg-black-10 dim" : " black-30 bg-black-05 disabled")} onClick={this.signinUser}>Login</Button>

          </form>
        </div>
      </div>
    )
  }

  signinUser = () => {
    const {email, password} = this.state

    this.props.signinUser({variables: {email, password}})
      .then((response) => {
        window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
        this.props.router.replace('/')
      }).catch((e) => {
        console.error(e)
        this.props.router.replace('/')
      })
  }
}

const signinUser = gql`
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(signinUser, {name: 'signinUser'})(
  graphql(userQuery, {fetchPolicy: "network-only"})(withRouter(CreateLogin))
)
