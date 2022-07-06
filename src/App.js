import React, { useState } from 'react';
import Header from './components/Header';
import Landing from './components/Landing';
import Nav from './components/Nav'
import './App.css';
import Cards from './components/Cards';

function App() {
  const [activeNav, setActiveNav] = useState('home');
  const renderPage = () => {
    if (activeNav === 'home') {
      return <Landing></Landing>;
    }
    if (activeNav === 'cards') {
      return <Cards></Cards>
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


