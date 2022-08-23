const isRenderer =
  typeof window !== 'undefined' &&
  typeof window.process === 'object' &&
  window.process.type === 'renderer'
console.log('Loading i18n.js with isRenderer: ' + isRenderer)
const setting = undefined
//const nativeRequire = eval('require')

//const setting = isRenderer
//  ? require('./modules/setting.js')
//  : nativeRequire('./setting')

const languages = {
  en: {
    name: 'English',
    nativeName: 'English',
    stats: {
      totalStringsCount: 462,
      translatedStringsCount: 462,
      progress: 1,
      unusedFlags: 0
    }
  }
}
/*
const {ipcMain} = require('electron')
const {readFileSync} = require('fs')
const path = require('path')
const {load: dolmLoad, getKey: dolmGetKey} = require('dolm')
const languages = require('@sabaki/i18n')

function isRenderer() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

const mainI18n = isRenderer() ? remote.require('./i18n') : null
const setting = isRenderer
  ? require('src/modules/setting.js')
  : isElectron
  ? nativeRequire('./setting')
  : null

function getKey(input, params = {}) {
  let key = dolmGetKey(input, params)
  return key.replace(/&(?=\w)/g, '')
}

const dolm = dolmLoad({}, getKey)
*/

let appLang = setting == null ? undefined : setting.get('app.lang')

//exports.getKey = getKey
exports.getKey = function(input, params = {}) {
  console.log('Mocking i18n.getKey(' + input + ', ' + params + ')')
  return input
}
//exports.t = dolm.t
exports.t = function(context, input, params = {}) {
  console.log('Mocking i18n.t(' + context + ', ' + input + ', ' + params + ')')
  return input
}
//exports.context = dolm.context
exports.context = function(context) {
  return (input, params = {}) => exports.t(context, input, params)
}

exports.formatNumber = function(num) {
  return new Intl.NumberFormat(appLang).format(num)
}

exports.formatMonth = function(month) {
  let date = new Date()
  date.setMonth(month)
  return date.toLocaleString(appLang, {month: 'long'})
}

exports.formatWeekday = function(weekday) {
  let date = new Date(2020, 2, 1 + (weekday % 7))
  return date.toLocaleString(appLang, {weekday: 'long'})
}

exports.formatWeekdayShort = function(weekday) {
  let date = new Date(2020, 2, 1 + (weekday % 7))
  return date.toLocaleString(appLang, {weekday: 'short'})
}

/*
function loadStrings(strings) {
  dolm.load(strings)

  if (isElectron && !isRenderer) {
    ipcMain.emit('build-menu')
  }
}
*/

exports.loadFile = function(filename) {
  /*
  if (isRenderer) {
    mainI18n.loadFile(filename)
  }

  try {
    loadStrings(
      Function(`
        "use strict"

        let exports = {}
        let module = {exports}

        ;(() => (${readFileSync(filename, 'utf8')}))()

        return module.exports
      `)()
    )
  } catch (err) {
    loadStrings({})
  }
  */
  console.log('Mock i18n.loadFile(' + filename + ')')
  return null
}

exports.loadLang = function(lang) {
  appLang = lang

  exports.loadFile(languages[lang].filename)
}

exports.getLanguages = function() {
  console.log('Mock i18n.getLanguages')
  return languages
}

if (appLang != null) {
  exports.loadLang(appLang)
}

//export default exports
