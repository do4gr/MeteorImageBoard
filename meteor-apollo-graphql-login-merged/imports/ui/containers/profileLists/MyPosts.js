import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ListPage from '../../components/profile/ProfileListPage';


//TODO
const MyPostsQuery = gql`query {
    user{
        posts(orderBy: createdAt_DESC) {
            id
        	postedFile { url }
            description
        }
    }
}`

export default graphql(MyPostsQuery)(ListPage);
