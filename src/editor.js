import { dispatch as d3Dispatch } from 'd3-dispatch'
import { geoMercator as d3GeoMercator } from 'd3-geo'
import { debounce } from 'debounce'
import colorPropertyView from './views/color'

const d3 = {
  dispatch: d3Dispatch,
  geoMercator: d3GeoMercator
}

export default function geoEditor ({
  features,
  container,
  render,
  projection,
  options
} = {}) {
  features = features || { type: 'FeatureCollection', features: [] }
  projection = projection || d3.geoMercator()
  options = options || { zoom: true }

  const dispatch = d3.dispatch(
    'color-updated',
    'update-color'
  )

  const editor = {
    features,
    container,
    render,
    projection,
    options,
    dispatch
  }

  // editor.mapView = () => mapView(editor)
  // editor.buttonView = () => buttonView(editor)
  // editor.propertiesView = () => propertiesView(editor)
  // editor.propertyView = property => propertyView(editor, property)
  editor.colorPropertyView = () => colorPropertyView(dispatch, { color: '' })
  // editor.jsonView = () => jsonView(editor)
  // editor.tableView = properties => tableView(editor, properties)

  editor.selected = () => features.features.filter(d => d.selected)

  // debounce data => update
  dispatch.on(
    'data',
    debounce(message => {
      dispatch.call('update', null, message)
    }, 400)
  )

  return editor
}
