import { pluck } from './pluck'

test('myFunction returns true', () => {
  const result = pluck([{ name: 'foo' }, { name: 'bar' }], 'name')
  expect(result[0]).toBe('foo')
  expect(result[1]).toBe('bar')
})
