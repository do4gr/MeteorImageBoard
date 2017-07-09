import React, { Component } from 'react';
import {Form, FormGroup, Input, Button, Container, Row, Col} from 'reactstrap'
import {gql,  graphql, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import PostPreview from '../PostPreview.js'



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
          <Col xs="6" sm="6" md={{ size: 4, offset: 2 }} lg={{ size: 4, offset: 3 }} xl={{ size: 4, offset: 3.5 }}>
            <Input 
              value={this.state.searchTerm} 
              onChange={(e) => this.setState({searchTerm: e.target.value})} 
              placeholder="search title or comments" 
              id="search-form"
              className="w-40"/>
          </Col>
          <Col xs="6" sm="6" md={{ size: 4, offset: 0.5 }} lg={{ size: 4, offset: 3 }} xl={{ size: 4, offset: 3.5 }}>
            <Button type="submit" disabled={(!this.isSubmittable())} onClick={this.onSearchClicked} className="btn-normal pa2 bn ttu dim pointer ">Search</Button>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 8, offset: 2}} lg={{ size: 6, offset: 3 }} xl={{ size: 5, offset: 3.5 }}>
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
