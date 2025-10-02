import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { getUser } from './actions/getUser'
import { LogoutButton } from './components/LogoutButton'

const Template: React.FC<{ children: ReactNode }> = async ({ children }) => {
  const user = await getUser()
  if (!user) {
    // if there's no user, we can redirect the browser back to the login route
    redirect('/account/login')
  }
  // if there is, we can show the page content
  return (
    <>
      <div className={`bg-emerald-500 p-4 flex justify-between`}>{/* <LogoutButton /> */}</div>
      {children}
    </>
  )
}

export default Template
