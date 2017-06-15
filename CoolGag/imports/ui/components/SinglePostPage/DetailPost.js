import React from 'react'
import ShowComment from './ShowComment'
import CommentList from 'react-uikit-comment-list'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import {FormGroup, Input, Button, } from 'reactstrap'
import { Glyphicon } from 'react-bootstrap';


 class DetailPost extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
        loading: React.PropTypes.bool,
        error: React.PropTypes.object,
        Post: React.PropTypes.object,
     }),
  }

  state = {
     userId: '',
     postId: '',
     text: '',
     points: 0,
  }


    handleComment = () => {
      const userId = this.props.user
      const postId = this.props.post.id
      const text = this.state.text

     this.props.createCommentMutation({
      mutation: createComment,
      variables: { userId, postId, text}
     }).then(result => console.log(result))
   }

   isSubmittable() {
    if (this.state.text != ''){
      return true;
    }else{
      return false;      
    }
    
   }

   handleUpvote = () => {
    const userId = this.props.user
    const postId = this.props.post.id
    this.props.upvotePostMutation({
      mutation: upvotePost,
      variables: { postId, userId }
    }).then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
   }

  handleDownvote = () => {
    const userId = this.props.user
    const postId = this.props.post.id
    this.props.downvotePostMutation({
      mutation: downvotePost,
      variables: { postId, userId }
    }).then(({ data }) => {
        console.log('got data', data);
      }).catch((error) => {
        console.log('there was an error sending the query', error);
      });
   }

   handleSubmit=(event)=>{
      console.log('handleSubmit')  
   }

   render () {
    //console.log('Das sind die Props in der DetailPost',this.props);

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

     const comments = this.props.post.comments;
     const countComments = this.props.data.Post._commentsMeta.count;
     // TODO: _usersWhoUpvotedMeta is not defined. Why? comments where defined...is it coming from parent PostPage
     // const countUpvotes = this.props.data.Post._usersWhoUpvotedMeta.count;
     // const countDownvotes = this.props.data.Post._usersWhoDownvotedMeta.count;
     return (
       <div className="detailPost-view">
         <div className='pt3'>
           Description: {this.props.post.description ? this.props.post.description: "-" }&nbsp;
         </div>
         <div >
          <img src={`${this.props.post.postedFile.url}`} className="post-img w-100" />
        </div>
        

        <span>
          <Button className="upvote-btn"  onClick={this.handleUpvote}><Glyphicon glyph="align-right" />{"UP"}</Button>{' '}
        </span>
        <span>
          <Button className="downvote-btn"  onClick={this.handleDownvote}><span className="glyphicon glyphicon-thumbs-down"></span>DOWN</Button>
        </span>
         <span className='author-tag'>
           Author: {this.props.post.user ? this.props.post.user.name: "unknown user"}&nbsp;
         </span>  
        <div>
           Points: {}&nbsp;
        </div>
           <div className='pt3'>
         <b>{ countComments }&nbsp; Comments </b>
         </div>
         <hr className="hr-comment"/>
             
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                  <Input type="textarea" placeholder="write comments..." name="text" id="comment-form" className="w-100" onChange={(e) => this.setState({text: e.target.value})}/>
              </FormGroup>
              <div>
               <button type="submit"  disabled={this.isSubmittable() ? '' : 'disabled'}onClick={this.handleComment} className="pa2 bn ttu dim pointer comment-submit-btn ">{"Add Comment"}</button>
            </div>
          </form>

          <div className='commentList'>
            {comments.map((comment) =>
              <ShowComment key={comment.id} comment={comment}/>
            )}
          </div>

        

       </div>
     )   
   }
 }

 //disabled={(this.isSubmittable() ? "" : "disabled")}


// Mutations
const downvotePost = gql`
 mutation addToUserDownvotedPost($userId: ID!, $postId: ID!) {
  addToUserDownvotedPost(usersWhoDownvotedUserId: $userId, downvotedPostPostId: $postId) {
    usersWhoDownvotedUser {
      id
      name
    }
  }
}
`

const upvotePost = gql`
 mutation addToUserUpvotedPost($userId: ID!, $postId: ID!) {
  addToUserUpvotedPost(usersWhoUpvotedUserId: $userId, upvotedPostsPostId: $postId) {
    usersWhoUpvotedUser {
      id
      name
    }
  }
}
`

const createComment = gql`
  mutation createComment($userId: ID!, $postId: ID!, $text: String!) {
    createComment(
      userId: $userId,
      postId: $postId,
      text: $text) {
        id
      }
 }
 `
// Queries
const postUpvotesQuery = gql`
 query postUpvotesQuery($id: ID!){
  Post(id: $id) {
    id
      _usersWhoUpvotedMeta{
        count
      }
  }
}
`
const postDownvotesQuery = gql`
 query postDownvotesQuery($id: ID!){
  Post(id: $id){
     id
      _usersWhoDownvotedMeta{
        count
      }
  }
}
`
const commentQuery = gql`
  query commentQuery($id: ID!){
    Post(id: $id){
      id
       _commentsMeta{
        count 
      }
    }
  }
`

 const userQuery = gql`
 	query userQuery{
 		user {
 			id
 		}
 	}
 `


 export default 
 compose(
    graphql(createComment, { name: 'createCommentMutation' }),
    graphql(upvotePost, {name : 'upvotePostMutation'}),
    graphql(downvotePost,{ name : 'downvotePostMutation'}),
    graphql(userQuery),
    graphql(postUpvotesQuery, {
      options: (ownProps) => ({
          variables: {
            id: ownProps.post.id,
          }
        })
      }),
    graphql(postDownvotesQuery, {
      options: (ownProps) => ({
          variables: {
            id: ownProps.post.id,
          }
        })
      }),
    graphql(commentQuery, {
      options: (ownProps) => ({
          variables: {
            id: ownProps.post.id,
          }
        })
      })
    )
    (DetailPost)
