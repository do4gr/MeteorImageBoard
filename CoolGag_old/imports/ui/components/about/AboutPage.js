import React from 'react'
import { gql, graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import {Container, Row, Col} from 'reactstrap'
import { Jumbotron } from 'reactstrap';
import ShowContributor from './ShowContributor'

class AboutPage extends React.Component {

	static propTypes = {
    	data: PropTypes.object.isRequired
  	}

  	render () {
  		//console.log(this.props)
  		return (
		  	<div>
		  		<Row>
		  			<Col  sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }}>
		  				<Jumbotron>
		  					<h1 style={{color:'dimgrey'}}> About </h1>
		  				</Jumbotron>
		  			</Col>
		  		</Row>
		  		<Row>
		  			<Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} ><h2>Our Team</h2></Col>
		  		</Row>
		  		<Row>
		  			<Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }}>
				  		{this.props.data.allContributors && this.props.data.allContributors.map((contributor) =>
		                  <ShowContributor key={contributor.id} contributor={contributor}/>)
		              	}
	              	</Col>
	            </Row>
		  		<Row>
		  			<Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} ><h2>Disclaimer</h2></Col>
		  		</Row>
		  		<Row>
		  			<Col sm="12" md={{ size: 8, offset: 2 }} lg={{ size: 8, offset: 2 }} xl={{ size: 8, offset: 2 }} >
		  				<p>	This Website is provided by the contributors stated above and was developed as a student project for Technische Universität Berlin. This product is supplied "AS IS" without any warranties and support.
							We assume no responsibility or liability for the use of the software, conveys no license or title under any patent, copyright, or mask work right to the product.
							We reserves the right to make changes in the software without notification. We also make no representation or warranty that such application will be suitable for the specified use without further testing or modification.</p>
		  			</Col>
		  		</Row>

		  	</div>
		)
  	}
}
 
export const contributorQuery = gql `query {
		allContributors{
			id
			text
			user{
				name
				id
				profilePic { id, url }
			}
		}

 	}
 `
export default graphql(contributorQuery)(AboutPage);

