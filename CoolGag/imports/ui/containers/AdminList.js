import { gql, graphql } from 'react-apollo';
import ListPageAdmin from '../components/ListPageAdmin';

const AdminList = gql`query {
  allPosts(orderBy: createdAt_DESC) {
    id
    user {id,name }
	  postedFile { id, url }
    description
    karmaPoints
	  category
  }
}`

export default graphql(AdminList)(ListPageAdmin);
