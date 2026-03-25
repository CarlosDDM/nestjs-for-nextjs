export function parseCorsWhitelist(raw: string): string[] {
  return raw
    .split(',')
    .map(url => url.trim().replace(/\/+$/, ''))
    .filter(Boolean);
}
