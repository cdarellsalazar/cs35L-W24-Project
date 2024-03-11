import { useState, useEffect } from 'react';

const useFetchUserById = (userId) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/user/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, isLoading, error };
};

export default useFetchUserById;