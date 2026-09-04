function readMarker(packet, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = packet.match(new RegExp(`^-\\s*${escaped}:\\s*\\x60([^\\x60]+)\\x60\\s*$`, 'mi'));
  return match?.[1]?.trim().toLowerCase() ?? '';
}

function section(packet, heading, nextHeading) {
  const start = packet.indexOf(heading);
  const end = packet.indexOf(nextHeading, start + heading.length);
  return start >= 0 ? packet.slice(start, end >= 0 ? end : packet.length) : '';
}

function validHttpDestination(value) {
  const raw = value?.trim();
  if (!raw) return false;
  try {
    const url = new URL(raw);
    return (url.protocol === 'http:' || url.protocol === 'https:')
      && Boolean(url.hostname)
      && !url.username
      && !url.password;
  } catch {
    return false;
  }
}

export function evaluateReadiness({ packet, env = process.env }) {
  const rightsResponses = [...packet.matchAll(/\| `site\/public\/proof\/[^`]+` \|[^|]+\| `([^`]+)` \|/g)]
    .map((match) => match[1].trim().toLowerCase());
  const rightsReady = readMarker(packet, 'Rights decision') === 'approved'
    && rightsResponses.length === 4
    && rightsResponses.every((response) => response === 'original' || response === 'owner-permitted');

  const termsSection = section(packet, '## 2. First Listen terms', '## 3. One destination');
  const termLines = termsSection.split('\n').filter((line) => /^\s*-\s+(Proposed price|Proposed turnaround|Included revision|Rights and reference-material boundary):/i.test(line));
  const termsReady = readMarker(packet, 'First Listen terms decision') === 'approved'
    && termLines.length === 4
    && termLines.every((line) => !/approve \/ revise/i.test(line));

  const bookingReady = validHttpDestination(env.VITE_BOOKING_URL);
  const donationReady = validHttpDestination(env.VITE_DONATION_URL);
  const destinationReady = readMarker(packet, 'Destination decision') === 'approved'
    && [bookingReady, donationReady].filter(Boolean).length === 1;

  const checks = [
    {
      label: 'Proof rights',
      ready: rightsReady,
      detail: 'approve the marker and replace all four file responses',
    },
    {
      label: 'First Listen terms',
      ready: termsReady,
      detail: 'approve the marker and replace draft term placeholders',
    },
    {
      label: 'One destination',
      ready: destinationReady,
      detail: 'approve the marker and set exactly one valid HTTP(S) VITE_* URL',
    },
  ];

  return { checks, ready: checks.every((check) => check.ready) };
}
