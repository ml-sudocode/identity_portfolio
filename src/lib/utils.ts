import { Wallet } from "../state/wallets";

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

export function isLocked(wallet: Wallet) {
  return wallet.ethWallet === null;
}

export function isUnlocked(wallet: Wallet) {
  return !isLocked(wallet);
}

export const pluralize = (thing: string, count: number) => {
  return count === 1 ? thing : `${thing}s`;
}
