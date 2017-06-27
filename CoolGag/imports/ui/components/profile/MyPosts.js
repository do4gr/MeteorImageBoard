import React from 'react'
import { withRouter } from 'react-router'
import { gql, graphql } from 'react-apollo'
import ProfilePostListPage from '../../components/profile/ProfilePostListPage';

class MyPosts extends React.Component {

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

    return (
      <ProfilePostListPage/> ÜBERGABE DER ID BLÖABLA AN DEN NÄCHSTEN CONTROLLER!!
    )
  }

  goBack = () => {
    this.props.router.replace('/')
  }
}

const MyPostsQuery = gql`query MyPostsQuery($id : ID!){
    User(id: $id){
        id
        posts(orderBy: createdAt_DESC) {
            id
        	  postedFile {id,  url }
            description
        }
    }
}`


const MyPostsWithData = graphql(MyPostsQuery, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.userId
    }
  })
})(withRouter(ProfilePostListPage))



export default MyPostsWithData
