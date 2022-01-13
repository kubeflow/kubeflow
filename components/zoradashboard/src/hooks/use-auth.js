import { useContext } from 'react';
import { AuthContext } from '../contexts/jwt-auth-context';

export const useAuth = () => useContext(AuthContext);
