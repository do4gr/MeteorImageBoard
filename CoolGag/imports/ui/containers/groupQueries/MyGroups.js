import {gql, graphql } from 'react-apollo';
import GroupListPage from '../../components/groups/GroupListPage';


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
            admins { id }
            users{id,name}
            posts{
                id
            	  postedFile { id, url }
                description
                user{id}
                youtubeID
            }
        }
    }
}`

export default graphql(MyGroupsQuery)(GroupListPage);
