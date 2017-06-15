import React from 'react'
import PostPreview from '../PostPreview'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

export default class GroupListPage extends React.Component {

 static propTypes = {
   data: PropTypes.object,
 }

 render () {
   if (this.props.data.loading) {
     return (<div>Loading</div>)
   }
   console.log(this.props.data);
   return (
     <div className='w-100 flex justify-center'>
       <div className='w-100'>
       {this.props.data.user.groups.map((group) =>
        //<PostPreview key={post.id} post={post} />
         <span>{group.name}</span>
       )}
       </div>
     </div>
   )
 }
}