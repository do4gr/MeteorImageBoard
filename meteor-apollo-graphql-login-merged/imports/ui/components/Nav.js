import React from 'react';
import {Button, ButtonGroup, Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';

export default class Example extends React.Component {
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

	//container the listpage to open it with the query of the category you are looking at


	render() {
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

