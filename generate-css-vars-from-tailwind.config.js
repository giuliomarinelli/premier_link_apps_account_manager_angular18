'use strict'
const twConfig = require('./tailwind.config')
const { writeFileSync } = require('fs')
const { join } = require('path')

const colors = twConfig.theme.extend.colors

const _colors = []

const fromCamelToSnakeDashedCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')


for (const prop in colors) {
  const item = colors[prop]
  if (typeof item === "string") {
    _colors.push({
      name: prop,
      value: item
    })
  } else if (typeof item === "object") {
    for (const _prop in item) {
      const _item = item[_prop]
      if (typeof _item === "string") {
        _colors.push({
          name: `${prop}-${fromCamelToSnakeDashedCase(_prop)}`,
          value: _item
        })
      }
    }
  }
}

const createSassVarLine = (obj) => `$${obj.name}: ${obj.value};\n`.toLowerCase()

const createCssVarLine = (obj) => `--${obj.name}: ${obj.value};\n`.toLowerCase()

let sassVarsFile = ""
let cssVarsFile = ":root{\n"

_colors.forEach((obj, i) => {
  sassVarsFile += createSassVarLine(obj)
  cssVarsFile += " ".repeat(4) + createCssVarLine(obj)
  if (i === _colors.length - 1) cssVarsFile += "}"
})

writeFileSync(join(__dirname, 'src/scss-partials/_tw_sass_variables.scss'), sassVarsFile)
writeFileSync(join(__dirname, 'src/scss-partials/_tw_css_variables.scss'), cssVarsFile)

console.log(`SUCCESS!

- created src/scss-partials/_tw_sass_variables.scss:

  ${sassVarsFile}

===================

- created src/scss-partials/_tw_css_variables.scss:

  ${cssVarsFile}`)
