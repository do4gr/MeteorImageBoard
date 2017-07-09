import { gql, graphql } from 'react-apollo';
import ListPage from '../components/ListPage';
import { withRouter } from 'react-router'

const FreshQuery = gql`query FreshQuery($filter: PostFilter!){
  allPosts(orderBy: createdAt_DESC, filter: $filter, first: 20) {
    id
    user {id,name }
	postedFile { id, url }
    description
    karmaPoints
	category
  youtubeID
  }
  user {id, name, isAdmin}
}`

const FreshWithData = graphql(FreshQuery, {
  options: (ownProps) => {
    return {
      variables: {
        filter: {
            group: null
        }
      }
    }
  }
})(withRouter(ListPage))

export default FreshWithData;
