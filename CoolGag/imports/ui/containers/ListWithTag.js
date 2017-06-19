import { gql, graphql } from 'react-apollo';
import ListPage from '../components/ListPage';

const WithTagQuery = gql`query($tagText: String!) {
  allPosts(orderBy: createdAt_DESC, filter:{tags_some: {text: $tagText}}) {
    id
	  postedFile { id, url }
    description
	  category
  }
}`

export default graphql(WithTagQuery, {
	options: (ownProps) => (
		{
			variables: {
				tagText: ownProps.params.tagText
			}
		}
	)
})(ListPage);
