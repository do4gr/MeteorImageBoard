import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Alert, Label } from 'reactstrap';
import Link, { LinkedComponent } from 'valuelink'
import { Input, TextArea, Checkbox } from 'valuelink/tags'




class CreateUser extends LinkedComponent {

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
        inputTouched:false
        
    }

    handleUserInput = (e) =>{
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[name]: value});
          
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    isSubmittable() {
        return this.state.email && this.state.password && this.state.name;
    }

    // hasError(error){
    //   return(error.length === 0 ? 'has-success' : 'has-danger');

    // }

    render() {
      const FormInput = ({ label, ...props }) => (
        <span className="form-group" >
          <Label className='form-label'> { label } </Label>
            <Input className='from-control' onBlur={() => this.setState({titleTouched: true})} { ...props } />
            <div className="error-placeholder">
              { props.valueLink.error || '' }
            </div>
        </span>
      );

    const linked = this.linkAll(); //wrap all state members in links

    const nameLink=Link.state(this, 'name')
      .check( x => x.length >= 2, 'You forgot to type a name')
      .check( x => x.indexOf( ' ' ) < 0, "The name you choose shouldn't contain spaces");

    const emailRegexPattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    const emailLink=Link.state(this, 'email')
      .check( x => x, 'You forgot to enter your email')
      .check( x => x.match(emailRegexPattern), "Please enter a valid email adress");

    const passwordLink=Link.state(this, 'password')
      .check( x => x.length >= 6, 'Your password should be min 6 characters long')
      .check( x => x.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/), 'Your Password should contain at least one letter and one special character');


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
            
              <div>
                <div>
                  <FormInput  label="Name" className="w-100 pa3 name-from" type="text" placeholder="name" valueLink={ nameLink } />

                  <FormInput  label="Email" className="w-100 pa3 email-from" type="email" placeholder="name@mail.com" valueLink={ emailLink } />

                  <FormInput  label="Password" className="w-100 pa3 pwd-from" type="password" placeholder="password" valueLink={ passwordLink } />
 
                    {/*
                <div >
                  <label htmlFor="email">Email address</label>
                  <input type="email" required className='w-100 pa3 mv2' name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleUserInput}  />
                </div>
                <div >
                  <label htmlFor="password">Password</label>
                  <input type="password" required className='w-100 pa3 mv2' name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleUserInput}  />
                </div>
              
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
            {//<button type="submit" disabled={(this.state.formValid ? "" : "disabled")} className={'pa3 bn ttu pointer' + (this.state.formValid ? " bg-black-10 dim" : " black-30 bg-black-05 disabled")} onClick={this.createUser}>Sign up</button>
            }
            <button type="submit" disabled={(this.isSubmittable() ? "" : "disabled")} className={'pa3 bn ttu pointer' + (this.isSubmittable() ? " bg-black-10 dim" : " black-30 bg-black-05 disabled")} onClick={this.createUser}>Sign up</button>
            </div>

          </form>
        </div>
      </div>
    )


  }


// errorClass(error) {
//    return(error.length === 0 ? '' : 'has-error');
// }

// validateField(fieldName, value) {
//   let fieldValidationErrors = this.state.formErrors;
//   let emailValid = this.state.emailValid;
//   let passwordValid = this.state.passwordValid;
//   let nameValid= this.state.nameValid;

//   switch(fieldName) {
//     case 'email':
//       emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
//       fieldValidationErrors.email = emailValid ? '' : ' is invalid';
//       break;
//     case 'password':
//       passwordValid = value.length >= 6;
//       fieldValidationErrors.password = passwordValid ? '': ' is too short';
//       break;
//     case 'name':
//       nameValid = value.length >= 2;
//       fieldValidationErrors.name = nameValid ? '': ' is too short';
//       break;
//     default:
//       break;
//   }

//   this.setState({formErrors: fieldValidationErrors,
//                   emailValid: emailValid,
//                   passwordValid: passwordValid,
//                   nameValid: nameValid
//                 }, this.validateForm);
// }

// validateForm() {
//   this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.nameValid });
// }

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
