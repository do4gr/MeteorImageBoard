import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import NavPersonalLists from '../components/NavPersonalLists';

//TO DO
const UpvotedQuery = gql`query {
  allPosts(orderBy: createdAt_DESC) {
    id
	postedFile { url }
    description
  }
}`

export default graphql(UpvotedQuery)(NavPersonalLists);
