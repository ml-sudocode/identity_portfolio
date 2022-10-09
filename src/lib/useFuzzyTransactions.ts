import Fuse from "fuse.js";
import { useEffect, useRef } from "react"
import { useTransactions, Transaction } from "../state/transactions";

export default function useFuzzyTransactions() {
  const transactions = useTransactions();
  const fuseRef = useRef<Fuse<Transaction> | null>(null)
  const options = {
    keys: ['note', 'type']
  }

  useEffect(() => {
    fuseRef.current = new Fuse(transactions, options);
  }, [])

  const search = (q: string) => {
    if(!fuseRef.current) { return [] };
    return fuseRef.current.search(q);
  }

  return {
    search
  }
}
