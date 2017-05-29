import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreatePost extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object,
  }

  state = {
    description: '',
    imageUrl: '',
    category: '',   //this is an enum, options need to be loaded from enum properties
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if no user is logged in
    if (!this.props.data.user) {
      console.warn('only logged in users can create new posts')
      this.props.router.replace('/')
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.description}
            placeholder='Description'
            onChange={(e) => this.setState({description: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.category}
            placeholder='Category -> Try KITTENS or WTF'
            onChange={(e) => this.setState({category: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.imageUrl}
            placeholder='Image Url'
            onChange={(e) => this.setState({imageUrl: e.target.value})}
          />
					<input type='file' class='w-100 pa3 mv2' accept="image/*"
						onChange={this.handleFileSelect.bind(this)}
						onClick={(event)=> { 
							event.target.value = null;
						}}
					/>
          {this.state.imageUrl &&
            <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
          }
          {this.state.description && this.state.imageUrl &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePost}>Post</button>
          }
        </div>
      </div>
    )
  }

  handlePost = () => {
    const {description, imageUrl, category} = this.state
    this.props.mutate({variables: {description, imageUrl, category}})
      .then(() => {
        this.props.router.replace('/')
      })
  }

	handleFileSelect(event) {
		if(event.target.files.length >= 1) {
			var self = this;
			var fileUploadSucceded = function (response) {
				response.json().then(result => {
					console.log(result.url);
					self.setState({imageUrl: result.url});
				});
			}
			// TODO: handle upload error
			var fileUploadFailed = function(response) {
				console.log('file upload failed!');
			}
			
			var file = event.target.files[0];
			
			//'https://api.graph.cool/file/v1/cj2ryvxmbt4qw0160y6qhdgdl';
			let data = new FormData();
			data.append('data', file);
			// TODO: upload image
			//return (dispatch) => {
			fetch('https://api.graph.cool/file/v1/cj2ryvxmbt4qw0160y6qhdgdl', {
				body: data,
				method: 'POST'
			}).then(fileUploadSucceded);
			//};
		}
	}
}

const createPost = gql`
  mutation ($description: String!, $imageUrl: String!, $category: POST_CATEGORY!) {
    createPost(description: $description, imageUrl: $imageUrl, category: $category) {
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

export default graphql(createPost)(
  graphql(userQuery, { options: { forceFetch: true }} )(withRouter(CreatePost))
)
