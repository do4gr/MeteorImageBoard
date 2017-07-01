import React, { Component } from 'react';
import {Form, FormGroup, Input, Button} from 'reactstrap'
import {gql,  graphql, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import PostPreview from '../PostPreview.js'
import { Container, Row, Col } from 'reactstrap';


class SearchApp extends Component {

  static propTypes = {
		data: PropTypes.object
	}

  constructor(props) {
      super(props);
    };

  state = {
    searchTerm: ''
  };


  isSubmittable() {
    if (this.state.searchTerm != '') {
      return true;
    } else {
      return false;
    }
  };

  onSearchClicked = () => {
    this.props.data.refetch({searchTerm: this.state.searchTerm});
  };

  render() {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
    return (
      <Container>
        <Row>
          <Col xs="3"></Col>
          <Col xs="auto"><Input value={this.state.searchTerm} onChange={(e) => this.setState({searchTerm: e.target.value})} placeholder="search title or comments" id="search-form" className="w-40"/></Col>
          <Col xs="3"><button type="submit" disabled={this.isSubmittable()
            ? ''
            : 'disabled'} onClick={this.onSearchClicked} className="pa2 bn ttu dim pointer ">Search</button>
          </Col>
        </Row>
        <Row>
          <Col xs="3"></Col>
          <Col xs="6">
            {this.props.data.allPosts.map((post) =>
              <PostPreview key={post.id} post={post}/>
            )}
          </Col>
        </Row>
      </Container>
      );
  }
};


export default graphql(gql`
query SearchPosts($searchTerm: String!) {
  allPosts(filter: {description_contains: $searchTerm}) {
    id
    user {id,name }
    postedFile {id,url }
    description
    category
  }
}`, {
  options: (props) => ({
    variables: {
      searchTerm: "kitten"
    },
  }),
})(SearchApp);
