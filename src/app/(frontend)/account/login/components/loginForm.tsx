'use client'

import React, { ReactElement, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import SubmitButton from '@/components/FormFields/SubmitButton'
import { Input } from '@/components/FormFields/Input'
import { login, LoginResponse } from '../../login/actions/login'
import Link from 'next/link'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
import { House } from 'lucide-react'

export default function LoginForm(): ReactElement {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const { setUser } = useUser()
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    startTransition(async () => {
      const result: LoginResponse = await login({ username, password })

      if (result.success && result.user) {
        // state رو بدون refresh آپدیت میکنه
        setUser(result.user)
        router.push('/dashboard')
      } else {
        setError(result.error || 'خطایی رخ داده است')
      }
    })
  }

  return (
    <FormContainer heading={''}>
      <div className="flex flex-col gap-3 mx-auto text-center mb-6">
        <img className="w-16 -mb-2 mx-auto" src="/logo.svg" />
        <div className="flex flex-col">
          <div className="font-black -mb-1 tracking-tighter text-3xl text-blue-900 !tracking-tighter">
            اداره حراست
          </div>
          <div className="font-bold text-slate-600 text-[13.5px]">شرکت پالایش نفت آبادان</div>
        </div>
      </div>
      <form className={`flex flex-col gap-2`} onSubmit={handleSubmit}>
        <Input label={'نام کاربری'} name={'username'} type={'text'} />
        <Input label={'رمز عبور'} name={'password'} type={'password'} />
        {error && <div className={`text-red-400`}>{error}</div>}
        <SubmitButton loading={isPending} text={`ورود`} />
      </form>
      {/* <div className={`mt-4`}>
        <p className={`text-sm text-emerald-950/50`}>
          Don&#39;t have an account?{' '}
          <Link className={`underline underline-offset-4`} href={`/account/create-account`}>
            Create one here.
          </Link>
        </p>
      </div> */}

      <div className="flex flex-col gap-1 mt-4">
        <div className="text-[8px] text-slate-400 w-full mx-auto text-center">
          جهت ارتباط و احیانا فراموشی رمز عبور با ما تماس بگیرید
        </div>
        <div className="text-[12px]  text-slate-400 w-full mx-auto text-center">
          حفاظت فنــــــــــاوری اطلاعات و اسنـــــــاد
        </div>
      </div>
      {
        <div className={`mt-2 text-center mx-auto w-full items-center flex justify-center`}>
          <Link className={`text-slate-400 text-sm`} href={`/`}>
            <House data-lucide="house" size={16} />
          </Link>
        </div>
      }
    </FormContainer>
  )
}
