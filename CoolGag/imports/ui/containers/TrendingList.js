import {gql,  graphql } from 'react-apollo';
import ListPage from '../components/ListPage';
import { withRouter } from 'react-router'

var date = new Date(); //generate the current date
date.setDate(date.getDate() - 1); // calculate the date of yesterday
const TrendingQuery = gql`query TrendingQuery($yesterday: DateTime!) {
  allPosts(orderBy: karmaPoints_DESC
  filter: {createdAt_gt: $yesterday}) {
    id
    user {id,name }
	postedFile { id, url }
    description
	category
  karmaPoints
  }
}`

const TrendingWithData = graphql(TrendingQuery, {
  options: {
    variables: {
      yesterday: date
    }
  }
})(withRouter(ListPage))

export default TrendingWithData
