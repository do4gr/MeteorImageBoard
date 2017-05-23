import App from '../imports/ui/components/App'
import CreatePost from '../imports/ui/components/CreatePost'
import CreateUser from '../imports/ui/components/CreateUser'
import LoginUser from '../imports/ui/components/LoginUser'
import { Router, Route, browserHistory } from 'react-router'
import 'tachyons'
import ReactDOM from 'react-dom'

import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import Posts from '../imports/ui/containers/Posts';
import Books from '../imports/ui/containers/Books';



const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj2ryvxmbt4qw0160y6qhdgdl' })


networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('graphcoolToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
    }
    next()
  },
}])

const client = new ApolloClient({networkInterface: networkInterface});

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='create' component={CreatePost} />
      <Route path='login' component={LoginUser} />
      <Route path='signup' component={CreateUser} />
      <Route path='books' container={Books} />
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)
