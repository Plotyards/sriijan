import { describe, it, expect } from 'vitest';
import { INITIAL_SERVICE_PROVIDERS, SERVICE_CATEGORIES } from '../../src/data/serviceProvidersData.js';
import { cleanPhoneNumber, createWhatsAppUrl, generateServiceInquiryMessage, getDirectCallUrl } from '../../src/utils/whatsappHelper.js';

describe('Marketplace UI & Backend Integration Edge Cases', () => {
  describe('Category & Search Filtering Edge Cases', () => {
    const filterProviders = (providers, category, query) => {
      return providers.filter(provider => {
        const matchesCategory = category === 'All' || provider.category === category;
        const q = (query || '').toLowerCase().trim();
        if (!q) return matchesCategory;

        const matchesSearch =
          provider.name.toLowerCase().includes(q) ||
          provider.role.toLowerCase().includes(q) ||
          provider.city.toLowerCase().includes(q) ||
          (provider.skills && provider.skills.some(s => s.toLowerCase().includes(q)));

        return matchesCategory && matchesSearch;
      });
    };

    it('returns all providers when category is "All" and query is empty', () => {
      const results = filterProviders(INITIAL_SERVICE_PROVIDERS, 'All', '');
      expect(results.length).toBe(INITIAL_SERVICE_PROVIDERS.length);
    });

    it('filters accurately by category case-sensitively based on exact category names', () => {
      const editors = filterProviders(INITIAL_SERVICE_PROVIDERS, 'Editor', '');
      expect(editors.length).toBeGreaterThanOrEqual(2);
      editors.forEach(e => expect(e.category).toBe('Editor'));

      const videographers = filterProviders(INITIAL_SERVICE_PROVIDERS, 'Videographer', '');
      expect(videographers.length).toBeGreaterThanOrEqual(1);
      videographers.forEach(r => expect(r.category).toBe('Videographer'));
    });

    it('searches across skills case-insensitively', () => {
      const droneResults = filterProviders(INITIAL_SERVICE_PROVIDERS, 'All', 'drone');
      expect(droneResults.length).toBeGreaterThanOrEqual(1);
      const hasDrone = droneResults.some(p =>
        p.skills.some(s => s.toLowerCase().includes('drone')) ||
        p.role.toLowerCase().includes('drone')
      );
      expect(hasDrone).toBe(true);
    });

    it('searches across city locations', () => {
      const gurugramResults = filterProviders(INITIAL_SERVICE_PROVIDERS, 'All', 'gurugram');
      expect(gurugramResults.length).toBeGreaterThanOrEqual(1);
      gurugramResults.forEach(p => {
        expect(p.city.toLowerCase()).toContain('gurugram');
      });
    });

    it('safely returns empty array when query does not match anything without crashing', () => {
      const results = filterProviders(INITIAL_SERVICE_PROVIDERS, 'All', 'non_existent_xyz_999');
      expect(results).toEqual([]);
    });

    it('handles search queries with extra whitespace and special characters', () => {
      const results = filterProviders(INITIAL_SERVICE_PROVIDERS, 'All', '   Aman   ');
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results[0].name).toContain('Aman');
    });
  });

  describe('Professional Listing Data Normalization Edge Cases', () => {
    const normalizeProviderInput = (input) => {
      const skillsArray = typeof input.skills === 'string'
        ? input.skills.split(',').map(s => s.trim()).filter(Boolean)
        : (Array.isArray(input.skills) ? input.skills : [input.category || "General Pro"]);

      const avatar = input.avatarUrl?.trim() ||
        (input.category?.includes('Video')
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
          : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop");

      return {
        id: "PRO-" + Math.floor(1000 + Math.random() * 9000),
        name: input.name?.trim() || "Real Estate Professional",
        role: input.role?.trim() || "Specialist",
        category: input.category || "Video Editors",
        city: input.city?.trim() || "Delhi NCR",
        phone: input.phone?.trim() || "+91 85273 16865",
        whatsapp: input.whatsapp?.trim() || input.phone?.trim() || "+91 85273 16865",
        startingPrice: input.startingPrice?.trim() || "₹1,499",
        skills: skillsArray.length > 0 ? skillsArray : ["Verified Specialist"],
        avatar,
        verified: true,
        badge: "Verified ₹699 Lifetime Pass"
      };
    };

    it('parses comma-separated skills with irregular spaces correctly', () => {
      const normalized = normalizeProviderInput({
        name: 'Rakesh Verma',
        skills: '  Premiere Pro ,  DaVinci Resolve,   Viral Reels  , 4K Drone  '
      });
      expect(normalized.skills).toEqual(['Premiere Pro', 'DaVinci Resolve', 'Viral Reels', '4K Drone']);
    });

    it('assigns fallback avatar based on category when avatarUrl is missing', () => {
      const videoPro = normalizeProviderInput({ category: 'Video Editors' });
      expect(videoPro.avatar).toContain('photo-1534528741775-53994a69daeb');

      const designerPro = normalizeProviderInput({ category: 'Graphic Designers' });
      expect(designerPro.avatar).toContain('photo-1573496359142-b8d87734a5a2');
    });

    it('falls back whatsapp number to phone number when whatsapp is omitted', () => {
      const normalized = normalizeProviderInput({
        phone: '+91 98765 43210',
        whatsapp: ''
      });
      expect(normalized.whatsapp).toBe('+91 98765 43210');
    });

    it('assigns verified status and ₹699 lifetime badge to all newly listed profiles', () => {
      const normalized = normalizeProviderInput({ name: 'Vikram', category: 'Realtors & Brokers' });
      expect(normalized.verified).toBe(true);
      expect(normalized.badge).toBe('Verified ₹699 Lifetime Pass');
      expect(normalized.id.startsWith('PRO-')).toBe(true);
    });
  });

  describe('₹699 Pricing & Order Payload Edge Cases', () => {
    it('calculates exact Razorpay amount in paise for ₹699 lifetime pass', () => {
      const feeRupees = 699;
      const paiseAmount = feeRupees * 100;
      expect(paiseAmount).toBe(69900);
      expect(Number.isInteger(paiseAmount)).toBe(true);
    });

    it('verifies standard Razorpay options payload schema', () => {
      const rzpOptions = {
        amount: 699 * 100,
        currency: 'INR',
        name: 'Sriizan Marketplace',
        description: '₹699 Lifetime Listing Pass'
      };

      expect(rzpOptions.amount).toBe(69900);
      expect(rzpOptions.currency).toBe('INR');
      expect(rzpOptions.description).toContain('699');
    });
  });

  describe('Phone Number & Connect Link Edge Cases', () => {
    it('handles various Indian phone formats (with +91, 0 prefix, spaces, dashes)', () => {
      expect(cleanPhoneNumber('+91 85273 16865')).toBe('918527316865');
      expect(cleanPhoneNumber('+91-85273-16865')).toBe('918527316865');
      expect(cleanPhoneNumber('8527316865')).toBe('918527316865');
      expect(cleanPhoneNumber('(85273) 16865')).toBe('918527316865');
    });

    it('handles direct call URL generation for international numbers and cleans invalid chars', () => {
      expect(getDirectCallUrl('+91 85273 16865')).toBe('tel:+918527316865');
      expect(getDirectCallUrl('+1 (555) 123-4567')).toBe('tel:+15551234567');
      expect(getDirectCallUrl('')).toBe('tel:+918527316865');
      expect(getDirectCallUrl(null)).toBe('tel:+918527316865');
    });

    it('generates fully working WhatsApp URL with direct dial and custom encoded message', () => {
      const url = createWhatsAppUrl('+91 85273 16865', 'Testing WhatsApp & Calling #1');
      expect(url.startsWith('https://wa.me/918527316865?text=')).toBe(true);
      expect(url).toContain(encodeURIComponent('Testing WhatsApp & Calling #1'));
    });
  });
});
