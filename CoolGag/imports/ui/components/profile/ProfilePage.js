import React from 'react'
import ProfileHeader from './ProfileHeader'
import Nav from '../Nav'


export default function App(props) {
  return (
    <div >
      <div className='profile-page'>
        <ProfileHeader />
      </div>
      <div className='nav-personal-lists'>
        {props.children}
      </div>
    </div>
  )
}
