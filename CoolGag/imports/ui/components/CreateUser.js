import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { Alert, Label } from 'reactstrap';
import { Link, LinkedComponent } from 'valuelink'
import { Input, TextArea, Checkbox } from 'valuelink/tags'


class FormInput extends React.Component {
	
	render() {
		return (
			<span className={ 'form-group' + (!this.props.valueLink.error ? '' : ' has-danger')} >
				<Label className='form-label'> { this.props.label } </Label>
				<Input className='form-control' { ...this.props } />
				<div className="error-placeholder">
					{ this.props.valueLink.error || '' }
				</div>
			</span>
		)
	}
}


class CreateUser extends LinkedComponent {

  static propTypes = {
      router: PropTypes.object.isRequired,
      createUser: PropTypes.func.isRequired,
      signinUser: PropTypes.func.isRequired,
      data: PropTypes.shape({
        loading: PropTypes.bool,
        error: PropTypes.object,
      }).isRequired,
  }

  state = {
      email: this.props.location.query.email || '',
      password: '',
      name: '',
      emailSubscription: false,
      validating: false, 
      errorMessage: '',

  }

  handleUserInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  handleErrorMessage = (error) => {
    this.setState({errorMessage: error })
  }

  // componentDidMount(){
  //   this.blurHandler= (event) => { return this.handleBlur(event)};
  // }  
    
  // handleBlur(event){
  //   this.setState({ validating:true });
  // }

  handleSubmit(event) {
      event.preventDefault();
  }
  // isSubmittable() {
  //     return this.state.email && this.state.password && this.state.name;
  // }
	
	
	
	getValidatedLinks(){
		const links = this.linkAll('name', 'email', 'password');
		
		links.name
			.check( x => x.length >= 2, 'You forgot to type a name')
			.check( x => x.indexOf( ' ' ) < 0, "The name you choose shouldn't contain spaces");
		
		const emailRegexPattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
		
		links.email
			.check( x => x, 'You forgot to enter your email')
			.check( x => x.match(emailRegexPattern), "Please enter a valid email adress");
		
		links.password
			.check( x => x.length >= 6, 'Your password should be min 6 characters long')
			.check( x => x.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/), 'Your Password should contain at least one digit');
		
		return links;
	}

  render() {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.data.user) {
      console.warn('already logged in')
      this.props.router.replace('/')
    }
	
	var links = this.getValidatedLinks();

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
        <div className={this.state.errorMessage.length > 0? 'invisible' : 'visible'}>
          <Alert color="danger">
              <div className="serverErrorMessage">{this.state.errorMessage}</div>
          </Alert>
        </div>
          <form onSubmit={this.handleSubmit}>
          
            <div>
              <div>
                <FormInput  label="Name" className="w-100 pa3 name-from" type="text" placeholder="name" valueLink={ links.name } onChange={this.handleUserInput}/>
                <FormInput  label="Email" className="w-100 pa3 email-from" type="email" placeholder="name@mail.com" valueLink={ links.email } />
                <FormInput  label="Password" className="w-100 pa3 pwd-from" type="password" placeholder="password" valueLink={ links.password } onChange={this.handleUserInput}/>
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
            <button type="submit" disabled={links.name.error|| links.email.error || links.password.error} className='pa3 bn ttu pointer bg-black-10 dim' onClick={this.createUser}>Sign up</button>

          {//<button type="submit" disabled={(isSubmittable ? "" : "disabled")} className={'pa3 bn ttu pointer' + (isSubmittable ? " bg-black-10 dim" : " black-30 bg-black-05 disabled")} onClick={this.createUser}>Sign up</button>
          }
          </div>
        </form>
      </div>
    </div>
  )
}


createUser = () => {
  const { email, password, name, emailSubscription } = this.state

  this.props.createUser({ variables: { email, password, name, emailSubscription } })
      .then((response) => {
        console.log('The error:' + response);
          this.props.signinUser({ variables: { email, password } })
              .then((response) => {
                  window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
                  this.props.router.replace('/')
            }).catch((e) => {
                // console.error(e)
                this.handleErrorMessage(e.message);
                console.log('2', typeof e, e, e.message);
                // //this.props.router.replace('/')
              })
        }).catch((e) => {
          // console.error(e);
          console.log(typeof e, e, e.message);
          // //this.props.router.replace('/')
          for(key in e) {
            console.log(key, typeof e[key], e[key]);
        }
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
