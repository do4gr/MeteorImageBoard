import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import CommentListPage from '../../components/profile/CommentListPage';


const MyCommentsQuery = gql`query {
    user{
        comments{
            id
            createdAt
            post{
                id
            	postedFile { url }
                description
            }
            text
            updatedAt
        }
    }
}`

export default graphql(MyCommentsQuery)(CommentListPage);
