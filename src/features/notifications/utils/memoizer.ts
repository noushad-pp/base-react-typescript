export default function memoizer<T, U>(): (key: T, val: U) => U {
  const map = new Map<T, U>();
  return (key: T, val: U): U => {
    if (!map.has(key)) {
      map.set(key, val);
    }

    return map.get(key)!;
  };
}
