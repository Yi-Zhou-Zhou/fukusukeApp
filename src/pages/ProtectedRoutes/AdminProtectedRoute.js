import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import jwt_decode from 'jwt-decode'


const AdminProtectedRoute = () => {
    let auth = {token: false}
    const user_token = localStorage.getItem('token')
    if (user_token && jwt_decode(user_token).role === 'admin') auth.token = true;
    return(
        auth.token ? <Outlet/> : <Navigate to='/' />
    )
};

export default AdminProtectedRoute