import React from 'react'
import { LoginForm } from '@/components/login-form'

const Login = () => {
  return (
    <section className='min-h-screen flex-center'>
      <div className='lg:w-1/3 w-full bg-white h-screen lg:block flex-center'><LoginForm/></div>
      <div className="bg-[url(/assets/loginImage.jpg)] bg-no-repeat bg-center bg-cover w-full h-screen lg:block hidden" />
    </section>
  )
}

export default Login