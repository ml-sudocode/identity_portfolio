import Fuse from "fuse.js";
import { useEffect, useRef } from "react"
import { useWallets, Wallet } from "../state/wallets";

export default function useFuzzyWallets() {
  const wallets = useWallets();
  const fuseRef = useRef<Fuse<Wallet> | null>(null)
  const options = {
    keys: ['label', 'description']
  }

  useEffect(() => {
    fuseRef.current = new Fuse(wallets, options);
  }, [])

  const search = (q: string) => {
    if(!fuseRef.current) { return [] };
    return fuseRef.current.search(q);
  }

  return {
    search
  }
}
