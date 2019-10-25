import { test } from 'tape'
import jsonView, {
  createLabelElement,
  createTextareaElement,
  createErrorDivElement,
  createDOMElements,
  setJSON,
  validate
} from './json.js'
import browserEnv from 'browser-env'
import { dispatch as d3Dispatch } from 'd3-dispatch'
const d3 = {
  dispatch: d3Dispatch
}

// TODO: change the way to test browser functionalities
// This way is not recommended: https://github.com/avajs/ava/blob/master/docs/recipes/browser-testing.md
browserEnv(['document', 'CustomEvent'])

test('createLabelElement() creates <label>JSON</label>', function (t) {
  const el = createLabelElement()
  t.ok(el.nodeName && el.nodeName.toLowerCase() === 'label')
  t.equal(el.textContent, 'JSON')
  t.end()
})

test('createTextareaElement() creates <textarea style="width:100%" rows=20 />', function (t) {
  const el = createTextareaElement()
  t.ok(el.nodeName && el.nodeName.toLowerCase() === 'textarea')
  t.ok(el.hasAttribute('style'))
  t.equal(el.getAttribute('style'), 'width:100%')
  t.ok(el.hasAttribute('rows'))
  t.equal(el.getAttribute('rows'), '20')
  t.equal(el.value, '')
  t.end()
})

test('createErrorDivElement() creates <div style="color:red; font:small"></div>', function (t) {
  const el = createErrorDivElement()
  t.ok(el.nodeName && el.nodeName.toLowerCase() === 'div')
  t.ok(el.hasAttribute('style'))
  t.equal(el.getAttribute('style'), 'color:red; font:small')
  t.equal(el.textContent, '')
  t.end()
})

test('createDOMElements() creates <label>JSON<textarea … /><div … /></label>', function (t) {
  const { label, textarea, errorDiv } = createDOMElements()
  t.ok(label.nodeName && label.nodeName.toLowerCase() === 'label')
  const labelChildren = label.children
  t.equal(labelChildren[0], textarea)
  t.equal(labelChildren[1], errorDiv)
  t.end()
})

test('setJSON(…) sets the textarea value to input string without checking if it\'s a JSON', function (t) {
  const { textarea } = createDOMElements()
  const set = setJSON(textarea)
  const strings = ['{}', 'not a json', '[\'also not a json\']', '{ type: \'FeatureCollection\', features: [] }']
  for (const string of strings) {
    set(string)
    t.equal(textarea.value, string)
  }
  t.end()
})

test('validate(…) ensures the input is a string', function (t) {
  t.ok(validate(''))
  t.ok(validate('{}'))
  t.ok(validate('{ type: \'FeatureCollection\', features: [] }'))
  t.notOk(validate())
  t.notOk(validate({}))
  t.notOk(validate({ type: 'FeatureCollection', features: [] }))
  t.end()
})

// Integration test
test('jsonView(dispatch, {json = \'{}\'}) creates <label>JSON<textarea … /><div … /></label>', function (t) {
  const dispatch = d3.dispatch('json-updated', 'json-update-error', 'update-json')
  const label = jsonView(dispatch, { json: '{}' })
  const textarea = label.children[0]
  t.equal(textarea.value, '{}')
  t.end()
})

test('jsonView value updates when a \'json-updated\' _type_ is received', function (t) {
  const dispatch = d3.dispatch('json-updated', 'json-update-error', 'update-json')
  const label = jsonView(dispatch, { json: '{}' })
  dispatch.call('json-updated', null, '{ type: \'FeatureCollection\', features: [] }')
  t.equal(label.children[0].value, '{ type: \'FeatureCollection\', features: [] }')
  t.end()
})

test('jsonView shows an error and does not change value if \'json-update-error\' _type_ is received', function (t) {
  const dispatch = d3.dispatch('json-updated', 'json-update-error', 'update-json')
  const label = jsonView(dispatch, { json: '{}' })
  const text = label.children[0].value
  const errorMessage = 'Syntax error'
  dispatch.call('json-update-error', null, errorMessage)
  t.equal(label.children[0].value, text)
  t.equal(label.children[1].textContent, errorMessage)
  t.end()
})

test('jsonView removes error and updates when a \'json-updated\' _type_ is received after \'json-update-error\'', function (t) {
  const dispatch = d3.dispatch('json-updated', 'json-update-error', 'update-json')
  const label = jsonView(dispatch, { json: '{}' })
  const errorMessage = 'Syntax error'
  dispatch.call('json-update-error', null, errorMessage)
  dispatch.call('json-updated', null, '{ type: \'FeatureCollection\', features: [] }')
  t.equal(label.children[0].value, '{ type: \'FeatureCollection\', features: [] }')
  t.equal(label.children[1].textContent, '')
  t.end()
})
