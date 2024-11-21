import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { setContext } from '@apollo/client/link/context';


const authLink = setContext((_, { headers }) => {
  // check if there is an TOKEN in localStorage
  const token = localStorage.getItem('id_token');

  // adding the TOKEN (if exists to the headers being sent)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = createHttpLink({
  uri: '/graphql',
})

// Set up our ApolloClient instance
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  function App() {
    return (
      <ApolloProvider client={client}>
        <Navbar />
        <Outlet />
      </ApolloProvider>
    );
  }
  
  export default App;