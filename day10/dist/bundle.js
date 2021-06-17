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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {
		return null;
	}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__day8_module_js_b__ = __webpack_require__(4);
const {add,divide} = __webpack_require__(3)

console.log(add(1,2),divide(10,2))

console.log(__WEBPACK_IMPORTED_MODULE_0__day8_module_js_b__["a" /* default */].person)
console.log('hha')
__webpack_require__(5)
__webpack_require__(10)
// require('../picture/2.jpeg')
document.writeln(`<h1>hello! today is day off</h1>`)


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function add(a, b) {
    return a + b
}

function divide(a, b) {
    return a / b
}

module.exports= {
    add,divide
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export flag */
/* unused harmony export sum */
/* unused harmony export person */
/* unused harmony export flag1 */
/* unused harmony export sum1 */
/* unused harmony export person1 */
let flag = false

function sum(a, b) {
    return a + b
}

let name = '张三'
let age = 3
let salary = 23000

let person = {
    name,
    age,
    salary
}

// export default function () {
//     return 'default function'
// }

 let flag1 = false
 function sum1(a, b) {
    return a + b
}

let name1 = '张三'
let age1 = 3
let salary1 = 23000

 let person1 = {
    name1,
    age1,
    salary1
}


// export default 默认只能有一个
/* harmony default export */ __webpack_exports__["a"] = ({flag,sum,person});




/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(6);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/dist/cjs.js!./normal.css", function() {
		var newContent = require("!!../node_modules/css-loader/dist/cjs.js!./normal.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// Imports
var urlEscape = __webpack_require__(7);
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(8));

// Module
exports.push([module.i, "body {\n    /*background-color: red;*/\n    background: url(" + ___CSS_LOADER_URL___0___ + ");\n}\n", ""]);



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url)) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }

  return url;
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(11);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(1)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/dist/cjs.js!../node_modules/less-loader/dist/cjs.js!./normal.less", function() {
		var newContent = require("!!../node_modules/css-loader/dist/cjs.js!../node_modules/less-loader/dist/cjs.js!./normal.less");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// Module
exports.push([module.i, "body {\n  color: white;\n  size: 50px;\n}\n", ""]);



/***/ })
/******/ ]);