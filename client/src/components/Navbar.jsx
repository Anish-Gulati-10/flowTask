import React from 'react'
import { Button } from './ui/button'
import { CircleUserRound } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/store/slices/authSlice'

const Navbar = () => {
    const { username } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        dispatch(logout())
    }

  return (
    <nav className='w-full h-20 shadow-sm border-b px-2 md:px-10 sm:px-5 py-2 flex justify-between items-center bg-background'>
        <div className='text-2xl font-bold'>Flow Task</div>
        <div className='flex items-center'>
            <CircleUserRound />
            <span className='text-base font-semibold sm:ml-2 ml-1 sm:mr-4 mr-2'>{username}</span>
            <Button onClick={handleLogout}>Sign out</Button>
        </div>
    </nav>
  )
}

export default Navbar