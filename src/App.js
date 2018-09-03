import React from 'react'
import './App.css'
import NavMenu from './Components/Navbar/NavMenu'


class BooksApp extends React.Component {



  render() {
  
    return (
      <div className="app">
            <NavMenu/>
      </div>
    )
  }
}

export default BooksApp
