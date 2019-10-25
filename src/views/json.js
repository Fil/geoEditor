export function createLabelElement () {
  const label = document.createElement('label')
  label.append('JSON')
  return label
}

export function createTextareaElement () {
  const textarea = document.createElement('textarea')
  const style = document.createAttribute('style')
  style.value = 'width:100%'
  textarea.setAttributeNode(style)
  const rows = document.createAttribute('rows')
  rows.value = '20'
  textarea.setAttributeNode(rows)
  return textarea
}

export function createErrorDivElement () {
  // <div style="color:red; font:small"></div>
  const errorDiv = document.createElement('div')
  const style = document.createAttribute('style')
  style.value = 'color:red; font:small'
  errorDiv.setAttributeNode(style)
  return errorDiv
}

export function createDOMElements () {
  const label = createLabelElement()
  const textarea = createTextareaElement()
  const errorDiv = createErrorDivElement()
  label.append(textarea, errorDiv)

  return { label, textarea, errorDiv }
}

export function validate (json) {
  // TBD
  return typeof json === 'string' || json instanceof String
}

export function setJSON (textarea, errorDiv) {
  return function (json) {
    // Avoid triggering an 'input' event if not necessary
    if (validate(json) && json !== textarea.value) {
      textarea.value = json
    }
    // Remove error message if present
    if (errorDiv && errorDiv.textContent) {
      setError(errorDiv)('')
    }
  }
}

export function setError (errorDiv) {
  return function (message) {
    errorDiv.textContent = message
  }
}

export default function jsonView (dispatch, { json = '' }) {
  // Create
  const { label, textarea, errorDiv } = createDOMElements()

  // Initialize
  setJSON(textarea)(json)

  // Send event if input has changed
  textarea.addEventListener('input', function (event) {
    dispatch.call('update-json', null, textarea.value)
    event.preventDefault()
  })

  // Listen to external update
  dispatch.on('json-updated.jsonView', setJSON(textarea, errorDiv))
  // Listen to update error
  dispatch.on('json-update-error.jsonView', setError(errorDiv))

  return label
}
