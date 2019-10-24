import { test } from 'tape'
import color2css from '../src/color2css.js'

test('color2css returns color name if found in lookup list', function (t) {
  t.equal(color2css('#800080'), 'purple')
  t.equal(color2css('#ffff00'), 'yellow')
  t.equal(color2css('800080'), 'purple')
  t.end()
})

test('color2css returns input value if not found in lookup list', function (t) {
  t.equal(color2css('#800081'), '#800081')
  t.equal(color2css('#80008g'), '#80008g')
  t.equal(color2css('##ffff00'), '##ffff00')
  t.equal(color2css('yellow'), 'yellow')
  t.end()
})
