import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setIsLoggingOut(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:4000/api/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to log out');
            }
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            setError(error.message);
        }

        setIsLoggingOut(false);
    };
    return { logout, isLoggingOut, error };
};