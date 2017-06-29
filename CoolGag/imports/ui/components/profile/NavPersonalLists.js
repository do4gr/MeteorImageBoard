import React from 'react'
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col} from 'reactstrap'
import { gql, graphql } from 'react-apollo'
import ListPage from '../ListPage'
import ProfilePostListPage from './ProfilePostListPage'


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
			<Row>
			<Col xs={10} md={5} />
			<Col xs={10} md={5}>
			<Container>
				<Col>
				<Navbar light className="navbar-toggleable-sm">
					<NavbarToggler right onClick={this.toggleNavBar} />
					<Collapse isOpen={this.state.isNavBarOpen} navbar>

						<Nav vertical className="ml-auto" navbar>
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
				</Col>

			</Container>
			</Col>
			<Col xs={10} md={5} />
			</Row>
			</div>
		);
  }
}
