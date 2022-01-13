var hsl = require('../')
var test = require('tap').test

test('pure white', function (assert) {
  var expected = '#ffffff'
  var actual = hsl(0, 100, 100)
  var it = 'max saturation and luminosity should return pure white'
  assert.is(actual, expected, it)
  assert.end()
})

test('medium gray', function (assert) {
  var expected = '#808080'
  var actual = hsl(0, 0, 50)
  var it = '0% saturation, 50% luminosity should be medium gray'
  assert.is(actual, expected, it)
  assert.end()
})

test('hue - red', function (assert) {
  var expected = '#ff0000'
  var actual = hsl(0, 100, 50)
  var it = '0deg should be red'
  assert.is(actual, expected, it)
  assert.end()
})

test('hue - blue', function (assert) {
  var expected = '#0000ff'
  var actual = hsl(240, 100, 50)
  var it = '240deg should be blue'
  assert.is(actual, expected, it)
  assert.end()
})

test('hue - cyan', function (assert) {
  var expected = '#00ffff'
  var actual = hsl(180, 100, 50)
  var it = '180deg should be cyan'
  assert.is(actual, expected, it)
  assert.end()
})

test('degree overflow', function (assert) {
  var expected = hsl(1, 100, 50)
  var actual = hsl(361, 100, 50)
  var it = '361deg should be the same as 1deg'
  assert.is(actual, expected, it)
  assert.end()
})

test('degree underflow', function (assert) {
  var expected = hsl(-1, 100, 50)
  var actual = hsl(359, 100, 50)
  var it = '-1deg should be the same as 359deg'
  assert.is(actual, expected, it)
  assert.end()
})

test('max constraint', function (assert) {
  var expected = hsl(0, 101, 50)
  var actual = hsl(0, 100, 50)
  var it = '101% should be the same as 100%'
  assert.is(actual, expected, it)
  assert.end()
})

test('min constraint', function (assert) {
  var expected = hsl(0, -1, 50)
  var actual = hsl(0, 0, 50)
  var it = '-1% should be the same as 0%'
  assert.is(actual, expected, it)
  assert.end()
})
