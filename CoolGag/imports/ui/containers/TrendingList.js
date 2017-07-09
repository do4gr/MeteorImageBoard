import {gql,  graphql } from 'react-apollo';
import ListPage from '../components/ListPage';
import { withRouter } from 'react-router'

var date = new Date(); //generate the current date
date.setDate(date.getDate() - 1); // calculate the date of yesterday
const TrendingQuery = gql`query TrendingQuery($filter: PostFilter!) {
  allPosts(orderBy: karmaPoints_DESC
  filter: $filter) {
  id
  user {id,name }
	postedFile { id, url }
  description
	category
  karmaPoints
  }
  user{id, name}
}`


const TrendingWithData = graphql(TrendingQuery, {
  options: (ownProps) => {
    var date = new Date(); //generate the current date
    date.setDate(date.getDate() - 1); // calculate the date of yesterday
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

export default TrendingWithData
