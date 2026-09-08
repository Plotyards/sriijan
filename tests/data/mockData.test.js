import { describe, it, expect } from 'vitest';
import { INITIAL_PROPERTIES, INITIAL_NOTIFICATIONS } from '../../src/data/mockData.js';

describe('Mock Data Integrity & Financial Invariants', () => {
  describe('INITIAL_PROPERTIES validation', () => {
    it('contains valid properties with required identifiers and owners', () => {
      expect(INITIAL_PROPERTIES.length).toBeGreaterThan(0);
      INITIAL_PROPERTIES.forEach(prop => {
        expect(prop.id).toMatch(/^PH-\d+/);
        expect(prop.name).toBeTruthy();
        expect(prop.builder).toBeTruthy();
        expect(prop.owner).toBeDefined();
        expect(prop.owner.name).toBeTruthy();
        expect(prop.owner.email).toContain('@');
        expect(prop.owner.phone).toBeTruthy();
      });
    });

    it('validates financial invariants: bookedPrice + appreciation = resaleMarketPrice', () => {
      INITIAL_PROPERTIES.forEach(prop => {
        const { bookedPrice, resaleMarketPrice, estimatedAppreciation } = prop.financials;
        expect(resaleMarketPrice).toBe(bookedPrice + estimatedAppreciation);
      });
    });

    it('validates paidAmount + pendingDemand = bookedPrice', () => {
      INITIAL_PROPERTIES.forEach(prop => {
        const { bookedPrice, paidAmount, pendingDemand } = prop.financials;
        expect(paidAmount + pendingDemand).toBe(bookedPrice);
      });
    });

    it('validates construction stages have valid status and bounded percentage [0, 100]', () => {
      INITIAL_PROPERTIES.forEach(prop => {
        const stages = prop.progress.stages;
        expect(stages.length).toBe(6);
        stages.forEach(stg => {
          expect(stg.percentage).toBeGreaterThanOrEqual(0);
          expect(stg.percentage).toBeLessThanOrEqual(100);
          expect(['Completed', 'In Progress', 'Upcoming']).toContain(stg.status);
          if (stg.percentage === 100) {
            expect(stg.status).toBe('Completed');
          } else if (stg.percentage === 0) {
            expect(stg.status).toBe('Upcoming');
          } else {
            expect(stg.status).toBe('In Progress');
          }
        });
      });
    });

    it('validates overallPercentage is a bounded number between 0 and 100', () => {
      INITIAL_PROPERTIES.forEach(prop => {
        expect(prop.progress.overallPercentage).toBeGreaterThanOrEqual(0);
        expect(prop.progress.overallPercentage).toBeLessThanOrEqual(100);
      });
    });

    it('validates documents array contains verified or pending items with valid metadata', () => {
      INITIAL_PROPERTIES.forEach(prop => {
        expect(Array.isArray(prop.documents)).toBe(true);
        prop.documents.forEach(doc => {
          expect(doc.id).toBeDefined();
          expect(doc.title).toBeTruthy();
          expect(doc.category).toBeTruthy();
          expect(doc.fileType).toBe('PDF');
        });
      });
    });
  });

  describe('INITIAL_NOTIFICATIONS validation', () => {
    it('contains valid notifications with read states and categories', () => {
      expect(INITIAL_NOTIFICATIONS.length).toBeGreaterThan(0);
      INITIAL_NOTIFICATIONS.forEach(notif => {
        expect(notif.id).toBeDefined();
        expect(notif.title).toBeTruthy();
        expect(notif.message).toBeTruthy();
        expect(typeof notif.read).toBe('boolean');
        expect(typeof notif.category).toBe('string');
        expect(notif.propertyId).toBeTruthy();
      });
    });
  });
});
