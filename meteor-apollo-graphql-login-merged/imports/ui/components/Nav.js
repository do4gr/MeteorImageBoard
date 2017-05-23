import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  //container the listpage to open it with the query of the category you are looking at


  render() {
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
                <NavLink href="/create/">Create Post</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
