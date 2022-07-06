import React, { useState } from 'react';
import Header from './components/Header';
import Landing from './components/Landing';
import Nav from './components/Nav'
import './App.css';
import Cards from './components/Cards';
import Create from './components/Create';

function App() {
  const [activeNav, setActiveNav] = useState('home');
  const renderPage = () => {
    if (activeNav === 'home') {
      return <Landing></Landing>;
    }
    if (activeNav === 'cards') {
      return <Cards></Cards>
    }
    if (activeNav === 'create') {
      return <Create></Create>
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


