import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Navigation from "./components/Navigation";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Landing from "./pages/Landing";

// import Cards from "./components/Cards";
import Create from "./components/Create";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Delete from "./components/Delete";
import "./App.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home">
                <Route path=":email" element={<Home />} />
                <Route path="" element={<Home />} />
              </Route>
              {/* <Route path="/cards" element={<Cards />} /> */}
              <Route path="/create" element={<Create />} />
              {/* <Route path="/delete" element={<Delete />} /> */}
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Navigation></Navigation>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
