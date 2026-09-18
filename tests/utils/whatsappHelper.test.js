import { describe, it, expect } from 'vitest';
import {
  cleanPhoneNumber,
  createWhatsAppUrl,
  generateGeneralInquiryMessage,
  generateSiteVisitMessage,
  generateServiceInquiryMessage,
  getDirectCallUrl
} from '../../src/utils/whatsappHelper.js';

describe('WhatsApp Helper Utility & Edge Cases', () => {
  describe('cleanPhoneNumber', () => {
    it('returns default phone number for null, undefined, or non-string inputs', () => {
      expect(cleanPhoneNumber(null)).toBe('918527316865');
      expect(cleanPhoneNumber(undefined)).toBe('918527316865');
      expect(cleanPhoneNumber(8527316865)).toBe('918527316865');
      expect(cleanPhoneNumber({})).toBe('918527316865');
    });

    it('returns default phone number for empty string or strings with no digits', () => {
      expect(cleanPhoneNumber('')).toBe('918527316865');
      expect(cleanPhoneNumber('abc-def')).toBe('918527316865');
    });

    it('prepends 91 to 10-digit Indian phone numbers', () => {
      expect(cleanPhoneNumber('8527316865')).toBe('918527316865');
      expect(cleanPhoneNumber('9812345678')).toBe('919812345678');
    });

    it('preserves existing country code if digits already include 91 prefix (12 digits)', () => {
      expect(cleanPhoneNumber('+91 85273 16865')).toBe('918527316865');
      expect(cleanPhoneNumber('918527316865')).toBe('918527316865');
    });

    it('cleans numbers containing parentheses, spaces, and hyphens', () => {
      expect(cleanPhoneNumber('+91 (852) 73-16865')).toBe('918527316865');
    });
  });

  describe('createWhatsAppUrl', () => {
    it('creates properly encoded wa.me URL with clean phone and query parameter', () => {
      const url = createWhatsAppUrl('8527316865', 'Hello World!');
      expect(url).toBe('https://wa.me/918527316865?text=Hello%20World!');
    });

    it('encodes newlines, special characters, and emojis properly', () => {
      const message = 'Namaste! 🙏\nLine 2 & special #1';
      const url = createWhatsAppUrl('+91 85273 16865', message);
      expect(url).toContain('https://wa.me/918527316865?text=');
      expect(url).toContain(encodeURIComponent('Namaste! 🙏\nLine 2 & special #1'));
      expect(url).not.toContain(' ');
    });

    it('uses fallback phone if phone parameter is null or invalid', () => {
      const url = createWhatsAppUrl(null, 'Inquiry');
      expect(url).toBe('https://wa.me/918527316865?text=Inquiry');
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

  describe('generateServiceInquiryMessage', () => {
    it('returns default greeting when provider is null or undefined', () => {
      expect(generateServiceInquiryMessage(null)).toBe('Hi, I found your profile on Sriizan Real Estate Marketplace.');
      expect(generateServiceInquiryMessage(undefined)).toBe('Hi, I found your profile on Sriizan Real Estate Marketplace.');
    });

    it('handles incomplete provider object with missing role or startingPrice', () => {
      const provider = { name: 'Aman' };
      const message = generateServiceInquiryMessage(provider);
      expect(message).toContain('Aman');
      expect(message).toContain('Role: Service');
      expect(message).toContain('Category: Services');
    });

    it('formats custom message with full professional details', () => {
      const provider = {
        name: 'Sneha Kapur',
        role: '3D Floor Plan Designer',
        category: 'Graphic Designers',
        startingPrice: '₹799'
      };
      const message = generateServiceInquiryMessage(provider);
      expect(message).toContain('Namaste Sneha Kapur!');
      expect(message).toContain('3D Floor Plan Designer');
      expect(message).toContain('Graphic Designers');
      expect(message).toContain('₹799');
    });
  });

  describe('getDirectCallUrl', () => {
    it('returns default number when phone is null, undefined, or empty', () => {
      expect(getDirectCallUrl(null)).toBe('tel:+918527316865');
      expect(getDirectCallUrl(undefined)).toBe('tel:+918527316865');
      expect(getDirectCallUrl('')).toBe('tel:+918527316865');
    });

    it('strips all non-digit/plus characters for clean tel: dialer link', () => {
      expect(getDirectCallUrl('+91 85273 16865')).toBe('tel:+918527316865');
      expect(getDirectCallUrl('+91-(85273)-16865')).toBe('tel:+918527316865');
      expect(getDirectCallUrl('8527316865')).toBe('tel:8527316865');
      expect(getDirectCallUrl('Call +91 85273 16865 now')).toBe('tel:+918527316865');
    });
  });
});

