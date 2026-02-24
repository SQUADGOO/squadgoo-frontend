import { useSelector } from 'react-redux';
import { roleConfig } from '../config/roles';

export const useRole = () => {
  const { user } = useSelector((state) => state.auth);
  
  const currentRole = user?.role || 'super';
  const config = roleConfig[currentRole];
  
  const hasPermission = (permission) => {
    if (config.permissions[0] === 'all') return true;
    return config.permissions.includes(permission);
  };

  return {
    role: currentRole,
    config,
    hasPermission
  };
};

export default useRole;
