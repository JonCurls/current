import React, { useState } from 'react';
import Header from './components/Header';
import Landing from './components/Landing';
import Nav from './components/Nav'
import './App.css';
import Cards from './components/Cards';
import Create from './components/Create';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [activeNav, setActiveNav] = useState('home');
  const renderPage = () => {
    if (activeNav === 'home') {
      return <Landing activeNav={activeNav}
      handlePageChange={handlePageChange}></Landing>;
    }
    if (activeNav === 'cards') {
      return <Cards></Cards>
    }
    if (activeNav === 'register') {
      return <Register></Register>
    }
    if (activeNav === 'create') {
      return <Create></Create>
    }
    if (activeNav === 'login') {
      return <Login></Login>
    }


  }
 const handlePageChange = (page) => setActiveNav(page);
  return (
    <>
      <Header></Header>
      <Nav activeNav={activeNav}
       handlePageChange={handlePageChange}></Nav>
      {renderPage()}

    </>
  );
}

export default App;


