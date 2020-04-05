import React from "react";
import BookList from "./components/BookList";
import AddBook from "./components/addBook";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Apollo setup

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main" className="App">
        <h1>Strange's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
