// Role Definitions
export const ROLES = {
  SUPER_ADMIN: 'super',
  SUPPORT: 'support',
  COMPLIANCE: 'compliance',
  FINANCE: 'finance',
  CONTENT_MANAGER: 'content',
  TECHNICAL: 'technical'
};

// Role Display Names
export const ROLE_DISPLAY_NAMES = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.SUPPORT]: 'Support Agent',
  [ROLES.COMPLIANCE]: 'Compliance Officer',
  [ROLES.FINANCE]: 'Finance Manager',
  [ROLES.CONTENT_MANAGER]: 'Content Manager',
  [ROLES.TECHNICAL]: 'Technical Admin'
};

// Role Configurations
export const ROLE_CONFIG = {
  [ROLES.SUPER_ADMIN]: {
    name: 'Super Admin',
    email: 'admin@squadgoo.com',
    avatar: 'Super+Admin',
    permissions: ['all']
  },
  [ROLES.SUPPORT]: {
    name: 'Support Agent',
    email: 'support@squadgoo.com',
    avatar: 'Support+Agent',
    permissions: ['dashboard', 'users', 'support', 'chat']
  },
  [ROLES.COMPLIANCE]: {
    name: 'Compliance Officer',
    email: 'compliance@squadgoo.com',
    avatar: 'Compliance',
    permissions: ['dashboard', 'kyc', 'disputes', 'settings-legal']
  },
  [ROLES.FINANCE]: {
    name: 'Finance Manager',
    email: 'finance@squadgoo.com',
    avatar: 'Finance',
    permissions: ['dashboard', 'wallet', 'analytics', 'settings-fees']
  }
};

// Permission Structure
export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: 'dashboard:view',
  VIEW_ANALYTICS: 'analytics:view',
  
  // Users
  VIEW_USERS: 'users:view',
  CREATE_USER: 'users:create',
  EDIT_USER: 'users:edit',
  DELETE_USER: 'users:delete',
  SUSPEND_USER: 'users:suspend',
  
  // KYC
  VIEW_KYC: 'kyc:view',
  REVIEW_KYC: 'kyc:review',
  APPROVE_KYC: 'kyc:approve',
  REJECT_KYC: 'kyc:reject',
  
  // Jobs
  VIEW_JOBS: 'jobs:view',
  CREATE_JOB: 'jobs:create',
  EDIT_JOB: 'jobs:edit',
  DELETE_JOB: 'jobs:delete',
  
  // Wallet
  VIEW_TRANSACTIONS: 'wallet:transactions:view',
  MANAGE_WITHDRAWALS: 'wallet:withdrawals:manage',
  MANAGE_ESCROW: 'wallet:escrow:manage',
  PROCESS_REFUNDS: 'wallet:refunds:process',
  
  // Disputes
  VIEW_DISPUTES: 'disputes:view',
  MANAGE_DISPUTES: 'disputes:manage',
  RESOLVE_DISPUTES: 'disputes:resolve',
  
  // Support
  VIEW_TICKETS: 'support:tickets:view',
  MANAGE_TICKETS: 'support:tickets:manage',
  LIVE_CHAT: 'support:chat:live',
  MANAGE_FAQ: 'support:faq:manage',
  
  // Notifications
  SEND_NOTIFICATIONS: 'notifications:send',
  MANAGE_TEMPLATES: 'notifications:templates:manage',
  
  // Content
  MANAGE_CONTENT: 'content:manage',
  MANAGE_MEDIA: 'content:media:manage',
  
  // Staff
  VIEW_STAFF: 'staff:view',
  CREATE_STAFF: 'staff:create',
  EDIT_STAFF: 'staff:edit',
  DELETE_STAFF: 'staff:delete',
  MANAGE_ROLES: 'staff:roles:manage',
  
  // Settings
  VIEW_SETTINGS: 'settings:view',
  EDIT_SETTINGS: 'settings:edit',
  MANAGE_FEES: 'settings:fees:manage',
  MANAGE_LEGAL: 'settings:legal:manage',
  
  // Security
  VIEW_LOGS: 'security:logs:view',
  MANAGE_2FA: 'security:2fa:manage'
};

// Helper Functions
export const getRoleConfig = (role) => ROLE_CONFIG[role] || ROLE_CONFIG[ROLES.SUPPORT];

export const hasPermission = (role, permission) => {
  const config = ROLE_CONFIG[role];
  if (!config) return false;
  if (config.permissions.includes('all')) return true;
  return config.permissions.includes(permission);
};

export const getRoleDisplayName = (role) => ROLE_DISPLAY_NAMES[role] || role;
