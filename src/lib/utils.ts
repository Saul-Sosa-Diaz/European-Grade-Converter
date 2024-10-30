export function customParseFloat(value) {
  if (!/^[+-]?\d+(\.\d+)?$/.test(value)) {
    return NaN;
  }
  return parseFloat(value);
}