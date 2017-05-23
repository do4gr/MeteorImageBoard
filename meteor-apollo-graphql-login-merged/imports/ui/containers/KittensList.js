import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ListPage from '../components/ListPage';

const KittenQuery = gql`query {
  allPosts(orderBy: createdAt_DESC
  filter: {category: KITTENS}) {
    id
    imageUrl
    description
  }
}`

export default graphql(KittenQuery)(ListPage);
