import { 
  getAvatarUrl, 
  generatePassword, 
  formatCurrency, 
  hasPermission 
} from '../../../src/utils/helpers';

describe('Helper Functions', () => {
  describe('getAvatarUrl', () => {
    test('generates correct avatar URL', () => {
      const url = getAvatarUrl('John Doe');
      expect(url).toContain('ui-avatars.com');
      expect(url).toContain('John+Doe');
    });

    test('encodes special characters', () => {
      const url = getAvatarUrl('John & Jane');
      expect(url).toContain('John+%26+Jane');
    });
  });

  describe('generatePassword', () => {
    test('generates password of default length', () => {
      const password = generatePassword();
      expect(password).toHaveLength(8);
    });

    test('generates password of specified length', () => {
      const password = generatePassword(12);
      expect(password).toHaveLength(12);
    });
  });

  describe('formatCurrency', () => {
    test('formats with dollar sign by default', () => {
      expect(formatCurrency(100)).toBe('$100.00');
    });

    test('formats with custom currency', () => {
      expect(formatCurrency(100, '€')).toBe('€100.00');
    });
  });

  describe('hasPermission', () => {
    test('returns true for all permissions', () => {
      expect(hasPermission('super', 'users', ['all'])).toBe(true);
    });

    test('returns true for specific permission', () => {
      expect(hasPermission('support', 'users', ['dashboard', 'users'])).toBe(true);
    });

    test('returns false for missing permission', () => {
      expect(hasPermission('support', 'kyc', ['dashboard', 'users'])).toBe(false);
    });
  });
});
