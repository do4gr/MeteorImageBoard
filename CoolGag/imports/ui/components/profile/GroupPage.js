import React from 'react'
import PostPreview from '../PostPreview'
import { gql, graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import MyGroups from '/imports/ui/components/profile/MyGroupsList'
import { Button,Label } from 'reactstrap'
import {Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router';
// import GroupMembers from '/imports/ui/components/profile/GroupMembers'
// import GroupPosts from '/imports/ui/components/profile/GroupPosts'
import { GroupPostsQuery } from '/imports/ui/containers/profileLists/GroupPostsQuery'


class GroupPage extends React.Component{
	static propTypes = {
    	data: PropTypes.object,
    	router: React.PropTypes.object.isRequired,
    	params: React.PropTypes.object.isRequired,
  	}

	render(){
		console.log(this.props)
		if (this.props.data.loading) {
  			return (<div>Loading</div>)
		}

    	if (this.props.data.error) {
      		console.log(this.props.data.error)
      		return (<div>An unexpected error occurred</div>)
		}
		
		return(
			
			<div>
		{/*
				<GroupMembers data={this.props.data} />
				<GroupPosts data={this.props.data} />
		*/}
			</div>
			)
	}


}


const GroupPageWithData = graphql(GroupPostsQuery, {
  options: (ownProps) => ({
      variables: {
        groupId: ownProps.params.groupId
      }
    })
  }
)(withRouter(GroupPage))

export default GroupPageWithData