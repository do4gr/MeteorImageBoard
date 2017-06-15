import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import UpvoteListPage from '../../components/profile/UpvoteListPage';


const UpvotePostsQuery = gql`query {
    user{
        upvotedPosts(orderBy: createdAt_DESC) {
            id
        	postedFile { url }
            description
        }
    }
}`

export default graphql(UpvotePostsQuery)(UpvoteListPage);
