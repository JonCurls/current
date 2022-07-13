import React from "react";
import "./header.css";
import currentLogo from "../../Assets/Images/current.png";

function Header() {
  return (
    <div className="headerSection" id="header">
      <div className="container headerContainer">
        <div className="header">
          <div className="logoImg">
            <a href="/">
              <img src={currentLogo} alt="logo" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
