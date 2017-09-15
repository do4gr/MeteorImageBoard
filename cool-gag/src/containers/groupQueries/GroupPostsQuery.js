import {gql, graphql } from 'react-apollo';

export const GroupPostsQuery = gql`query GroupPostsQuery($groupId: ID!){
  Group (id: $groupId){
    id
    name
    picFile { id, url }
    createdAt
    updatedAt
    admins { id }
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
        youtubeID
    }

    }
  user{id, name}
}`
