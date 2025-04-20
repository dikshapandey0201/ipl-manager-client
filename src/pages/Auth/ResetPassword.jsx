import React from 'react'
import { IconButton } from '@mui/material'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { useState } from 'react'
import { resetPassword } from '../../api/UserApi/UserAuthApi'
import { useNavigate, useParams } from 'react-router-dom'


export default function ResetPassword() {
    const { token } = useParams();
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!password || !confirmPassword) {
            alert("Please fill in all fields!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        
        setLoading(true);
        resetPassword(password,token )
            .then(response => {
                alert("Password reset successfully!");
                navigate('/user-login');
            })
            .catch(error => {
                alert("Error resetting password: ");
                setLoading(false);
                navigate('/forgot-password');
            });
      }


  return (
    <div className='flex flex-col items-center justify-center h-[86.7vh] bg-gray-100'>
        <form className='w-96' onSubmit={handleSubmit}>
            <h1 className='mb-5 text-center font-semibold text-2xl'>Reset Password</h1>
            <div className='mb-4'>
            <input
                type='password'
                id='password'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='New Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className='mb-4 relative'>
            <input
                type={showPassword ? 'text' : 'password'}
                id='confirm-password'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <IconButton
              className="!absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon sx={{ color: "gray" }} />
              ) : (
                <VisibilityOutlinedIcon sx={{ color: "gray" }} />
              )}
            </IconButton>
            </div>
            <button
            type='submit'
            className={`${loading? "opacity-50 cursor-not-allowed":""} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full cursor-pointer`}
            disabled={loading}
            >
            {loading ? "Loading..." : "Reset Password"}
            </button>
        </form>
      
    </div>
  )
}
