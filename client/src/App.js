import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//apollo stuff
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


import Header from './components/Header';
import Landing from './components/Landing';
import Nav from './components/Nav'

import Cards from './components/Cards';
import Create from './components/Create';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <Nav />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<Landing />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Register />} 
              />
              <Route 
                path="/profile" 
                element={<Cards />} 
              />
            </Routes>
          </div>
          
        </div>
      </Router>
    </ApolloProvider>
  );
}


export default App;


