global.asdf = Object.assign(new Error('foo'), { path: '/some/path', pkgid: 'some@package', file: '/some/file', stack: 'hello' })
console.log(Object.entries(asdf).length > 0)

asdf = Object.assign(new Error('foo'), { path: '/some/path', pkgid: 'some@package', file: '/some/file', stack: 'hello' })
console.log(Object.entries(asdf).length > 0)

asdf = Object.assign(new Error('foo'), { path: '/some/path', pkgid: 'some@package', file: '/some/file', stack: 'hello' })
console.log(Object.entries(asdf).length > 0)
