import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import CommentListPage from '../../components/profile/CommentListPage';

//TODO
const MyCommentsQuery = gql`query {
    user{
        comments{
            id
            createdAt
            post
            text
            updatedAt
        }
    }
}`

export default graphql(MyCommentsQuery)(CommentListPage);
