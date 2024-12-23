import { useState, useEffect } from 'react';
import { jwtDecode} from 'jwt-decode';


export const useCurrentUser = () => {
    const [userId, setUserId] = useState<string | null>(null);
  
    useEffect(() => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const decoded = jwtDecode(token) as { id: string };
          setUserId(decoded.id);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem('authToken');
      } 
    }, []);
  
    return userId ;
  };

