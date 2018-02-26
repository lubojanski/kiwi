import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new HttpLink({ uri: 'https://graphql.kiwi.com/' })

const client = new ApolloClient({
    link: httpLink,
    connectToDevTools: true,
    cache: new InMemoryCache()
  })

ReactDOM.render(
    <ApolloProvider client={client}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
