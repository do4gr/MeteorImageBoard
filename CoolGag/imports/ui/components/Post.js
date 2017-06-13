import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import TagUtils from './TagUtils';


export default class Post extends React.Component {
	
	static propTypes = {
		post: PropTypes.object,
	}
	
	render () {
		return (
			<div className='pa2 bg-black-05 ma2'>
				<div className='pb3'>
					{TagUtils.splitByTagsAndRefs(this.props.post.description).map((element, index)=>{
						if (element.type == 'tag') {
							return (
								<Link key={index} to={`/tag/${element.text}`}>#{element.text}</Link>
							);
						} else if(element.type == 'ref') {
							return (<a href="javascript:void();" key={index}>@{element.text}</a>);
						} else {
							return element.text;
							//return (<span key={index}>{element.text}</span>)
						}
					})}
					&nbsp;
				</div>
				<Link to={`/view/${this.props.post.id}`}>
					<img src={this.props.post.postedFile.url} className='w-100' />
				</Link>
				{ this.props.post.category &&
					<div className='pt3'>
						{this.props.post.category}&nbsp;
					</div>
				}
			</div>
		)
	}
}
