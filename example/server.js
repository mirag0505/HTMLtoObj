// eslint-disable-next-line @typescript-eslint/no-var-requires
const { pluck } = require('test_lybrary_for_browser_and_node')
console.log(pluck([{ name: 'foo' }, { name: 'bar' }], 'name'))
