import React from 'react';
import './navbar.css'
import './search.css'
import Navbar  from './Navbar';
import Collapse from './Collapse'


const VK_ENTER = 13;

class NavMenu  extends React.Component {
    constructor(props) {
      super(props);
    
      this.searchInput = React.createRef();
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

    search=(event)=>{
      //on Enter key press event
      if(event.keyCode == VK_ENTER ) {
        event.preventDefault();
        this.props.search(this.searchInput.current.value);
      } 
    }


    render() { 
      const {locations , select ,search} =this.props;
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
                            ref={this.searchInput}
                            onKeyDown={this.search}
                            />
                    </div>
                    <button className="btn btn-search" onClick={()=>search(this.searchInput.current.value)}>Go</button>
                </div>

                  <ul className="menu">

                    {locations.map( item=>
                        <li className="menu-item" tabIndex="0" key={item.id}
                           onMouseOver={()=>select(item.id)} onClick={()=>select(item.id)} onFocus={()=>select(item.id)} aria-describedby='infoWindow'>
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

