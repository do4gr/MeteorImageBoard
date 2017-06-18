import React from 'react'
import { Link } from 'react-router';
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import PropTypes from 'prop-types';

import CommentList from 'react-uikit-comment-list'
import {FormGroup, Input, Button, } from 'reactstrap'
import { Glyphicon } from 'react-bootstrap';
import ShowComment from './ShowComment'
import VotingSystemPost from '/imports/ui/components/VotingSystemPost';


 class DetailPost extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
        loading: React.PropTypes.bool,
        error: React.PropTypes.object,
        Post: React.PropTypes.object,
        user: React.PropTypes.object,
     }),
  }

  state = {
     text: '',
  }


   handleComment = () => {
     const userId = this.props.user.id
     const postId = this.props.post.id
     const text   = this.state.text

     this.props.createCommentMutation({
      variables: { userId, postId, text}
     }).then(({ data }) => {
          console.log('got data', data);
        }).catch((error) => {
          console.log('there was an error sending the query', error);
        });
   }

  isSubmittable() {
    if (this.state.text != ''){
      return true;
    }else{
      return false;
    }
  }

  handleSubmit=(event)=>{
   this.props.router.replace('/view/'+ postId);
  }


   render () {
    console.log(this.props);

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

     const comments = this.props.post.comments;
     return (
       <div className="detailPost-view">
         <div className='pt3'>
           Description: {this.props.post.description ? this.props.post.description: "-" }&nbsp;
         </div>
         <div >
          <img src={`${this.props.post.postedFile.url}`} className="post-img w-100" />
        </div>
         <span className='author-tag'>
            Author:
            <Link to={`/myposts/`} className="profile-post-link">
               {this.props.post.user ? this.props.post.user.name: "unknown user"}&nbsp;
           </Link>
         </span>

          <VotingSystemPost post={this.props.post} user={this.props.user} />
           <div className='pt3'>
         <b>Comments </b>
         </div>
         <hr className="hr-comment"/>
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                  <Input type="textarea" value={this.state.text} onChange={(e) => this.setState({text: e.target.value})} placeholder="write comments..." name="text" id="comment-form" className="w-100"/>
              </FormGroup>
              <div>
               <button type="submit"  disabled={this.isSubmittable() ? '' : 'disabled'} onClick={this.handleComment} className="pa2 bn ttu dim pointer comment-submit-btn ">{"Add Comment"}</button>
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


// Mutations
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
    graphql(userQuery),
    )
    (DetailPost)
