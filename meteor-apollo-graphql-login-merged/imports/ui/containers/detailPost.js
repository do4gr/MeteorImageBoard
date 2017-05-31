import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ShowPost from '../components/ShowPost';

const detailQuery = gql`query {
  allPosts(filter: {id : "cj3bfxkp08d050165wcyohnwg"}) {
    id
    category
    upvotes
	postedFile { url }
    description
  }

}`

export default graphql(detailQuery)(ShowPost);
