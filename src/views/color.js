export function createInput () {
  const input = document.createElement('input')
  input.setAttribute('type', 'color')
  return input
}

export function validate (color) {
  // TBD
  // Also prepare the color? toLowercase? 'blue' to '#0000ff'?
  return true
}

export function setColor (input) {
  return function (color) {
    // Avoid triggering an 'input' event if not necessary
    if (validate(color) && color !== input.value) {
      input.value = color
    }
  }
}

export default function colorView (dispatch, { color = '' }) {
  // Create
  const input = createInput()

  // Initialize
  setColor(input)(color)

  // Send event if input has changed
  input.addEventListener('input', function (event) {
    dispatch.call('update-color', null, input.value)
    event.preventDefault()
  })

  // Listen to external update
  dispatch.on('color-updated.colorView', setColor(input))

  return input
}
