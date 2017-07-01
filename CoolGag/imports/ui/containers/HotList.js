import { gql, graphql } from 'react-apollo';
import ListPage from '../components/ListPage';
import { withRouter } from 'react-router'

var date = new Date(); //generate the current date
date.setDate(date.getDate() - 7); // calculate the date of one week ago
const HotQuery = gql`query HotQuery($lastWeek: DateTime!) {
  allPosts(orderBy: karmaPoints_DESC
  filter: {createdAt_gt: $lastWeek}) {
    id
    user {id,name }
	postedFile { id, url }
    description
	category
  karmaPoints
  }
}`

const HotWithData = graphql(HotQuery, {
  options: {
    variables: {
      lastWeek: date
    }
  }
})(withRouter(ListPage))

export default HotWithData
