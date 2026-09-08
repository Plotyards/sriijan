import { describe, it, expect } from 'vitest';

/**
 * Pure validation functions mirroring AuthPage & RegistrationForm validation logic
 */
export const validateLoginForm = (email) => {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Please enter your registered buyer email address.' };
  }
  return { isValid: true, error: null };
};

export const validateSignUpForm = (signUpData, usersDB = []) => {
  if (!signUpData.name || !signUpData.name.trim()) {
    return { isValid: false, error: 'Please enter your full name.' };
  }
  if (!signUpData.email || !signUpData.email.trim() || !signUpData.email.includes('@')) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  if (!signUpData.password || signUpData.password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long.' };
  }
  if (signUpData.password !== signUpData.confirmPassword) {
    return { isValid: false, error: 'Passwords do not match. Please re-enter.' };
  }

  const cleanEmail = signUpData.email.trim().toLowerCase();
  const existing = usersDB.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    return { isValid: false, error: 'An account with this email address already exists. Please Log In instead.' };
  }

  return { isValid: true, error: null };
};

export const validatePropertyRegistrationForm = (formData, currentUser) => {
  if (!currentUser || !currentUser.isLoggedIn) {
    return { isValid: false, error: 'User must be logged in to register property.', redirect: '/signup' };
  }
  if (!formData.name || !formData.name.trim()) {
    return { isValid: false, error: 'Please enter your full name.' };
  }
  if (!formData.email || !formData.email.trim() || !formData.email.includes('@')) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  if (!formData.projectName || !formData.projectName.trim() || !formData.unitNumber || !formData.unitNumber.trim()) {
    return { isValid: false, error: 'Please fill in your Project Name and Unit Number.' };
  }

  return { isValid: true, error: null };
};

describe('Client-Side Form Validation & Auth Edge Cases', () => {
  describe('Login validation edge cases', () => {
    it('rejects empty or whitespace email', () => {
      expect(validateLoginForm('')).toEqual({
        isValid: false,
        error: 'Please enter your registered buyer email address.'
      });
      expect(validateLoginForm('   ')).toEqual({
        isValid: false,
        error: 'Please enter your registered buyer email address.'
      });
    });

    it('accepts valid email', () => {
      expect(validateLoginForm('user@example.com')).toEqual({
        isValid: true,
        error: null
      });
    });
  });

  describe('Sign-up validation edge cases', () => {
    const validData = {
      name: 'Nikhil Jangra',
      email: 'nikhil@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    it('rejects empty name', () => {
      const res = validateSignUpForm({ ...validData, name: '' });
      expect(res.isValid).toBe(false);
      expect(res.error).toBe('Please enter your full name.');
    });

    it('rejects invalid email without @', () => {
      const res = validateSignUpForm({ ...validData, email: 'nikhil-no-at-sign.com' });
      expect(res.isValid).toBe(false);
      expect(res.error).toBe('Please enter a valid email address.');
    });

    it('rejects password shorter than 6 characters', () => {
      const res = validateSignUpForm({ ...validData, password: '123', confirmPassword: '123' });
      expect(res.isValid).toBe(false);
      expect(res.error).toBe('Password must be at least 6 characters long.');
    });

    it('rejects mismatching passwords', () => {
      const res = validateSignUpForm({ ...validData, password: 'password123', confirmPassword: 'differentPassword' });
      expect(res.isValid).toBe(false);
      expect(res.error).toBe('Passwords do not match. Please re-enter.');
    });

    it('detects duplicate email case-insensitively in usersDB', () => {
      const usersDB = [{ email: 'nikhil@example.com' }];
      const res = validateSignUpForm({ ...validData, email: '  NIKHIL@EXAMPLE.COM  ' }, usersDB);
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('already exists');
    });

    it('passes for complete valid data with no duplicates', () => {
      const usersDB = [{ email: 'other@example.com' }];
      const res = validateSignUpForm(validData, usersDB);
      expect(res.isValid).toBe(true);
      expect(res.error).toBeNull();
    });
  });

  describe('Property registration form validation edge cases', () => {
    const validForm = {
      name: 'Priya Sharma',
      email: 'priya@example.com',
      projectName: 'DLF Cyber City',
      unitNumber: 'Tower C-101'
    };
    const loggedInUser = { isLoggedIn: true, name: 'Priya', email: 'priya@example.com' };

    it('redirects to signup if user is not logged in', () => {
      const res = validatePropertyRegistrationForm(validForm, null);
      expect(res.isValid).toBe(false);
      expect(res.redirect).toBe('/signup');

      const res2 = validatePropertyRegistrationForm(validForm, { isLoggedIn: false });
      expect(res2.isValid).toBe(false);
      expect(res2.redirect).toBe('/signup');
    });

    it('requires project name and unit number', () => {
      const res = validatePropertyRegistrationForm({ ...validForm, projectName: '' }, loggedInUser);
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('Project Name and Unit Number');

      const res2 = validatePropertyRegistrationForm({ ...validForm, unitNumber: '   ' }, loggedInUser);
      expect(res2.isValid).toBe(false);
      expect(res2.error).toContain('Project Name and Unit Number');
    });

    it('passes when user is logged in and all required fields are filled', () => {
      const res = validatePropertyRegistrationForm(validForm, loggedInUser);
      expect(res.isValid).toBe(true);
      expect(res.error).toBeNull();
    });
  });
});
