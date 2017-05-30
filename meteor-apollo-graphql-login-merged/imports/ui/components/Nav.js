import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';
import {Button, ButtonGroup, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


class Example extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

	constructor(props) {
		super(props);

		this.toggleNavBar = this.toggleNavBar.bind(this);
		this.toggleBurgerMenu = this.toggleBurgerMenu.bind(this);
		this.state = {
			isNavBarOpen: false,
			isBurgerMenuOpen: false,
		};
	}

	toggleNavBar() {
		this.setState({
			isNavBarOpen: !this.state.isNavBarOpen
		});
	}

	toggleBurgerMenu() {
		this.setState( {
			isBurgerMenuOpen: !this.state.isBurgerMenuOpen,
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
					<NavbarToggler right onClick={this.toggleNavBar} />
					<NavbarBrand href="/">CoolGag</NavbarBrand>
					<Collapse isOpen={this.state.isNavBarOpen} navbar>
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
								<NavLink href="/kittenslist/">Kittens&nbsp;List</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/create/">Create&nbsp;Post</NavLink>
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
					<Nav>
						<NavItem>
							<ButtonGroup className="profile-logout-button">
								<Dropdown isOpen={this.state.isBurgerMenuOpen} toggle={this.toggleBurgerMenu}>
									<DropdownToggle caret>
										Hallo
									</DropdownToggle>
									<DropdownMenu className="dropdown-menu-right">
										<DropdownItem href="/myposts/">My Profile</DropdownItem>
										<DropdownItem>Settings</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</ButtonGroup>
						</NavItem>
					</Nav>
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

