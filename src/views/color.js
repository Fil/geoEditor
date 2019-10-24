import color2css from './../utils/color2css'
import { rgb as d3Rgb } from 'd3-color'
const d3 = {
  rgb: d3Rgb
}

export default function colorPropertyView (editor) {
  const { features, dispatch } = editor

  function getTopColor () {
    const selected = editor.selected()[0]
    return selected ? d3.rgb(selected.properties.color).hex() : ''
  }

  const form = document.createElement('form')
  const input = document.createElement('input')
  input.setAttribute('type', 'color')
  form.append(input)

  const el = form.elements[0]
  el.value = getTopColor()

  el.addEventListener('input', listen)

  dispatch.on('update.colorProperty', message => {
    if (message !== 'colorProperty') el.value = getTopColor()
  })

  form.value = features
  return form

  function listen (event) {
    const selected = editor.selected()[0]
    if (selected) {
      const color = el.value
      selected.properties.color = color2css(color)
      dispatch.call('data', null, 'colorProperty')
    }
    event.preventDefault()
  }
}
