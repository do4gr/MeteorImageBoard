import { gql,graphql } from 'react-apollo';
import UpvoteListPage from '../../components/profile/UpvoteListPage';


const UpvotePostsQuery = gql`query {
    user{
        id
        upvotedPosts(orderBy: createdAt_DESC) {
            id
        	  postedFile { id, url }
            description
        }
    }
}`

export default graphql(UpvotePostsQuery)(UpvoteListPage);
