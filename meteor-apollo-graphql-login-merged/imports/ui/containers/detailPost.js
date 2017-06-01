import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import ShowPost from '../components/ShowPost';


var x = window.location.href
x = x.split("#").pop();
console.log(x);

  propTypes = {
    detailQuery: React.PropTypes.func,
  }

state = {
id : x

}
console.log(this.state.id);
detailQuery({variables: {id}})

const detailQuery = gql`query($id = String!) {
  allPosts(filter: {id : $id}) {
    id
    category
    upvotes
	postedFile { url }
    description
  }

}`

export default graphql(detailQuery)(ShowPost);
