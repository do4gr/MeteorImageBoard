import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { gql, graphql, compose, withApollo, fetchPolicy } from 'react-apollo';
import { Button, ButtonGroup } from 'reactstrap'
import {Container, Row, Col} from 'reactstrap';



class PostYoutube extends React.Component {

  static propTypes = {
    router: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    group: PropTypes.object
  }

  state = {
    description: '',
    youtubeLink: '',
    isSubmitting: false,
    isRendering: false,
    postedFileId: '',
    userId: '',
  }

  render () {
    console.log(this.props)
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if no user is logged in
    if (!this.props.data.user) {
      console.warn('only logged in users can create new posts')
      this.props.router.replace('/')
    }

    return (
			<div>
				<Container className="nested">
					<Row>
						<Col sm="12" md={{ size: 10, offset: 1 }} lg={{ size: 8, offset: 2 }} xl={{ size: 7, offset: 2.5 }}>
              <form className='' onSubmit={this.onPostClicked.bind(this)}>
                <input
                  className='w-100 pa3 mv2'
                  value={this.state.description}
                  placeholder='Description'
              onChange={(e) => {this.setState({description: e.target.value});}}
            />
            <input
              className='w-100 pa3 mv2'
              placeholder='Link... Please provide https://www.youtube.com/watch?v=ID format'
              onChange={(e) => this.setState({youtubeLink: e.target.value})}
            />
            <Button type="submit" disabled={(!this.isSubmittable())} className={'pa3 bn ttu pointer btn-normal' + (this.isSubmittable() ? "btn-normal bg-black-10 dim" : " black-30 bg-black-05 disabled")}>
              {this.state.isSubmitting ? (this.state.isRendering ? 'Rendering...' : 'Submitting ...') : 'Post'}
            </Button>
            </form>
						</Col>
					</Row>
				</Container>
			</div>
		)


  }
  onPostClicked(event) {
    console.log("HellO!");
		event.preventDefault();
		this.handlePost();
	}

  isSubmittable() {
    return (this.state.description) && (this.state.youtubeLink) && (!this.state.isSubmitting);
  }

  async handlePost() {

    const description = this.state.description;
    const userId = this.props.data.user.id;
    const tags = null;

		this.setState({'isSubmitting': true});
    console.log("Handling Post!");


    var url = this.state.youtubeLink
    var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if(videoid != null) {
       console.log("video id = ",videoid[1]);
       const youtubeID = videoid[1];
       console.log(typeof videoid[1]);

       this.props.createPostMutation({
   				variables: {
            description: description,
            userId: userId,
            youtubeID: youtubeID,
            groupId: this.props.group.groupId != null ? this.props.group.groupId : null },
        }).then((result) => {
          // TODO(rw): check, if the reference adding worked
          //for(var i = 0; i < promisses.length; i++) {
          //  await promisses[i];
          //}
          if(this.props.group.groupId != null){
            // const groupId = this.props.params.groupId;
            this.props.router.replace('/mygroups/');

          }else{
            this.props.router.replace('/');
          }
        });

        return


    } else {
        console.log("The youtube url is not valid.");
        this.setState({'isSubmitting': false});

        return
    }
		// TODO(rw): clean up
  }
}



const userQuery = gql`
	query {
		user {
			id
		}
	}
`

const createPost = gql`
	mutation ($description: String!,  $userId: ID!, $youtubeID: String!, $groupId: ID) {
		createPost(
			description: $description,
			userId: $userId,
			youtubeID : $youtubeID,
      groupId: $groupId
    )
		{
			id
			postedFile { id }
		}
	}
`


export default compose(
  graphql(createPost, {
        name: "createPostMutation"

      }),
  graphql(userQuery, fetchPolicy: "network-only" )
)(withApollo(withRouter(PostYoutube)))
