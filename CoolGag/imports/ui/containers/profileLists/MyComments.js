import { gql,graphql } from 'react-apollo';
import CommentListPage from '../../components/profile/CommentListPage';


const MyCommentsQuery = gql`query {
    user{
        id
        comments{
            id
            createdAt
            post{
                id
            	  postedFile { id, url }
                description
            }
            text
            updatedAt
        }
    }
}`

export default graphql(MyCommentsQuery)(CommentListPage);
