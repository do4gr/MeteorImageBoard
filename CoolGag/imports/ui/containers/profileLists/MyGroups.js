import {gql, graphql } from 'react-apollo';
import GroupListPage from '../../components/profile/GroupListPage';


const MyGroupsQuery = gql`query {
    user{
        id
        name
        groups (orderBy: createdAt_DESC){
            id
            name
            createdAt
            updatedAt
            picFile { id, url }
            admin { id }
            users{id,name}
            posts{
                id
            	  postedFile { id, url }
                description
                user{id}
            }
        }
    }
}`

export default graphql(MyGroupsQuery)(GroupListPage);
