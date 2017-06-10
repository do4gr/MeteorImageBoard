import React from 'react';
import PropTypes from 'prop-types';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class PredefinedMemeSelect extends React.Component {

	static propTypes = {
		router: PropTypes.object,
		mutate: PropTypes.func,
		onSelect: PropTypes.func,
		data: PropTypes.object
	}
	
	constructor(props) {
		super(props);
		this.loadMemes();
	}
	
	state = {
		memesLoaded: false,
		memes: []
	}
	
	
	async loadMemes() {
		const result = await this.props.client.query({
			query: gql`
				query predefinedMemeQuery {
					allPredefinedMemes {
						name
						file {
							url
							secret
						}
					}
				}
			`
		});
		// apply result
		this.setState({
			memes: result.data.allPredefinedMemes,
			memesLoaded: true
		});
	}
	
	render() {
		if (this.props.data && this.props.data.loading) {
			return (<div className={this.props.className ? this.props.className : ""} style={this.props.style ? this.props.style : {}}>Loading</div>)
		}
		
		return (
			<div className={(this.props.className ? this.props.className : "") + ' memeSelect'} style={this.props.style ? this.props.style : {}}>
				{ !this.state.memesLoaded &&
					<span>Loading</span>
				}
				{ this.state.memesLoaded &&
					<div className='memeList'>
						{this.state.memes.map((meme)=>
							<div key={meme.file.secret} className='meme' style={{'backgroundImage': 'url(' + meme.file.url + ')', backgroundPosition: 'center', backgroundSize: 'cover', width: '128px', height: '128px'}} onClick={this.memeSelected.bind(this, meme)}></div>
						)}
					</div>
				}
			</div>
		);
	}
	
	memeSelected(meme) {
		if (this.props.onSelect) {
			this.props.onSelect(meme);
		}
	}
}

export default withApollo(PredefinedMemeSelect)


//const predefinedMemeQuery = gql`
//	query predefinedMemeQuery {
//		memes {
//			name
//			file {
//				url
//				secret
//			}
//		}
//	}
//`;