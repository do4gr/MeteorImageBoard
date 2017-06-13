import React from 'react'
import ShowComment from './ShowComment'
import CommentList from 'react-uikit-comment-list'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import {FormGroup, Input, Button} from 'reactstrap'


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

   handleSubmit=(event)=>{
  
   }
   render () {
     console.log(this.props);

     const comments = this.props.post.comments;
     return (
       <div className="detailPost-view">
         <div className='pt3'>
           Description: {this.props.post.description ? this.props.post.description: "-" }&nbsp;
         </div>
         <div >
          <img src={`${this.props.post.postedFile.url}`} className="post-img" />
        </div>
        

        <span>
          <Button className="upvote-btn"  onClick=""><span className="glyphicon glyphicon-thumbs-up"></span>UP</Button>{' '}
        </span>
        <span>
          <Button className="downvote-btn"  onClick=""><span className="glyphicon glyphicon-thumbs-down"></span>DOWN</Button>
        </span>
         <span className='author-tag'>
           Author: {this.props.post.user ? this.props.post.user.name: "unknown user"}&nbsp;
         </span>  

         <div className='pt3'>
           Points: {this.props.post.upvotes ? this.props.post.upvotes: "0"}&nbsp;
         </div>
         <hr/>
          <div className='pt3'>
            <p><b>Comments: </b></p>  
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                  <Input type="textarea" placeholder="write comments..." name="text" id="comment-form" className="w-100"/>
              </FormGroup>
              <div>
               <button type="submit" onClick={this.handleComment} className="pa2 bn ttu dim pointer bg-black-10 ">{"Add Comment"}</button>
            </div>
          </form>

          <div className='commentList'>
            {comments.map((comment) =>
              <ShowComment key={comment.id} comment={comment}/>
            )}
            <hr/>
          </div>
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
