import React from 'react'
import Settings from './ProfileSecurity/Settings'
import Security from './ProfileSecurity/Security'

export default function page() {
  return (
    <div className='space-y-5'>
    <Settings/>
    <Security></Security>
    </div>
  )
}
