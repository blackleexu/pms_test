/******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/ 	var installedModules = {};

    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {

        /******/ 		// Check if module is in cache
        /******/ 		if(installedModules[moduleId])
        /******/ 			return installedModules[moduleId].exports;

        /******/ 		// Create a new module (and put it into the cache)
        /******/ 		var module = installedModules[moduleId] = {
            /******/ 			exports: {},
            /******/ 			id: moduleId,
            /******/ 			loaded: false
            /******/ 		};

        /******/ 		// Execute the module function
        /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        /******/ 		// Flag the module as loaded
        /******/ 		module.loaded = true;

        /******/ 		// Return the exports of the module
        /******/ 		return module.exports;
        /******/ 	}


    /******/ 	// expose the modules object (__webpack_modules__)
    /******/ 	__webpack_require__.m = modules;

    /******/ 	// expose the module cache
    /******/ 	__webpack_require__.c = installedModules;

    /******/ 	// __webpack_public_path__
    /******/ 	__webpack_require__.p = "";

    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(0);
    /******/ })
/************************************************************************/
/******/ ([
    /* 0 */
    /***/ (function(module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _xDrag = __webpack_require__(1);

        var _xDrag2 = _interopRequireDefault(_xDrag);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        Vue.component('x-drag', _xDrag2.default);

        exports.default = _xDrag2.default;

        /***/ }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {


        /* styles */
        __webpack_require__(2)

        var Component = __webpack_require__(7)(
            /* script */
            __webpack_require__(8),
            /* template */
            __webpack_require__(11),
            /* scopeId */
            "data-v-0e5b7de8",
            /* cssModules */
            null
        )
        Component.options.__file = "D:\\jcc\\new-features\\src\\components\\drag\\xDrag.vue"
        if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
        if (Component.options.functional) {console.error("[vue-loader] xDrag.vue: functional components are not supported with templates, they should use render functions.")}

        /* hot reload */
        if (false) {(function () {
            var hotAPI = require("vue-hot-reload-api")
            hotAPI.install(require("vue"), false)
            if (!hotAPI.compatible) return
            module.hot.accept()
            if (!module.hot.data) {
                hotAPI.createRecord("data-v-0e5b7de8", Component.options)
            } else {
                hotAPI.reload("data-v-0e5b7de8", Component.options)
            }
        })()}

        module.exports = Component.exports


        /***/ }),
    /* 2 */
    /***/ (function(module, exports, __webpack_require__) {

        // style-loader: Adds some css to the DOM by adding a <style> tag

        // load the styles
        var content = __webpack_require__(3);
        if(typeof content === 'string') content = [[module.id, content, '']];
        if(content.locals) module.exports = content.locals;
        // add the styles to the DOM
        var update = __webpack_require__(5)("18f48fbe", content, false);
        // Hot Module Replacement
        if(false) {
            // When the styles change, update the <style> tags
            if(!content.locals) {
                module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0e5b7de8&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xDrag.vue", function() {
                    var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0e5b7de8&scoped=true!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./xDrag.vue");
                    if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
                    update(newContent);
                });
            }
            // When the module is disposed, remove the <style> tags
            module.hot.dispose(function() { update(); });
        }

        /***/ }),
    /* 3 */
    /***/ (function(module, exports, __webpack_require__) {

        exports = module.exports = __webpack_require__(4)();
        // imports


        // module
        exports.push([module.id, "\n.drag-text .fa[data-v-0e5b7de8] {\n  font-size: 16px;\n  width: 16px;\n  padding: 2px 5px;\n  color: #333;\n  cursor: pointer;\n}\n.ghost[data-v-0e5b7de8] {\n  opacity: .5;\n  background: #C8EBFB;\n}\n.drag-item-0[data-v-0e5b7de8] {\n  display: block;\n  min-height: 100px;\n  margin: 10px;\n  cursor: move;\n  cursor: grab;\n  cursor: -moz-grab;\n  cursor: -webkit-grab;\n}\n.drag-text-0[data-v-0e5b7de8] {\n  display: block;\n  padding: 5px 10px;\n  font-size: 18px;\n}\n.drag-group-0[data-v-0e5b7de8] {\n  margin: 5px 10px;\n  min-height: 100px;\n  border: 1px solid #ccc;\n}\n.drag-item-1[data-v-0e5b7de8] {\n  display: block;\n  margin: 0 0 5px 0;\n}\n.drag-item-2[data-v-0e5b7de8] {\n  display: inline-block;\n  padding: 5px 20px;\n}\n.drag-item-3[data-v-0e5b7de8] {\n  display: inline-block;\n  padding: 5px 5px;\n}\n.drag-text-1[data-v-0e5b7de8] {\n  display: block;\n  padding: 10px 10px;\n  background: #D7D7D7;\n}\n.drag-text-2[data-v-0e5b7de8],\n.drag-text-3[data-v-0e5b7de8] {\n  display: inline-block;\n  padding: 2px 2px;\n}\n.drag-group-1[data-v-0e5b7de8] {\n  display: block;\n  margin: 5px 10px;\n  min-height: 20px;\n}\n.drag-group-2[data-v-0e5b7de8] {\n  display: inline-block;\n  min-height: 20px;\n}\n.drag-group-3[data-v-0e5b7de8] {\n  display: inline-block;\n  min-height: 20px;\n}\n.drag-item-block[data-v-0e5b7de8] {\n  display: block;\n}\n.drag-text i[data-v-0e5b7de8] {\n  cursor: pointer;\n}\n.buttons[data-v-0e5b7de8] {\n  display: block;\n  float: right;\n}\n.buttons span[data-v-0e5b7de8] {\n  padding: 5px 10px;\n  cursor: pointer;\n}\n", ""]);

        // exports


        /***/ }),
    /* 4 */
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
    /* 5 */
    /***/ (function(module, exports, __webpack_require__) {

        /*
         MIT License http://www.opensource.org/licenses/mit-license.php
         Author Tobias Koppers @sokra
         Modified by Evan You @yyx990803
         */

        var hasDocument = typeof document !== 'undefined'

        if (false) {
            if (!hasDocument) {
                throw new Error(
                    'vue-style-loader cannot be used in a non-browser environment. ' +
                    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
                ) }
        }

        var listToStyles = __webpack_require__(6)

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
    /* 6 */
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
    /* 7 */
    /***/ (function(module, exports) {

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
                var computed = options.computed || (options.computed = {})
                Object.keys(cssModules).forEach(function (key) {
                    var module = cssModules[key]
                    computed[key] = function () { return module }
                })
            }

            return {
                esModule: esModule,
                exports: scriptExports,
                options: options
            }
        }


        /***/ }),
    /* 8 */
    /***/ (function(module, exports, __webpack_require__) {

        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _vuedraggable = __webpack_require__(9);

        var _vuedraggable2 = _interopRequireDefault(_vuedraggable);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        exports.default = {
            name: 'x-drag',
            components: {
                draggable: _vuedraggable2.default
            },
            props: {
                model: Object,
                options: Object,
                fn: Object
            },
            data: function data() {
                return {
                    editable: true,
                    isDragging: false,
                    delayedDragging: false
                };
            },

            computed: {
                text: function text() {
                    return {
                        changeAll: this.model.checked ? '取消' : '全选',
                        expand: this.model.expand ? '收起' : '展开'
                    };
                },
                dragOptions: function dragOptions() {
                    return {
                        group: this.model.group,
                        animation: 0,
                        disabled: false,
                        ghostClass: 'ghost'
                    };
                }
            },
            watch: {
                isDragging: function isDragging(newValue) {
                    var _this = this;

                    if (newValue) {
                        this.delayedDragging = true;
                        return;
                    }
                    this.$nextTick(function () {
                        _this.delayedDragging = false;
                    });
                }
            },
            methods: {
                checkItem: function checkItem(zzz) {
                    zzz.checked = !zzz.checked;
                    if (this.fn && this.fn.onCheck) {
                        this.fn.onCheck(zzz.id, zzz.checked);
                    }
                },
                onMove: function onMove(_ref) {
                    var relatedContext = _ref.relatedContext,
                        draggedContext = _ref.draggedContext;

                    var relatedElement = relatedContext.element;
                    var draggedElement = draggedContext.element;
                    if (this.fn && this.fn.onMove) {
                        this.fn.onMove(relatedContext, draggedContext);
                    }
                    return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
                },
                onSort: function onSort(event) {
                    var groupId = this.model.id;
                    var childrenIds = [];
                    this.model.children.forEach(function (element) {
                        childrenIds.push(element.id);
                    });
                    var itemId = event.clone ? event.clone.id : event.item.id;
                    if (this.fn && this.fn.onSort) {
                        this.fn.onSort(groupId, childrenIds, itemId);
                    }
                    return true;
                },
                onAdd: function onAdd(event) {
                    var groupId = this.model.id;
                    var childrenIds = [];
                    this.model.children.forEach(function (element) {
                        childrenIds.push(element.id);
                    });
                    var itemId = event.clone.id;
                    if (this.fn && this.fn.onAdd) {
                        this.fn.onAdd(groupId, childrenIds, itemId);
                    }
                    return true;
                },
                onRemove: function onRemove(event) {
                    var groupId = this.model.id;
                    var childrenIds = [];
                    this.model.children.forEach(function (element) {
                        childrenIds.push(element.id);
                    });
                    var itemId = event.clone.id;
                    if (this.fn && this.fn.onRemove) {
                        this.fn.onRemove(groupId, childrenIds, itemId);
                    }
                    return true;
                },
                onUpdate: function onUpdate(event) {
                    var groupId = this.model.id;
                    var childrenIds = [];
                    this.model.children.forEach(function (element) {
                        childrenIds.push(element.id);
                    });
                    var itemId = event.clone ? event.clone.id : event.item.id;
                    if (this.fn && this.fn.onUpdate) {
                        this.fn.onUpdate(groupId, childrenIds, itemId);
                    }
                    return true;
                },
                changeAll: function changeAll(zzz) {
                    if (zzz) {
                        zzz.checked = !zzz.checked;
                        zzz.children.forEach(function (element) {
                            element.checked = zzz.checked;
                        });
                    }
                },
                expand: function expand(zzz) {
                    zzz.expand = !zzz.expand;
                }
            }
        };

        /***/ }),
    /* 9 */
    /***/ (function(module, exports, __webpack_require__) {

        'use strict';
        var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

        function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

        (function () {
            "use strict";

            function buildDraggable(Sortable) {
                function removeNode(node) {
                    node.parentElement.removeChild(node);
                }

                function insertNodeAt(fatherNode, node, position) {
                    if (position < fatherNode.children.length) {
                        fatherNode.insertBefore(node, fatherNode.children[position]);
                    } else {
                        fatherNode.appendChild(node);
                    }
                }

                function computeVmIndex(vnodes, element) {
                    return vnodes.map(function (elt) {
                        return elt.elm;
                    }).indexOf(element);
                }

                function _computeIndexes(slots, children) {
                    if (!slots) {
                        return [];
                    }

                    var elmFromNodes = slots.map(function (elt) {
                        return elt.elm;
                    });
                    return [].concat(_toConsumableArray(children)).map(function (elt) {
                        return elmFromNodes.indexOf(elt);
                    });
                }

                function emit(evtName, evtData) {
                    var _this = this;

                    this.$nextTick(function () {
                        return _this.$emit(evtName.toLowerCase(), evtData);
                    });
                }

                function delegateAndEmit(evtName) {
                    var _this2 = this;

                    return function (evtData) {
                        if (_this2.realList !== null) {
                            _this2['onDrag' + evtName](evtData);
                        }
                        emit.call(_this2, evtName, evtData);
                    };
                }

                var eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
                var eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
                var readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(function (evt) {
                    return 'on' + evt;
                });
                var draggingElement = null;

                var props = {
                    options: Object,
                    list: {
                        type: Array,
                        required: false,
                        default: null
                    },
                    value: {
                        type: Array,
                        required: false,
                        default: null
                    },
                    noTransitionOnDrag: {
                        type: Boolean,
                        default: false
                    },
                    clone: {
                        type: Function,
                        default: function _default(original) {
                            return original;
                        }
                    },
                    element: {
                        type: String,
                        default: 'div'
                    },
                    move: {
                        type: Function,
                        default: null
                    }
                };

                var draggableComponent = {
                    props: props,

                    data: function data() {
                        return {
                            transitionMode: false,
                            componentMode: false
                        };
                    },
                    render: function render(h) {
                        if (this.$slots.default && this.$slots.default.length === 1) {
                            var child = this.$slots.default[0];
                            if (child.componentOptions && child.componentOptions.tag === "transition-group") {
                                this.transitionMode = true;
                            }
                        }
                        return h(this.element, null, this.$slots.default);
                    },
                    mounted: function mounted() {
                        var _this3 = this;

                        this.componentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();
                        if (this.componentMode && this.transitionMode) {
                            throw new Error('Transition-group inside component is not suppported. Please alter element value or remove transition-group. Current element value: ' + this.element);
                        }
                        var optionsAdded = {};
                        eventsListened.forEach(function (elt) {
                            optionsAdded['on' + elt] = delegateAndEmit.call(_this3, elt);
                        });

                        eventsToEmit.forEach(function (elt) {
                            optionsAdded['on' + elt] = emit.bind(_this3, elt);
                        });

                        var options = _extends({}, this.options, optionsAdded, { onMove: function onMove(evt) {
                            return _this3.onDragMove(evt);
                        } });
                        this._sortable = new Sortable(this.rootContainer, options);
                        this.computeIndexes();
                    },
                    beforeDestroy: function beforeDestroy() {
                        this._sortable.destroy();
                    },


                    computed: {
                        rootContainer: function rootContainer() {
                            return this.transitionMode ? this.$el.children[0] : this.$el;
                        },
                        isCloning: function isCloning() {
                            return !!this.options && !!this.options.group && this.options.group.pull === 'clone';
                        },
                        realList: function realList() {
                            return !!this.list ? this.list : this.value;
                        }
                    },

                    watch: {
                        options: {
                            handler: function handler(newOptionValue) {
                                for (var property in newOptionValue) {
                                    if (readonlyProperties.indexOf(property) == -1) {
                                        this._sortable.option(property, newOptionValue[property]);
                                    }
                                }
                            },

                            deep: true
                        },

                        realList: function realList() {
                            this.computeIndexes();
                        }
                    },

                    methods: {
                        getChildrenNodes: function getChildrenNodes() {
                            if (this.componentMode) {
                                return this.$children[0].$slots.default;
                            }
                            var rawNodes = this.$slots.default;
                            return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
                        },
                        computeIndexes: function computeIndexes() {
                            var _this4 = this;

                            this.$nextTick(function () {
                                _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children);
                            });
                        },
                        getUnderlyingVm: function getUnderlyingVm(htmlElt) {
                            var index = computeVmIndex(this.getChildrenNodes(), htmlElt);
                            var element = this.realList[index];
                            return { index: index, element: element };
                        },
                        getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
                            var __vue__ = _ref.__vue__;

                            if (!__vue__ || !__vue__.$options || __vue__.$options._componentTag !== "transition-group") {
                                return __vue__;
                            }
                            return __vue__.$parent;
                        },
                        emitChanges: function emitChanges(evt) {
                            var _this5 = this;

                            this.$nextTick(function () {
                                _this5.$emit('change', evt);
                            });
                        },
                        alterList: function alterList(onList) {
                            if (!!this.list) {
                                onList(this.list);
                            } else {
                                var newList = [].concat(_toConsumableArray(this.value));
                                onList(newList);
                                this.$emit('input', newList);
                            }
                        },
                        spliceList: function spliceList() {
                            var _arguments = arguments;

                            var spliceList = function spliceList(list) {
                                return list.splice.apply(list, _arguments);
                            };
                            this.alterList(spliceList);
                        },
                        updatePosition: function updatePosition(oldIndex, newIndex) {
                            var updatePosition = function updatePosition(list) {
                                return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
                            };
                            this.alterList(updatePosition);
                        },
                        getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
                            var to = _ref2.to,
                                related = _ref2.related;

                            var component = this.getUnderlyingPotencialDraggableComponent(to);
                            if (!component) {
                                return { component: component };
                            }
                            var list = component.realList;
                            var context = { list: list, component: component };
                            if (to !== related && list && component.getUnderlyingVm) {
                                var destination = component.getUnderlyingVm(related);
                                return _extends(destination, context);
                            }

                            return context;
                        },
                        getVmIndex: function getVmIndex(domIndex) {
                            var indexes = this.visibleIndexes;
                            var numberIndexes = indexes.length;
                            return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
                        },
                        getComponent: function getComponent() {
                            return this.$slots.default[0].componentInstance;
                        },
                        resetTransitionData: function resetTransitionData(index) {
                            if (!this.noTransitionOnDrag || !this.transitionMode) {
                                return;
                            }
                            var nodes = this.getChildrenNodes();
                            nodes[index].data = null;
                            var transitionContainer = this.getComponent();
                            transitionContainer.children = [];
                            transitionContainer.kept = undefined;
                        },
                        onDragStart: function onDragStart(evt) {
                            this.context = this.getUnderlyingVm(evt.item);
                            evt.item._underlying_vm_ = this.clone(this.context.element);
                            draggingElement = evt.item;
                        },
                        onDragAdd: function onDragAdd(evt) {
                            var element = evt.item._underlying_vm_;
                            if (element === undefined) {
                                return;
                            }
                            removeNode(evt.item);
                            var newIndex = this.getVmIndex(evt.newIndex);
                            this.spliceList(newIndex, 0, element);
                            this.computeIndexes();
                            var added = { element: element, newIndex: newIndex };
                            this.emitChanges({ added: added });
                        },
                        onDragRemove: function onDragRemove(evt) {
                            insertNodeAt(this.rootContainer, evt.item, evt.oldIndex);
                            if (this.isCloning) {
                                removeNode(evt.clone);
                                return;
                            }
                            var oldIndex = this.context.index;
                            this.spliceList(oldIndex, 1);
                            var removed = { element: this.context.element, oldIndex: oldIndex };
                            this.resetTransitionData(oldIndex);
                            this.emitChanges({ removed: removed });
                        },
                        onDragUpdate: function onDragUpdate(evt) {
                            removeNode(evt.item);
                            insertNodeAt(evt.from, evt.item, evt.oldIndex);
                            var oldIndex = this.context.index;
                            var newIndex = this.getVmIndex(evt.newIndex);
                            this.updatePosition(oldIndex, newIndex);
                            var moved = { element: this.context.element, oldIndex: oldIndex, newIndex: newIndex };
                            this.emitChanges({ moved: moved });
                        },
                        computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
                            if (!relatedContext.element) {
                                return 0;
                            }
                            var domChildren = [].concat(_toConsumableArray(evt.to.children));
                            var currentDOMIndex = domChildren.indexOf(evt.related);
                            var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
                            var draggedInList = domChildren.indexOf(draggingElement) != -1;
                            return draggedInList ? currentIndex : currentIndex + 1;
                        },
                        onDragMove: function onDragMove(evt) {
                            var onMove = this.move;
                            if (!onMove || !this.realList) {
                                return true;
                            }

                            var relatedContext = this.getRelatedContextFromMoveEvent(evt);
                            var draggedContext = this.context;
                            var futureIndex = this.computeFutureIndex(relatedContext, evt);
                            _extends(draggedContext, { futureIndex: futureIndex });
                            _extends(evt, { relatedContext: relatedContext, draggedContext: draggedContext });
                            return onMove(evt);
                        },
                        onDragEnd: function onDragEnd(evt) {
                            this.computeIndexes();
                            draggingElement = null;
                        }
                    }
                };
                return draggableComponent;
            }

            if (true) {
                var Sortable = __webpack_require__(10);
                module.exports = buildDraggable(Sortable);
            } else if (typeof define == "function" && define.amd) {
                define(['sortablejs'], function (Sortable) {
                    return buildDraggable(Sortable);
                });
            } else if (window && window.Vue && window.Sortable) {
                var draggable = buildDraggable(window.Sortable);
                Vue.component('draggable', draggable);
            }
        })();

        /***/ }),
    /* 10 */
    /***/ (function(module, exports, __webpack_require__) {

        var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
         * Sortable
         * @author	RubaXa   <trash@rubaxa.org>
         * @license MIT
         */

        (function sortableModule(factory) {
            "use strict";

            if (true) {
                !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }
            else if (typeof module != "undefined" && typeof module.exports != "undefined") {
                module.exports = factory();
            }
            else {
                /* jshint sub:true */
                window["Sortable"] = factory();
            }
        })(function sortableFactory() {
            "use strict";

            if (typeof window == "undefined" || !window.document) {
                return function sortableError() {
                    throw new Error("Sortable.js requires a window with a document");
                };
            }

            var dragEl,
                parentEl,
                ghostEl,
                cloneEl,
                rootEl,
                nextEl,
                lastDownEl,

                scrollEl,
                scrollParentEl,
                scrollCustomFn,

                lastEl,
                lastCSS,
                lastParentCSS,

                oldIndex,
                newIndex,

                activeGroup,
                putSortable,

                autoScroll = {},

                tapEvt,
                touchEvt,

                moved,

                /** @const */
                R_SPACE = /\s+/g,
                R_FLOAT = /left|right|inline/,

                expando = 'Sortable' + (new Date).getTime(),

                win = window,
                document = win.document,
                parseInt = win.parseInt,

                $ = win.jQuery || win.Zepto,
                Polymer = win.Polymer,

                captureMode = false,

                supportDraggable = !!('draggable' in document.createElement('div')),
                supportCssPointerEvents = (function (el) {
                    // false when IE11
                    if (!!navigator.userAgent.match(/Trident.*rv[ :]?11\./)) {
                        return false;
                    }
                    el = document.createElement('x');
                    el.style.cssText = 'pointer-events:auto';
                    return el.style.pointerEvents === 'auto';
                })(),

                _silent = false,

                abs = Math.abs,
                min = Math.min,

                savedInputChecked = [],
                touchDragOverListeners = [],

                _autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
                    // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
                    if (rootEl && options.scroll) {
                        var _this = rootEl[expando],
                            el,
                            rect,
                            sens = options.scrollSensitivity,
                            speed = options.scrollSpeed,

                            x = evt.clientX,
                            y = evt.clientY,

                            winWidth = window.innerWidth,
                            winHeight = window.innerHeight,

                            vx,
                            vy,

                            scrollOffsetX,
                            scrollOffsetY
                        ;

                        // Delect scrollEl
                        if (scrollParentEl !== rootEl) {
                            scrollEl = options.scroll;
                            scrollParentEl = rootEl;
                            scrollCustomFn = options.scrollFn;

                            if (scrollEl === true) {
                                scrollEl = rootEl;

                                do {
                                    if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
                                        (scrollEl.offsetHeight < scrollEl.scrollHeight)
                                    ) {
                                        break;
                                    }
                                    /* jshint boss:true */
                                } while (scrollEl = scrollEl.parentNode);
                            }
                        }

                        if (scrollEl) {
                            el = scrollEl;
                            rect = scrollEl.getBoundingClientRect();
                            vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
                            vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
                        }


                        if (!(vx || vy)) {
                            vx = (winWidth - x <= sens) - (x <= sens);
                            vy = (winHeight - y <= sens) - (y <= sens);

                            /* jshint expr:true */
                            (vx || vy) && (el = win);
                        }


                        if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
                            autoScroll.el = el;
                            autoScroll.vx = vx;
                            autoScroll.vy = vy;

                            clearInterval(autoScroll.pid);

                            if (el) {
                                autoScroll.pid = setInterval(function () {
                                    scrollOffsetY = vy ? vy * speed : 0;
                                    scrollOffsetX = vx ? vx * speed : 0;

                                    if ('function' === typeof(scrollCustomFn)) {
                                        return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
                                    }

                                    if (el === win) {
                                        win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
                                    } else {
                                        el.scrollTop += scrollOffsetY;
                                        el.scrollLeft += scrollOffsetX;
                                    }
                                }, 24);
                            }
                        }
                    }
                }, 30),

                _prepareGroup = function (options) {
                    function toFn(value, pull) {
                        if (value === void 0 || value === true) {
                            value = group.name;
                        }

                        if (typeof value === 'function') {
                            return value;
                        } else {
                            return function (to, from) {
                                var fromGroup = from.options.group.name;

                                return pull
                                    ? value
                                    : value && (value.join
                                            ? value.indexOf(fromGroup) > -1
                                            : (fromGroup == value)
                                    );
                            };
                        }
                    }

                    var group = {};
                    var originalGroup = options.group;

                    if (!originalGroup || typeof originalGroup != 'object') {
                        originalGroup = {name: originalGroup};
                    }

                    group.name = originalGroup.name;
                    group.checkPull = toFn(originalGroup.pull, true);
                    group.checkPut = toFn(originalGroup.put);
                    group.revertClone = originalGroup.revertClone;

                    options.group = group;
                }
            ;


            /**
             * @class  Sortable
             * @param  {HTMLElement}  el
             * @param  {Object}       [options]
             */
            function Sortable(el, options) {
                if (!(el && el.nodeType && el.nodeType === 1)) {
                    throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
                }

                this.el = el; // root element
                this.options = options = _extend({}, options);


                // Export instance
                el[expando] = this;

                // Default options
                var defaults = {
                    group: Math.random(),
                    sort: true,
                    disabled: false,
                    store: null,
                    handle: null,
                    scroll: true,
                    scrollSensitivity: 30,
                    scrollSpeed: 10,
                    draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
                    ghostClass: 'sortable-ghost',
                    chosenClass: 'sortable-chosen',
                    dragClass: 'sortable-drag',
                    ignore: 'a, img',
                    filter: null,
                    preventOnFilter: true,
                    animation: 0,
                    setData: function (dataTransfer, dragEl) {
                        dataTransfer.setData('Text', dragEl.textContent);
                    },
                    dropBubble: false,
                    dragoverBubble: false,
                    dataIdAttr: 'data-id',
                    delay: 0,
                    forceFallback: false,
                    fallbackClass: 'sortable-fallback',
                    fallbackOnBody: false,
                    fallbackTolerance: 0,
                    fallbackOffset: {x: 0, y: 0}
                };


                // Set default options
                for (var name in defaults) {
                    !(name in options) && (options[name] = defaults[name]);
                }

                _prepareGroup(options);

                // Bind all private methods
                for (var fn in this) {
                    if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
                        this[fn] = this[fn].bind(this);
                    }
                }

                // Setup drag mode
                this.nativeDraggable = options.forceFallback ? false : supportDraggable;

                // Bind events
                _on(el, 'mousedown', this._onTapStart);
                _on(el, 'touchstart', this._onTapStart);
                _on(el, 'pointerdown', this._onTapStart);

                if (this.nativeDraggable) {
                    _on(el, 'dragover', this);
                    _on(el, 'dragenter', this);
                }

                touchDragOverListeners.push(this._onDragOver);

                // Restore sorting
                options.store && this.sort(options.store.get(this));
            }


            Sortable.prototype = /** @lends Sortable.prototype */ {
                constructor: Sortable,

                _onTapStart: function (/** Event|TouchEvent */evt) {
                    var _this = this,
                        el = this.el,
                        options = this.options,
                        preventOnFilter = options.preventOnFilter,
                        type = evt.type,
                        touch = evt.touches && evt.touches[0],
                        target = (touch || evt).target,
                        originalTarget = evt.target.shadowRoot && evt.path[0] || target,
                        filter = options.filter,
                        startIndex;

                    _saveInputCheckedState(el);


                    // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
                    if (dragEl) {
                        return;
                    }

                    if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
                        return; // only left button or enabled
                    }


                    target = _closest(target, options.draggable, el);

                    if (!target) {
                        return;
                    }

                    if (lastDownEl === target) {
                        // Ignoring duplicate `down`
                        return;
                    }

                    // Get the index of the dragged element within its parent
                    startIndex = _index(target, options.draggable);

                    // Check filter
                    if (typeof filter === 'function') {
                        if (filter.call(this, evt, target, this)) {
                            _dispatchEvent(_this, originalTarget, 'filter', target, el, startIndex);
                            preventOnFilter && evt.preventDefault();
                            return; // cancel dnd
                        }
                    }
                    else if (filter) {
                        filter = filter.split(',').some(function (criteria) {
                            criteria = _closest(originalTarget, criteria.trim(), el);

                            if (criteria) {
                                _dispatchEvent(_this, criteria, 'filter', target, el, startIndex);
                                return true;
                            }
                        });

                        if (filter) {
                            preventOnFilter && evt.preventDefault();
                            return; // cancel dnd
                        }
                    }

                    if (options.handle && !_closest(originalTarget, options.handle, el)) {
                        return;
                    }

                    // Prepare `dragstart`
                    this._prepareDragStart(evt, touch, target, startIndex);
                },

                _prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
                    var _this = this,
                        el = _this.el,
                        options = _this.options,
                        ownerDocument = el.ownerDocument,
                        dragStartFn;

                    if (target && !dragEl && (target.parentNode === el)) {
                        tapEvt = evt;

                        rootEl = el;
                        dragEl = target;
                        parentEl = dragEl.parentNode;
                        nextEl = dragEl.nextSibling;
                        lastDownEl = target;
                        activeGroup = options.group;
                        oldIndex = startIndex;

                        this._lastX = (touch || evt).clientX;
                        this._lastY = (touch || evt).clientY;

                        dragEl.style['will-change'] = 'transform';

                        dragStartFn = function () {
                            // Delayed drag has been triggered
                            // we can re-enable the events: touchmove/mousemove
                            _this._disableDelayedDrag();

                            // Make the element draggable
                            dragEl.draggable = _this.nativeDraggable;

                            // Chosen item
                            _toggleClass(dragEl, options.chosenClass, true);

                            // Bind the events: dragstart/dragend
                            _this._triggerDragStart(evt, touch);

                            // Drag start event
                            _dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, oldIndex);
                        };

                        // Disable "draggable"
                        options.ignore.split(',').forEach(function (criteria) {
                            _find(dragEl, criteria.trim(), _disableDraggable);
                        });

                        _on(ownerDocument, 'mouseup', _this._onDrop);
                        _on(ownerDocument, 'touchend', _this._onDrop);
                        _on(ownerDocument, 'touchcancel', _this._onDrop);
                        _on(ownerDocument, 'pointercancel', _this._onDrop);
                        _on(ownerDocument, 'selectstart', _this);

                        if (options.delay) {
                            // If the user moves the pointer or let go the click or touch
                            // before the delay has been reached:
                            // disable the delayed drag
                            _on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
                            _on(ownerDocument, 'touchend', _this._disableDelayedDrag);
                            _on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
                            _on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
                            _on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
                            _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

                            _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
                        } else {
                            dragStartFn();
                        }


                    }
                },

                _disableDelayedDrag: function () {
                    var ownerDocument = this.el.ownerDocument;

                    clearTimeout(this._dragStartTimer);
                    _off(ownerDocument, 'mouseup', this._disableDelayedDrag);
                    _off(ownerDocument, 'touchend', this._disableDelayedDrag);
                    _off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
                    _off(ownerDocument, 'mousemove', this._disableDelayedDrag);
                    _off(ownerDocument, 'touchmove', this._disableDelayedDrag);
                    _off(ownerDocument, 'pointermove', this._disableDelayedDrag);
                },

                _triggerDragStart: function (/** Event */evt, /** Touch */touch) {
                    touch = touch || (evt.pointerType == 'touch' ? evt : null);

                    if (touch) {
                        // Touch device support
                        tapEvt = {
                            target: dragEl,
                            clientX: touch.clientX,
                            clientY: touch.clientY
                        };

                        this._onDragStart(tapEvt, 'touch');
                    }
                    else if (!this.nativeDraggable) {
                        this._onDragStart(tapEvt, true);
                    }
                    else {
                        _on(dragEl, 'dragend', this);
                        _on(rootEl, 'dragstart', this._onDragStart);
                    }

                    try {
                        if (document.selection) {
                            // Timeout neccessary for IE9
                            setTimeout(function () {
                                document.selection.empty();
                            });
                        } else {
                            window.getSelection().removeAllRanges();
                        }
                    } catch (err) {
                    }
                },

                _dragStarted: function () {
                    if (rootEl && dragEl) {
                        var options = this.options;

                        // Apply effect
                        _toggleClass(dragEl, options.ghostClass, true);
                        _toggleClass(dragEl, options.dragClass, false);

                        Sortable.active = this;

                        // Drag start event
                        _dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
                    } else {
                        this._nulling();
                    }
                },

                _emulateDragOver: function () {
                    if (touchEvt) {
                        if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
                            return;
                        }

                        this._lastX = touchEvt.clientX;
                        this._lastY = touchEvt.clientY;

                        if (!supportCssPointerEvents) {
                            _css(ghostEl, 'display', 'none');
                        }

                        var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
                            parent = target,
                            i = touchDragOverListeners.length;

                        if (parent) {
                            do {
                                if (parent[expando]) {
                                    while (i--) {
                                        touchDragOverListeners[i]({
                                            clientX: touchEvt.clientX,
                                            clientY: touchEvt.clientY,
                                            target: target,
                                            rootEl: parent
                                        });
                                    }

                                    break;
                                }

                                target = parent; // store last element
                            }
                                /* jshint boss:true */
                            while (parent = parent.parentNode);
                        }

                        if (!supportCssPointerEvents) {
                            _css(ghostEl, 'display', '');
                        }
                    }
                },


                _onTouchMove: function (/**TouchEvent*/evt) {
                    if (tapEvt) {
                        var	options = this.options,
                            fallbackTolerance = options.fallbackTolerance,
                            fallbackOffset = options.fallbackOffset,
                            touch = evt.touches ? evt.touches[0] : evt,
                            dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
                            dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
                            translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

                        // only set the status to dragging, when we are actually dragging
                        if (!Sortable.active) {
                            if (fallbackTolerance &&
                                min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
                            ) {
                                return;
                            }

                            this._dragStarted();
                        }

                        // as well as creating the ghost element on the document body
                        this._appendGhost();

                        moved = true;
                        touchEvt = touch;

                        _css(ghostEl, 'webkitTransform', translate3d);
                        _css(ghostEl, 'mozTransform', translate3d);
                        _css(ghostEl, 'msTransform', translate3d);
                        _css(ghostEl, 'transform', translate3d);

                        evt.preventDefault();
                    }
                },

                _appendGhost: function () {
                    if (!ghostEl) {
                        var rect = dragEl.getBoundingClientRect(),
                            css = _css(dragEl),
                            options = this.options,
                            ghostRect;

                        ghostEl = dragEl.cloneNode(true);

                        _toggleClass(ghostEl, options.ghostClass, false);
                        _toggleClass(ghostEl, options.fallbackClass, true);
                        _toggleClass(ghostEl, options.dragClass, true);

                        _css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
                        _css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
                        _css(ghostEl, 'width', rect.width);
                        _css(ghostEl, 'height', rect.height);
                        _css(ghostEl, 'opacity', '0.8');
                        _css(ghostEl, 'position', 'fixed');
                        _css(ghostEl, 'zIndex', '100000');
                        _css(ghostEl, 'pointerEvents', 'none');

                        options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

                        // Fixing dimensions.
                        ghostRect = ghostEl.getBoundingClientRect();
                        _css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
                        _css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
                    }
                },

                _onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
                    var dataTransfer = evt.dataTransfer,
                        options = this.options;

                    this._offUpEvents();

                    if (activeGroup.checkPull(this, this, dragEl, evt)) {
                        cloneEl = _clone(dragEl);

                        cloneEl.draggable = false;
                        cloneEl.style['will-change'] = '';

                        _css(cloneEl, 'display', 'none');
                        _toggleClass(cloneEl, this.options.chosenClass, false);

                        rootEl.insertBefore(cloneEl, dragEl);
                        _dispatchEvent(this, rootEl, 'clone', dragEl);
                    }

                    _toggleClass(dragEl, options.dragClass, true);

                    if (useFallback) {
                        if (useFallback === 'touch') {
                            // Bind touch events
                            _on(document, 'touchmove', this._onTouchMove);
                            _on(document, 'touchend', this._onDrop);
                            _on(document, 'touchcancel', this._onDrop);
                            _on(document, 'pointermove', this._onTouchMove);
                            _on(document, 'pointerup', this._onDrop);
                        } else {
                            // Old brwoser
                            _on(document, 'mousemove', this._onTouchMove);
                            _on(document, 'mouseup', this._onDrop);
                        }

                        this._loopId = setInterval(this._emulateDragOver, 50);
                    }
                    else {
                        if (dataTransfer) {
                            dataTransfer.effectAllowed = 'move';
                            options.setData && options.setData.call(this, dataTransfer, dragEl);
                        }

                        _on(document, 'drop', this);
                        setTimeout(this._dragStarted, 0);
                    }
                },

                _onDragOver: function (/**Event*/evt) {
                    var el = this.el,
                        target,
                        dragRect,
                        targetRect,
                        revert,
                        options = this.options,
                        group = options.group,
                        activeSortable = Sortable.active,
                        isOwner = (activeGroup === group),
                        isMovingBetweenSortable = false,
                        canSort = options.sort;

                    if (evt.preventDefault !== void 0) {
                        evt.preventDefault();
                        !options.dragoverBubble && evt.stopPropagation();
                    }

                    if (dragEl.animated) {
                        return;
                    }

                    moved = true;

                    if (activeSortable && !options.disabled &&
                        (isOwner
                                ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
                                : (
                                    putSortable === this ||
                                    (
                                        (activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
                                        group.checkPut(this, activeSortable, dragEl, evt)
                                    )
                                )
                        ) &&
                        (evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
                    ) {
                        // Smart auto-scrolling
                        _autoScroll(evt, options, this.el);

                        if (_silent) {
                            return;
                        }

                        target = _closest(evt.target, options.draggable, el);
                        dragRect = dragEl.getBoundingClientRect();

                        if (putSortable !== this) {
                            putSortable = this;
                            isMovingBetweenSortable = true;
                        }

                        if (revert) {
                            _cloneHide(activeSortable, true);
                            parentEl = rootEl; // actualization

                            if (cloneEl || nextEl) {
                                rootEl.insertBefore(dragEl, cloneEl || nextEl);
                            }
                            else if (!canSort) {
                                rootEl.appendChild(dragEl);
                            }

                            return;
                        }


                        if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
                            (el === evt.target) && (target = _ghostIsLast(el, evt))
                        ) {
                            if (target) {
                                if (target.animated) {
                                    return;
                                }

                                targetRect = target.getBoundingClientRect();
                            }

                            _cloneHide(activeSortable, isOwner);

                            if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
                                if (!dragEl.contains(el)) {
                                    el.appendChild(dragEl);
                                    parentEl = el; // actualization
                                }

                                this._animate(dragRect, dragEl);
                                target && this._animate(targetRect, target);
                            }
                        }
                        else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
                            if (lastEl !== target) {
                                lastEl = target;
                                lastCSS = _css(target);
                                lastParentCSS = _css(target.parentNode);
                            }

                            targetRect = target.getBoundingClientRect();

                            var width = targetRect.right - targetRect.left,
                                height = targetRect.bottom - targetRect.top,
                                floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
                                    || (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
                                isWide = (target.offsetWidth > dragEl.offsetWidth),
                                isLong = (target.offsetHeight > dragEl.offsetHeight),
                                halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
                                nextSibling = target.nextElementSibling,
                                moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt),
                                after = false
                            ;

                            if (moveVector !== false) {
                                _silent = true;
                                setTimeout(_unsilent, 30);

                                _cloneHide(activeSortable, isOwner);

                                if (moveVector === 1 || moveVector === -1) {
                                    after = (moveVector === 1);
                                }
                                else if (floating) {
                                    var elTop = dragEl.offsetTop,
                                        tgTop = target.offsetTop;

                                    if (elTop === tgTop) {
                                        after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
                                    }
                                    else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
                                        after = (evt.clientY - targetRect.top) / height > 0.5;
                                    } else {
                                        after = tgTop > elTop;
                                    }
                                } else if (!isMovingBetweenSortable) {
                                    after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
                                }

                                if (!dragEl.contains(el)) {
                                    if (after && !nextSibling) {
                                        el.appendChild(dragEl);
                                    } else {
                                        target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
                                    }
                                }

                                parentEl = dragEl.parentNode; // actualization

                                this._animate(dragRect, dragEl);
                                this._animate(targetRect, target);
                            }
                        }
                    }
                },

                _animate: function (prevRect, target) {
                    var ms = this.options.animation;

                    if (ms) {
                        var currentRect = target.getBoundingClientRect();

                        if (prevRect.nodeType === 1) {
                            prevRect = prevRect.getBoundingClientRect();
                        }

                        _css(target, 'transition', 'none');
                        _css(target, 'transform', 'translate3d('
                            + (prevRect.left - currentRect.left) + 'px,'
                            + (prevRect.top - currentRect.top) + 'px,0)'
                        );

                        target.offsetWidth; // repaint

                        _css(target, 'transition', 'all ' + ms + 'ms');
                        _css(target, 'transform', 'translate3d(0,0,0)');

                        clearTimeout(target.animated);
                        target.animated = setTimeout(function () {
                            _css(target, 'transition', '');
                            _css(target, 'transform', '');
                            target.animated = false;
                        }, ms);
                    }
                },

                _offUpEvents: function () {
                    var ownerDocument = this.el.ownerDocument;

                    _off(document, 'touchmove', this._onTouchMove);
                    _off(document, 'pointermove', this._onTouchMove);
                    _off(ownerDocument, 'mouseup', this._onDrop);
                    _off(ownerDocument, 'touchend', this._onDrop);
                    _off(ownerDocument, 'pointerup', this._onDrop);
                    _off(ownerDocument, 'touchcancel', this._onDrop);
                    _off(ownerDocument, 'selectstart', this);
                },

                _onDrop: function (/**Event*/evt) {
                    var el = this.el,
                        options = this.options;

                    clearInterval(this._loopId);
                    clearInterval(autoScroll.pid);
                    clearTimeout(this._dragStartTimer);

                    // Unbind events
                    _off(document, 'mousemove', this._onTouchMove);

                    if (this.nativeDraggable) {
                        _off(document, 'drop', this);
                        _off(el, 'dragstart', this._onDragStart);
                    }

                    this._offUpEvents();

                    if (evt) {
                        if (moved) {
                            evt.preventDefault();
                            !options.dropBubble && evt.stopPropagation();
                        }

                        ghostEl && ghostEl.parentNode.removeChild(ghostEl);

                        if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
                            // Remove clone
                            cloneEl && cloneEl.parentNode.removeChild(cloneEl);
                        }

                        if (dragEl) {
                            if (this.nativeDraggable) {
                                _off(dragEl, 'dragend', this);
                            }

                            _disableDraggable(dragEl);
                            dragEl.style['will-change'] = '';

                            // Remove class's
                            _toggleClass(dragEl, this.options.ghostClass, false);
                            _toggleClass(dragEl, this.options.chosenClass, false);

                            if (rootEl !== parentEl) {
                                newIndex = _index(dragEl, options.draggable);

                                if (newIndex >= 0) {
                                    // Add event
                                    _dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

                                    // Remove event
                                    _dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);

                                    // drag from one list and drop into another
                                    _dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
                                    _dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
                                }
                            }
                            else {
                                if (dragEl.nextSibling !== nextEl) {
                                    // Get the index of the dragged element within its parent
                                    newIndex = _index(dragEl, options.draggable);

                                    if (newIndex >= 0) {
                                        // drag & drop within the same list
                                        _dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
                                        _dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
                                    }
                                }
                            }

                            if (Sortable.active) {
                                /* jshint eqnull:true */
                                if (newIndex == null || newIndex === -1) {
                                    newIndex = oldIndex;
                                }

                                _dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);

                                // Save sorting
                                this.save();
                            }
                        }

                    }

                    this._nulling();
                },

                _nulling: function() {
                    rootEl =
                        dragEl =
                            parentEl =
                                ghostEl =
                                    nextEl =
                                        cloneEl =
                                            lastDownEl =

                                                scrollEl =
                                                    scrollParentEl =

                                                        tapEvt =
                                                            touchEvt =

                                                                moved =
                                                                    newIndex =

                                                                        lastEl =
                                                                            lastCSS =

                                                                                putSortable =
                                                                                    activeGroup =
                                                                                        Sortable.active = null;

                    savedInputChecked.forEach(function (el) {
                        el.checked = true;
                    });
                    savedInputChecked.length = 0;
                },

                handleEvent: function (/**Event*/evt) {
                    switch (evt.type) {
                        case 'drop':
                        case 'dragend':
                            this._onDrop(evt);
                            break;

                        case 'dragover':
                        case 'dragenter':
                            if (dragEl) {
                                this._onDragOver(evt);
                                _globalDragOver(evt);
                            }
                            break;

                        case 'selectstart':
                            evt.preventDefault();
                            break;
                    }
                },


                /**
                 * Serializes the item into an array of string.
                 * @returns {String[]}
                 */
                toArray: function () {
                    var order = [],
                        el,
                        children = this.el.children,
                        i = 0,
                        n = children.length,
                        options = this.options;

                    for (; i < n; i++) {
                        el = children[i];
                        if (_closest(el, options.draggable, this.el)) {
                            order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
                        }
                    }

                    return order;
                },


                /**
                 * Sorts the elements according to the array.
                 * @param  {String[]}  order  order of the items
                 */
                sort: function (order) {
                    var items = {}, rootEl = this.el;

                    this.toArray().forEach(function (id, i) {
                        var el = rootEl.children[i];

                        if (_closest(el, this.options.draggable, rootEl)) {
                            items[id] = el;
                        }
                    }, this);

                    order.forEach(function (id) {
                        if (items[id]) {
                            rootEl.removeChild(items[id]);
                            rootEl.appendChild(items[id]);
                        }
                    });
                },


                /**
                 * Save the current sorting
                 */
                save: function () {
                    var store = this.options.store;
                    store && store.set(this);
                },


                /**
                 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
                 * @param   {HTMLElement}  el
                 * @param   {String}       [selector]  default: `options.draggable`
                 * @returns {HTMLElement|null}
                 */
                closest: function (el, selector) {
                    return _closest(el, selector || this.options.draggable, this.el);
                },


                /**
                 * Set/get option
                 * @param   {string} name
                 * @param   {*}      [value]
                 * @returns {*}
                 */
                option: function (name, value) {
                    var options = this.options;

                    if (value === void 0) {
                        return options[name];
                    } else {
                        options[name] = value;

                        if (name === 'group') {
                            _prepareGroup(options);
                        }
                    }
                },


                /**
                 * Destroy
                 */
                destroy: function () {
                    var el = this.el;

                    el[expando] = null;

                    _off(el, 'mousedown', this._onTapStart);
                    _off(el, 'touchstart', this._onTapStart);
                    _off(el, 'pointerdown', this._onTapStart);

                    if (this.nativeDraggable) {
                        _off(el, 'dragover', this);
                        _off(el, 'dragenter', this);
                    }

                    // Remove draggable attributes
                    Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
                        el.removeAttribute('draggable');
                    });

                    touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

                    this._onDrop();

                    this.el = el = null;
                }
            };


            function _cloneHide(sortable, state) {
                if (sortable.lastPullMode !== 'clone') {
                    state = true;
                }

                if (cloneEl && (cloneEl.state !== state)) {
                    _css(cloneEl, 'display', state ? 'none' : '');

                    if (!state) {
                        if (cloneEl.state) {
                            if (sortable.options.group.revertClone) {
                                rootEl.insertBefore(cloneEl, nextEl);
                                sortable._animate(dragEl, cloneEl);
                            } else {
                                rootEl.insertBefore(cloneEl, dragEl);
                            }
                        }
                    }

                    cloneEl.state = state;
                }
            }


            function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
                if (el) {
                    ctx = ctx || document;

                    do {
                        if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
                            return el;
                        }
                        /* jshint boss:true */
                    } while (el = _getParentOrHost(el));
                }

                return null;
            }


            function _getParentOrHost(el) {
                var parent = el.host;

                return (parent && parent.nodeType) ? parent : el.parentNode;
            }


            function _globalDragOver(/**Event*/evt) {
                if (evt.dataTransfer) {
                    evt.dataTransfer.dropEffect = 'move';
                }
                evt.preventDefault();
            }


            function _on(el, event, fn) {
                el.addEventListener(event, fn, captureMode);
            }


            function _off(el, event, fn) {
                el.removeEventListener(event, fn, captureMode);
            }


            function _toggleClass(el, name, state) {
                if (el) {
                    if (el.classList) {
                        el.classList[state ? 'add' : 'remove'](name);
                    }
                    else {
                        var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
                        el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
                    }
                }
            }


            function _css(el, prop, val) {
                var style = el && el.style;

                if (style) {
                    if (val === void 0) {
                        if (document.defaultView && document.defaultView.getComputedStyle) {
                            val = document.defaultView.getComputedStyle(el, '');
                        }
                        else if (el.currentStyle) {
                            val = el.currentStyle;
                        }

                        return prop === void 0 ? val : val[prop];
                    }
                    else {
                        if (!(prop in style)) {
                            prop = '-webkit-' + prop;
                        }

                        style[prop] = val + (typeof val === 'string' ? '' : 'px');
                    }
                }
            }


            function _find(ctx, tagName, iterator) {
                if (ctx) {
                    var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

                    if (iterator) {
                        for (; i < n; i++) {
                            iterator(list[i], i);
                        }
                    }

                    return list;
                }

                return [];
            }



            function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
                sortable = (sortable || rootEl[expando]);

                var evt = document.createEvent('Event'),
                    options = sortable.options,
                    onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

                evt.initEvent(name, true, true);

                evt.to = rootEl;
                evt.from = fromEl || rootEl;
                evt.item = targetEl || rootEl;
                evt.clone = cloneEl;

                evt.oldIndex = startIndex;
                evt.newIndex = newIndex;

                rootEl.dispatchEvent(evt);

                if (options[onName]) {
                    options[onName].call(sortable, evt);
                }
            }


            function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt) {
                var evt,
                    sortable = fromEl[expando],
                    onMoveFn = sortable.options.onMove,
                    retVal;

                evt = document.createEvent('Event');
                evt.initEvent('move', true, true);

                evt.to = toEl;
                evt.from = fromEl;
                evt.dragged = dragEl;
                evt.draggedRect = dragRect;
                evt.related = targetEl || toEl;
                evt.relatedRect = targetRect || toEl.getBoundingClientRect();

                fromEl.dispatchEvent(evt);

                if (onMoveFn) {
                    retVal = onMoveFn.call(sortable, evt, originalEvt);
                }

                return retVal;
            }


            function _disableDraggable(el) {
                el.draggable = false;
            }


            function _unsilent() {
                _silent = false;
            }


            /** @returns {HTMLElement|false} */
            function _ghostIsLast(el, evt) {
                var lastEl = el.lastElementChild,
                    rect = lastEl.getBoundingClientRect();

                // 5 — min delta
                // abs — нельзя добавлять, а то глюки при наведении сверху
                return (
                        (evt.clientY - (rect.top + rect.height) > 5) ||
                        (evt.clientX - (rect.right + rect.width) > 5)
                    ) && lastEl;
            }


            /**
             * Generate id
             * @param   {HTMLElement} el
             * @returns {String}
             * @private
             */
            function _generateId(el) {
                var str = el.tagName + el.className + el.src + el.href + el.textContent,
                    i = str.length,
                    sum = 0;

                while (i--) {
                    sum += str.charCodeAt(i);
                }

                return sum.toString(36);
            }

            /**
             * Returns the index of an element within its parent for a selected set of
             * elements
             * @param  {HTMLElement} el
             * @param  {selector} selector
             * @return {number}
             */
            function _index(el, selector) {
                var index = 0;

                if (!el || !el.parentNode) {
                    return -1;
                }

                while (el && (el = el.previousElementSibling)) {
                    if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
                        index++;
                    }
                }

                return index;
            }

            function _matches(/**HTMLElement*/el, /**String*/selector) {
                if (el) {
                    selector = selector.split('.');

                    var tag = selector.shift().toUpperCase(),
                        re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

                    return (
                        (tag === '' || el.nodeName.toUpperCase() == tag) &&
                        (!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
                    );
                }

                return false;
            }

            function _throttle(callback, ms) {
                var args, _this;

                return function () {
                    if (args === void 0) {
                        args = arguments;
                        _this = this;

                        setTimeout(function () {
                            if (args.length === 1) {
                                callback.call(_this, args[0]);
                            } else {
                                callback.apply(_this, args);
                            }

                            args = void 0;
                        }, ms);
                    }
                };
            }

            function _extend(dst, src) {
                if (dst && src) {
                    for (var key in src) {
                        if (src.hasOwnProperty(key)) {
                            dst[key] = src[key];
                        }
                    }
                }

                return dst;
            }

            function _clone(el) {
                return $
                    ? $(el).clone(true)[0]
                    : (Polymer && Polymer.dom
                            ? Polymer.dom(el).cloneNode(true)
                            : el.cloneNode(true)
                    );
            }

            function _saveInputCheckedState(root) {
                var inputs = root.getElementsByTagName('input');
                var idx = inputs.length;

                while (idx--) {
                    var el = inputs[idx];
                    el.checked && savedInputChecked.push(el);
                }
            }

            // Fixed #973:
            _on(document, 'touchmove', function (evt) {
                if (Sortable.active) {
                    evt.preventDefault();
                }
            });

            try {
                window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
                    get: function () {
                        captureMode = {
                            capture: false,
                            passive: false
                        };
                    }
                }));
            } catch (err) {}

            // Export utils
            Sortable.utils = {
                on: _on,
                off: _off,
                css: _css,
                find: _find,
                is: function (el, selector) {
                    return !!_closest(el, selector, el);
                },
                extend: _extend,
                throttle: _throttle,
                closest: _closest,
                toggleClass: _toggleClass,
                clone: _clone,
                index: _index
            };


            /**
             * Create sortable instance
             * @param {HTMLElement}  el
             * @param {Object}      [options]
             */
            Sortable.create = function (el, options) {
                return new Sortable(el, options);
            };


            // Export
            Sortable.version = '1.5.1';
            return Sortable;
        });


        /***/ }),
    /* 11 */
    /***/ (function(module, exports, __webpack_require__) {

        module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
            return _c('div', {
                staticClass: "drag-item",
                class: ['drag-item-' + _vm.model.level, _vm.model.style ? 'drag-item-block' : ''],
                attrs: {
                    "id": _vm.model.id
                }
            }, [_c('span', {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: (_vm.model.text),
                    expression: "model.text"
                }],
                staticClass: "drag-text",
                class: 'drag-text-' + _vm.model.level
            }, [_c('i', {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: (_vm.model.checkbox),
                    expression: "model.checkbox"
                }],
                staticClass: "fa",
                class: _vm.model.checked ? 'fa-check-square-o' : 'fa-square-o',
                on: {
                    "click": function($event) {
                        _vm.checkItem(_vm.model)
                    }
                }
            }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.model.text))]), _vm._v(" "), _c('div', {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: (_vm.model.button),
                    expression: "model.button"
                }],
                staticClass: "buttons"
            }, [_c('span', {
                on: {
                    "click": function($event) {
                        _vm.expand(_vm.model)
                    }
                }
            }, [_vm._v(_vm._s(_vm.text.expand))])])]), _vm._v(" "), (_vm.model.level < 3) ? _c('draggable', {
                directives: [{
                    name: "show",
                    rawName: "v-show",
                    value: (_vm.model.expand),
                    expression: "model.expand"
                }],
                class: 'drag-group-' + _vm.model.level,
                attrs: {
                    "options": _vm.dragOptions,
                    "move": _vm.onMove
                },
                on: {
                    "sort": _vm.onSort,
                    "add": _vm.onAdd,
                    "remove": _vm.onRemove,
                    "update": _vm.onUpdate
                },
                model: {
                    value: (_vm.model.children),
                    callback: function($$v) {
                        _vm.model.children = $$v
                    },
                    expression: "model.children"
                }
            }, _vm._l((_vm.model.children), function(children) {
                return _c('x-drag', {
                    attrs: {
                        "model": children,
                        "options": _vm.options,
                        "fn": _vm.fn
                    }
                })
            })) : _vm._e()], 1)
        },staticRenderFns: []}
        module.exports.render._withStripped = true
        if (false) {
            module.hot.accept()
            if (module.hot.data) {
                require("vue-hot-reload-api").rerender("data-v-0e5b7de8", module.exports)
            }
        }

        /***/ })
    /******/ ]);