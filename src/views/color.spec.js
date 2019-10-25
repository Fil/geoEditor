import { test } from 'tape'
import colorView, { createInput, setColor, validate } from './color.js'
import browserEnv from 'browser-env'
import { dispatch as d3Dispatch } from 'd3-dispatch'
const d3 = {
  dispatch: d3Dispatch
}

// TODO: change the way to test browser functionalities
// This way is not recommended: https://github.com/avajs/ava/blob/master/docs/recipes/browser-testing.md
browserEnv(['document', 'CustomEvent'])

test('createInput() creates a color <input> with empty init color', function (t) {
  const input = createInput()
  t.ok(input.nodeName && input.nodeName.toLowerCase() === 'input')
  t.ok(input.hasAttribute('type'))
  t.equal(input.getAttribute('type'), 'color')
  t.equal(input.value, '')
  t.end()
})

test('setColor(…) sets the color if input is hexadecimal color', function (t) {
  const input = createInput()
  const set = setColor(input)
  set('#0000ff')
  t.equal(input.value, '#0000ff')
  set('#00FF00')
  t.equal(input.value, '#00ff00')
  t.end()
})

test('setColor(…) sets black color if input is invalid', function (t) {
  const input = createInput()
  const set = setColor(input)
  set('blue')
  t.notEqual(input.value, 'blue')
  t.notEqual(input.value, '#0000ff')
  t.equal(input.value, '#000000')
  t.end()
})

test('validate(…) always return true', function (t) {
  t.ok(validate())
  t.ok(validate('blue'))
  t.ok(validate('#001122'))
  t.end()
})

// Integration test
test('colorView(dispatch) creates a color <input> with empty value', function (t) {
  const dispatch = d3.dispatch('color-updated', 'update-color')
  const input = colorView(dispatch, { color: '' })
  t.equal(input.value, '')
  t.end()
})

test('colorView(dispatch) value updates when a \'color-updated\' _type_ is received', function (t) {
  const dispatch = d3.dispatch('color-updated', 'update-color')
  const input = colorView(dispatch, { color: '' })
  dispatch.call('color-updated', null, '#00FF00')
  t.equal(input.value, '#00ff00')
  t.end()
})

// // TODO find a way to test if event emit works
// test('colorView(dispatch) fires a \'update-color\' _type_ when input is changed', function (t) {
//   const dispatch = d3.dispatch('color-updated', 'update-color')
//   const input = colorView(dispatch, { color: '' })
//   let color
//   dispatch.on('update-color', c => { color = c })
//   input.value = '#FF0000'
//   // Find a way to emit a 'change' Event now
//   t.equal(color, '#ff0000')
//   t.end()
// })
