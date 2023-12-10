export function sum(a: number, b: number) {
  return a + b;
}
export function isNumeric(str: string) {
  if (typeof str != "string") return false;
  return !isNaN(parseFloat(str));
}
