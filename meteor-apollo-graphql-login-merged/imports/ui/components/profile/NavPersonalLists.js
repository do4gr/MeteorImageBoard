import React from 'react'
import {Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink} from 'reactstrap'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ListPage from '../ListPage'


export default class NavPersonalLists extends React.Component {

	constructor(props) {
		super(props);
		this.toggleNavBar = this.toggleNavBar.bind(this);
		this.state = {
			isNavBarOpen: false
		};
	}

	toggleNavBar() {
		this.setState({
			isNavBarOpen: !this.state.isNavBarOpen
		});
	}

	render() {
		return (
			<div>
				<div>
					<Navbar color="faded" light toggleable>
						<NavbarToggler right onClick={this.toggleNavBar} />
						<Collapse isOpen={this.state.isNavBarOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink href="/myposts/">MY&nbsp;POSTS</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="/mygroups/">GROUPS</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="/mycomments/">MY&nbsp;COMMENTS</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="/upvoted/">UPVOTED</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="/downvoted/">DOWNVOTED</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</Navbar>
				</div>
			</div>
		);
  }
}