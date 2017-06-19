import {gql, graphql } from 'react-apollo';
import GroupListPage from '../../components/profile/GroupListPage';


const MyGroupsQuery = gql`query {
    user{
        id
        name
        groups{
            id
	          name
            createdAt
            updatedAt
            users{id,name}
            posts{
                id
            	  postedFile { id, url }
                description
            }
        }
    }
}`

export default graphql(MyGroupsQuery)(GroupListPage);
