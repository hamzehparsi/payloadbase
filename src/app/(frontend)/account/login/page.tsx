import React from 'react'
import LoginForm from './components/loginForm'
import { getUser } from '../../(auth)/actions/getUser'
import { redirect } from 'next/navigation'

interface SearchParams {
  [key: string]: string | undefined
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<React.ReactElement> {
  const { message } = await searchParams
  const user = await getUser()
  if (user) {
    redirect('/dashboard')
  }
  return (
    <div className="w-full mx-auto sm:max-w-sm">
      {message && (
        <div className="flex justify-center mt-8">
          <p className="emerald-950 border-emerald-950 rounded-md">{message}</p>
        </div>
      )}

      <LoginForm />
    </div>
  )
}
