import React from "react";
import './nav.css';
import {RiNumber1} from 'react-icons/ri'
import {RiNumber2} from 'react-icons/ri'
import {RiNumber3} from 'react-icons/ri'
import {RiNumber4} from 'react-icons/ri'


function Nav({handlePageChange, activeNav}){
    
    return(
        <nav>

            <a  onClick={() => handlePageChange('home')} className={activeNav === 'home' ? 'active' : ''} ><RiNumber1/></a>
           <a  onClick={() => handlePageChange('cards')} className={activeNav === 'cards' ? 'active' : ''}><RiNumber2/></a>
  
            
        </nav>
    );
}

export default Nav;