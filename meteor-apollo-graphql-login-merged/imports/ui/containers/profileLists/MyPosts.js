import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ListPage from '../../components/ListPage';


//TODO
const MyPostsQuery = gql`query {
  allPosts(orderBy: createdAt_DESC) {
    id
	postedFile { url }
    description
  }
}`

export default graphql(MyPostsQuery)(ListPage);
