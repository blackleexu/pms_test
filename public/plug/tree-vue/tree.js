/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getTag = __webpack_require__(1);

var _getTag2 = _interopRequireDefault(_getTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isArray(value) {
  return (0, _getTag2.default)(value) === '[object Array]';
}

exports.default = isArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function getTag(value) {
  return Object.prototype.toString.call(value);
}

exports.default = getTag;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getTag = __webpack_require__(1);

var _getTag2 = _interopRequireDefault(_getTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPlainObject(value) {
  return (0, _getTag2.default)(value) === '[object Object]';
}

exports.default = isPlainObject;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getTag = __webpack_require__(1);

var _getTag2 = _interopRequireDefault(_getTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isString(value) {
  return (0, _getTag2.default)(value) === '[object String]';
}

exports.default = isString;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getTag = __webpack_require__(1);

var _getTag2 = _interopRequireDefault(_getTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isUndefined(value) {
  return (0, _getTag2.default)(value) === '[object Undefined]';
}

exports.default = isUndefined;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mergeBase = __webpack_require__(10);

var _mergeBase2 = _interopRequireDefault(_mergeBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function merge() {
  var target = arguments[0] || {};
  for (var i = 1; i < arguments.length; i++) {
    target = (0, _mergeBase2.default)(target, arguments[i]);
  }
  return target;
}

exports.default = merge;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mergeDeepBase = __webpack_require__(11);

var _mergeDeepBase2 = _interopRequireDefault(_mergeDeepBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeDeep() {
  var target = arguments[0] || {};
  for (var i = 1; i < arguments.length; i++) {
    target = (0, _mergeDeepBase2.default)(target, arguments[i]);
  }
  return target;
}

exports.default = mergeDeep;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(13)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined = __webpack_require__(4);

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = __webpack_require__(2);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;

function mergeBase(target, src) {
  if (target === src) {
    return target;
  }
  var result = target;
  if ((0, _isArray2.default)(src)) {
    if (!(0, _isArray2.default)(result)) {
      result = [];
    }
    for (var i = 0; i < src.length; i++) {
      if (!(0, _isUndefined2.default)(src[i]) && result[i] !== src[i] && result !== src[i]) {
        result[i] = src[i];
      }
    }
    return result;
  }
  if ((0, _isPlainObject2.default)(src)) {
    if (!(0, _isPlainObject2.default)(result)) {
      result = {};
    }
    for (var key in src) {
      if (hasOwnProperty.call(src, key) && !(0, _isUndefined2.default)(src[key]) && result[key] !== src[key] && result !== src[key]) {
        result[key] = src[key];
      }
    }
    return result;
  }
  if (!(0, _isUndefined2.default)(src)) {
    result = src;
  }
  return result;
}

exports.default = mergeBase;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined = __webpack_require__(4);

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = __webpack_require__(2);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;

function mergeDeepBase(target, src) {
  if (target === src) {
    return target;
  }
  var result = target;
  if ((0, _isArray2.default)(src)) {
    if (!(0, _isArray2.default)(result)) {
      result = [];
    }
    for (var i = 0; i < src.length; i++) {
      if (!(0, _isUndefined2.default)(src[i]) && result[i] !== src[i] && result !== src[i]) {
        result[i] = mergeDeepBase(result[i], src[i]);
      }
    }
    return result;
  }
  if ((0, _isPlainObject2.default)(src)) {
    if (!(0, _isPlainObject2.default)(result)) {
      result = {};
    }
    for (var key in src) {
      if (hasOwnProperty.call(src, key) && !(0, _isUndefined2.default)(src[key]) && result[key] !== src[key] && result !== src[key]) {
        result[key] = mergeDeepBase(result[key], src[key]);
      }
    }
    return result;
  }
  if (!(0, _isUndefined2.default)(src)) {
    result = src;
  }
  return result;
}

exports.default = mergeDeepBase;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString = __webpack_require__(3);

var _isString2 = _interopRequireDefault(_isString);

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = {};
utils.toArray = function (params) {
  var array = [];
  if ((0, _isString2.default)(params)) {
    array = params.split(',');
  } else if ((0, _isArray2.default)(params)) {
    array = params;
  } else {
    console.warn('请检查 参数 格式');
  }
  return array;
};
utils._uniqueArray = function (arrayIn) {
  var ua = [];
  for (var i = 0; i < arrayIn.length; i++) {
    if (ua.indexOf(arrayIn[i]) === -1) {
      ua.push(arrayIn[i]);
    }
  }
  return ua;
};

exports.default = utils;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clone = __webpack_require__(24);

var _clone2 = _interopRequireDefault(_clone);

var _cloneDeep = __webpack_require__(25);

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _merge = __webpack_require__(5);

var _merge2 = _interopRequireDefault(_merge);

var _mergeDeep = __webpack_require__(6);

var _mergeDeep2 = _interopRequireDefault(_mergeDeep);

var _isString = __webpack_require__(3);

var _isString2 = _interopRequireDefault(_isString);

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initOptions(options) {
  var defOptions = {
    zIndex: 9,
    is_trigger: false,
    has_search: false,
    only_child: false,
    node_merge: false,
    is_multi: true,
    expand: false,
    expandIds: null,
    sel_ids: '',
    checkbox: false,
    editable: false,
    defaultMenu: true,
    extend: false,

    lazyLoad: false,
    lazyLoadUrl: '',
    isChangeParent: true,
    isChangeChild: true,
    editorText: {
      edit: '修改部门',
      delete: '删除部门',
      add: '添加子部门',
      up: '上移',
      down: '下移',
      unable: '无法操作'
    },
    style: {
      tree: {
        width: null,
        maxHeight: 300
      },
      item: {},
      children: {},
      custom: {
        position: 'absolute',
        top: '0',
        left: '0'
      }
    },
    class: {
      tree: '',
      item: '',
      active: 'x-tree-item-active',
      children: '',
      custom: ''
    },
    onExpand: function onExpand() {},
    onClick: function onClick() {},
    onCheck: function onCheck() {},
    onEdit: function onEdit() {},
    onDelete: function onDelete() {},
    onAddChild: function onAddChild() {},
    onSort: function onSort() {}
  };
  if (options.style && options.style.tree && options.style.tree.width) {
    defOptions.style.custom.left = options.style.tree.width;
  }
  var opt = (0, _mergeDeep2.default)({}, defOptions, options);
  return opt;
}

function _traverseTree(tree, fn, input, output) {
  if (!tree) {
    return true;
  }
  var _continue = fn(tree, input, output);
  if (_continue.children && tree.children) {
    for (var i = 0; i < tree.children.length; i++) {
      var brother = _traverseTree(tree.children[i], fn, input, output);
      if (!brother) {
        break;
      }
    }
  }
  return _continue.brother;
}

function _arrayToTree(arrayIn, opt) {
  var rootId = _getTreeRoot(arrayIn);
  var treeData = {
    id: rootId,
    name: 'ROOT',
    nodeId: null,
    is_node: true,
    is_check: false,
    children: [],
    parent: null,
    level: 0,
    expand: true,
    addition: null,
    menu: null,
    textIcon: null,
    active: [],
    options: opt,
    originData: arrayIn,
    itemAmount: arrayIn.length
  };
  treeData.children = _getSubTree(arrayIn, treeData, opt);
  return treeData;
}

function _getTreeRoot(arrayIn) {
  var rootId = [];
  var copy = (0, _clone2.default)(arrayIn);
  for (var i = 0, len = arrayIn.length; i < len; i++) {
    for (var j = i; j < len; j++) {
      if (arrayIn[i].id == arrayIn[j].nodeId) {
        copy[j] = null;
      }
      if (arrayIn[i].nodeId == arrayIn[j].id) {
        copy[i] = null;
      }
    }
  }

  for (var k = 0; k < copy.length; k++) {
    if (copy[k]) {
      rootId.push(copy[k].nodeId);
    }
  }
  rootId = _uniqueArray(rootId);

  if (rootId.length > 1) {
    console.warn('warning: rootId不唯一', rootId);
  } else if (rootId.length <= 0) {
    console.warn('warning: 没有rootId', rootId);
  }

  return rootId[0];
}

function _uniqueArray(arrayIn) {
  var ua = [];
  for (var i = 0; i < arrayIn.length; i++) {
    if (ua.indexOf(arrayIn[i]) == -1) {
      ua.push(arrayIn[i]);
    }
  }
  return ua;
}

function _getSubTree(arrayIn, parent, opt) {
  var result = [];
  var temp = {};
  for (var i = 0; i < arrayIn.length; i++) {
    if (arrayIn[i].nodeId == parent.id) {
      temp = (0, _clone2.default)(arrayIn[i]);
      if (opt.checkbox && temp.is_check === undefined) {
        temp.is_check = false;
      }
      temp.parent = parent;
      temp.addition = null;
      temp.menu = null;
      temp.textIcon = null;
      temp.class = null;
      temp.style = null;
      temp.level = parent.level + 1;
      if ((0, _isString2.default)(opt.expandIds) || (0, _isArray2.default)(opt.expandIds)) {
        temp.expand = false;
      } else {
        temp.expand = expandLvl(opt.expand, temp);
      }
      temp.checkState = temp.is_check;
      if (temp.is_node) {
        temp.children = _getSubTree(arrayIn, temp, opt);
      } else {
        temp.children = [];
      }
      result.push(temp);
    }
  }
  return result;
}

function expandLvl(expand, temp) {
  if (expand === true) {
    return true;
  } else if (expand === false && temp.level <= 0) {
    return true;
  } else if (temp.level <= expand) {
    return true;
  }
  return false;
}

function _checkTreeByIds(tree, sel_ids) {
  var ids = [];
  if ((0, _isString2.default)(sel_ids)) {
    ids = sel_ids.split(',');
  } else if ((0, _isArray2.default)(sel_ids)) {
    ids = sel_ids;
  } else {
    console.warn('请检查 sel_ids 格式');
  }

  _traverseTree(tree, _checkTreeByIdsFn, ids);

  return tree;
}

function _checkTreeByIdsFn(item, ids) {
  if (!ids.length) {
    return {
      children: false,
      brother: false
    };
  }
  for (var i = 0; i < ids.length; i++) {
    if (item.id == ids[i]) {
      changeItem(item, true);
      ids.splice(i, 1);
      break;
    }
  }
  return {
    children: ids.length,
    brother: ids.length
  };
}

function _expandTreeByIds(tree, expand_ids) {
  var ids = [];
  if ((0, _isString2.default)(expand_ids)) {
    ids = expand_ids.split(',');
  } else if ((0, _isArray2.default)(expand_ids)) {
    ids = expand_ids;
  } else {
    console.warn('请检查 expandIds 格式');
  }
  _traverseTree(tree, _expandTreeByIdsFn, ids);
  return tree;
}

function _expandTreeByIdsFn(item, ids) {
  if (!ids.length) {
    return {
      children: false,
      brother: false
    };
  }
  for (var i = 0; i < ids.length; i++) {
    if (item.id == ids[i]) {
      _expandParent(item.parent, true);
      ids.splice(i, 1);
      break;
    }
  }
  return {
    children: ids.length,
    brother: ids.length
  };
}

function _activeTreeByIds(tree, expand_ids) {
  var ids = [];
  if ((0, _isString2.default)(expand_ids)) {
    ids = expand_ids.split(',');
  } else if ((0, _isArray2.default)(expand_ids)) {
    ids = expand_ids;
  } else {
    console.warn('请检查 expandIds 格式');
  }
  _traverseTree(tree, _activeTreeByIdsFn, ids);
  return tree;
}

function _activeTreeByIdsFn(item, ids) {
  if (!ids.length) {
    return {
      children: false,
      brother: false
    };
  }
  for (var i = 0; i < ids.length; i++) {
    if (item.id == ids[i]) {
      _expandParent(item.parent, true);
      ids.splice(i, 1);
      break;
    }
  }
  return {
    children: ids.length,
    brother: ids.length
  };
}

function changeItem(item, change, isChangeParent, isChangeChild) {
  if (!item) {
    return false;
  }
  item.is_check = change;
  item.checkState = change;
  if (item.children && isChangeChild !== undefined && isChangeChild === true) {
    _changeChildren(item.children, change);
    _changeChildrenState(item.children, change);
  }
  if (item.parent && isChangeParent !== undefined && isChangeParent === true) {
    _changeParent(item.parent, change);
    _changeParentState(item.parent, change);
  }
}

function _changeChildrenState(children, change) {
  if (!children) {
    return false;
  }
  for (var i = 0; i < children.length; i++) {
    children[i].checkState = change;
    if (children[i].children) {
      _changeChildrenState(children[i].children, change);
    }
  }
  return true;
}

function _changeChildren(children, change) {
  if (!children) {
    return false;
  }
  for (var i = 0; i < children.length; i++) {
    if (children[i].is_check !== change) {
      children[i].is_check = change;
      if (children[i].children) {
        _changeChildren(children[i].children, change);
      }
    }
  }
  return true;
}

function _changeParentState(parent, change) {
  if (!parent) {
    return false;
  }
  var old = parent.checkState;
  var len = parent.children.length;

  if (change === 'z') {
    parent.checkState = 'z';
  } else if (change === true) {
    var n = 0;
    for (var i = 0; i < len; i++) {
      if (parent.children[i].checkState === true) {
        n += 1;
      } else {
        parent.checkState = 'z';
        break;
      }
    }
    if (n === len) {
      parent.checkState = true;
    }
  } else if (change === false) {
    var m = 0;
    for (var j = 0; j < len; j++) {
      if (parent.children[j].checkState === false) {
        m += 1;
      } else {
        parent.checkState = 'z';
        break;
      }
    }
    if (m === len) {
      parent.checkState = false;
    }
  }

  if (parent.parent && parent.checkState !== old) {
    _changeParentState(parent.parent, parent.checkState);
  }
  return true;
}

function _changeParent(parent, change) {
  if (!parent || parent.is_check == change) {
    return false;
  }
  if (change) {
    for (var i = 0; i < parent.children.length; i++) {
      if (!parent.children[i].is_check) {
        return false;
      }
    }
  }
  parent.is_check = change;
  if (parent.parent) {
    _changeParent(parent.parent, change);
  }
  return true;
}

function _expandParent(parent, expand) {
  parent.expand = expand;
  if (parent.parent) {
    _expandParent(parent.parent, expand);
  }
  return true;
}

function getItemById(tree, id) {
  if (!tree || id == undefined || id == null) {
    return false;
  }
  if (tree.id == id) {
    return tree;
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) {
      var item = getItemById(tree.children[i], id);
      if (item) {
        return item;
      }
    }
  }
  return false;
}

function getItemByIds(tree, ids) {
  if (!tree || !ids || !ids.length) {
    return false;
  }
  var result = [];
  for (var i = 0; i < ids.length; i++) {
    if (tree.id == ids[i]) {
      result.push(tree);
      ids.splice(i, 1);
    }
  }
  if (ids.length && tree.children && tree.children.length) {
    for (var _i = 0; _i < tree.children.length; _i++) {
      var result2 = getItemByIds(tree.children[_i], ids);
      result = result.concat(result2);
      if (!ids.length) {
        break;
      }
    }
  }
  return result;
}

function changeItemKeyValue(item, key, value) {
  if (!item || !key) {
    return false;
  }
  var temp = item;
  temp[key] = value;
  return true;
}

function getCheckedItems(tree) {
  if (!tree) {
    return false;
  }
  var result = [];
  if (tree.is_check === true) {
    result.push(tree);
  }
  if (tree.children && tree.children.length) {
    for (var i = 0; i < tree.children.length; i++) {
      var result2 = getCheckedItems(tree.children[i]);
      result = result.concat(result2);
    }
  }
  return result;
}

function getItems(tree, typeIn) {
  if (!tree) {
    return false;
  }

  var type = void 0;
  var leaf = [];
  var node = [];
  var data = getCheckedItems(tree);

  if (!typeIn) {
    type = 1;
  } else {
    type = typeIn;
  }

  switch (type) {
    case 'node':
      data.forEach(function (n) {
        if (n.is_check === true && n.is_node === true) {
          node.push(n);
        }
      }, this);
      break;

    case 'leaf':
      data.forEach(function (n) {
        if (n.is_check === true && n.is_node === false) {
          leaf.push(n);
        }
      }, this);
      break;

    case 'merge':
      var nodeIds = [];
      data.forEach(function (n) {
        if (n.is_check === true && n.is_node === true && n.level !== 0) {
          nodeIds.push(n.id);
        }
      }, this);

      var copy = [];
      for (var index = 0; index < data.length; index++) {
        copy[index] = (0, _clone2.default)(data[index]);
      }

      for (var _index = 0; _index < copy.length; _index++) {
        if (nodeIds.indexOf(copy[_index].nodeId) != -1 || !copy[_index].is_check || copy[_index].level === 0) {
          copy[_index] = null;
        }
      }
      copy.forEach(function (n) {
        if (n && n.is_node === true) {
          node.push(n);
        } else if (n && n.is_node === false) {
          leaf.push(n);
        }
      }, this);
      break;
    case 'all':
    default:
      data.forEach(function (n) {
        if (n.is_check === true && n.is_node === true) {
          node.push(n);
        } else if (n.is_check === true && n.is_node === false) {
          leaf.push(n);
        }
      }, this);
      break;
  }

  return {
    node: node,
    leaf: leaf
  };
}

function getIds(tree, type) {
  var _this = this;

  var ids = {};
  var items = getItems(tree, type);

  var _loop = function _loop(key) {
    ids[key] = [];
    if (items.hasOwnProperty(key) && items[key].length > 0) {
      items[key].forEach(function (element) {
        ids[key].push(element.id);
      }, _this);
    }
  };

  for (var key in items) {
    _loop(key);
  }

  return ids;
}

function getNames(tree, type) {
  var _this2 = this;

  var names = {};
  var items = getItems(tree, type);

  var _loop2 = function _loop2(key) {
    names[key] = [];
    if (items.hasOwnProperty(key) && items[key].length > 0) {
      items[key].forEach(function (element) {
        names[key].push(element.name);
      }, _this2);
    }
  };

  for (var key in items) {
    _loop2(key);
  }
  return names;
}

function getItem(tree) {
  var data = getItems(tree);
  _traverseTree(model, getNameFn, name);
  return name;
}

function getId(model) {
  var name = [];
  _traverseTree(model, getNameFn, name);
  return name;
}

function getName(model) {
  var name = [];
  _traverseTree(model, getNameFn, name);
  return name;
}

var fn = {
  _initOptions: _initOptions,

  _arrayToTree: _arrayToTree,
  _getTreeRoot: _getTreeRoot,
  _uniqueArray: _uniqueArray,
  _getSubTree: _getSubTree,

  _checkTreeByIds: _checkTreeByIds,
  _checkTreeByIdsFn: _checkTreeByIdsFn,

  _expandTreeByIds: _expandTreeByIds,
  _expandTreeByIdsFn: _expandTreeByIdsFn,
  _expandParent: _expandParent,

  _activeTreeByIds: _activeTreeByIds,
  _activeTreeByIdsFn: _activeTreeByIdsFn,

  _traverseTree: _traverseTree,

  changeItem: changeItem,
  _changeChildren: _changeChildren,
  _changeParent: _changeParent,

  getItemById: getItemById,
  getItemByIds: getItemByIds,

  getItems: getItems,
  getIds: getIds,
  getNames: getNames,
  getItem: getItem,
  getId: getId,
  getName: getName
};

exports.default = fn;

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(40)

var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(36),
  /* scopeId */
  "data-v-2c0e2680",
  /* cssModules */
  null
)
Component.options.__file = "D:\\wamp\\www\\test\\vue\\tree-vue\\src\\tree-xbcx\\xTree.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] xTree.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c0e2680", Component.options)
  } else {
    hotAPI.reload("data-v-2c0e2680", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_merge__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_merge___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_merge__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mergeDeep__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_mergeDeep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_mergeDeep__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__utils_utils__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__methods__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__methods___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__methods__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__xTreeItem_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__xTreeItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__xTreeItem_vue__);







/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'x-tree',
  components: {
    xTreeItem: __WEBPACK_IMPORTED_MODULE_4__xTreeItem_vue___default.a
  },
  props: {
    data: Array,
    options: Object,
    fn: Object
  },
  data: function data() {
    this.opts = __WEBPACK_IMPORTED_MODULE_3__methods___default.a._initOptions(this.options);
    this.tree = __WEBPACK_IMPORTED_MODULE_3__methods___default.a._arrayToTree(this.data, this.opts);
    this.tree = this.initTree(this.tree, this.opts);
    this.exportFn();
    return {
      dataTree: this.tree,
      opts: this.opts,
      fnfn: __WEBPACK_IMPORTED_MODULE_3__methods___default.a
    };
  },
  computed: {},
  methods: {
    initTree: function initTree(tree, options) {

      var treeChecked = options.sel_ids ? __WEBPACK_IMPORTED_MODULE_3__methods___default.a._checkTreeByIds(tree, options.sel_ids) : tree;
      var treeExpand = options.expandIds ? __WEBPACK_IMPORTED_MODULE_3__methods___default.a._expandTreeByIds(treeChecked, options.expandIds) : treeChecked;

      if (options.expandIds) {

        var ids = __WEBPACK_IMPORTED_MODULE_2__utils_utils___default.a.toArray(options.expandIds);
        var items = __WEBPACK_IMPORTED_MODULE_3__methods___default.a.getItemByIds(tree, ids);
        for (var i = 0; i < items.length; i++) {
          this.activeItem(items[i]);
        }
      }
      return treeExpand;
    },
    exportFn: function exportFn() {
      this.fn.getItems = this.getItems;
      this.fn.getIds = this.getIds;
      this.fn.getNames = this.getNames;
      this.fn.getItemById = this.getItemById;
      this.fn.locateItem = this.locateItem;
      this.fn.locateItems = this.locateItems;
      this.fn.activeItem = this.activeItem;
      this.fn.clearActive = this.clearActive;
      this.fn.setCustom = this.setCustom;
      this.fn.setTextIcon = this.setTextIcon;
      this.fn.checkItem = this.checkItem;
      this.fn.canceAllItem = this.canceAllItem;
    },

    checkItem: function checkItem(items, is_check) {
      for (var i = 0; i < items.length; i++) {
        if (is_check !== 'undefined') {

          __WEBPACK_IMPORTED_MODULE_3__methods___default.a.changeItem(items[i], is_check);
        } else {
          __WEBPACK_IMPORTED_MODULE_3__methods___default.a.changeItem(items[i], !items[i].is_check);
        }
      }
    },
    getItems: function getItems(type) {
      return __WEBPACK_IMPORTED_MODULE_3__methods___default.a.getItems(this.tree, type);
    },
    getIds: function getIds(type) {
      return __WEBPACK_IMPORTED_MODULE_3__methods___default.a.getIds(this.tree, type);
    },
    getNames: function getNames(type) {
      return __WEBPACK_IMPORTED_MODULE_3__methods___default.a.getNames(this.tree, type);
    },
    getItemById: function getItemById(id) {
      var item = __WEBPACK_IMPORTED_MODULE_3__methods___default.a.getItemById(this.tree, id);
      if (!item) {
        console.warn('没有找到对应的item');
        return;
      }
      return item;
    },
    canceAllItem: function canceAllItem() {
      console.log('items', this.fn.getItems()['leaf']);
      var list = this.fn.getItems()['leaf'].concat(this.fn.getItems()['node']);
      for (var i = 0; i < list.length; i++) {
        __WEBPACK_IMPORTED_MODULE_3__methods___default.a.changeItem(list[i], false);
      }
    },
    activeItem: function activeItem(item) {
      item.class = this.opts.class.active;
      this.tree.active.push(item);
    },
    clearActive: function clearActive(type, id) {
      var array = this.tree.active;
      if (type) {
        for (var index = 0; index < array.length; index++) {
          array[index].class = '';
        }
        array.length = 0;
      } else {
        for (var _index = 0; _index < array.length; _index++) {
          if (array[_index].id == id) {
            array[_index].class = '';
            array.splice();
            break;
          }
        }
      }
      return;
    },
    locateItem: function locateItem(id) {
      var item = __WEBPACK_IMPORTED_MODULE_3__methods___default.a.getItemById(this.tree, id);
      if (!item) {
        console.warn('没有找到对应的item');
        return;
      }
      item.expand = true;
      __WEBPACK_IMPORTED_MODULE_3__methods___default.a._expandParent(item.parent, true);
      this.activeItem(item);
      return item;
    },
    locateItems: function locateItems(ids) {
      var tree = __WEBPACK_IMPORTED_MODULE_3__methods___default.a._expandTreeByIds(this.tree, ids);
      return tree;
    },
    setCustom: function setCustom(id, custom) {
      var item = this.getItemById(id);
      if (item) {
        item.custom = custom;
      } else {
        console.warn('未找到item, 请检查id是否正确');
      }
      return item;
    },
    setTextIcon: function setTextIcon(id, textIcon) {
      var item = this.getItemById(id);
      if (item) {
        item.textIcon = textIcon;
      } else {
        console.warn('未找到item, 请检查id是否正确');
      }
      return item;
    }
  }
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__methods__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'x-tree-item',
  props: {
    model: Object,
    options: Object,
    fn: Object,
    tree: Object
  },
  data: function data() {
    return {
      text: this.model.name,
      title: this.model.name,
      iconfont: 'iconfont',
      showMenu: false
    };
  },
  beforeCreate: function beforeCreate() {},
  created: function created() {
    this.create();
  },

  computed: {
    itemIf: function itemIf() {
      return true;
    },
    itemShow: function itemShow() {
      return true;
    },
    itemClass: function itemClass() {
      return this.model.is_node ? 'x-tree-node' : 'x-tree-leaf';
    },
    itemStyle: function itemStyle() {
      return '';
    },
    selfIf: function selfIf() {
      return true;
    },
    selfShow: function selfShow() {
      return this.model.level;
    },
    selfId: function selfId() {
      return this.model.id;
    },
    selfClass: function selfClass() {
      return [this.options.editable ? '' : 'editable_false', this.model.class];
    },
    extendShow: function extendShow() {
      if (this.options.extend) {
        return true;
      }
      return false;
    },
    extendIf: function extendIf() {
      if (this.model.extend) {
        return true;
      }
      return false;
    },
    titleFn: function titleFn() {
      if (this.model.tip_title) {
        return this.model.tip_title;
      }
      return this.model.name;
    },
    selfStyle: function selfStyle() {
      var paddingLeft = this.model.level * 1.3 - 0.5;
      return [{ 'padding-left': paddingLeft + 'em' }, this.options.style.item, this.model.style];
    },
    expandIf: function expandIf() {
      return true;
    },
    expandShow: function expandShow() {
      return true;
    },
    expandClass: function expandClass() {
      if (this.childrenIf === false) {
        return 'icon-sos icon-blank';
      }
      return this.childrenShow ? 'icon-1' : 'icon-1-copy';
    },
    expandStyle: function expandStyle() {
      return '';
    },
    checkboxIf: function checkboxIf() {
      return true;
    },
    checkboxShow: function checkboxShow() {
      return this.options.checkbox;
    },
    checkboxClass: function checkboxClass() {
      var faIcon = '';
      if (this.model.checkState === true) {
        faIcon = 'icon-square-check';
      } else if (this.model.checkState === false) {
        faIcon = 'icon-square';
      } else if (this.model.checkState === 'z') {
        faIcon = 'icon-square-minus';
      }
      return faIcon;
    },
    checkboxStyle: function checkboxStyle() {
      return '';
    },
    iconIf: function iconIf() {
      return true;
    },
    iconShow: function iconShow() {
      if (this.options.textIcon) {
        return true;
      }
      if (this.model.textIcon) {
        return true;
      }
      return this.model.is_node;
    },
    iconClass: function iconClass() {
      var iconIcon = '';

      if (this.model.textIcon) {
        iconIcon = this.model.textIcon;
      } else if (this.model.is_node) {
        iconIcon = 'icon-wenjianjia1';
      }
      return iconIcon;
    },
    iconStyle: function iconStyle() {
      var iconS = '[]';
      if (this.model.iconImg) {
        iconS = [{ 'background': this.model.iconImg }];
      }
      return '';
    },
    textIf: function textIf() {
      return true;
    },
    textShow: function textShow() {
      return true;
    },
    textClass: function textClass() {
      return true;
    },
    textStyle: function textStyle() {
      return true;
    },
    dropdownIf: function dropdownIf() {
      return this.menuIf;
    },
    dropdownShow: function dropdownShow() {
      return true;
    },
    dropdownClass: function dropdownClass() {
      return 'icon-xiangxia11';
    },
    dropdownStyle: function dropdownStyle() {
      return '';
    },
    menuIf: function menuIf() {
      if (this.options.editable === false) {
        return false;
      }
      if (this.options.defaultMenu === false) {
        return this.model.menu.length !== 0;
      } else if (!this.model.is_edit && !this.model.is_delete && !this.model.is_add && !this.sortable.upAble && !this.sortable.downAble) {
        if (this.model.menu) {
          return this.model.menu.length !== 0;
        } else {
          return false;
        }
      }
      return true;
    },
    menuShow: function menuShow() {
      return this.showMenu;
    },
    menuClass: function menuClass() {
      return '';
    },
    menuStyle: function menuStyle() {
      return '';
    },
    defaultMenuIf: function defaultMenuIf() {
      return true;
    },
    defaultMenuShow: function defaultMenuShow() {
      return this.options.defaultMenu;
    },
    defaultMenuClass: function defaultMenuClass() {
      return '';
    },
    defaultMenuStyle: function defaultMenuStyle() {
      return '';
    },
    customMenuIf: function customMenuIf() {
      return true;
    },
    customMenuShow: function customMenuShow() {
      return true;
    },
    customMenuClass: function customMenuClass() {
      return '';
    },
    customMenuStyle: function customMenuStyle() {
      return '';
    },
    additionIf: function additionIf() {
      return this.model.addition;
    },
    additionShow: function additionShow() {
      return this.model.level;
    },
    additionClass: function additionClass() {
      return '';
    },
    additionStyle: function additionStyle() {
      return this.options.style.custom;
    },
    childrenIf: function childrenIf() {
      return this.model.is_node && this.model.children && this.model.children.length;
    },
    childrenShow: function childrenShow() {
      return this.model.expand;
    },
    childrenClass: function childrenClass() {
      return '';
    },
    childrenStyle: function childrenStyle() {
      return this.options.style.children;
    },
    index: function index() {
      if (!this.model.parent) {
        return false;
      }
      return this.model.parent.children.indexOf(this.model);
    },
    sortable: function sortable() {
      if (!this.model.parent || this.model.parent.children.length == 1) {
        return {
          upAble: false,
          downAble: false
        };
      }
      var upable = true;
      var downable = true;
      var index = this.model.parent.children.indexOf(this.model);
      var len = this.model.parent.children.length;
      if (index === 0) {
        upable = false;
      } else if (index >= len - 1) {
        downable = false;
      }
      upable = this.model.is_move_up !== undefined ? this.model.is_move_up : upable;
      downable = this.model.is_move_down !== undefined ? this.model.is_move_down : upable;
      return {
        upAble: upable,
        downAble: downable
      };
    }
  },

  methods: {
    create: function create() {
      if (this.options.custom) {
        this.model.addition = this.options.custom(this.model);
      }
      if (this.options.menuCustom) {
        this.model.menu = this.options.menuCustom(this.model);
      }
      if (this.options.textIcon && this.model.id) {
        if (typeof this.options.textIcon == 'function') {
          this.model.textIcon = this.options.textIcon(this.model);
        } else {
          this.model.textIcon = window[this.options.textIcon](this.model);
        }
      }
    },
    expandFn: function expandFn() {

      var that = this;
      if (this.options.lazyLoad && this.options.lazyLoadUrl && (this.model.children.length == 0 || !this.model.children)) {
        if (!this.model.expand) {
          $.ajax({
            type: "POST",
            url: that.options.lazyLoadUrl,
            data: {
              id: that.model.id
            },
            success: function success(response) {
              that.model.expand = !that.model.expand;

              var data = void 0;
              if (response instanceof Object && response['list'] instanceof Array) {
                data = response['list'];
              } else {
                data = JSON.parse(response)['list'];
              }
              var childrens = [];
              if (data) {
                childrens = __WEBPACK_IMPORTED_MODULE_0__methods___default.a._getSubTree(data, that.model, that.options);
              }
              that.model.children = childrens;
              that.create();
              that.options.onExpand(that.model);
            }
          });
        } else {
          that.model.expand = !that.model.expand;
          this.options.onExpand(this.model);
        }
      } else {
        that.model.expand = !that.model.expand;
        this.options.onExpand(this.model);
      }
    },
    checkFn: function checkFn() {
      this.fn.changeItem(this.model, !this.model.is_check, this.options.isChangeParent, this.options.isChangeChild);
      this.options.onCheck(this.model);
    },
    nameFn: function nameFn() {
      this.options.onClick(this.model);
    },
    nameFnn: function nameFnn() {},
    menuShowFn: function menuShowFn() {
      this.showMenu = !this.showMenu;
    },
    menuHideFn: function menuHideFn() {
      this.showMenu = false;
    },
    editFn: function editFn() {
      this.options.onEdit(this.model, this.editFnn);
      this.showMenu = false;
    },
    editFnn: function editFnn(item, pid, result) {
      if (result && this.model.parent.id != pid) {
        var index = this.model.parent.children.indexOf(this.model);
        this.model.parent.children.splice(index, 1);
        var parent = this.fn.getItemById(this.tree, pid);
        if (!parent || !parent.is_node) {
          return 'error : 修改节点(change parent), 新的parent不合法(1、不存在 2、is_node为false 3、当前节点本身或其后代)';
        }
        parent.children.push(this.model);
      }
      return false;
    },
    menuFn: function menuFn(callback) {
      if (callback) {
        callback(this.model);
      }
      this.showMenu = false;
    },
    deleteFn: function deleteFn() {
      this.options.onDelete(this.model, this.deleteFnn);
      this.showMenu = false;
    },
    deleteFnn: function deleteFnn(item, result) {
      var index = this.model.parent.children.indexOf(this.model);
      if (result) {
        this.model.parent.children.splice(index, 1);
      }
    },
    addChildFn: function addChildFn() {
      if (!this.model.is_node) {
        this.model.is_node = true;
        this.model.expand = true;
      }
      var newChild = {
        id: '',
        name: '',
        nodeId: this.model.id,
        is_node: false,
        is_check: this.model.is_check,
        checkState: this.model.is_check,
        expand: false,
        level: this.model.level + 1,
        parent: this.model,
        children: [],
        menu: []
      };
      this.options.onAddChild(newChild, this.addChildFnn);
      this.showMenu = false;
    },
    addChildFnn: function addChildFnn(item, result) {
      if (result) {
        item.parent.children.push(item);
      }
    },
    sortFn: function sortFn(type) {
      var index = this.model.parent.children.indexOf(this.model);
      var brother = void 0;
      if (type) {
        brother = this.model.parent.children[index - 1];
        this.options.onSort(this.model, brother, this.upFnn);
      } else {
        brother = this.model.parent.children[index + 1];
        this.options.onSort(this.model, brother, this.downFnn);
      }
      this.showMenu = false;
    },
    upFnn: function upFnn(item, result) {
      var index = this.model.parent.children.indexOf(this.model);
      if (result) {
        this.model.parent.children.splice(index, 1);
        this.model.parent.children.splice(index - 1, 0, this.model);
      }
    },
    downFnn: function downFnn(item, result) {
      var index = this.model.parent.children.indexOf(this.model);
      if (result) {
        this.model.parent.children.splice(index, 1);
        this.model.parent.children.splice(index + 1, 0, this.model);
      }
    }
  }
});

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xTree = __webpack_require__(16);

var _xTree2 = _interopRequireDefault(_xTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.component('x-tree', _xTree2.default);

exports.default = _xTree2.default;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = __webpack_require__(2);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;

function clone(src) {
  var target = void 0;
  if ((0, _isArray2.default)(src)) {
    target = [];
    for (var i = 0; i < src.length; i++) {
      target[i] = src[i];
    }
    return target;
  }
  if ((0, _isPlainObject2.default)(src)) {

    target = {};
    for (var key in src) {
      if (hasOwnProperty.call(src, key)) {
        target[key] = src[key];
      }
    }
    return target;
  }
  target = src;
  return target;
}

exports.default = clone;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray = __webpack_require__(0);

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = __webpack_require__(2);

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasOwnProperty = Object.prototype.hasOwnProperty;

function cloneDeep(src) {
  var target = void 0;
  if ((0, _isArray2.default)(src)) {
    target = [];
    for (var index = 0; index < src.length; index++) {
      if (target[index] !== src[index] && target !== src[index]) {
        target[index] = cloneDeep(src[index]);
      }
    }
    return target;
  }
  if ((0, _isPlainObject2.default)(src)) {
    target = {};
    for (var key in src) {
      if (hasOwnProperty.call(src, key) && target[key] !== src[key] && target !== src[key]) {
        target[key] = cloneDeep(src[key]);
      }
    }
    return target;
  }
  target = src;
  return target;
}

exports.default = cloneDeep;

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, "\n.x-tree-wrapper[data-v-2c0e2680] {\r\n  position: relative;\r\n  cursor: pointer;\r\n  font-size: 1em;\r\n  line-height: 1.8em;\r\n  white-space: nowrap;\n}\r\n", ""]);

// exports


/***/ }),
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, "\n.x-tree-item[data-v-b33c931a] {\r\n  position: relative;\r\n  font-size: 14px;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n  user-select: none;\n}\n.x-tree-item-self[data-v-b33c931a] {\r\n  position: relative;\r\n  padding: 0 2em 0 0.5em;\n}\n.x-tree-item-self[data-v-b33c931a]:hover {\r\n  background: #E9EBEE;\n}\n.iconfont[data-v-b33c931a] {\r\n  font-size: 14px;\r\n  width: 14px;\r\n  color: #999;\n}\n.icon-blank[data-v-b33c931a] {\r\n  opacity: 0;\n}\n.x-tree-item-expand[data-v-b33c931a] {\n}\n.x-tree-item-checkbox[data-v-b33c931a] {\n}\n.x-tree-item-text[data-v-b33c931a] {\r\n  display: inline-block;\r\n  vertical-align: bottom;\r\n  padding: 0 1em 0 0em;\r\n  width: calc(100% - 40px);\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\n}\n.x-tree-item-text-tip[data-v-b33c931a] {\r\n  position: absolute;\r\n  top: -20px;\r\n  left: 0px;\r\n  display: inline-block;\r\n  padding: 0 15px;\r\n  border: 1px solid #fff;\r\n  background: #fff;\n}\n.x-tree-item-menu-dropdown[data-v-b33c931a] {\r\n  display: none;\r\n  position: absolute;\r\n  top: 0.36em;\r\n  right: 0.27em;\n}\n.x-tree-item-self:hover .x-tree-item-menu-dropdown[data-v-b33c931a] {\r\n  display: block;\n}\n.x-tree-item-menu[data-v-b33c931a] {\r\n  display: block;\r\n  position: absolute;\r\n  right: 0;\r\n  width: 120px;\r\n  z-index: 99;\r\n  box-shadow: 0 1px 4px #999;\r\n  background: #fff;\n}\n.x-tree-item-menu-item[data-v-b33c931a] {\r\n  display: block;\r\n  padding: 2px 35px 2px 15px;\n}\n.x-tree-item-menu-item[data-v-b33c931a]:hover {\r\n  background: #E9EBEE;\n}\n.x-tree-item-children[data-v-b33c931a] {\r\n  /*padding-left: 1.3em;*/\n}\n.editable_false[data-v-b33c931a] {\r\n  padding-right: 0;\n}\n.x-tree-node>.editable_false>.x-tree-item-text[data-v-b33c931a] {\r\n  padding: 0;\r\n  width: calc(100% - 37px);\n}\n.x-tree-leaf>.editable_false>.x-tree-item-text[data-v-b33c931a] {\r\n  padding: 0;\r\n  width: calc(100% - 20px);\n}\r\n", ""]);

// exports


/***/ }),
/* 33 */,
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(42)

var Component = __webpack_require__(8)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(38),
  /* scopeId */
  "data-v-b33c931a",
  /* cssModules */
  null
)
Component.options.__file = "D:\\wamp\\www\\test\\vue\\tree-vue\\src\\tree-xbcx\\xTreeItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] xTreeItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b33c931a", Component.options)
  } else {
    hotAPI.reload("data-v-b33c931a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "x-tree-wrapper"
  }, [_c('x-tree-item', {
    staticClass: "x-tree-root",
    attrs: {
      "model": _vm.dataTree,
      "tree": _vm.dataTree,
      "options": _vm.opts,
      "fn": _vm.fnfn
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
      }
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c0e2680", module.exports)
  }
}

/***/ }),
/* 37 */,
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "x-tree-item",
    class: _vm.itemClass,
    attrs: {
      "data-id": _vm.selfId
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.selfShow),
      expression: "selfShow"
    }],
    staticClass: "x-tree-item-self",
    class: _vm.selfClass,
    style: (_vm.selfStyle),
    on: {
      "mouseleave": _vm.menuHideFn
    }
  }, [_c('i', {
    staticClass: "x-tree-item-expand",
    class: [_vm.iconfont, _vm.expandClass],
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.expandFn($event)
      }
    }
  }), _vm._v(" "), _c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.checkboxShow),
      expression: "checkboxShow"
    }],
    staticClass: "x-tree-item-checkbox",
    class: [_vm.iconfont, _vm.checkboxClass],
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.checkFn($event)
      }
    }
  }), _vm._v(" "), _c('i', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.iconShow),
      expression: "iconShow"
    }],
    staticClass: "x-tree-item-icon",
    class: [_vm.iconfont, _vm.iconClass],
    style: (_vm.iconStyle)
  }), _vm._v(" "), _c('span', {
    staticClass: "x-tree-item-text",
    attrs: {
      "title": _vm.titleFn
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.nameFn($event)
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.model.name) + "\n    ")]), _vm._v(" "), (_vm.extendIf) ? _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.extendShow),
      expression: "extendShow"
    }],
    staticClass: "x-tree-extend",
    domProps: {
      "innerHTML": _vm._s(_vm.model.extend)
    }
  }) : _vm._e(), _vm._v(" "), (_vm.dropdownIf) ? _c('i', {
    staticClass: "x-tree-item-menu-dropdown",
    class: [_vm.iconfont, _vm.dropdownClass],
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.menuShowFn($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.menuIf) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.menuShow),
      expression: "menuShow"
    }],
    staticClass: "x-tree-item-menu"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.defaultMenuShow),
      expression: "defaultMenuShow"
    }]
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.is_edit),
      expression: "model.is_edit"
    }],
    staticClass: "x-tree-item-menu-item",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.editFn($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.editorText.edit))]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.is_delete),
      expression: "model.is_delete"
    }],
    staticClass: "x-tree-item-menu-item",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.deleteFn($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.editorText.delete))]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.model.is_add),
      expression: "model.is_add"
    }],
    staticClass: "x-tree-item-menu-item",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.addChildFn($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.editorText.add))]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.sortable.upAble),
      expression: "sortable.upAble"
    }],
    staticClass: "x-tree-item-menu-item",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.sortFn(true)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.editorText.up))]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.sortable.downAble),
      expression: "sortable.downAble"
    }],
    staticClass: "x-tree-item-menu-item",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.sortFn(false)
      }
    }
  }, [_vm._v(_vm._s(_vm.options.editorText.down))])]), _vm._v(" "), _c('div', _vm._l((_vm.model.menu), function(item, index) {
    return _c('span', {
      staticClass: "x-tree-item-menu-item",
      on: {
        "click": function($event) {
          $event.stopPropagation();
          _vm.menuFn(item.callback)
        }
      }
    }, [_vm._v("\n          " + _vm._s(item.text) + "\n        ")])
  }))]) : _vm._e(), _vm._v(" "), (_vm.additionIf) ? _c('div', {
    staticClass: "x-tree-item-addition x-tree-item-custom",
    style: (_vm.additionStyle),
    domProps: {
      "innerHTML": _vm._s(_vm.model.addition)
    }
  }) : _vm._e()]), _vm._v(" "), (_vm.childrenIf) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.childrenShow),
      expression: "childrenShow"
    }],
    staticClass: "x-tree-item-children",
    style: (_vm.childrenStyle)
  }, _vm._l((_vm.model.children), function(child) {
    return _c('x-tree-item', {
      attrs: {
        "model": child,
        "tree": _vm.tree,
        "options": _vm.options,
        "fn": _vm.fn
      }
    })
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b33c931a", module.exports)
  }
}

/***/ }),
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(9)("5e67b96a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2c0e2680\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTree.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2c0e2680\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTree.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(9)("1d6dc580", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-b33c931a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTreeItem.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-b33c931a\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xTreeItem.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);