export function toProperCase(lower) {
  return lower.charAt(0).toUpperCase() + lower.substr(1);
}

export function numberFormat(number) {
  return +(number + "").slice(0, 7);
}
