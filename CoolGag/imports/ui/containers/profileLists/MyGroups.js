import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import GroupListPage from '../../components/profile/GroupListPage';

//TODO
const MyGroupsQuery = gql`query {
   user{
       groups{
           id
            name
           users{
               id
               name
           }
       }
   }
}`

export default graphql(MyGroupsQuery)(GroupListPage);