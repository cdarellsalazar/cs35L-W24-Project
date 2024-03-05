import React from 'react';
import { useLogout } from '../hooks/useLogout';

const LogoutButton = () => {
    const { logout, isLoggingOut, error } = useLogout();

    return (
        <div>
            <button onClick={logout} disabled={isLoggingOut}>
                {isLoggingOut ? 'Logging Out...' : 'Log Out'}
            </button>
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default LogoutButton;
