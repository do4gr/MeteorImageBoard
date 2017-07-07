import React from 'react'
import ProfileHeader from './ProfileHeader'
import Nav from '../Nav'


export default function App(props) {
  return (
    <div >
      <div className='profile-page fixed-nav'>
        <ProfileHeader />
      </div>
      <div className='profile-body'>
        {props.children}
      </div>
    </div>
  )
}
