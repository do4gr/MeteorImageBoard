import { gql, graphql } from 'react-apollo';
import ListPage from '../components/ListPage';
import { withRouter } from 'react-router'

const KittenQuery = gql`query KittenQuery($filter: PostFilter!){
  allPosts(orderBy: createdAt_DESC
  filter: $filter) {
    id
    user {id,name }
  	postedFile { id, url }
    description
  	category
    karmaPoints
    youtubeID
  }
}`

const KittenWithData = graphql(KittenQuery, {
  options: (ownProps) => {
    return {
      variables: {
        filter: {
          AND:[{
            category: KITTENS
          },{
            group: null
          }]
        }
      }
    }
  }
})(withRouter(ListPage));

export default KittenWithData;
