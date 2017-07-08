import { gql, graphql } from 'react-apollo';
import ProfilePostListPage from '../../components/profile/ProfilePostListPage';



const MyPostsQuery = gql`query {
    user{
        id
        posts(orderBy: createdAt_DESC) {
            id
        	postedFile {id,  url }
            description
            user{ id, name }

        }
    }
}`

export default graphql(MyPostsQuery)(ProfilePostListPage);
