import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from './context/AuthContext'

function ProtectedRoute() {
    const {user, isAuthenticated, loading} = useAuth()

    console.log(loading)

    if(loading) return <h1>Loading...</h1>

    if(!loading && !isAuthenticated) return <Navigate to='/login'/>

    return <Outlet />
}

export default ProtectedRoute
