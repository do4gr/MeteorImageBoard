import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ShowPost from '../components/showpost';

const detailQuery = gql`query {
  allPosts(filter: {id: "cj3bfxkp08d050165wcyohnwg"}){
     description,
    	upvotes,
    }
}`

export default graphql(detailQuery)(ShowPost);
