import React from 'react';
import './header.css';
import currentLogo from '../../Assets/Images/current.png';

function Header() {
    return (
        <div class="headerSection" id="header">
            <div className="container">
                <div className='header'>
                    <div className='logoImg'>
                        <img src={currentLogo} alt="" />
                    </div>
                </div>
            </div>






        </div>
    )
}
export default Header;