import { describe, it, expect } from 'vitest';
import { INITIAL_SERVICE_PROVIDERS, SERVICE_CATEGORIES } from '../../src/data/serviceProvidersData.js';
import { cleanPhoneNumber, getDirectCallUrl, generateServiceInquiryMessage } from '../../src/utils/whatsappHelper.js';

describe('Service Providers Data & Ecosystem Integrity', () => {
  it('contains valid service categories that include all required real estate professions', () => {
    expect(SERVICE_CATEGORIES).toBeInstanceOf(Array);
    expect(SERVICE_CATEGORIES).toContain('All');
    expect(SERVICE_CATEGORIES).toContain('Editor');
    expect(SERVICE_CATEGORIES).toContain('Videographer');
    expect(SERVICE_CATEGORIES).toContain('Digital Marketing');
    expect(SERVICE_CATEGORIES).toContain('Graphic Designer');
  });

  it('contains initialized providers across various categories', () => {
    expect(INITIAL_SERVICE_PROVIDERS.length).toBeGreaterThanOrEqual(4);
    const categoriesPresent = new Set(INITIAL_SERVICE_PROVIDERS.map(p => p.category));
    expect(categoriesPresent.has('Editor')).toBe(true);
    expect(categoriesPresent.has('Videographer')).toBe(true);
    expect(categoriesPresent.has('Digital Marketing')).toBe(true);
    expect(categoriesPresent.has('Graphic Designer')).toBe(true);
  });

  it('ensures every provider has valid required fields and correct schema', () => {
    INITIAL_SERVICE_PROVIDERS.forEach(provider => {
      expect(provider.id).toBeDefined();
      expect(typeof provider.id).toBe('string');
      expect(provider.id.startsWith('SZ-')).toBe(true);

      expect(provider.name).toBeTruthy();
      expect(provider.role).toBeTruthy();
      expect(provider.category).toBeTruthy();
      expect(provider.city).toBeTruthy();

      // Rating must be between 1.0 and 5.0
      expect(provider.rating).toBeGreaterThanOrEqual(1.0);
      expect(provider.rating).toBeLessThanOrEqual(5.0);
      expect(provider.reviewsCount).toBeGreaterThanOrEqual(0);

      // Verified status
      expect(typeof provider.verified).toBe('boolean');

      // Contact details
      expect(provider.phone).toBeTruthy();
      expect(cleanPhoneNumber(provider.phone)).toMatch(/^91\d{10}$/);

      if (provider.whatsapp) {
        expect(cleanPhoneNumber(provider.whatsapp)).toMatch(/^91\d{10}$/);
      }

      // Starting Price
      expect(provider.startingPrice).toBeTruthy();

      // Skills array
      expect(provider.skills).toBeInstanceOf(Array);
      expect(provider.skills.length).toBeGreaterThan(0);

      // Services offered
      if (provider.servicesOffered) {
        expect(provider.servicesOffered).toBeInstanceOf(Array);
        provider.servicesOffered.forEach(svc => {
          expect(svc.name).toBeTruthy();
          expect(svc.price).toBeTruthy();
        });
      }

      // Portfolio items
      if (provider.portfolioItems) {
        expect(provider.portfolioItems).toBeInstanceOf(Array);
        provider.portfolioItems.forEach(item => {
          expect(item.title).toBeTruthy();
          expect(item.image).toBeTruthy();
        });
      }
    });
  });

  it('validates direct call URL format for all providers', () => {
    INITIAL_SERVICE_PROVIDERS.forEach(provider => {
      const callUrl = getDirectCallUrl(provider.phone);
      expect(callUrl.startsWith('tel:+91')).toBe(true);
      expect(callUrl).not.toContain(' ');
      expect(callUrl).not.toContain('-');
    });
  });

  it('validates WhatsApp inquiry message generation for all providers', () => {
    INITIAL_SERVICE_PROVIDERS.forEach(provider => {
      const message = generateServiceInquiryMessage(provider);
      expect(message).toContain(provider.name);
      expect(message).toContain(provider.role);
      expect(message).toContain(provider.startingPrice);
      expect(message).toContain('Sriizan Real Estate Marketplace');
    });
  });
});
