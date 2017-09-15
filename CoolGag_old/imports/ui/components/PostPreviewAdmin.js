import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {Button} from 'reactstrap';
import PostTitle from './Posts/PostTitle'
import {gql, graphql, compose, fetchPolicy} from 'react-apollo'
import VotingSystemPostAdmin from '/imports/ui/components/VotingSystemPostAdmin';
import VotingCommentPoints from '/imports/ui/components/VotingCommentPoints';
import {Container, Row, Col} from 'reactstrap';
import {Glyphicon} from 'react-bootstrap';

class PostPreviewAdmin extends React.Component {

  static propTypes = {
    post: PropTypes.object,
    data: PropTypes.object
  }

  render() {

    feedImg = null
    if (this.props.post.youtubeID) {
      feedImg = <iframe className='w-100' height="611" src={`https://www.youtube.com/embed/${this.props.post.youtubeID}`} frameBorder="0"></iframe>
    } else {
      feedImg = <img src={this.props.post.postedFile.url} className='w-100'/>
    }

    return (
      <div>
        <Container className="nested">
          <div className='list-container'>
            <Row>
              <Col>
                <div className='pb3'>
                  <PostTitle title={this.props.post.description}/>
                  &nbsp;
                </div>
              </Col>
            </Row>
            <Row>
              <Col >
                <div className="feed-img">
                  <Link to={`/admin/view/${this.props.post.id}`}>
                    {feedImg}
                  </Link>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" className="pt-2">
                <VotingSystemPostAdmin post={this.props.post} user={this.props.data.user}/>
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

export default graphql(userQuery, fetchPolicy : 'network-only')(PostPreviewAdmin)
