import React from 'react'
import './style.scss';
import Logo from "../../assets/logo.png";
import Profile from "../../assets/profile.jpg";
import TemporaryDrawer from '../sidebar/TemporaryDrawer';

function NavbarSection() {

  return (
    <>
      <div className='navbar'>
      <TemporaryDrawer/>
        <div  className="logo">
          <img src={Logo}/>
        </div>
        
        <div className="navPages">
          <img src={Profile} alt="" />
        </div>
      </div>
    </>
  )
}

export default NavbarSection;