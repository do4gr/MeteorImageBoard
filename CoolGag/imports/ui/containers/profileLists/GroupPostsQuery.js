import {gql, graphql } from 'react-apollo';
import GroupPage from '/imports/ui/components/profile/GroupPage';


export const GroupPostsQuery = gql`query GroupPostsQuery($groupId: ID!){
  Group (id: $groupId){
    id
    name
    picFile { id, url }
    createdAt
    updatedAt
    admin { id }
    users{
        id
        name
        profilePic { id, url }
      }
    posts (orderBy: createdAt_DESC){
        id
        postedFile { id, url }
        description
        user{ id, name }
    }
  
    }
  user{id, name}
}`

