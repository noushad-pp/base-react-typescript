import memoizer from './memoizer';

describe('memoizer', () => {
  const cache = memoizer<number, string>();

  const first = cache(1, 'foo');
  it('returns provided value on miss', () => {
    expect(first).toBe('foo');
  });

  const second = cache(1, 'bar');
  it('returns stored value on hit', () => {
    expect(second).toBe('foo');
  });

  const third = cache(2, 'bar');
  it('honors cache key', () => {
    expect(third).toBe('bar');
  });
});
