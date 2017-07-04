import React from 'react';
import { withRouter} from 'react-router';
import {Link} from 'react-router';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import {Button, ButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Media} from 'reactstrap';
import {Container, Row, Col} from 'reactstrap';
import { gql, graphql, compose, fetchPolicy, withApollo } from 'react-apollo'
import PropTypes from 'prop-types';
import TagUtils from './TagUtils';
import { Glyphicon } from 'react-bootstrap'

class Example extends React.Component {
  static propTypes = {
		router: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

	constructor(props) {
		super(props);

		this.toggleNavBar = this.toggleNavBar.bind(this);
		this.toggleBurgerMenu = this.toggleBurgerMenu.bind(this);
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
	getFilteredTags() {
		return TagUtils.mostUsed(this.props.allTags.allTags).slice(0, 5);
	}
	toggleTagsMenu() {
		this.setState( {
			isCategoriesMenuOpen: !this.state.isCategoriesMenuOpen,
		});
	}

	tagClicked(tag) {
		this.props.router.replace('/tag/' + tag)
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
    console.log(this.props)
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
        <Container >
          <Row>
            <Col>
              <Navbar color="faded" light className="navbar-toggleable-md">
                <NavbarToggler right onClick={this.toggleNavBar} />
                <NavbarBrand href="/">
                  <img className="logo-img" src="/images/icon1.gif" />
                </NavbarBrand>
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
                      <NavLink href="/createPost/">+&nbsp;Post</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/createGroup/">+&nbsp;Group</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/search/"><Glyphicon glyph="search"/></NavLink>
                    </NavItem>
               <NavItem >
                <NavLink >
				<Dropdown isOpen={this.state.isCategoriesMenuOpen} toggle={this.toggleTagsMenu.bind(this)}>
					<DropdownToggle caret color="secondary" outline>
						More Fun
					</DropdownToggle>
					<DropdownMenu className="dropdown-menu-left">
						{ !this.props.allTags.allTags &&
							<DropdownItem header>Loading</DropdownItem>
						}
						{ this.props.allTags.allTags && this.getFilteredTags().map((tag)=>{
							return (
								<DropdownItem key={tag} onClick={this.tagClicked.bind(this, tag)}>
									{'#' + tag}
								</DropdownItem>);
						})}
					</DropdownMenu>
				</Dropdown>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink >
                <Dropdown isOpen={this.state.isBurgerMenuOpen} toggle={this.toggleBurgerMenu}>
                        <DropdownToggle className="profile-img">
                          <div className="imgHolder">
                            <img  className="img-responsive" src={`${this.props.data.user.profilePic? this.props.data.user.profilePic.url : '/images/ProfileDummy.png'}`} alt="Generic placeholder image"/>
                          </div>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-left">
                          <DropdownItem href="/myposts/">My Profile</DropdownItem>
                          <DropdownItem href="/mygroups/">My Groups</DropdownItem>
                          <DropdownItem href="/settings/">Settings</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem href="/"  className="logout-btn" onClick={this._logout}>Logout</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
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
      profilePic { id, url }
    }
  }
`

const tagQuery = gql`
	query {
		allTags {
			id
			text
			_postsMeta {
				count
			}
		}
	}
`

export default compose(
	graphql(tagQuery, {name: 'allTags'}),
	graphql(userQuery, {fetchPolicy : 'network-only'})
)(withRouter(Example))
