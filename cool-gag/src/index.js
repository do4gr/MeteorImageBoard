/* global $ */
import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory, Route, Router} from 'react-router'
import {ApolloClient, ApolloProvider, createNetworkInterface,} from 'react-apollo'
import 'tachyons'
import 'bootstrap/dist/css/bootstrap.css'

import App from './containers/App'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import CreateGroup from './components/groups/CreateGroup'
import CreateUser from './components/CreateUser'
import LoginUser from './components/LoginUser'
import ProfilePage from './components/profile/ProfilePage'
import PublicProfile from './components/PublicProfile'
import Settings from './components/profile/Settings'
import PostPage from './components/SinglePostPage/PostPage'
import PostPageAdmin from './components/SinglePostPage/PostPageAdmin'
import GroupPage from './components/groups/GroupPage'
import HotList from './containers/HotList'
import TrendingList from './containers/TrendingList'
import FreshList from './containers/FreshList'
import ListWithTag from './containers/ListWithTag'
import MyGroups from './containers/groupQueries/MyGroups'
import MyComments from './containers/profileLists/MyComments'
import MyPosts from './containers/profileLists/MyPosts'
import Upvoted from './containers/profileLists/Upvoted'
import Downvoted from './containers/profileLists/Downvoted'
import SearchApp from './components/Search/SearchApp.js'
import AboutPage from './components/about/AboutPage'

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj7ltcl10045u0168nf1b0a44',
})

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      // get the authentication token from local storage if it exists
      if (localStorage.getItem('graphcoolToken')) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem(
          'graphcoolToken',
        )}`
      }
      next()
    },
  },
])

const client = new ApolloClient({ networkInterface: networkInterface })

const NotFound = () => <h3>404.. This page is not found!</h3>

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="createPost" component={CreatePost} />
        <Route path="createPost/:groupId" component={CreatePost} />
        <Route path="createGroup" component={CreateGroup} />
        <Route path="login" component={LoginUser} />
        <Route path="signup" component={CreateUser} />
        <Route path="hotlist" component={HotList} />
        <Route path="trendinglist" component={TrendingList} />
        <Route path="freshlist" component={FreshList} />
        <Route path="tag/:tagText" component={ListWithTag} />
        <Route path="view/:postId" component={PostPage} />
        <Route path="admin/view/:postId" component={PostPageAdmin} />
        <Route path="publicProfile/:userId" component={PublicProfile} />
        <Route path="settings" component={Settings} />
        <Route path="search" component={SearchApp} />
        <Route path="about" component={AboutPage} />
        <Route component={ProfilePage}>
          <Route path="mygroups" component={MyGroups} />
          <Route path="group/:groupId" component={GroupPage} />
          <Route path="myposts" component={MyPosts} />
          <Route path="mycomments" component={MyComments} />
          <Route path="upvoted" component={Upvoted} />
          <Route path="downvoted" component={Downvoted} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
)
