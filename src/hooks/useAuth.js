import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login: (credentials) => dispatch(login(credentials)),
    logout: () => dispatch(logout())
  };
};

export default useAuth;
