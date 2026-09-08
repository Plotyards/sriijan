/**
 * WhatsApp Direct Messaging & Site Visit Helper
 * Directly connects buyers with the specific property owner who posted the listing.
 */

// Cleans phone numbers to international WhatsApp format (e.g. "+91 98705 34978" -> "919870534978")
export const cleanPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return '919870534978';
  let digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    digits = '91' + digits;
  }
  return digits || '919870534978';
};

/**
 * Creates formatted WhatsApp URL with encoded message
 */
export const createWhatsAppUrl = (phone, message) => {
  const cleanPhone = cleanPhoneNumber(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

/**
 * Generates custom WhatsApp message for general property inquiry
 */
export const generateGeneralInquiryMessage = (property) => {
  if (!property) return "Hi, I am interested in your property listing on Sriizan.";
  
  const projectName = property.project || property.name || 'Your Property';
  const unitNumber = property.unitNo || '';
  const propType = property.type || '';
  const price = property.resalePrice || (property.financials?.resaleMarketPrice ? `₹${(property.financials.resaleMarketPrice / 10000000).toFixed(2)} Cr` : '');
  const location = property.location || '';

  return `Namaste! 🙏\n\nI am interested in your property listing on Sriizan Resale Marketplace:\n\n🏢 Project: ${projectName}\n📍 Unit: ${unitNumber} (${propType})\n🗺️ Location: ${location}\n💰 Asking Price: ${price}\n\nI would like to discuss more details and documents. Please let me know your availability. Thank you!`;
};

/**
 * Generates custom WhatsApp message for Site Visit booking
 */
export const generateSiteVisitMessage = (property, visitorDetails = {}) => {
  const { visitorName, visitorPhone, visitDate, visitTimeSlot } = visitorDetails || {};
  
  const projectName = property?.project || property?.name || 'Your Property';
  const unitNumber = property?.unitNo || '';
  const propType = property?.type || '';
  const price = property?.resalePrice || (property?.financials?.resaleMarketPrice ? `₹${(property.financials.resaleMarketPrice / 10000000).toFixed(2)} Cr` : '');

  return `Namaste! 🙏\n\nI would like to schedule a Site Visit for your property listed on Sriizan:\n\n🏢 Property: ${projectName}\n📍 Unit: ${unitNumber} (${propType})\n💰 Asking Price: ${price}\n\n👤 Visitor Name: ${visitorName || 'Interested Buyer'}\n📞 Mobile: ${visitorPhone || 'Not provided'}\n📅 Preferred Date: ${visitDate || 'As soon as possible'}\n⏰ Preferred Slot: ${visitTimeSlot || 'Morning'}\n\nPlease confirm if this date and time works for you. Looking forward to your response!`;
};
