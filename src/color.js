import color2css from './color2css'
import { Library } from '@observablehq/stdlib'
import { rgb as d3Rgb } from 'd3-color'
const d3 = {
  rgb: d3Rgb
}

const library = new Library()
const html = library.html()

export default function colorPropertyView (editor) {
  const { features, dispatch } = editor

  function getTopColor () {
    const selected = editor.selected()[0]
    return selected ? d3.rgb(selected.properties.color).hex() : ''
  }

  const form = html`
    <form><input type="color" /></form>
  `

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
