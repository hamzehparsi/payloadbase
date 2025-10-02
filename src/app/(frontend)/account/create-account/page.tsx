import CreateForm from './components/createForm'
import { getUser } from '../../(auth)/actions/getUser'
import { redirect } from 'next/navigation'
import React from 'react'
export default async function CreateAccount(): Promise<React.ReactElement> {
  const user = await getUser()
  if (user) {
    redirect('/dashboard')
  }
  return (
    <div>
      <CreateForm />
    </div>
  )
}
