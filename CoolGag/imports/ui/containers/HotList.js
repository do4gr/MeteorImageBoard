import { gql, graphql } from 'react-apollo';
import ListPage from '../components/ListPage';
import { withRouter } from 'react-router'


const HotQuery = gql`query HotQuery($filter: PostFilter!) {
  allPosts(orderBy: karmaPoints_DESC
    filter: $filter
    first: 20) {
      id
      user {id,name }
      postedFile { id, url }
      description
      category
      karmaPoints
      youtubeID
    }
<<<<<<< HEAD
    user {id, name}

=======
    user{id, name}
>>>>>>> Development
}`

const HotWithData = graphql(HotQuery, {
  options: (ownProps) => {
    var date = new Date(); //generate the current date
    date.setDate(date.getDate() - 7); // calculate the date of one week ago
    console.log(date.toISOString())
    return {
      variables: {
        filter: {
          AND:[{
            createdAt_gt: date.toISOString()
          },{
            group: null
          }]
        }
      }
    }
  }
})(withRouter(ListPage))

export default HotWithData
