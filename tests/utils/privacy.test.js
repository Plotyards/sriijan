import { describe, it, expect } from 'vitest';
import {
  maskPhoneNumber,
  sanitizeNotificationText,
  sanitizeNotificationPayload
} from '../../src/utils/privacy.js';

describe('Privacy & Phone Number Masking Utility', () => {
  describe('maskPhoneNumber edge cases', () => {
    it('returns empty string for null, undefined or non-string inputs', () => {
      expect(maskPhoneNumber(null)).toBe('');
      expect(maskPhoneNumber(undefined)).toBe('');
      expect(maskPhoneNumber(1234567890)).toBe('');
      expect(maskPhoneNumber({})).toBe('');
      expect(maskPhoneNumber([])).toBe('');
    });

    it('returns empty string for empty string', () => {
      expect(maskPhoneNumber('')).toBe('');
      expect(maskPhoneNumber('   ')).toBe('');
    });

    it('returns "******" for phone numbers with fewer than 10 digits', () => {
      expect(maskPhoneNumber('12345')).toBe('******');
      expect(maskPhoneNumber('98705')).toBe('******');
      expect(maskPhoneNumber('+91 1234')).toBe('******');
    });

    it('masks standard 10-digit Indian phone numbers', () => {
      const result = maskPhoneNumber('9870534978');
      expect(result).toBe('98******78');
    });

    it('masks international format phone numbers with country code and spaces', () => {
      const result = maskPhoneNumber('+91 98705 34978');
      expect(result).toBe('+91 98******78');
    });

    it('masks formatted phone numbers with hyphens and spaces', () => {
      const result = maskPhoneNumber('+91-98705-34978');
      expect(result).toBe('+91-98******78');
    });

    it('masks phone numbers with leading and trailing whitespaces', () => {
      const result = maskPhoneNumber('   9870534978   ');
      expect(result).toBe('98******78');
    });
  });

  describe('sanitizeNotificationText edge cases', () => {
    it('returns empty string for non-string, null or undefined input', () => {
      expect(sanitizeNotificationText(null)).toBe('');
      expect(sanitizeNotificationText(undefined)).toBe('');
      expect(sanitizeNotificationText(12345)).toBe('');
      expect(sanitizeNotificationText({})).toBe('');
    });

    it('returns empty string for empty string', () => {
      expect(sanitizeNotificationText('')).toBe('');
    });

    it('leaves text without phone numbers unchanged', () => {
      const text = 'Your site visit has been scheduled successfully for Tower A.';
      expect(sanitizeNotificationText(text)).toBe(text);
    });

    it('replaces a single 10-digit phone number with protected label', () => {
      const text = 'Contact the owner at 9870534978 for unit inspection.';
      const sanitized = sanitizeNotificationText(text);
      expect(sanitized).toBe('Contact the owner at [Number Protected for Privacy] for unit inspection.');
      expect(sanitized).not.toContain('9870534978');
    });

    it('replaces phone numbers with +91 country prefix', () => {
      const text = 'Call +91 9870534978 or +91-9812345678 to confirm.';
      const sanitized = sanitizeNotificationText(text);
      expect(sanitized).toContain('[Number Protected for Privacy]');
      expect(sanitized).not.toContain('9870534978');
      expect(sanitized).not.toContain('9812345678');
    });

    it('replaces multiple phone numbers in one notification text', () => {
      const text = 'Buyer: 9870534978, Seller: 9812345678 requested contact.';
      const sanitized = sanitizeNotificationText(text);
      expect(sanitized).toBe('Buyer: [Number Protected for Privacy], Seller: [Number Protected for Privacy] requested contact.');
    });
  });

  describe('sanitizeNotificationPayload edge cases', () => {
    it('returns non-object or null input unmodified', () => {
      expect(sanitizeNotificationPayload(null)).toBeNull();
      expect(sanitizeNotificationPayload(undefined)).toBeUndefined();
      expect(sanitizeNotificationPayload('raw text string')).toBe('raw text string');
    });

    it('sanitizes title, message, and body in a notification payload', () => {
      const payload = {
        title: 'New message from 9870534978',
        message: 'Owner phone: 9812345678',
        body: 'Inquiry received for +91 9870534978',
        timestamp: 1725430000000
      };

      const result = sanitizeNotificationPayload(payload);
      expect(result.title).toBe('New message from [Number Protected for Privacy]');
      expect(result.message).toBe('Owner phone: [Number Protected for Privacy]');
      expect(result.body).toBe('Inquiry received for [Number Protected for Privacy]');
      expect(result.timestamp).toBe(1725430000000);
      expect(result.title).not.toContain('9870534978');
    });

    it('handles payload missing message or body gracefully', () => {
      const payload = {
        title: 'Visit confirmed for 9870534978'
      };

      const result = sanitizeNotificationPayload(payload);
      expect(result.title).toContain('[Number Protected for Privacy]');
      expect(result.message).toBe('');
      expect(result.body).toBe('');
    });
  });
});
