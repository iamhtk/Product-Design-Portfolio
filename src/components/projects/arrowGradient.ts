/**
 * Returns 5 hex colors for the arrow gradient: lightest (first arrow) to darkest (last arrow).
 * Pass a single arrowColor (e.g. '#000000' or '#FFB84D') to get the full gradient.
 */
export function getArrowGradientColors(arrowColor: string): string[] {
  const rgb = parseHex(arrowColor);
  if (!rgb) return [arrowColor, arrowColor, arrowColor, arrowColor, arrowColor];

  const white: [number, number, number] = [255, 255, 255];
  const black: [number, number, number] = [0, 0, 0];

  return [
    toHex(mix(rgb, white, 0.82)), // lightest (first arrow)
    toHex(mix(rgb, white, 0.52)),
    toHex(rgb),                    // base color (middle)
    toHex(mix(rgb, black, 0.4)),
    toHex(mix(rgb, black, 0.68)), // darkest (last arrow)
  ];
}

function parseHex(hex: string): [number, number, number] | null {
  const match = hex.replace(/^#/, '').match(/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!match) return null;
  let s = match[1];
  if (s.length === 3) {
    s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
  }
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
  ];
}

function mix(
  a: [number, number, number],
  b: [number, number, number],
  amount: number
): [number, number, number] {
  return [
    Math.round(a[0] * (1 - amount) + b[0] * amount),
    Math.round(a[1] * (1 - amount) + b[1] * amount),
    Math.round(a[2] * (1 - amount) + b[2] * amount),
  ];
}

function toHex([r, g, b]: [number, number, number]): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
}
