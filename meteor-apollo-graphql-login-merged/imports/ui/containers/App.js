import React from 'react'
import Nav from '../components/Nav'


export default function App(props) {
  return (
    <div className='app'>
      <div className='header'>
        <Nav />
      </div>

      <div className='body'>
        {props.children}
      </div>
    </div>
  )
}
