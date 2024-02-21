import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { signout } from '../store/userSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector((state) => state.user.loggedUser);
    const handleLogout = async () => {
        const res = await axios.get(`http://localhost:8000/api/v1/auth/signout`, {
            withCredentials: true
        });
        if (res.status === 200) {
            dispatch(signout());
        }
    }
    return (
        <div className='bg-gray-100'>
            <div className='flex items-center justify-between mx-20'>
                <span className='text-2xl text-red-700'>InquireHub</span>
                {loggedUser ? <button onClick={handleLogout} className='text-xl text-red-700'>Logout</button> : <Link to='/signin'><button className='text-xl text-red-700'>Sign In</button></Link>}
            </div>
        </div>
    )
}

export default Navbar
