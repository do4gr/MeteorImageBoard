import React from 'react'
import Profile from '../components/Profile'


export default function App(props) {
  return (
    <div className='profile-page'>
      <div className='profile-header'>
        <Profile />
      </div>

      <div className='nav-personal-lists'>
        {props.children}
      </div>
    </div>
  )
}
