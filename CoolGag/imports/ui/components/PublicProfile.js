import React from 'react'
import { withRouter, Redirect } from 'react-router'
import { gql, graphql, compose, withApollo } from 'react-apollo'
import { Button, ButtonGroup } from 'reactstrap'
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import html2canvas from 'html2canvas';
import Popup from 'react-popup';
import ProfilePostListPage from '../components/profile/ProfilePostListPage';



class PublicProfile extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Post: React.PropTypes.object,
    }).isRequired,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  render () {


    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    let points = 0
    if (this.props.data.User.posts){

      {this.props.data.User.posts.map((post) =>
        points = points + post.karmaPoints
      )}


    }
    if (this.props.data.User.downvotedPosts){
      {this.props.data.User.downvotedPosts.map((post) =>
        points = points + 2
      )}
    }
    if (this.props.data.User.upvotedPosts){
      {this.props.data.User.upvotedPosts.map((post) =>
        points = points + 2
      )}
    }
    if (this.props.data.User.comments){
      {this.props.data.User.comments.map((comment) =>
        points = points + 5
      )}
    }

    return (
      <div className="center-text">
        <h1 className="profileName"> {this.props.data.User.name}</h1>
        {this.props.data.User.profilePic && this.props.data.User.profilePic.url &&
          <div className="profileImage">
            <img src={this.props.data.User.profilePic.url} crossOrigin='Anonymous' role='presentation' className='w-100 profilePic'/>
          </div>
        }
        <div>
          Member since {this.props.data.User.createdAt.split("T")[0].split("-")[2]}.{this.props.data.User.createdAt.split("T")[0].split("-")[1]}.{this.props.data.User.createdAt.split("T")[0].split("-")[0]}
        </div>
        <div>
          Karma: {points}
        </div>
        <div className="paddingTopPage">
        <ProfilePostListPage data={this.props.data}/>
        </div>
      </div>
    );

  }

  goBack = () => {
    this.props.router.replace('/')
  }
}

export const PublicPostsQuery = gql`query PublicPostsQuery($userId: ID!){
  User (id: $userId){
    id
    name
    createdAt
    karma
    downvotedPosts{ id }
    upvotedPosts{ id }
    comments{ id }
    profilePic {
      id
      url
    }
    posts(orderBy: createdAt_DESC) {
  id
  user {id,name }
  postedFile { id, url }
  description
  karmaPoints
  category
}

}
}`


const PublicPostsWithData = graphql(PublicPostsQuery, {
  options: (ownProps) => ({
      variables: {
        userId: ownProps.params.userId
      }
    })
  }
)(withRouter(PublicProfile))

export default PublicPostsWithData
