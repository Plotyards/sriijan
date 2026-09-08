import { describe, it, expect } from 'vitest';
import { INITIAL_RESALE_PROPERTIES } from '../../src/data/resalePropertiesData.js';

describe('Resale Properties Data & Filtering Edge Cases', () => {
  it('contains valid inventory properties with all required fields', () => {
    expect(INITIAL_RESALE_PROPERTIES.length).toBeGreaterThan(0);
    INITIAL_RESALE_PROPERTIES.forEach(property => {
      expect(property.id).toBeDefined();
      expect(property.project).toBeTruthy();
      expect(property.location).toBeTruthy();
      expect(property.resalePriceNum).toBeGreaterThan(0);
      expect(property.bookedPriceNum).toBeGreaterThan(0);
      expect(property.bhk).toMatch(/\d(\.5)?\s*BHK/);
      expect(property.ownerPhone).toBeTruthy();
      expect(Array.isArray(property.verifiedDocs)).toBe(true);
    });
  });

  describe('Budget filtering edge cases', () => {
    it('correctly filters UNDER_1.5CR (<= 15,000,000)', () => {
      const under15Cr = INITIAL_RESALE_PROPERTIES.filter(p => p.resalePriceNum <= 15000000);
      expect(under15Cr.length).toBeGreaterThan(0);
      under15Cr.forEach(p => {
        expect(p.resalePriceNum).toBeLessThanOrEqual(15000000);
      });
    });

    it('correctly filters 1.5CR_2.5CR (15,000,000 to 25,000,000)', () => {
      const midBudget = INITIAL_RESALE_PROPERTIES.filter(p => p.resalePriceNum >= 15000000 && p.resalePriceNum <= 25000000);
      midBudget.forEach(p => {
        expect(p.resalePriceNum).toBeGreaterThanOrEqual(15000000);
        expect(p.resalePriceNum).toBeLessThanOrEqual(25000000);
      });
    });

    it('correctly filters ABOVE_2.5CR (>= 25,000,000)', () => {
      const luxuryBudget = INITIAL_RESALE_PROPERTIES.filter(p => p.resalePriceNum >= 25000000);
      luxuryBudget.forEach(p => {
        expect(p.resalePriceNum).toBeGreaterThanOrEqual(25000000);
      });
    });
  });

  describe('BHK filtering edge cases', () => {
    it('matches 2 BHK and 2.5 BHK when selecting 2BHK', () => {
      const twoBhk = INITIAL_RESALE_PROPERTIES.filter(p => ['2 BHK', '2.5 BHK'].includes(p.bhk));
      twoBhk.forEach(p => {
        expect(['2 BHK', '2.5 BHK']).toContain(p.bhk);
      });
    });

    it('matches only 3 BHK when selecting 3BHK', () => {
      const threeBhk = INITIAL_RESALE_PROPERTIES.filter(p => p.bhk === '3 BHK');
      threeBhk.forEach(p => {
        expect(p.bhk).toBe('3 BHK');
      });
    });

    it('matches only 4 BHK when selecting 4BHK', () => {
      const fourBhk = INITIAL_RESALE_PROPERTIES.filter(p => p.bhk === '4 BHK');
      fourBhk.forEach(p => {
        expect(p.bhk).toBe('4 BHK');
      });
    });
  });

  describe('Search query matching edge cases', () => {
    it('matches properties by project name case-insensitively', () => {
      const query = 'sriizan';
      const matches = INITIAL_RESALE_PROPERTIES.filter(p =>
        p.project.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
      );
      expect(matches.length).toBeGreaterThan(0);
      matches.forEach(p => {
        const text = (p.project + ' ' + p.location).toLowerCase();
        expect(text).toContain(query);
      });
    });

    it('matches properties by sector or sublocality', () => {
      const query = 'dwarka expressway';
      const matches = INITIAL_RESALE_PROPERTIES.filter(p =>
        (p.subLocality || '').toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
      );
      expect(matches.length).toBeGreaterThan(0);
    });

    it('returns empty array when search query matches no property', () => {
      const query = 'nonexistent-xyz-project-123456';
      const matches = INITIAL_RESALE_PROPERTIES.filter(p =>
        p.project.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
      );
      expect(matches).toHaveLength(0);
    });
  });

  describe('Sorting edge cases', () => {
    it('sorts by price ascending', () => {
      const sorted = [...INITIAL_RESALE_PROPERTIES].sort((a, b) => a.resalePriceNum - b.resalePriceNum);
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].resalePriceNum).toBeLessThanOrEqual(sorted[i + 1].resalePriceNum);
      }
    });

    it('sorts by price descending', () => {
      const sorted = [...INITIAL_RESALE_PROPERTIES].sort((a, b) => b.resalePriceNum - a.resalePriceNum);
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].resalePriceNum).toBeGreaterThanOrEqual(sorted[i + 1].resalePriceNum);
      }
    });

    it('sorts by appreciation percentage descending', () => {
      const sorted = [...INITIAL_RESALE_PROPERTIES].sort((a, b) => b.appreciationPercent - a.appreciationPercent);
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].appreciationPercent).toBeGreaterThanOrEqual(sorted[i + 1].appreciationPercent);
      }
    });
  });

  describe('Appreciation & Financial Calculations edge cases', () => {
    it('verifies that appreciation amount equals resale price minus booked price', () => {
      INITIAL_RESALE_PROPERTIES.forEach(p => {
        const expectedDiff = p.resalePriceNum - p.bookedPriceNum;
        expect(p.appreciationAmount).toBe(expectedDiff);
      });
    });

    it('verifies appreciation percentage is mathematically accurate', () => {
      INITIAL_RESALE_PROPERTIES.forEach(p => {
        const expectedPct = Math.round(((p.resalePriceNum - p.bookedPriceNum) / p.bookedPriceNum) * 100);
        expect(p.appreciationPercent).toBe(expectedPct);
      });
    });
  });
});
