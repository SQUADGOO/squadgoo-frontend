// Generate avatar URL
export const getAvatarUrl = (name, background = '6366f1', color = 'fff') => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${background}&color=${color}`;
};

// Generate random password
export const generatePassword = (length = 8) => {
  return Math.random().toString(36).slice(-length);
};

// Format currency
export const formatCurrency = (amount, currency = '$') => {
  return `${currency}${parseFloat(amount).toFixed(2)}`;
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format relative time
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / 60000);
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
  return `${Math.floor(diffInMinutes / 1440)} days ago`;
};

// Check permission
export const hasPermission = (userRole, sectionId, permissions) => {
  if (permissions[0] === 'all') return true;
  return permissions.some(p => sectionId === p || sectionId.startsWith(p));
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
