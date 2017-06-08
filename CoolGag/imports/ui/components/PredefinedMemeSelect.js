import React from 'react';
import PropTypes from 'prop-types';

export default class PredefinedMemeSelect extends React.Component {

	static propTypes = {
		router: PropTypes.object,
		mutate: PropTypes.func,
		data: PropTypes.object
	}
	
	state = {
		data: {
			predefinedMemes: [
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0gr2m004801113hmrbldx', secret: 'cj3n0gr2m004801113hmrbldx'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0g9oy003s0155vvzu6n1a', secret: 'cj3n0g9oy003s0155vvzu6n1a'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0fx8x003o0155uw8jopoh', secret: 'cj3n0fx8x003o0155uw8jopoh'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0flae003k0155wkbynrd7', secret: 'cj3n0flae003k0155wkbynrd7'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0ff5300440111nk0kc090', secret: 'cj3n0ff5300440111nk0kc090'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0f9m800410111igadlz61', secret: 'cj3n0f9m800410111igadlz61'}},
				{file: {url: 'https://files.graph.cool/cj2ryvxmbt4qw0160y6qhdgdl/cj3n0ez69003x0111i23pxafm', secret: 'cj3n0ez69003x0111i23pxafm'}}
			]
		}
	}
	
	render() {
		if (this.props.data && this.props.data.loading) {
			return (<div>Loading</div>)
		}
		
		console.log(this.state.data.predefinedMemes,this.state.data.predefinedMemes.length);
		
		return (
			<div>
				{this.state.data.predefinedMemes.map((meme)=>
					<div style={{'backgroundImage': 'url(' + meme.file.url + ')', backgroundPosition: 'center', backgroundSize: 'cover', width: '128px', height: '128px'}} onClick={this.memeSelected.bind(this, meme)}></div>
				)}
			</div>
		);
	}
	
	memeSelected(meme) {
		if (this.props.onSelect) {
			this.props.onSelect(meme);
		}
	}
}