import React from 'react';

import {
  // constructor function that will initialize connection to the GraphQl API server
  ApolloClient,
  // InMemoryCache enables ApolloClient to cache API response data so requests are more efficient
  InMemoryCache,
  // import ApolloProvider (to provide data to all other components)
  ApolloProvider,
  // Allows us us to control how Apollo Client makes a request
  createHttpLink,
} from '@apollo/client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// establish a new link to GraphQl server@graphql endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// ApolloClient contsructor to instantiate ApolloClient instance and create connection to that API endpoint
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={ client }>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<SearchBooks />} />
          <Route path='/saved' element={<SavedBooks />} />
          <Route path='*' element={<h1 className='display-2'>Wrong page!</h1>} />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
