import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Validation from 'react-validation';
import { Alert } from 'reactstrap';



class CreateUser extends React.Component {

    static propTypes = {
        router: PropTypes.object.isRequired,
        createUser: PropTypes.func.isRequired,
        signinUser: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired,
    }

    state = {
        email: this.props.location.query.email || '',
        password: '',
        name: '',
        emailSubscription: false,
        formErrors: {email: '', password: '', name: ''},
        emailValid: false,
        nameValid: false,
        passwordValid: false,
        formValid: false
    }

    handleUserInput = (e) =>{
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value}, () => { this.validateField(name, value) });
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    isSubmittable() {
        return this.state.email && this.state.password && this.state.name;
    }

    render() {
       const FormErrors = ({formErrors}) =>
          <div className='formErrors'>
            {Object.keys(formErrors).map((fieldName, i) => {
              if(formErrors[fieldName].length > 0){
                return (
                  <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                )        
              } else {
                return '';
              }
            })}
          </div>

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
            <Alert color="danger" className='panel panel-default'>
              <FormErrors formErrors={this.state.formErrors} />
            </Alert>
            <form onSubmit={this.handleSubmit}>
            
              <div>
                <div className={'form-group ${this.errorClass(this.state.formErrors.name)}'}>
                  <label htmlFor="name">Username</label>
                  <input type="name" required className='w-100 pa3 mv2' name="name"
                    placeholder="name"
                    value={this.state.name}
                    onChange={this.handleUserInput}  />
                </div>
                <div className={'form-group ${this.errorClass(this.state.formErrors.email)}'}>
                  <label htmlFor="email">Email address</label>
                  <input type="email" required className='w-100 pa3 mv2' name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleUserInput}  />
                </div>
                <div className={'form-group ${this.errorClass(this.state.formErrors.password)}'}>
                  <label htmlFor="password">Password</label>
                  <input type="password" required className='w-100 pa3 mv2' name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleUserInput}  />
                </div>
              {/*
                 <input
                  className='w-100 pa3 mv2'
                  type='password'
                  
                  value={this.state.password}
                  placeholder='confirm password'
                  onChange={(e) => this.setState({password: e.target.value})}
                />
              */}
                <input
                  className='w-100 pa3 mv2'
                  value={this.state.emailSubscription}
                  type='checkbox'
                  onChange={(e) => this.setState({emailSubscription: e.target.checked})}
                />
                <span>
                  Subscribe to email notifications?
                </span>
            </div>
            <button type="submit" disabled={(this.state.formValid ? "" : "disabled")} className={'pa3 bn ttu pointer' + (this.state.formValid ? " bg-black-10 dim" : " black-30 bg-black-05 disabled")} onClick={this.createUser}>Sign up</button>
            {//<button type="submit" disabled={(this.isSubmittable() ? "" : "disabled")} className={'pa3 bn ttu pointer' + (this.isSubmittable() ? " bg-black-10 dim" : " black-30 bg-black-05 disabled")} onClick={this.createUser}>Sign up</button>
            }
          </form>
        </div>
      </div>
    )
  }

errorClass(error) {
   return(error.length === 0 ? '' : 'has-error');
}

validateField(fieldName, value) {
  let fieldValidationErrors = this.state.formErrors;
  let emailValid = this.state.emailValid;
  let passwordValid = this.state.passwordValid;
  let nameValid= this.state.nameValid;

  switch(fieldName) {
    case 'email':
      emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      fieldValidationErrors.email = emailValid ? '' : ' is invalid';
      break;
    case 'password':
      passwordValid = value.length >= 6;
      fieldValidationErrors.password = passwordValid ? '': ' is too short';
      break;
    case 'name':
      nameValid = value.length >= 2;
      fieldValidationErrors.name = nameValid ? '': ' is too short';
      break;
    default:
      break;
  }

  this.setState({formErrors: fieldValidationErrors,
                  emailValid: emailValid,
                  passwordValid: passwordValid,
                  nameValid: nameValid
                }, this.validateForm);
}

validateForm() {
  this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid });
}

createUser = () => {
  const { email, password, name, emailSubscription } = this.state

  this.props.createUser({ variables: { email, password, name, emailSubscription } })
      .then((response) => {
          this.props.signinUser({ variables: { email, password } })
              .then((response) => {
                  window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
                  this.props.router.replace('/')
              }).catch((e) => {
                  console.error(e)
                  this.props.router.replace('/')
              })
      }).catch((e) => {
          console.error(e)
          this.props.router.replace('/')
      })
  }

 

}

const createUser = gql `
  mutation ($email: String!, $password: String!, $name: String!, $emailSubscription: Boolean!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, name: $name, emailSubscription: $emailSubscription) {
      id
    }
  }
`

const signinUser = gql `
  mutation ($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

const userQuery = gql `
  query {
    user {
      id
    }
  }
`

export default graphql(createUser, { name: 'createUser' })(
    graphql(userQuery, { options: { forceFetch: true } })(
        graphql(signinUser, { name: 'signinUser' })(
            withRouter(CreateUser))
    )
)
