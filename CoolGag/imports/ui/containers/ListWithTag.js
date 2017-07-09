import { gql, graphql } from 'react-apollo';
import ListPage from '../components/ListPage';
import { withRouter } from 'react-router'


const WithTagQuery = gql`query WithTagQuery($filter: PostFilter!) {
  allPosts(orderBy: createdAt_DESC, filter: $filter) {
    id
    user {id,name }
	postedFile { id, url }
    description
	category
    karmaPoints
  }
  user{id, name}

}`

const WithTagWithData = graphql(WithTagQuery, {
  options: (ownProps) => {
  	var tagText = ownProps.params.tagText
    return {
      variables: {
        filter: {
          AND:[{
            tags_some: {text: tagText}
          },{
            group: null
          }]
        }
      }
    }
  }
})(withRouter(ListPage))

export default WithTagWithData
