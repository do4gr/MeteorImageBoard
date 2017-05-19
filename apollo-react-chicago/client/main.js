import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
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

render(
  <ApolloProvider client={ client }>
    <Books />
  </ApolloProvider>,
  document.getElementById('react-root')
);
