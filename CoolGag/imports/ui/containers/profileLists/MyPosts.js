import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ProfilePostListPage from '../../components/profile/ProfilePostListPage';



const MyPostsQuery = gql`query {
    user{
        posts(orderBy: createdAt_DESC) {
            id
        	postedFile { url }
            description
        }
    }
}`

export default graphql(MyPostsQuery)(ProfilePostListPage);
