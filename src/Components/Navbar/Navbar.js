import React from 'react';



const Navbar = ({children ,className, toggle}) => {

  return (
    <nav className={"navbar " +className} role="navigation">

      <a href="#Home" className="logo" ><img src="/assets/logo.png" alt="logo" />  </a>
      <div className="toggler" >
          <input onChange={toggle}   type="checkbox" aria-label="Toggle navigation" role="switch"  />  <span></span>
      </div>

     {children}    

    </nav>
  );
};


export default Navbar;
