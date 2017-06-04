import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {Button, ButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
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
    this.toggleCategoriesMenu = this.toggleCategoriesMenu.bind(this);
		this.state = {
			isNavBarOpen: false,
			isBurgerMenuOpen: false,
      isCategoriesMenuOpen: false,
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
  toggleCategoriesMenu() {
    this.setState( {
      isCategoriesMenuOpen: !this.state.isCategoriesMenuOpen,
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
      <Container>
        <Row>
        <Col>
				<Navbar color="faded" light className="navbar-toggleable-md">
					<NavbarToggler right onClick={this.toggleNavBar} />
					<NavbarBrand href="/">coolGAG</NavbarBrand>
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
               <NavItem >
                <NavLink >
                <Dropdown  isOpen={this.state.isCategoriesMenuOpen} toggle={this.toggleCategoriesMenu}>
                        <DropdownToggle caret color="secondary" outline>
                          More&nbsp;Fun
                        </DropdownToggle>{''}
                        <DropdownMenu className="dropdown-menu-left">
                          <DropdownItem>Dark Humor</DropdownItem>
                          <DropdownItem>Yummy</DropdownItem>
                          <DropdownItem>Funny</DropdownItem>
                          <DropdownItem>Cute</DropdownItem>
                          <DropdownItem>Hackers United</DropdownItem>
                          <DropdownItem>Work</DropdownItem>
                          <DropdownItem>Politics</DropdownItem>
                    </DropdownMenu>
                </Dropdown>   
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink >
                <Dropdown isOpen={this.state.isBurgerMenuOpen} toggle={this.toggleBurgerMenu}>
                        <DropdownToggle caret color="info" outline >
                          {this.props.data.user.name}
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-left">
                          <DropdownItem href="/myposts/">My Profile</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem>Settings</DropdownItem>
                    </DropdownMenu>
                </Dropdown>   
                </NavLink>
              </NavItem>
              <NavItem > 
                <NavLink href="/"  onClick={this._logout}>
                  <Button color="danger"  outline >Logout</Button>{''}    
                </NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
        </Col>
        </Row>
        </Container>
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

