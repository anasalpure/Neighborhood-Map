import React from 'react';
import './navbar.css'
import './search.css'
import Navbar  from './Navbar';
import Collapse from './Collapse'




class NavMenu  extends React.Component {
    constructor(props) {
        super(props);
      
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

      toggle=(event)=> {
        let checked=event.target.checked;
        this.setState({
          isOpen: checked 
        });
      }

 
   


    render() { 

      return ( 
        <Navbar className ="no-select" toggle={this.toggle} >

          <Collapse  isOpen={this.state.isOpen} >
                <div>
                    <label htmlFor="inputField" >Search for</label>
                    <div className="input-wraper">
                            <input className="form-control"
                            id="inputField"
                            placeholder="type yor seadesa"
                            autoComplete="true"
                            aria-label="Search for nearby restaurants"
                            />
                    </div>
                    <button className="btn btn-search">Go</button>
                </div>

                  <ul className="menu">
                      <li className="menu-item" tabIndex="0" >
                          <a href="#" className="menu-link"  >Dubai</a>
                      </li>

                      <li className="menu-item" tabIndex="0">
                          <a href="#" className="menu-link"  >abu dhabi</a>
                      </li>

                      <li className="menu-item" tabIndex="0">
                          <a href="#" className="menu-link"  >Ajman</a>
                      </li>
                  </ul>
          </Collapse>


        </Navbar>

        );
    }
}
 
export default NavMenu ;

