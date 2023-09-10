import { pluck } from './pluck'

test('myFunction returns true', () => {
  expect(pluck([{ name: 'foo' }, { name: 'bar' }], 'name')).toBe([
    'foo',
    'bar'
  ])
})
