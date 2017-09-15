import React from 'react'
import {Navbar, Nav, NavItem, NavLink, Container, Row, Col} from 'reactstrap'


export default class NavPersonalLists extends React.Component {

	render() {
		return (
			<div >
			<Container className="nested" >
				<Row>
				<Col >
				<Navbar className="navbar-inverse navbar-toggleable-sm">
						<Nav vertical className="ml-auto" navbar>
							<NavItem>
								<NavLink href="/myposts/">MY&nbsp;POSTS</NavLink>
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
							<NavItem>
								<NavLink href="/mygroups/">GROUPS</NavLink>
							</NavItem>
						</Nav>
					</Navbar>
				</Col>
				</Row>
			</Container>
			</div>
		);
  }
}
