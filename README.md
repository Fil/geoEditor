# geoEditor

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

https://observablehq.com/@fil/geoeditor

## Installing



## API Reference

<a name="newGeoEditor" href="#newGeoEditor">#</a> <b>geoEditor</b>(<i>options</i>) · [Source](https://github.com/Fil/geoEditor/blob/master/index.js)

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
