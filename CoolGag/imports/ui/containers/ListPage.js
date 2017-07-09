import {gql, graphql} from 'react-apollo';
import ListPage from '../components/ListPage';
import { withRouter } from 'react-router'

const FeedQuery = gql `query FeedQuery($filter: PostFilter!){
  allPosts(orderBy: createdAt_DESC
  filter: $filter) {
    id
    user {id,name }
    postedFile {id,url }
    description
	category
    karmaPoints
  }
  user{
    id, name
  }
}`

const FeedWithData = graphql(FeedQuery, {
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

export default FeedWithData
