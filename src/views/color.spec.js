import { test } from 'tape'
import colorView, { createInput, setColor, validate } from './color.js'
import browserEnv from 'browser-env'
import { dispatch as d3Dispatch } from 'd3-dispatch'
const d3 = {
  dispatch: d3Dispatch
}
browserEnv(['document'])

test('createInput creates a color input with empty init color', function (t) {
  const input = createInput()
  t.ok(input.nodeName && input.nodeName.toLowerCase() === 'input')
  t.ok(input.hasAttribute('type'))
  t.equal(input.getAttribute('type'), 'color')
  t.equal(input.value, '')
  t.end()
})

test('setColor sets the color from hexadecimal input', function (t) {
  const input = createInput()
  const set = setColor(input)
  set('#0000ff')
  t.equal(input.value, '#0000ff')
  set('#00FF00')
  t.equal(input.value, '#00ff00')
  // If input value is invalid, set black color
  set('blue')
  t.notEqual(input.value, 'blue')
  t.notEqual(input.value, '#0000ff')
  t.equal(input.value, '#000000')
  t.end()
})

test('validate always return true', function (t) {
  t.ok(setColor())
  t.ok(validate('blue'))
  t.ok(validate('#001122'))
  t.end()
})

// Integration test
test('color view integration test', function (t) {
  const dispatch = d3.dispatch('color-updated', 'update-color')
  const input = colorView(dispatch, { color: '' })
  t.equal(input.value, '')
  dispatch.call('color-updated', null, '#00FF00')
  t.equal(input.value, '#00ff00')
  // TBD: find a way to call the following test
  // input.value = '#FF0000'
  // dispatch.on('update-color', color => {
  //   t.equal(color, '#ff0000')
  // })
  t.end()
})
