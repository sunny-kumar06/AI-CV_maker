
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import React from 'react'

function Protected({ children }) {
    const { loading, user } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Protected