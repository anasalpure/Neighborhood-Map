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
                            placeholder="search by name or type"
                            autoComplete="true"
                            aria-label="Search for nearby restaurants"
                            onChange={this.props.search}
                            />
                    </div>
                    <button className="btn btn-search">Go</button>
                </div>

                  <ul className="menu">

                    {this.props.locations.map( item=>
                        <li className="menu-item" tabIndex="0" key={item.id} >
                            <a href="#" className="menu-link"  >{item.location.address||'no name'}</a>
                        </li>
                    )}
                

                  </ul>
          </Collapse>


        </Navbar>

        );
    }
}
 
export default NavMenu ;

