# geoEditor

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

https://observablehq.com/@fil/geoeditor

## Installing

Install with NPM (`npm install geoeditor`) or Yarn (`yarn add geoeditor`), then:

```javascript
// import as an ES module
import GeoEditor from 'geoeditor'

// or require in Node / Browserify
const GeoEditor = require('geoeditor')
```

Or use a browser build directly:

```html
<script src="https://unpkg.com/geoeditor@1.0.0/geoeditor.min.js"></script> <!-- minified build -->
<script src="https://unpkg.com/geoeditor@1.0.0/geoeditor.js"></script> <!-- dev build -->
```

## API Reference

<a name="newGeoEditor" href="#newGeoEditor">#</a> new <b>GeoEditor</b>(<i>options</i>) · [Source](https://github.com/Fil/geoEditor/blob/master/index.js)

...

```javascript
import { geoEditor } from './geoeditor.esm.js'
const editor = geoEditor()
const colorSelector = editor.colorPropertyView()
document.querySelector('body').append(colorSelector)
```

## Development

### Install and run

```
git clone git@github.com:Fil/geoEditor.git
cd geoEditor
npm install
npm run start
```

### Publishing a release

```
npm install
npm run release
npm run publish
```
