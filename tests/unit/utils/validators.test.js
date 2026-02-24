import { 
  isValidEmail, 
  isValidPhone, 
  getPasswordStrength,
  isRequired 
} from '../../../src/utils/validators';

describe('Validator Functions', () => {
  describe('isValidEmail', () => {
    test('returns true for valid email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
    });

    test('returns false for invalid email', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    test('returns true for valid phone', () => {
      expect(isValidPhone('+1234567890')).toBe(true);
    });

    test('returns false for invalid phone', () => {
      expect(isValidPhone('123')).toBe(false);
    });
  });

  describe('getPasswordStrength', () => {
    test('returns low strength for weak password', () => {
      expect(getPasswordStrength('123')).toBeLessThan(3);
    });

    test('returns high strength for strong password', () => {
      expect(getPasswordStrength('StrongP@ssw0rd!')).toBeGreaterThan(3);
    });
  });

  describe('isRequired', () => {
    test('returns true for non-empty string', () => {
      expect(isRequired('test')).toBe(true);
    });

    test('returns false for empty string', () => {
      expect(isRequired('')).toBe(false);
    });

    test('returns false for null', () => {
      expect(isRequired(null)).toBe(false);
    });
  });
});
