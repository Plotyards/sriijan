/**
 * Privacy & Number Masking Utility
 * Ensures that phone numbers are NEVER leaked to the other party
 * in message notifications, FCM pushes, or public property listings.
 */

// Masks phone number (e.g. "+91 98705 34978" -> "+91 98******78", "9870534978" -> "98******78")
export const maskPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  const trimmed = phone.trim();
  if (!trimmed) return '';
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 10) return '******';
  
  const prefix = trimmed.startsWith('+91-') ? '+91-' : trimmed.startsWith('+91') ? '+91 ' : '';
  const last10 = digitsOnly.slice(-10);
  const first2 = last10.slice(0, 2);
  const last2 = last10.slice(-2);
  return `${prefix}${first2}******${last2}`;
};

// Regex to detect 10-12 digit phone numbers with optional +91, spaces or hyphens
const PHONE_REGEX = /(\+?91[\s-]?)?[6-9]\d{9}|\b\d{10,12}\b/g;

/**
 * Strips or masks any phone number from a text string so it cannot be
 * read by the recipient in FCM, Push Notifications, or SMS alerts.
 */
export const sanitizeNotificationText = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text.replace(PHONE_REGEX, '[Number Protected for Privacy]');
};

/**
 * Sanitizes an entire notification payload before dispatching to FCM or browser notification
 */
export const sanitizeNotificationPayload = (payload) => {
  if (!payload || typeof payload !== 'object') return payload;
  return {
    ...payload,
    title: sanitizeNotificationText(payload.title),
    message: sanitizeNotificationText(payload.message || payload.body || ''),
    body: sanitizeNotificationText(payload.body || payload.message || '')
  };
};
