import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { 
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink 
  } from '@apollo/client';

const link = createHttpLink({
  uri: "http://localhost:9090"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
       <App />
    </ApolloProvider>
  </React.StrictMode>
);

