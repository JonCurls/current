import React from "react";
import './nav.css';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import {RiNumber1} from 'react-icons/ri'
import {RiNumber2} from 'react-icons/ri'
import {RiNumber3} from 'react-icons/ri'
import {RiNumber4} from 'react-icons/ri'


function Nav(){
    
    return(
        <nav>

            <a href="/" ><RiNumber1/></a>
           <a href="/profile" ><RiNumber2/></a>
           
  
            
        </nav>
    );
}

export default Nav;