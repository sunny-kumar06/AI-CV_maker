import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import CareerAILoader from '../../../components/CareerAILoader';

function Protected({ children }) {
    const { loading, user } = useAuth();

    if (loading) {
        return <CareerAILoader text="Preparing your career workspace..." />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default Protected;