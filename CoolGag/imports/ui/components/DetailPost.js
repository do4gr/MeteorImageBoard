import React from 'react'
 import { Button } from 'reactstrap';
 import ShowComment from '../components/ShowComment'
 import CommentList from 'react-uikit-comment-list'
 import gql from 'graphql-tag'
 import { graphql, compose } from 'react-apollo'
 import PropTypes from 'prop-types';



 class DetailPost extends React.Component {

   static propTypes = {
     data: PropTypes.object,
   }

   state = {
     userId: '',
     postId: '',
     text: 'pls enter text'
   }


   handleComment = () => {
     const userId = this.props.data.user.id
     const postId = this.props.post.id
     const text = "test comment"

     this.props.mutate({
       variables: {postId,text,userId}
     }).then(result => console.log(result))
   }

   render () {
     const comments = this.props.post.comments;
     return (
       <div className="pa1 bg-black-05 ma3">
         <div
         className='w-100'
                    style={{
                      backgroundImage: `url(${this.props.post.postedFile.url})`,
          			      backgroundPosition: 'center center',
                      backgroundSize: 'cover',
                      paddingBottom: '100%',
                    }}
         />
         <div className='pt3'>
           {"Author: " +  this.props.post.user.name}&nbsp;
         </div>
         <div className='pt3'>
           {"Description: " +  this.props.post.description}&nbsp;
         </div>
         <div className='pt3'>
         {"Category: " + this.props.post.category}&nbsp;
        </div>
        <div className='pt3'>
           {"Votes: " +  this.props.post.upvotes}&nbsp;
         </div>
         <div className='pt3'>
           <p><b>Comments: </b></p>
             <div className='commentList'>
               {comments.map((comment) =>
                  <ShowComment key={comment.id} comment={comment}/>
               )}
         </div>
         </div>
         <div className="pt3">
           <input type="text"></input>
         </div>
         <div className="pt3">
           <button onClick={this.handleComment}>{"Add Comment"}</button>
         </div>
       </div>
     )
   }
 }


 const createComment = gql`
 mutation ($userId: ID!, $postId: ID!, $text: String!) {
   createComment(
     userId: $userId,
     postId: $postId,
      text: $text) {
     id
     }
 }
 `

 const userQuery = gql`
 	query {
 		user {
 			id
 		}
 	}
 `

 export default compose(graphql(createComment),graphql(userQuery))(DetailPost)
