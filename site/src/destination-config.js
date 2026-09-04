function readHttpDestination(value) {
  if (!value?.trim()) return '';

  try {
    const url = new URL(value.trim());
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : '';
  } catch {
    return '';
  }
}

// Empty defaults are intentional: a destination is only live after the owner
// provides and approves the corresponding Vite environment value.
export const bookingDestination = readHttpDestination(import.meta.env.VITE_BOOKING_URL);
export const donationDestination = readHttpDestination(import.meta.env.VITE_DONATION_URL);
