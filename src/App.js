import React from 'react'
import './App.css'
import NavMenu from './Components/Navbar/NavMenu'
import Map from './Components/Map/Map'

class BooksApp extends React.Component {



  render() {
  
    return (
      <div className="app">
            <NavMenu/>
            <Map />
      </div>
    )
  }
}

export default BooksApp
