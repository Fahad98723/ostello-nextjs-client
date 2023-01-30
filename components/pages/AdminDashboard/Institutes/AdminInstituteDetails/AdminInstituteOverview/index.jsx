import React from 'react'
import BankingDetails from './BankingDetails'
import BasicDetails from './BasicDetails'
import Faculty from './Faculty'
import ManageLocations from './ManageLocations'
import ManageMedia from './ManageMedia'
import OwnerDetails from './OwnerDetails'
import YourServices from './YourServices'

export default function AdminInstituteOverview() {
  return (
    <div>
      <BasicDetails />
      <ManageLocations />
      <YourServices />
      <OwnerDetails />
      <ManageMedia />
      <Faculty />
      <BankingDetails />
    </div>
  )
}
