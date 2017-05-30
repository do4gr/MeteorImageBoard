import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ListPage from '../components/ListPage';

//TODO
const MyGroupsQuery = gql`query {
  allPosts(orderBy: createdAt_DESC) {
    id
	postedFile { url }
    description
  }
}`

export default graphql(MyGroupsQuery)(ListPage);
