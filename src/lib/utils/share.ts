/**
 * Generate a WhatsApp share deep link with pre-filled text.
 * Uses wa.me which works on both mobile and desktop.
 */
export function getWhatsAppShareUrl(text: string): string {
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
