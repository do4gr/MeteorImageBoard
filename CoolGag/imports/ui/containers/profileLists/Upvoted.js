import { gql,graphql } from 'react-apollo';
import UpvoteListPage from '../../components/profile/UpvoteListPage';


const UpvotePostsQuery = gql`query {
    user{
        id
        upvotedPosts(orderBy: createdAt_DESC) {
            id
        	postedFile { id, url }
            description
            user{ id, name }
            youtubeID
        }
    }
}`

export default graphql(UpvotePostsQuery)(UpvoteListPage);
