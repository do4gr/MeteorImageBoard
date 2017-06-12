import gql from 'graphql-tag';

export default class PostUtils {
	static async requestTags(options) {
		if(options && options.client) {
			var result;
			if(options.tags) {
				result = await options.client.query({
					query: filteredTagsQuery,
					variables: {
						tags: options.tags
					}
				});
			} else {
				result = await options.client.query({query: allTagsQuery});
			}
			console.log(result);
			var tagList = result.data.allTags;
			
			if(options && typeof options.callback == 'function') {
				options.callback(tagList);
			}
			return tagList;
		} else {
			console.warn('there was no client available in the options');
			return undefined;
		}
	}
	
	static async requestOrCreateTags(options) {
		options.client.mutate({
			variables: {
				text: options.text
			}
		}).then((data) => {
			console.log(data);
			options.callback();
		}).catch((exception) => {
			// TODO: handle upload error
			console.log('error uploading the file!');
			options.error(exception);
		});
	}
	
	static async 
}

const allTagsQuery = gql`
	query {
		allTags {
			id
			text
		}
	}
`
const filteredTagsQuery = gql`
	query ($tags: [String!]!){
		allTags (filter: {text_in: $tags}){
			id
			text
		}
	}
`

const createTag = gql`
	mutation ($text: String!) {
		createPost(text: $text)
		{
			id
			text
		}
	}
`
