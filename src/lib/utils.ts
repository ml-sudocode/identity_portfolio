
export function randomIntInRange(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

export function presentEthAddress(address: string) {
  return address.slice(0, 6) + '...' + address.slice(-4);
}

export function presentBalance(balance: number) {
  if(balance === 0) { return 0.0 };

  return balance.toFixed(5).replace(/[0]+$/g,"");
}

export const pluralize = (thing: string, count: number, specialCase?: string) => {
  return count === 1 ? thing : `${specialCase ?? thing}s`;
}

export const truncate = (s: string, chars: number) => {
  if (s.length < chars) return s;

  return s.slice(0, chars) + '...';
}

export function randomElement<T>(a: T[]) {
  return a[Math.floor(Math.random() * a.length)];
}
