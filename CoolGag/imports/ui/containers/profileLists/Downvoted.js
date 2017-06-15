import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import DownvoteListPage from '../../components/profile/DownvoteListPage';



const DownvotePostsQuery = gql`query {
    user{
        downvotedPosts(orderBy: createdAt_DESC) {
            id
        	postedFile { url }
            description
        }
    }
}`

export default graphql(DownvotePostsQuery)(DownvoteListPage);
