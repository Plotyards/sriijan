import { describe, it, expect } from 'vitest';
import {
  cleanPhoneNumber,
  createWhatsAppUrl,
  generateGeneralInquiryMessage,
  generateSiteVisitMessage
} from '../../src/utils/whatsappHelper.js';

describe('WhatsApp Helper Utility & Edge Cases', () => {
  describe('cleanPhoneNumber', () => {
    it('returns default phone number for null, undefined, or non-string inputs', () => {
      expect(cleanPhoneNumber(null)).toBe('919870534978');
      expect(cleanPhoneNumber(undefined)).toBe('919870534978');
      expect(cleanPhoneNumber(9870534978)).toBe('919870534978');
      expect(cleanPhoneNumber({})).toBe('919870534978');
    });

    it('returns default phone number for empty string or strings with no digits', () => {
      expect(cleanPhoneNumber('')).toBe('919870534978');
      expect(cleanPhoneNumber('abc-def')).toBe('919870534978');
    });

    it('prepends 91 to 10-digit Indian phone numbers', () => {
      expect(cleanPhoneNumber('9870534978')).toBe('919870534978');
      expect(cleanPhoneNumber('9812345678')).toBe('919812345678');
    });

    it('preserves existing country code if digits already include 91 prefix (12 digits)', () => {
      expect(cleanPhoneNumber('+91 98705 34978')).toBe('919870534978');
      expect(cleanPhoneNumber('919870534978')).toBe('919870534978');
    });

    it('cleans numbers containing parentheses, spaces, and hyphens', () => {
      expect(cleanPhoneNumber('+91 (987) 05-34978')).toBe('919870534978');
    });
  });

  describe('createWhatsAppUrl', () => {
    it('creates properly encoded wa.me URL with clean phone and query parameter', () => {
      const url = createWhatsAppUrl('9870534978', 'Hello World!');
      expect(url).toBe('https://wa.me/919870534978?text=Hello%20World!');
    });

    it('encodes newlines, special characters, and emojis properly', () => {
      const message = 'Namaste! 🙏\nLine 2 & special #1';
      const url = createWhatsAppUrl('+91 98705 34978', message);
      expect(url).toContain('https://wa.me/919870534978?text=');
      expect(url).toContain(encodeURIComponent('Namaste! 🙏\nLine 2 & special #1'));
      expect(url).not.toContain(' ');
    });

    it('uses fallback phone if phone parameter is null or invalid', () => {
      const url = createWhatsAppUrl(null, 'Inquiry');
      expect(url).toBe('https://wa.me/919870534978?text=Inquiry');
    });
  });

  describe('generateGeneralInquiryMessage', () => {
    it('returns default inquiry message when property is null or undefined', () => {
      expect(generateGeneralInquiryMessage(null)).toBe('Hi, I am interested in your property listing on Sriizan.');
      expect(generateGeneralInquiryMessage(undefined)).toBe('Hi, I am interested in your property listing on Sriizan.');
    });

    it('generates formatted inquiry message with complete property details', () => {
      const property = {
        project: 'DLF Cyber City',
        unitNo: 'A-402',
        type: '3 BHK Luxury',
        location: 'Sector 54, Gurgaon',
        resalePrice: '₹1.85 Cr'
      };

      const message = generateGeneralInquiryMessage(property);
      expect(message).toContain('DLF Cyber City');
      expect(message).toContain('A-402 (3 BHK Luxury)');
      expect(message).toContain('Sector 54, Gurgaon');
      expect(message).toContain('₹1.85 Cr');
      expect(message).toContain('Namaste! 🙏');
    });

    it('falls back to property name if project is not provided', () => {
      const property = {
        name: 'Godrej Woods',
        unitNo: 'B-101',
        type: '2 BHK'
      };

      const message = generateGeneralInquiryMessage(property);
      expect(message).toContain('Godrej Woods');
      expect(message).toContain('B-101');
    });

    it('formats price from financials.resaleMarketPrice if resalePrice is omitted', () => {
      const property = {
        name: 'Smart World Orchard',
        financials: {
          resaleMarketPrice: 12500000 // 1.25 Cr
        }
      };

      const message = generateGeneralInquiryMessage(property);
      expect(message).toContain('₹1.25 Cr');
    });
  });

  describe('generateSiteVisitMessage', () => {
    it('generates site visit message with default visitor details when empty', () => {
      const property = {
        project: 'M3M Crown',
        unitNo: 'C-703',
        type: '4 BHK Penthouse'
      };

      const message = generateSiteVisitMessage(property, {});
      expect(message).toContain('M3M Crown');
      expect(message).toContain('Interested Buyer');
      expect(message).toContain('Not provided');
      expect(message).toContain('As soon as possible');
      expect(message).toContain('Morning');
    });

    it('generates site visit message with visitor name, phone, date and time slot', () => {
      const property = {
        name: 'Puri Diplomatic Greens',
        unitNo: 'D-201',
        type: '3 BHK'
      };

      const visitorDetails = {
        visitorName: 'Rajesh Khanna',
        visitorPhone: '+91 98765 43210',
        visitDate: '15-Sept-2026',
        visitTimeSlot: '4:00 PM - 6:00 PM'
      };

      const message = generateSiteVisitMessage(property, visitorDetails);
      expect(message).toContain('Rajesh Khanna');
      expect(message).toContain('+91 98765 43210');
      expect(message).toContain('15-Sept-2026');
      expect(message).toContain('4:00 PM - 6:00 PM');
    });

    it('handles null property and null visitor details without throwing', () => {
      expect(() => generateSiteVisitMessage(null, null)).not.toThrow();
      const message = generateSiteVisitMessage(null, null);
      expect(message).toContain('Your Property');
      expect(message).toContain('Interested Buyer');
    });
  });
});
