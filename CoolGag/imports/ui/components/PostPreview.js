import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {Button} from 'reactstrap';
import PostTitle from './Posts/PostTitle'
import {gql, graphql, compose, fetchPolicy} from 'react-apollo'
import VotingSystemPost from '/imports/ui/components/VotingSystemPost';
import {Container, Row, Col} from 'reactstrap';
import { Glyphicon } from 'react-bootstrap';

class PostPreview extends React.Component {

  static propTypes = {
    post: PropTypes.object,
    data: PropTypes.object
  }

	render () {
		return (
			<div>
				<Container className="nested">
          <div className='list-container'>
            <Row>
              <Col>
                <div className='pb3'>
                  <PostTitle title={this.props.post.description} /> &nbsp;
                </div>
              </Col>
            </Row>
            <Row>
              <Col >
                <div className="feed-img">
                  <Link to={`/view/${this.props.post.id}`}>
                    <img src={this.props.post.postedFile.url} className='w-100' />
                  </Link>
                </div>
                { this.props.post.category &&
                  <div className='pt3'>
                    {this.props.post.category}&nbsp;
                  </div>
                }
              </Col>
            </Row>
            <Row>
					
              <Col xs="12" sm="6" >
                <span className='author-tag'>
                  Author:
                  <Link to={`/myposts/`} className="profile-post-link">
                    {this.props.post.user
                      ? this.props.post.user.name
                      : "unknown user"}&nbsp;
                  </Link>
                </span>
		         	</Col>
		         	<Col xs="12" sm="6">
						<div>
			        		<Link to={`/view/${this.props.post.id}`}>
								<Button className="comment-btn"  onClick= {()=>{}}><Glyphicon glyph="comment" /></Button>
							</Link>
			        	</div>
			        </Col>
            </Row>
            <Row>
	        		<Col xs="12" className="pt-2">
	        			<VotingSystemPost post={ this.props.post } user={ this.props.data.user } />
	        		</Col>
	        	</Row>
			</div>
			<hr/>
			</Container>
		</div>
		)
	}
}

const userQuery = gql `
 	query {
 		user {
 			id
 		}
 	}
 `

export default graphql(userQuery, fetchPolicy : 'network-only')(PostPreview)
