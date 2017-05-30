import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class Example extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('graphcoolToken')
  }

  _isLoggedIn() {
    window.x = this.props;
    return this.props.data.user
  }
  //container the listpage to open it with the query of the category you are looking at

  render() {
    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }    
  }

  renderLoggedOut() {
    return (
      null
    );
  }

  renderLoggedIn() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">CoolGag</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/hotlist/">Hot</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/trendinglist/">Trending</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/freshlist/">Fresh</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/kittenslist/">Kittens List</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create/">New Post</NavLink>
              </NavItem>
              <NavItem>
                  <NavLink href="/Profile/" className='bg-green pa3 pointer dim'>
                  <span className='white'>
                    {this.props.data.user.name}
                  </span>
                </NavLink>
              </NavItem>
              <NavItem > 
                <NavLink href="/" className=' bg-red pa3 pointer dim' onClick={this._logout}>
                  <span className="white">Logout</span>    
                </NavLink> 
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
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

export default graphql(userQuery, { options: {forceFetch: true }})(Example)

