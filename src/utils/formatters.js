// Date formatters
export const formatters = {
  // Short date: Jan 15, 2026
  shortDate: (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  },
  
  // Long date: January 15, 2026
  longDate: (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  },
  
  // Time: 2:30 PM
  time: (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  // DateTime: Jan 15, 2026 2:30 PM
  dateTime: (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  // Currency: $1,234.56
  currency: (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  },
  
  // Number: 1,234
  number: (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  },
  
  // Percentage: 12.5%
  percent: (num) => {
    return `${num.toFixed(1)}%`;
  },
  
  // Compact number: 1.2K, 1.5M
  compactNumber: (num) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(num);
  }
};
