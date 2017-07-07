import React from 'react';
import ReactDOM from 'react-dom'
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import {ApolloClient, gql, graphql, ApolloProvider, createNetworkInterface} from 'react-apollo';
import 'tachyons'
import 'bootstrap/dist/css/bootstrap.css';

import App from '../imports/ui/containers/App'
import Home from '../imports/ui/components/Home'
import CreatePost from '../imports/ui/components/CreatePost'
import CreateGroup from '../imports/ui/components/CreateGroup'
import CreateUser from '../imports/ui/components/CreateUser'
import LoginUser from '../imports/ui/components/LoginUser'
import ProfilePage from '../imports/ui/components/profile/ProfilePage'
import PublicProfile from '../imports/ui/components/PublicProfile'


import Settings from '../imports/ui/components/profile/Settings'
import PostPage from '../imports/ui/components/SinglePostPage/PostPage'
import GroupPage from '../imports/ui/components/profile/GroupPage'
import PostPageAdmin from '../imports/ui/components/SinglePostPage/PostPageAdmin'

import HotList from '../imports/ui/containers/HotList'
import TrendingList from '../imports/ui/containers/TrendingList'
import FreshList from '../imports/ui/containers/FreshList'
import KittensList from '../imports/ui/containers/KittensList'
import ListWithTag from '../imports/ui/containers/ListWithTag';
import AdminList from '../imports/ui/containers/AdminList';


import MyGroups from '../imports/ui/containers/profileLists/MyGroups'
import MyComments from '../imports/ui/containers/profileLists/MyComments'
import MyPosts from '../imports/ui/containers/profileLists/MyPosts'
import Upvoted from '../imports/ui/containers/profileLists/Upvoted'
import Downvoted from '../imports/ui/containers/profileLists/Downvoted'
import SearchApp from '../imports/ui/components/Search/SearchApp.js'

const networkInterface = createNetworkInterface({uri: 'https://api.graph.cool/simple/v1/cj2ryvxmbt4qw0160y6qhdgdl'})

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      // get the authentication token from local storage if it exists
      if (localStorage.getItem('graphcoolToken')) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
      }
      next();
    }
  }
])

const client = new ApolloClient({networkInterface: networkInterface});

const NotFound = () => (
  <h3>404.. This page is not found!</h3>
)
//container the listpage to open it with the query of the category you are looking at

//einrücken von
ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path='/' component={Home}/>
        <Route path='createPost' component={CreatePost}/>
        <Route path='createGroup' component={CreateGroup}/>
        <Route path='login' component={LoginUser}/>
        <Route path='signup' component={CreateUser}/>
        <Route path='kittenslist' component={KittensList}/>
        <Route path='hotlist' component={HotList}/>
        <Route path='trendinglist' component={TrendingList}/>
        <Route path='freshlist' component={FreshList}/>
        <Route path='admin' component={AdminList}/>
        <Route path='tag/:tagText' component={ListWithTag}/>
        <Route path='view/:postId' component={PostPageAdmin}/>
        <Route path='admin/view/:postId' component={PostPageAdmin}/>
        <Route path='publicProfile/:userId' component={PublicProfile}/>
        <Route path='settings' component={Settings}/>
        <Route path='search' component={SearchApp}/>
        <Route component={ProfilePage}>
          <Route path='mygroups' component={MyGroups}/>
          <Route path='group/:groupId' component={GroupPage}/>
          <Route path='myposts' component={MyPosts}/>
          <Route path='mycomments' component={MyComments}/>
          <Route path='upvoted' component={Upvoted}/>
          <Route path='downvoted' component={Downvoted}/>
        </Route>
        <Route path='*' component={NotFound}/>
      </Route>
    </Router>
  </ApolloProvider>
), document.getElementById('root'))
