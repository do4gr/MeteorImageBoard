import React from 'react';
import {Link} from 'react-router';
import TagUtils from '../TagUtils';

export default class PostTitle extends React.Component {
	render() {
		return (
			<span>
				{TagUtils.splitByTagsAndRefs(this.props.title).map((element, index)=>{
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
			</span>
		);
	}
}
