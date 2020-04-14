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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/functions/functions.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/functions/functions.js":
/*!************************************!*\
  !*** ./src/functions/functions.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var default_dxmap, default_hccmap, default_hcccoefn;
fetch('https://pnchakravarthula.github.io/epicc.github.io/dist/load_dxmap.json').then(function (response) {
  return response.json();
}).then(function (data) {
  default_dxmap = data;
});
fetch('https://pnchakravarthula.github.io/epicc.github.io/dist/load_hccmap.json').then(function (response) {
  return response.json();
}).then(function (data) {
  default_hccmap = data;
});
fetch('https://pnchakravarthula.github.io/epicc.github.io/dist/load_hcccoefn.json').then(function (response) {
  return response.json();
}).then(function (data) {
  default_hcccoefn = data;
});
var default_ver = 'v23';
var default_model = 'CNA';
var default_baserate = 868.0;
var default_verbose = true;
var default_never_trump = 0;
var interactions = {
  'v22': v22_interactions,
  'v23': v23_interactions,
  'v24': v24_interactions
};
/**
 * Returns demographic raf value based on age, gender and coding model
 * @customfunction
 * @param {string[][]} condition_list accepts array
 */

function demo_raf(condition_list) {
  var age = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 65;
  var sex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'M';
  var model = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var orec = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '0';
  var ver = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  var baserate = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0.0;

  for (var i = 0; i < condition_list.length; i++) {
    for (var j = 0; j < condition_list[i].length; j++) {
      condition_list = condition_list;
    }
  }

  var temp_condition_list = condition_list.toString();
  temp_condition_list = temp_condition_list.split(",");

  for (i = 0; i < temp_condition_list.length; i++) {
    temp_condition_list[i] = temp_condition_list[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  var raf_dict = member(condition_list, age, sex, model, orec, ver, baserate);
  result = raf_dict['raf']['demo_score'];
  return result.toString();
}
/**
 * Returns comma-separated list of descriptions of each DX Code from CMS crosswalk.
 * @customfunction
 * @param {string[][]} dx_array accepts array of hcc codes
 */


function dx_desc(dx_array) {
  var ver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var age = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var sex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var verbose = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

  for (i = 0; i < dx_array.length; i++) {
    for (j = 0; j < dx_array[i].length; j++) {
      dx_array = dx_array;
    }
  }

  var temp_dx_array = dx_array.toString();
  temp_dx_array = temp_dx_array.split(",");

  for (i = 0; i < temp_dx_array.length; i++) {
    temp_dx_array[i] = temp_dx_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  verbose = verbose || default_verbose;
  var hcc_dict = dx_hccs(temp_dx_array, ver, age, sex, verbose);
  var hcc_cust_list = [];

  for (var _i = 0, _Object$entries = Object.entries(hcc_dict); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    var val = key + ":" + value["desc"];
    hcc_cust_list.push(val);
  }

  return hcc_cust_list.toString();
}
/**
 * Returns a comma separated list of the ccs represented by a list of DX codes after trumping/interaction logic is applied
 * @customfunction
 * @param {string[][]} dx_array accepts array of dx codes
 */


function dx2cc(dx_array) {
  var age = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var sex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var disabl = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var never_trump = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var verbose = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

  for (var i = 0; i < dx_array.length; i++) {
    for (var j = 0; j < dx_array[i].length; j++) {
      dx_array = dx_array;
    }
  }

  var temp_dx_array = dx_array.toString();
  temp_dx_array = temp_dx_array.split(",");

  for (i = 0; i < temp_dx_array.length; i++) {
    temp_dx_array[i] = temp_dx_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  never_trump = never_trump || default_never_trump;
  var unique_hccs = dx2hcc(temp_dx_array, age, ver, sex, disabl, never_trump, verbose);
  return unique_hccs.toString();
}
/**
 * Returns cc raf of associated dx codes after conversion to cc and trumping/interaction logic is applied (equivalent of cc_raf(dx2cc(dx_array))
 * @customfunction
 * @param {string[][]} dx_array accepts array of dx codes
 */


function dx_raf(dx_array) {
  var age = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var model = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var sex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var disabl = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var verbose = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var never_trump = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  var baserate = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0.0;

  /*
  Utility to calculate raf from list of DX codes
  */
  for (var i = 0; i < dx_array.length; i++) {
    for (var j = 0; j < dx_array[i].length; j++) {
      dx_array = dx_array;
    }
  }

  var temp_dx_array = dx_array.toString();
  temp_dx_array = temp_dx_array.split(",");

  for (i = 0; i < temp_dx_array.length; i++) {
    temp_dx_array[i] = temp_dx_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  never_trump = never_trump || default_never_trump;
  var raf_value = dx2raf(temp_dx_array, age, ver, model, sex, disabl, verbose, never_trump, baserate);
  return raf_value.toString();
}
/**
 * Given a list of dx codes, return a list of deduped, normalized and untrumped dx codes valid for the coding model
 * @customfunction
 * @param {string[][]} dx_array accepts array of dx codes
 */


function clean_dx(dx_array) {
  var ver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  // Convert string to list, dedupe, and ensure DX are formatted correctly.
  for (var i = 0; i < dx_array.length; i++) {
    for (var j = 0; j < dx_array[i].length; j++) {
      dx_array = dx_array;
    }
  }

  var temp_dx_array = dx_array.toString();
  temp_dx_array = temp_dx_array.split(",");

  for (i = 0; i < temp_dx_array.length; i++) {
    temp_dx_array[i] = temp_dx_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  var dx_values = clean_dxlist(temp_dx_array, ver);
  var dx_set_values = [];
  dx_values.forEach(function (v) {
    return dx_set_values.push(v);
  });
  return dx_set_values.toString();
}
/**
 * Given a list of ccs, return a list of deduped, normalized and untrumped ccs codes valid for the coding model
 * @customfunction
 * @param {string[][]} cc_array accepts array of hcc codes
 */


function clean_cc(cc_array) {
  var ver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  for (var i = 0; i < cc_array.length; i++) {
    for (var j = 0; j < cc_array[i].length; j++) {
      cc_array = cc_array;
    }
  }

  var temp_cc_array = cc_array.toString();
  temp_cc_array = temp_cc_array.split(",");

  for (i = 0; i < temp_cc_array.length; i++) {
    temp_cc_array[i] = temp_cc_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  var hcc_values = clean_hcclist(temp_cc_array, ver);
  return hcc_values.toString();
}
/**
 * Returns comma-separated list of descriptions of each HCC Code from CMS crosswalk.
 * @customfunction
 * @param {string[][]} cc_array accepts array of hcc codes
 */


function cc_desc(cc_array) {
  var ver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var age = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var sex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var verbose = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  for (i = 0; i < cc_array.length; i++) {
    for (j = 0; j < cc_array[i].length; j++) {
      cc_array = cc_array;
    }
  }

  var temp_cc_array = cc_array.toString();
  temp_cc_array = temp_cc_array.split(",");

  for (i = 0; i < temp_cc_array.length; i++) {
    temp_cc_array[i] = temp_cc_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  verbose = verbose || default_verbose;
  var hcc_dict = hcc_dct(temp_cc_array, ver, age, sex, verbose);
  var hcc_cust_list = [];

  for (var _i2 = 0, _Object$entries2 = Object.entries(hcc_dict); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        key = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];

    var val = key + ":" + value["desc"];
    hcc_cust_list.push(val);
  }

  return hcc_cust_list.toString();
}
/**
 * Returns multi-line info block for an HCC: Description, Children, Parents, RAF.  Past MVP can also feed a info pane / popup for desktop calculator like use.
To enable screen reader support, press Ctrl+Alt+Z To learn about keyboard shortcuts, press Ctrl+slash
 * @customfunction
 * @param {string[][]} cc accepts array of hcc codes
 */


function cc_info(cc) {
  var ver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var model = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var disabl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var age = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var never_trump = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var baserate = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0.0;
  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  never_trump = never_trump || default_never_trump;
  var temp_hccmap, raf_value;

  for (i = 0; i < cc.length; i++) {
    for (j = 0; j < cc[i].length; j++) {
      cc = cc;
    }
  }

  var temp_cc = cc.toString();
  temp_cc = temp_cc.split(",");

  for (i = 0; i < temp_cc.length; i++) {
    temp_cc[i] = temp_cc[i].toString().trim();
  }

  var hccmap = default_hccmap[ver]; // for (var i = 0; i < temp_cc.length; i++) {

  temp_hccmap = hccmap[temp_cc];
  raf_value = hcc2raf(temp_cc, ver, model, disabl, age, never_trump, baserate); // }

  var result = {
    desc: temp_hccmap['desc'],
    children: temp_hccmap['children'],
    parents: temp_hccmap['parents'],
    RAF: raf_value
  };
  result = JSON.stringify(result);
  return result.replace(/"/g, '');
}
/**
 * Returns cc raf (does not include demographic RAF) of cc codes after trumping/interaction logic is applied
 * @customfunction
 * @param {string[][]} cc_array accepts array of hcc codes
 */


function cc_raf(cc_array) {
  var ver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var model = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var disabl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var age = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var never_trump = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var baserate = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0.0;

  for (i = 0; i < cc_array.length; i++) {
    for (j = 0; j < cc_array[i].length; j++) {
      cc_array = cc_array;
    }
  }

  var temp_cc_array = cc_array.toString();
  temp_cc_array = temp_cc_array.split(",");

  for (i = 0; i < temp_cc_array.length; i++) {
    temp_cc_array[i] = temp_cc_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase(); // model = model.toUpperCase() || default_model;

  baserate = baserate || default_baserate;
  never_trump = never_trump || default_never_trump;
  var raf_value = hcc2raf(temp_cc_array, ver, model, disabl, age, never_trump, baserate);
  return raf_value.toString();
}
/**
 * cc_combine
 * @customfunction
 * @param {string[][]} cc_array accepts array of hcc codes
 */


function cc_combine(cc_array) {
  var ver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var age = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var disabl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var never_trump = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

  for (i = 0; i < cc_array.length; i++) {
    for (j = 0; j < cc_array[i].length; j++) {
      cc_array = cc_array;
    }
  }

  var temp_cc_array = cc_array.toString();
  temp_cc_array = temp_cc_array.split(",");

  for (i = 0; i < temp_cc_array.length; i++) {
    temp_cc_array[i] = temp_cc_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  never_trump = never_trump || default_never_trump;
  var hccs = prep_hccs(temp_cc_array, ver, age, disabl, never_trump);
  return hccs.toString();
}
/**
 * Returns the RAF of the net incremental change (+Adds - Upgraded) between cc_lists.  Equivalent of cc_raf(cc_diff_increment)
 * @customfunction
 * @param {string[][]} base_cc_array accepts array of cc codes
 * @param {string[][]} additional_cc_array accepts array of cc codes
 */


function cc_increment_raf(base_cc_array, additional_cc_array) {
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var model = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var age = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var disabl = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var never_trump = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var baserate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0.0;

  for (i = 0; i < base_cc_array.length; i++) {
    for (j = 0; j < base_cc_array[i].length; j++) {
      base_cc_array = base_cc_array;
    }
  }

  var temp_base_cc_array = base_cc_array.toString();
  temp_base_cc_array = temp_base_cc_array.split(",");

  for (i = 0; i < temp_base_cc_array.length; i++) {
    temp_base_cc_array[i] = temp_base_cc_array[i].toString().trim();
  }

  for (i = 0; i < additional_cc_array.length; i++) {
    for (j = 0; j < additional_cc_array[i].length; j++) {
      additional_cc_array = additional_cc_array;
    }
  }

  var temp_additional_cc_array = additional_cc_array.toString();
  temp_additional_cc_array = temp_additional_cc_array.split(",");

  for (i = 0; i < temp_additional_cc_array.length; i++) {
    temp_additional_cc_array[i] = temp_additional_cc_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  never_trump = never_trump || default_never_trump;
  age = age || 0;
  disabl = disabl || false;
  var hcc_dict = hcc_increment(temp_base_cc_array, temp_additional_cc_array, ver, model, age, disabl, never_trump, baserate);
  var result = hcc_dict['raf'];
  return result.toString();
}
/**
 * Returns the net incremental change between cc_lists, for example for calculating the value of a coding project over claims. Equivalent of +Adds - Upgraded in the format('+HCC001, +HCC18, - HCC019')
 * @customfunction
 * @param {string[][]} base_cc_array accepts array of cc codes
 * @param {string[][]} additional_cc_array accepts array of cc codes
 */


function cc_increment(base_cc_array, additional_cc_array) {
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var model = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var age = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var disabl = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var never_trump = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var baserate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0.0;

  for (i = 0; i < base_cc_array.length; i++) {
    for (j = 0; j < base_cc_array[i].length; j++) {
      base_cc_array = base_cc_array;
    }
  }

  var temp_base_cc_array = base_cc_array.toString();
  temp_base_cc_array = temp_base_cc_array.split(",");

  for (i = 0; i < temp_base_cc_array.length; i++) {
    temp_base_cc_array[i] = temp_base_cc_array[i].toString().trim();
  }

  for (i = 0; i < additional_cc_array.length; i++) {
    for (j = 0; j < additional_cc_array[i].length; j++) {
      additional_cc_array = additional_cc_array;
    }
  }

  var temp_additional_cc_array = additional_cc_array.toString();
  temp_additional_cc_array = temp_additional_cc_array.split(",");

  for (i = 0; i < temp_additional_cc_array.length; i++) {
    temp_additional_cc_array[i] = temp_additional_cc_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  never_trump = never_trump || default_never_trump;
  age = age || 0;
  disabl = disabl || false;
  var hcc_dict = hcc_increment(temp_base_cc_array, temp_additional_cc_array, ver, model, age, disabl, never_trump, baserate);
  var result = hcc_dict['adds'] + "," + "-" + hcc_dict['upgraded'];
  return result.toString();
}
/**
 * Special case of diff_deletes that focuses on YoY Chronic Gaps and downgrades.  Maybe does some adjusting for differing coding models yoy, but that sounds hard
 * @customfunction
 * @param {string[][]} base_cc_array accepts array of cc codes
 * @param {string[][]} additional_cc_array accepts array of cc codes
 */


function cc_gaps(base_cc_array, additional_cc_array) {
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var model = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var age = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var sex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  var disabl = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var baserate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0.0;

  for (i = 0; i < base_cc_array.length; i++) {
    for (j = 0; j < base_cc_array[i].length; j++) {
      base_cc_array = base_cc_array;
    }
  }

  var temp_base_cc_array = base_cc_array.toString();
  temp_base_cc_array = temp_base_cc_array.split(",");

  for (i = 0; i < temp_base_cc_array.length; i++) {
    temp_base_cc_array[i] = temp_base_cc_array[i].toString().trim();
  }

  for (i = 0; i < additional_cc_array.length; i++) {
    for (j = 0; j < additional_cc_array[i].length; j++) {
      additional_cc_array = additional_cc_array;
    }
  }

  var temp_additional_cc_array = additional_cc_array.toString();
  temp_additional_cc_array = temp_additional_cc_array.split(",");

  for (i = 0; i < temp_additional_cc_array.length; i++) {
    temp_additional_cc_array[i] = temp_additional_cc_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  var hcc_dict = hcc_gaps(temp_base_cc_array, temp_additional_cc_array, ver, model, age, sex, disabl, baserate);
  var result = hcc_dict['Deletes'] + "," + hcc_dict['Downgraded'];
  return result.toString();
}
/**
 * Special case of diff_deletes_raf that focuses on YoY Chronic Gaps and downgrades (net raf of downgraded).  Equivalent of cc_chronic(cc_diff_deletes). Maybe does some adjusting for differing coding models yoy, but that sounds hard
 * @customfunction
 * @param {string[][]} base_cc_array accepts array of cc codes
 * @param {string[][]} additional_cc_array accepts array of cc codes
 */


function cc_gaps_raf(base_cc_array, additional_cc_array) {
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var model = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var age = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var sex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  var disabl = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var baserate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0.0;

  for (i = 0; i < base_cc_array.length; i++) {
    for (j = 0; j < base_cc_array[i].length; j++) {
      base_cc_array = base_cc_array;
    }
  }

  var temp_base_cc_array = base_cc_array.toString();
  temp_base_cc_array = temp_base_cc_array.split(",");

  for (i = 0; i < temp_base_cc_array.length; i++) {
    temp_base_cc_array[i] = temp_base_cc_array[i].toString().trim();
  }

  for (i = 0; i < additional_cc_array.length; i++) {
    for (j = 0; j < additional_cc_array[i].length; j++) {
      additional_cc_array = additional_cc_array;
    }
  }

  var temp_additional_cc_array = additional_cc_array.toString();
  temp_additional_cc_array = temp_additional_cc_array.split(",");

  for (i = 0; i < temp_additional_cc_array.length; i++) {
    temp_additional_cc_array[i] = temp_additional_cc_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  var hcc_dict = hcc_gaps(temp_base_cc_array, temp_additional_cc_array, ver, model, age, sex, disabl, baserate);
  var result = hcc_dict['raf'];
  return result.toString();
}
/**
 * Compares a base list of ccs and additional ccs and returns an information block on the differences ; eg: "Adds: HCC001, HCC18; Deletes: HCC135; Upgraded: HCC019; Downgraded:'
 * @customfunction
 * @param {string[][]} base_cc_array accepts array of cc codes
 * @param {string[][]} additional_cc_array accepts array of cc codes
 *
 */


function cc_diff() {
  var base_cc_array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var additional_cc_array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var age = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var sex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var model = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  var disabl = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var never_trump = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  var baserate = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0.0;

  for (i = 0; i < base_cc_array.length; i++) {
    for (j = 0; j < base_cc_array[i].length; j++) {
      base_cc_array = base_cc_array;
    }
  }

  var temp_base_cc_array = base_cc_array.toString();
  temp_base_cc_array = temp_base_cc_array.split(",");

  for (i = 0; i < temp_base_cc_array.length; i++) {
    temp_base_cc_array[i] = temp_base_cc_array[i].toString().trim();
  }

  for (i = 0; i < additional_cc_array.length; i++) {
    for (j = 0; j < additional_cc_array[i].length; j++) {
      additional_cc_array = additional_cc_array;
    }
  }

  var temp_additional_cc_array = additional_cc_array.toString();
  temp_additional_cc_array = temp_additional_cc_array.split(",");

  for (i = 0; i < temp_additional_cc_array.length; i++) {
    temp_additional_cc_array[i] = temp_additional_cc_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  never_trump = never_trump || default_never_trump;
  var cclist = hcc_diff(temp_base_cc_array, temp_additional_cc_array, ver, age, sex, model, disabl, never_trump, baserate);
  var result = {
    adds: cclist['adds'],
    upgraded: cclist['upgraded'],
    downgraded: cclist['downgraded'],
    downgraded_to: cclist['downgrade_to'],
    deletes: cclist['deletes']
  };
  result = JSON.stringify(result);
  return result.replace(/"/g, '');
}
/**
 * Compares a base list of ccs and additional ccs and returns an information block on the differences ; eg: "Adds: HCC001, HCC18; Deletes: HCC135; Upgraded: HCC019; Downgraded:'
 * @customfunction
 * @param {string[][]} base_cc_array accepts array of cc codes
 * @param {string[][]} additional_cc_array accepts array of cc codes
 *
 */


function cc_diff_raf() {
  var base_cc_array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var additional_cc_array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var age = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var sex = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
  var model = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  var disabl = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var never_trump = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
  var baserate = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0.0;

  for (i = 0; i < base_cc_array.length; i++) {
    for (j = 0; j < base_cc_array[i].length; j++) {
      base_cc_array = base_cc_array;
    }
  }

  var temp_base_cc_array = base_cc_array.toString();
  temp_base_cc_array = temp_base_cc_array.split(",");

  for (i = 0; i < temp_base_cc_array.length; i++) {
    temp_base_cc_array[i] = temp_base_cc_array[i].toString().trim();
  }

  for (i = 0; i < additional_cc_array.length; i++) {
    for (j = 0; j < additional_cc_array[i].length; j++) {
      additional_cc_array = additional_cc_array;
    }
  }

  var temp_additional_cc_array = additional_cc_array.toString();
  temp_additional_cc_array = temp_additional_cc_array.split(",");

  for (i = 0; i < temp_additional_cc_array.length; i++) {
    temp_additional_cc_array[i] = temp_additional_cc_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  never_trump = never_trump || default_never_trump;
  var cclist = hcc_diff(temp_base_cc_array, temp_additional_cc_array, ver, age, sex, model, disabl, never_trump, baserate);
  return cclist["raf"].toString();
}
/**
 * Returns the net incremental change between dx_lists, for example for calculating the value of a coding project over claims. Equivalent of +Adds - Upgraded in the format('+dx001, +dx18, - dx019')
 * @customfunction
 * @param {string[][]} base_dx_array accepts array of cc codes
 * @param {string[][]} additional_dx_array accepts array of cc codes
 *
 */


function dx_increment() {
  var base_dx_array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var additional_dx_array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var model = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var age = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var disabl = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var never_trump = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var baserate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0.0;

  for (i = 0; i < base_dx_array.length; i++) {
    for (j = 0; j < base_dx_array[i].length; j++) {
      base_dx_array = base_dx_array;
    }
  }

  var temp_base_dx_array = base_dx_array.toString();
  temp_base_dx_array = temp_base_dx_array.split(",");

  for (i = 0; i < temp_base_dx_array.length; i++) {
    temp_base_dx_array[i] = temp_base_dx_array[i].toString().trim();
  }

  for (i = 0; i < additional_dx_array.length; i++) {
    for (j = 0; j < additional_dx_array[i].length; j++) {
      additional_dx_array = additional_dx_array;
    }
  }

  var temp_additional_dx_array = additional_dx_array.toString();
  temp_additional_dx_array = temp_additional_dx_array.split(",");

  for (i = 0; i < temp_additional_dx_array.length; i++) {
    temp_additional_dx_array[i] = temp_additional_dx_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  never_trump = never_trump || default_never_trump;
  var dx_dict = dx_increments(temp_base_dx_array, temp_additional_dx_array, ver, model, age, disabl, never_trump, baserate);
  var result = dx_dict['adds'] + "," + "-" + dx_dict['upgraded'];
  return result.toString();
}
/**
 * Returns the RAF of the net incremental change (+Adds - Upgraded) between dx_lists.  Equivalent of dx_raf(dx_diff_increment)
 * @customfunction
 * @param {string[][]} base_dx_array accepts array of cc codes
 * @param {string[][]} additional_dx_array accepts array of cc codes
 *
 */


function dx_increment_raf() {
  var base_dx_array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var additional_dx_array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var model = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var age = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var disabl = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var never_trump = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var baserate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0.0;

  for (i = 0; i < base_dx_array.length; i++) {
    for (j = 0; j < base_dx_array[i].length; j++) {
      base_dx_array = base_dx_array;
    }
  }

  var temp_base_dx_array = base_dx_array.toString();
  temp_base_dx_array = temp_base_dx_array.split(",");

  for (i = 0; i < temp_base_dx_array.length; i++) {
    temp_base_dx_array[i] = temp_base_dx_array[i].toString().trim();
  }

  for (i = 0; i < additional_dx_array.length; i++) {
    for (j = 0; j < additional_dx_array[i].length; j++) {
      additional_dx_array = additional_dx_array;
    }
  }

  var temp_additional_dx_array = additional_dx_array.toString();
  temp_additional_dx_array = temp_additional_dx_array.split(",");

  for (i = 0; i < temp_additional_dx_array.length; i++) {
    temp_additional_dx_array[i] = temp_additional_dx_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  never_trump = never_trump || default_never_trump;
  var dx_dict = dx_increments(temp_base_dx_array, temp_additional_dx_array, ver, model, age, disabl, never_trump, baserate);
  var result = dx_dict['raf'];
  return result.toString();
}
/**
 * Special case of diff_deletes that focuses on YoY Chronic Gaps and downgrades.
 * @customfunction
 * @param {string[][]} base_dx_array accepts array of dx codes
 * @param {string[][]} additional_dx_array accepts array of dx codes
 *
 */


function dx_gap() {
  var base_dx_array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var additional_dx_array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var model = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var age = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var sex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  var disabl = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var baserate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0.0;

  for (i = 0; i < base_dx_array.length; i++) {
    for (j = 0; j < base_dx_array[i].length; j++) {
      base_dx_array = base_dx_array;
    }
  }

  var temp_base_dx_array = base_dx_array.toString();
  temp_base_dx_array = temp_base_dx_array.split(",");

  for (i = 0; i < temp_base_dx_array.length; i++) {
    temp_base_dx_array[i] = temp_base_dx_array[i].toString().trim();
  }

  for (i = 0; i < additional_dx_array.length; i++) {
    for (j = 0; j < additional_dx_array[i].length; j++) {
      additional_dx_array = additional_dx_array;
    }
  }

  var temp_additional_dx_array = additional_dx_array.toString();
  temp_additional_dx_array = temp_additional_dx_array.split(",");

  for (i = 0; i < temp_additional_dx_array.length; i++) {
    temp_additional_dx_array[i] = temp_additional_dx_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  var dx_dict = dx_gaps(temp_base_dx_array, temp_additional_dx_array, ver, model, age, sex, disabl, baserate);
  var result = dx_dict['Deletes'] + "," + dx_dict['Downgraded'];
  return result.toString();
}
/**
 * Special case of diff_deletes_raf that focuses on YoY Chronic Gaps and downgrades (net raf of downgraded).  Equivalent of dx_chronic(dx_diff_deletes). Maybe does some adjusting for differing coding models yoy, but that sounds hard
 * @customfunction
 * @param {string[][]} base_dx_array accepts array of dx codes
 * @param {string[][]} additional_dx_array accepts array of dx codes
 *
 */


function dx_gap_raf() {
  var base_dx_array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var additional_dx_array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var model = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var age = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var sex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
  var disabl = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var baserate = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0.0;

  for (i = 0; i < base_dx_array.length; i++) {
    for (j = 0; j < base_dx_array[i].length; j++) {
      base_dx_array = base_dx_array;
    }
  }

  var temp_base_dx_array = base_dx_array.toString();
  temp_base_dx_array = temp_base_dx_array.split(",");

  for (i = 0; i < temp_base_dx_array.length; i++) {
    temp_base_dx_array[i] = temp_base_dx_array[i].toString().trim();
  }

  for (i = 0; i < additional_dx_array.length; i++) {
    for (j = 0; j < additional_dx_array[i].length; j++) {
      additional_dx_array = additional_dx_array;
    }
  }

  var temp_additional_dx_array = additional_dx_array.toString();
  temp_additional_dx_array = temp_additional_dx_array.split(",");

  for (i = 0; i < temp_additional_dx_array.length; i++) {
    temp_additional_dx_array[i] = temp_additional_dx_array[i].toString().trim();
  }

  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  var dx_dict = dx_gaps(temp_base_dx_array, temp_additional_dx_array, ver, model, age, sex, disabl, baserate);
  var result = dx_dict['raf'];
  return result.toString();
}

function hcc_gaps(old_list, new_list, ver, model, age, sex, disabl, baserate) {
  /*
  Utility to identify hccs that were dropped or downgraded from one list to the next
  */
  never_trump = default_never_trump;
  var new_hccs = prep_hccs(new_list, ver, age, disabl, never_trump);
  var old_hccs = prep_hccs(old_list, ver, age, disabl, never_trump);
  var diff = hcc_diff(old_hccs, new_hccs, ver, age, sex, model, disabl, never_trump, baserate);
  var cal1 = parseFloat(hcc2raf(diff['deletes'], ver, model, disabl, age, never_trump, baserate));
  var cal2 = parseFloat(hcc2raf(diff['downgraded'], ver, model, disabl, age, never_trump, baserate));
  var cal3 = parseFloat(hcc2raf(diff['downgrade_to'], ver, model, disabl, age, never_trump, baserate));
  var raf = -(cal1 + cal2) + cal3;
  var gaps = {
    "Deletes": diff["deletes"],
    "Downgraded": diff["downgraded"],
    "raf": raf,
    "premium": Math.round(raf * baserate, 2)
  };
  return gaps;
}

function dx_gaps(old_list, new_list, ver, model, age, sex, disabl, baserate) {
  /*
  Utility to identify hccs that were dropped or downgraded from one list to the next
  */
  never_trump = default_never_trump;
  verbose = default_verbose;
  var old_hccs = dx2hcc(old_list, age, ver, sex, disabl, never_trump, verbose);
  var new_hccs = dx2hcc(new_list, age, ver, sex, disabl, never_trump, verbose);
  var diff = hcc_gaps(old_hccs, new_hccs, ver, model, age, sex, disabl, baserate);
  diff['Downgraded'] = Array.from(get_hcc_dx(diff['Downgraded'], clean_dxlist(old_list, ver), ver));
  diff['Deletes'] = Array.from(get_hcc_dx(diff['Deletes'], clean_dxlist(old_list, ver), ver));
  return diff;
}

function dx2raf(dx_list, age, ver, model, sex, disabl, verbose, never_trump, baserate) {
  /*
  Utility to calculate raf from list of DX codes
  */
  var hccs = dx2hcc(dx_list, age, ver, sex, disabl, never_trump, verbose);
  var raf = get_raf([], hccs, ver, model, verbose, baserate);
  return raf["hcc_score"];
}

function dx2hcc(dx_list, age, ver, sex, disabl, never_trump, verbose) {
  /*
  Utility to calculate a list of unique, trumped, HCCs from dx codes, includes interactions and age/sex edits.
  :param dx_list: list of str
                  List of DX Codes (case and decimal insensitive)
  :param ver: str
              HCC Model version
  :param age: float
              Beneficiary age
  :param verbose:
  :param disabl: bool
                  Disability flag
  :param sex: Gender {"M" or "F"}
  :return: list of str
          List of HCC codes
  */
  var dx_dct = dx_hccs(dx_list, ver, age, sex, verbose);
  var unique_hccs = dxdct_hccs(dx_dct, never_trump);
  var collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base'
  });
  unique_hccs.sort(collator.compare);
  unique_hccs = interactions[ver](unique_hccs, disabl, age);
  return unique_hccs;
}

function dx_hccs(dx_list, ver, age, sex, verbose) {
  /*
  Look up the HCC code for each unique DX code in a list of DX. Includes trumping and agesex edits
  :param dx_list: list of str
                  List of dx codes; case and decimal insensitive
  :param ver: str
              Optional HCC version. Otherwise uses default version of ccalc object
  :param age: float
              Member age
  :param sex: str
              Member gender {"M"/"F"}
  :param verbose: bool
                  Include Non HCC DX in outputs
  :return: dict
          Dict of unique DX codes and their corresponding hcc codes
  */
  var dxmap = default_dxmap[ver];
  var hccmap = default_hccmap[ver];
  var dx_dct = {};
  var unique_dx = clean_dxlist(dx_list, ver); // Validate DX against model and pull in DX info  

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = unique_dx[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var dx = _step.value;

      if (dx in dxmap) {
        dx_dct[dx] = JSON.parse(JSON.stringify(dxmap[dx]));
      } else if (verbose) {
        dx_dct[dx] = {
          "desc": "",
          "hccs": {}
        };
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (age && sex) {
    // age and sex are optional. w/o them this function can still generically do dx->hcc calcs
    agesex_edits(dx_dct, age, sex);
  } // Find all unique HCCs that are valid in the hcc ver


  var unique_hccs = new Set();

  for (var key in dx_dct) {
    if (dx_dct.hasOwnProperty(key)) {
      for (var hcc in dx_dct[key]['hccs']) {
        if (dx_dct[key]['hccs'].hasOwnProperty(hcc)) {
          if (dx_dct[key]['hccs'][hcc] in hccmap) {
            unique_hccs.add(dx_dct[key]['hccs'][hcc]);
          }
        }
      }
    }
  }

  ;
  var got_trumped = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = unique_hccs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var hcc = _step2.value;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = hccmap[hcc]['children'][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var child = _step3.value;
          got_trumped[child] = hcc;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    } // Apply trumping and convert to HCC sets to lists (better for json serialization)

  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  for (var dx in dx_dct) {
    if (dx_dct.hasOwnProperty(dx)) {
      var temp_a = dx_dct[dx]['hccs'];
      var temp_b = [];

      for (var i in dx_dct[dx]['hccs']) {
        temp_b.push({
          'desc': hccmap[dx_dct[dx]['hccs'][i]]['desc']
        });
      }

      var c = temp_a.map(function (e, i) {
        return [e, temp_b[i]];
      });
      var temp_c = {};

      for (var key in c) {
        if (c.hasOwnProperty(key)) {
          temp_c[c[key][0]] = c[key][1];
        }
      }

      dx_dct[dx]['hccs'] = temp_c;

      for (var trumped_hcc in got_trumped) {
        if (got_trumped.hasOwnProperty(trumped_hcc)) {
          if (trumped_hcc in dx_dct[dx]['hccs']) {
            // If we find trumped HCC, replace with note of its demise
            dx_dct[dx]['hccs'][trumped_hcc]['trumped by'] = got_trumped[trumped_hcc];
          }
        }
      }
    }
  }

  return dx_dct;
}

function dxdct_hccs(dx_dct) {
  var never_trump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  never_trump = never_trump || default_never_trump;
  var hcc_list = new Set();

  if (never_trump == 0) {
    for (var key in dx_dct) {
      if (dx_dct.hasOwnProperty(key)) {
        for (var hcc in dx_dct[key]['hccs']) {
          if (dx_dct[key]['hccs'].hasOwnProperty(hcc)) {
            if (!dx_dct[key]['hccs'][hcc].hasOwnProperty(['trumped by'])) {
              hcc_list.add(hcc);
            }
          }
        }
      }
    }

    hcc_list = Array.from(hcc_list);
    var collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    hcc_list.sort(collator.compare);
  } else {
    var hcc_list = new Set();

    for (var key in dx_dct) {
      if (dx_dct.hasOwnProperty(key)) {
        for (var hcc in dx_dct[key]['hccs']) {
          // hcc_list.add(dx_dct[key]['hccs'][hcc]);
          hcc_list.add(hcc);
        }
      }
    }

    hcc_list = Array.from(hcc_list);
    var collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base'
    });
    hcc_list.sort(collator.compare);
  }

  return hcc_list;
}

function clean_dxlist(dx_list, ver) {
  // Convert string to list, dedupe, and ensure DX are formatted correctly.
  var dxmap = default_dxmap[ver];
  var list_dx = [];

  for (var i = 0; i < dx_list.length; i++) {
    if (dx_list[i] != '') {
      list_dx[i] = String(dx_list[i]).replace('.', '').toUpperCase();
    }
  }

  if (typeof list_dx == 'string') {
    list_dx = list_dx.split(/\s*,\s*|\s+|\s*;\s*|\s*:\s*/);
  }

  var dx_set = new Set();

  for (var dx = 0; dx < list_dx.length; dx++) {
    if (dxmap.hasOwnProperty(list_dx[dx])) {
      dx_set.add(list_dx[dx]);
    }
  }

  return dx_set;
}

function clean_hcclist(hcc_list, ver) {
  var hcc_map = default_hccmap[ver];

  if (typeof hcc_list == 'string') {
    hcc_list = hcc_list.split(/\s*,\s*|\s+|\s*;\s*|\s*:\s*/);
  } else if (typeof hcc_list == 'number') {
    hcc_list = [hcc_list];
  } // If you got integers, add the HCC prefix. If strings, make sure they're stripped and uppercase


  var hcc_list_temp = [];
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = hcc_list[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var hcc = _step4.value;

      if (!isNaN(hcc.toString().trim())) {
        hcc_list_temp.push("HCC" + hcc.toString().trim());
      } else {
        hcc_list_temp.push(hcc.trim().toUpperCase());
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
        _iterator4["return"]();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  hcc_list = hcc_list_temp; //Replacing HCC019 to HCC19

  var hcc_list_temp = [];
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = hcc_list[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var hcc1 = _step5.value;
      hcc_list_temp.push(hcc1.replace(/HCC0+/, 'HCC'));
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
        _iterator5["return"]();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  hcc_list = hcc_list_temp; // We want HCC1 rather than HCC001, etc.

  var hcc_set = new Set();
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = hcc_list[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var hcc2 = _step6.value;

      if (hcc_map.hasOwnProperty(hcc2)) {
        hcc_set.add(hcc2);
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return Array.from(hcc_set);
}

function hcc2raf(hcc_list, ver, model, disabl, age, never_trump, baserate) {
  /*
  Utility for calculating hcc raf for a list of hccs
  */
  var temp_hcc_list = prep_hccs(hcc_list, ver, age, disabl, never_trump);
  var raf = get_raf([], temp_hcc_list, ver, model, verbose = true, baserate);
  return raf["hcc_score"];
}

function prep_hccs(hcc_list, ver, age, disabl, never_trump) {
  /*
  Utility for prepping an HCC list, applying Trumping and Interactions; does not include age/sex interactions
  as they at the DX level
  */
  var hccs = trump_hccs(hcc_list, ver, never_trump);
  hccs = interactions[ver](hccs, disabl, age);
  return hccs;
}

function trump_hccs(hcc_list, ver, never_trump) {
  // Given a list of HCCs and an HCC version, returns a list of HCCs after trumping
  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  never_trump = never_trump || default_never_trump;
  var hccmap = default_hccmap[ver]; // Make sure we're getting the right format

  hcc_list_temp = clean_hcclist(hcc_list, ver);

  if (never_trump == 0) {
    var hcc_set = new Set(hcc_list_temp);
    var trumped_set = new Set();
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = hcc_set[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var hcc = _step7.value;

        if (hcc in hccmap) {
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = hccmap[hcc]['children'][Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var child = _step8.value;
              trumped_set.add(child);
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                _iterator8["return"]();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
          _iterator7["return"]();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    var temp_hcc_set = new Set(_toConsumableArray(hcc_set).filter(function (x) {
      return !trumped_set.has(x);
    }));
    hcc_list_temp = Array.from(temp_hcc_set);
  }

  var collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: 'base'
  });
  hcc_list_temp.sort(collator.compare);
  return hcc_list_temp;
}

function hcc_dct(hcc_list, ver, age, sex, verbose) {
  var hccmap = default_hccmap[ver];
  var unique_hccs = new Set();
  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = hcc_list[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var hcc = _step9.value;

      if (hcc in hccmap) {
        unique_hccs.add(hcc);
      }
    }
  } catch (err) {
    _didIteratorError9 = true;
    _iteratorError9 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
        _iterator9["return"]();
      }
    } finally {
      if (_didIteratorError9) {
        throw _iteratorError9;
      }
    }
  }

  var got_trumped = {};
  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = unique_hccs[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var hcc = _step10.value;
      var _iteratorNormalCompletion12 = true;
      var _didIteratorError12 = false;
      var _iteratorError12 = undefined;

      try {
        for (var _iterator12 = hccmap[hcc]['children'][Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
          var child = _step12.value;
          got_trumped[child] = hcc;
        }
      } catch (err) {
        _didIteratorError12 = true;
        _iteratorError12 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }
        } finally {
          if (_didIteratorError12) {
            throw _iteratorError12;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError10 = true;
    _iteratorError10 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
        _iterator10["return"]();
      }
    } finally {
      if (_didIteratorError10) {
        throw _iteratorError10;
      }
    }
  }

  var hcc_dct = {};
  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (var _iterator11 = unique_hccs[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
      var hcc = _step11.value;

      if (hccmap.hasOwnProperty(hcc)) {
        hcc_dct[hcc] = JSON.parse(JSON.stringify(hccmap[hcc])); // Get details for this hcc Code

        delete hcc_dct[hcc]['parents'];
        delete hcc_dct[hcc]['children'];
      } else if (verbose) {
        hcc_dct[hcc] = {
          "desc": "",
          "parents": {}
        };
      }
    }
  } catch (err) {
    _didIteratorError11 = true;
    _iteratorError11 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
        _iterator11["return"]();
      }
    } finally {
      if (_didIteratorError11) {
        throw _iteratorError11;
      }
    }
  }

  for (var hcc in hcc_dct) {
    for (var trumped_hcc in got_trumped) {
      if (trumped_hcc == hcc) {
        // If we find trumped HCC, replace with note of its demise
        hcc_dct[hcc]['trumped by'] = got_trumped[trumped_hcc];
      }
    }
  }

  return hcc_dct;
}

function hcc_increment(old_list, new_list, ver, model, age, disabl, never_trump, baserate) {
  // Utility to identify the incremental HCCs and value of adding a new list HCCs to a base list of HCCs
  var new_hccs = prep_hccs(new_list, ver, age, disabl, never_trump);
  var old_hccs = prep_hccs(old_list, ver, age, disabl, never_trump);
  new_hccs = new_hccs + ','.concat(old_hccs);
  var final_hccs = prep_hccs(new_hccs, ver, age, disabl, never_trump);
  var diff = hcc_diff(old_hccs, final_hccs, ver, age, sex = '', model, disabl, never_trump, baserate);
  diff["final_hccs"] = final_hccs;
  delete diff['downgraded'];
  delete diff['downgrade_to'];
  delete diff['deletes'];
  return diff;
}

function dx_increments(old_list, new_list, ver, model, age, disabl, never_trump, baserate) {
  // Utility to identify the incremental HCCs and value of adding a new list DXs to a base list of DXs
  var verbose = default_verbose;
  var old_hccs = dx2hcc(old_list, age, ver, sex = '', disabl, never_trump, verbose);
  var new_hccs = dx2hcc(new_list, age, ver, sex = '', disabl, never_trump, verbose);
  var diff = hcc_increment(old_hccs, new_hccs, ver, model, age, disabl, never_trump, baserate);
  var dxinc = {
    "adds": Array.from(get_hcc_dx(diff['adds'], clean_dxlist(new_list, ver), ver)),
    "upgraded": Array.from(get_hcc_dx(diff["upgraded"], clean_dxlist(old_list, ver), ver))
  };
  dxinc['raf'] = diff['raf'];
  dxinc['premium'] = diff['premium'];
  return dxinc;
}

function get_hcc_dx(hcc_list, dx_list, ver) {
  var dxmap = default_dxmap[ver];
  var hcc_set = new Set(hcc_list);
  var mydx = new Set();
  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (var _iterator13 = dx_list[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
      var dx = _step13.value;
      var temp_set = new Set(dxmap[dx]['hccs']);

      var temp = _toConsumableArray(temp_set).filter(function (x) {
        return hcc_set.has(x);
      });

      if (dxmap.hasOwnProperty(dx) && temp.length) {
        mydx.add(dx);
      }
    } // mydx = {dx for dx in dx_list if dx in dxmap and dxmap[dx]['hccs'].intersection(hcc_set)}

  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
        _iterator13["return"]();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }

  return mydx;
}

function hcc_diff(old_list, new_list, ver, age, sex, model, disabl, never_trump, baserate) {
  /*
  Calculate the changes between two hcc lists, {"adds":[], "upgraded":[] "downgraded":[], "deletes":[]}
  - "adds" are new HCC Codes (includes upgrades of other codes),
  - "upgraded" are codes from base that are no longer relevant due to new codes
  - "downgraded" are codes from base that are present at a lower specificity in new
  - "deletes" are codes from base that are no longer present at all
  */
  var hccmap = default_hccmap[ver]; // Prep cleans and trumps the list and add interactions

  var old_set = new Set(prep_hccs(old_list, ver, age, disabl));
  var new_set = new Set(prep_hccs(new_list, ver, age, disabl, never_trump)); // Find the full set of codes that each set can trump

  var old_children = new Set();
  var new_children = new Set();
  var new_parents = new Set();
  var _iteratorNormalCompletion14 = true;
  var _didIteratorError14 = false;
  var _iteratorError14 = undefined;

  try {
    for (var _iterator14 = old_set[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
      var hcc1 = _step14.value;

      if (hcc1 in hccmap) {
        var _iteratorNormalCompletion17 = true;
        var _didIteratorError17 = false;
        var _iteratorError17 = undefined;

        try {
          for (var _iterator17 = hccmap[hcc1]['children'][Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
            var child = _step17.value;
            old_children.add(child);
          }
        } catch (err) {
          _didIteratorError17 = true;
          _iteratorError17 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion17 && _iterator17["return"] != null) {
              _iterator17["return"]();
            }
          } finally {
            if (_didIteratorError17) {
              throw _iteratorError17;
            }
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError14 = true;
    _iteratorError14 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
        _iterator14["return"]();
      }
    } finally {
      if (_didIteratorError14) {
        throw _iteratorError14;
      }
    }
  }

  var _iteratorNormalCompletion15 = true;
  var _didIteratorError15 = false;
  var _iteratorError15 = undefined;

  try {
    for (var _iterator15 = new_set[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
      var hcc2 = _step15.value;

      if (hcc2 in hccmap) {
        var _iteratorNormalCompletion18 = true;
        var _didIteratorError18 = false;
        var _iteratorError18 = undefined;

        try {
          for (var _iterator18 = hccmap[hcc2]['children'][Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
            var child = _step18.value;
            new_children.add(child);
          }
        } catch (err) {
          _didIteratorError18 = true;
          _iteratorError18 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion18 && _iterator18["return"] != null) {
              _iterator18["return"]();
            }
          } finally {
            if (_didIteratorError18) {
              throw _iteratorError18;
            }
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError15 = true;
    _iteratorError15 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
        _iterator15["return"]();
      }
    } finally {
      if (_didIteratorError15) {
        throw _iteratorError15;
      }
    }
  }

  var _iteratorNormalCompletion16 = true;
  var _didIteratorError16 = false;
  var _iteratorError16 = undefined;

  try {
    for (var _iterator16 = new_set[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
      var hcc3 = _step16.value;

      if (hcc3 in hccmap) {
        var _iteratorNormalCompletion19 = true;
        var _didIteratorError19 = false;
        var _iteratorError19 = undefined;

        try {
          for (var _iterator19 = hccmap[hcc3]['parents'][Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
            var child = _step19.value;
            new_parents.add(child);
          }
        } catch (err) {
          _didIteratorError19 = true;
          _iteratorError19 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion19 && _iterator19["return"] != null) {
              _iterator19["return"]();
            }
          } finally {
            if (_didIteratorError19) {
              throw _iteratorError19;
            }
          }
        }
      }
    } // New HCCs, except where they are trumped by old HCCs (downgrades)

  } catch (err) {
    _didIteratorError16 = true;
    _iteratorError16 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
        _iterator16["return"]();
      }
    } finally {
      if (_didIteratorError16) {
        throw _iteratorError16;
      }
    }
  }

  var new_hccs_temp = new Set(_toConsumableArray(new_set).filter(function (x) {
    return !old_set.has(x);
  }));
  var new_hccs = new Set(_toConsumableArray(new_hccs_temp).filter(function (x) {
    return !old_children.has(x);
  }));
  var downgraded_temp = new Set(_toConsumableArray(old_set).filter(function (x) {
    return !new_set.has(x);
  }));
  var downgraded = new Set(_toConsumableArray(downgraded_temp).filter(function (x) {
    return new_parents.has(x);
  }));
  var downgrade_to_temp = new Set(_toConsumableArray(new_set).filter(function (x) {
    return !old_set.has(x);
  }));
  var downgrade_to = new Set(_toConsumableArray(downgrade_to_temp).filter(function (x) {
    return old_children.has(x);
  })); //new_hccs = new_set.difference(old_set).difference(old_children)
  //downgraded = old_set.difference(new_set).intersection(new_parents)
  //downgrade_to = new_set.difference(old_set).intersection(old_children)

  var upgraded = new Set();

  if (never_trump === 1) {
    var prep_hccs_set = new Set(prep_hccs(Array.from(new_set)));
    var upgraded_temp = new Set(_toConsumableArray(old_set).filter(function (x) {
      return !prep_hccs_set.has(x);
    }));
    upgraded = _toConsumableArray(upgraded_temp).filter(function (x) {
      return new_children.has(x);
    }); //old_set.difference(set(this.prep_hccs(list(new_set)))).intersection(new_children)
  } else {
    var upgraded_temp = new Set(_toConsumableArray(old_set).filter(function (x) {
      return !new_set.has(x);
    }));
    upgraded = _toConsumableArray(upgraded_temp).filter(function (x) {
      return new_children.has(x);
    }); //upgraded = old_set.difference(new_set).intersection(new_children)
  }

  var del_hccs_temp = new Set(_toConsumableArray(old_set).filter(function (x) {
    return !new_set.has(x);
  }));
  var del_hccs_union = new Set([].concat(_toConsumableArray(upgraded), _toConsumableArray(downgraded)));
  var del_hccs = new Set(_toConsumableArray(del_hccs_temp).filter(function (x) {
    return !del_hccs_union.has(x);
  })); //del_hccs = old_set.difference(new_set).difference(upgraded.union(downgraded))

  var old_raf = hcc2raf(Array.from(old_set), ver = ver, model = model, baserate = baserate, never_trump = never_trump);
  var new_raf = hcc2raf(Array.from(new_set), ver = ver, model = model, baserate = baserate, never_trump = never_trump);
  var delta_raf = new_raf - old_raf;
  var diff = {
    "adds": Array.from(new_hccs),
    "upgraded": Array.from(upgraded),
    "downgraded": Array.from(downgraded),
    "downgrade_to": Array.from(downgrade_to),
    "deletes": Array.from(del_hccs),
    "raf": delta_raf,
    "premium": Math.round(delta_raf * baserate, 2)
  };
  return diff;
}

function member(condition_list, age, sex, model, orec, ver, baserate) {
  /*
      Builds an HCC risk score for a Medicare Advantage member given demographic and disease factors
      :param dx_list: list of str
                      List of DX codes; case and decimal insensitive
      :param age: float
                  Age of member
      :param sex: str
                  Gender of Member: Accepts "M"/"F", "Male"/"Female" or CMS numerical codes 1/2
      :param model: str
                  HCC Model to be used for member. Accepts:
                      "CNA": Community - Non-dual aged
                      "CND": Community - Non-dual disabled
                      "CFA": Community - Full Benefit dual aged
                      "CFD": Community - Full Benefit dual disabled
                      "CPA": Community - Partial Benefit dual aged
                      "CPD": Community - Partial Benefit dual disabled
                      "INS": Institutional
                      "NE": New enrollee
                      "SNPNE": C-SNP new enrolee
      :param orec: str
                  Original Reason for Entitlement:
                      "0": Old age (OASI)
                      "1": Disability (DIB)
                      "2": End Stage Renal Disease (ESRD)
                      "3": Both DIB and ESRD
       :param ver: str
                  Version of HCC Model to be used (overrides default version set in Ccalc).
                  Accepts {'v22', 'v23', 'v24'}
      :return: dict
              Map of factors and risk scores for member
  */
  // Get age/sex/disability demographic codes
  var disabl = model.endsWith("D");
  var demo_codes = agesex(age, sex, orec, model);
  var cond_dict = condition_resolver(condition_list, ver);
  var condition = cond_dict['condition'];
  var allhcc = cond_dict['allhcc'];
  var verbose = default_verbose;
  var flag;
  var raf;
  var dx_dct;

  if (allhcc == 1) {
    var dx_dct = hcc_dct(condition, ver, age, sex, verbose);
    unique_hccs = prep_hccs(condition, ver = ver, age = age);
    unique_hccs = interactions[ver](unique_hccs, disabl, age);
    raf = get_raf(demo_codes, unique_hccs, ver, model, verbose, baserate);
    flag = 'hcc';
  } else {
    // process DX list
    dx_dct = dx_hccs(condition, ver, age, sex, verbose);
    var unique_hccs = dxdct_hccs(dx_dct);
    unique_hccs = interactions[ver](unique_hccs, disabl, age);
    raf = get_raf(demo_codes, unique_hccs, ver, model, verbose, baserate);
    flag = 'dx';
  }

  return {
    "hcc_model": {
      "version": ver,
      "model": model
    },
    "demo": {
      "age": age,
      "sex": sex,
      "orec": orec
    },
    "raf": raf,
    'flag': flag,
    "dx_hccs": dx_dct
  };
}

function condition_resolver(conditionlist) {
  var ver = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var never_trump = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var allhcc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  //need factoring
  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  never_trump = never_trump || default_never_trump;
  var list_hcc = [];

  for (item in conditionlist) {
    if (Number.isInteger(item) || item.startsWith('HCC')) {
      list_hcc.push(item);
    }
  } // list_hcc = conditionlist.filter(item => Number.isInteger(item) || item.startsWith('HCC'));


  var list_dx = [];
  var list_dx_clean = [];
  var dct = new Set();

  if (list_hcc.length > 0 || allhcc) {
    allhcc = 1;
    list_dx = conditionlist.filter(function (item) {
      return !list_hcc.includes(item);
    });
    list_dx_clean = clean_dxlist(list_dx, ver);
    var hccs = dx2hcc(list_dx_clean, ver = ver, never_trump = never_trump);
    var combined_hccs = list_hcc.concat(hccs);
    dct = {
      'allhcc': allhcc,
      'condition': combined_hccs
    };
  } else {
    list_dx = conditionlist;
    dct = {
      'allhcc': allhcc,
      'condition': list_dx
    };
  }

  return dct;
}

function agesex_edits(dx_dct, age, sex) {
  /*
  Edits DX List for a beneficiary based on AGE/SEX (From CMS I0V05ED2.TXT)
  Valid for V22, V23, V24
  :param dx_dct: dict
                 Dict of {DX:HCC}
  :param age: float
              Age of member
  :param sex: str
              Member's gender
  :return: dx_dct: dict
              Dictionary of {DX:HCC} edited per member age/sex rules
  */
  var ed_leukemia = ["C9100", "C9101", "C9102", "C9500", "C9501", "C9502", "C7400", "C7401", "C7402", "C7410", "C7411", "C7412", "C7490", "C7491", "C7492"];
  var ed_bronchitis = ["J410", "J411", "J418", "J42", "J440", "J441"];
  var ed_vasc_insf = ["K55011", "K55012", "K55019", "K55021", "K55022", "K55029", "K55031", "K55032", "K55039", "K55041", "K55042", "K55049", "K55051", "K55052", "K55059", "K55061", "K55062", "K55069", "K5530", "K5531", "K5532", "K5533"];
  var ed_emphysema = ["J430", "J431", "J432", "J438", "J439", "J449", "J982", "J983"];
  var ed_breastca = ["C50011", "C50012", "C50019", "C50021", "C50022", "C50029", "C50111", "C50112", "C50119", "C50121", "C50122", "C50129", "C50211", "C50212", "C50219", "C50221", "C50222", "C50229", "C50311", "C50312", "C50319", "C50321", "C50322", "C50329", "C50411", "C50412", "C50419", "C50421", "C50422", "C50429", "C50511", "C50512", "C50519", "C50521", "C50522", "C50529", "C50611", "C50612", "C50619", "C50621", "C50622", "C50629", "C50811", "C50812", "C50819", "C50821", "C50822", "C50829", "C50911", "C50912", "C50919", "C50921", "C50922", "C50929"];
  var ed_low_bw = ["P0500", "P0501", "P0502", "P0503", "P0504", "P0505", "P0506", "P0507", "P0508", "P0509", "P0510", "P0511", "P0512", "P0513", "P0514", "P0515", "P0516", "P0517", "P0518", "P0519", "P052", "P059", "P0700", "P0701", "P0702", "P0703", "P0710", "P0714", "P0715", "P0716", "P0717", "P0718", "P0720", "P0721", "P0722", "P0723", "P0724", "P0725", "P0726", "P0730", "P0731", "P0732", "P0733", "P0734", "P0735", "P0736", "P0737", "P0738", "P0739", "P080", "P081", "P0821", "P0822"];
  var ed_conjoined = ["Q894"];
  var ed_newbn_substance = ["K551", "K558", "K559", "P041", "P0411", "P0412", "P0413", "P0414", "P0415", "P0416", "P0417", "P0418", "P0419", "P041A", "P042", "P043", "P0440", "P0441", "P0442", "P0449", "P045", "P046", "P048", "P0481", "P0489", "P049", "P930", "P938", "P961", "P962", "Q390", "Q391", "Q392", "Q393", "Q394", "Q6410", "Q6411", "Q6412", "Q6419", "Q790", "Q791", "Q792", "Q793", "Q794", "Q7951"];
  var ed_chron_resp = ["P270", "P271", "P278", "P279"];
  var ed_disruptive_mood = ["F3481"];
  var ed_hemophilia = ["D66", "D67"]; // Optimal to have the loop outside of the age checks, but this is easier to read

  for (var dx in dx_dct) {
    // Split acute lymphoid and other acute leukemias, except  myeloid diagnoses to age 18+ (HCC 8)
    // and age <18 (HCC 9). Split adrenal gland cancer diagnoses to age 18+ (HCC 10) and age <18 (HCC 9).
    if (age < 18 && ed_leukemia.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC9"];
    } // Split chronic bronchitis diagnoses to age 18+ (HCC 160) and age <18 (HCC 161)


    if (age < 18 && ed_bronchitis.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC161"];
    } // Split acute vascular insufficiency of intestine diagnosis to age 2+ (HCC 154) and age <2 (HCC 42)


    if (age < 2 && ed_vasc_insf.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC42"];
    } // Split breast cancer diagnoses to age 50+ (HCC 12) and age <50 (HCC 11)


    if (age < 50 && ed_breastca.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC11"];
    } // Split emphysema diagnoses to age 18+ (HCC 160) and age 2-17 (HCC160; split not needed in HHS model).
    // If age <2 out of payment model


    if (age < 2 && ed_emphysema.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC1"];
    } // Edit for newborn low birthweight. If age 1+ out of payment model


    if (age != 0 && ed_low_bw.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC1"];
    } // Split conjoined twins diagnoses to age 1+ (HCC 97) and age <1 (HCC 247)


    if (age >= 1 && ed_conjoined.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC97"];
    } // Neonatal effects of maternal drug abuse: If age 2+ out of payment model


    if (age >= 2 && ed_newbn_substance.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC1"];
    } // Split chronic respiratory disease arising in the perinatal period diagnoses to age 2+
    // (HCC 162) and age <2 (HCC 127).


    if (age >= 2 && ed_chron_resp.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC162"];
    } // Mood disorder: Edit for targeted age of diagnosis. If age <6 or age >18 out of payment model.


    if (age < 6 || age > 18 && ed_disruptive_mood.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC1"];
    } // Split hemophilia diagnoses to male (HCC 66 if age <65 or HCC 66 if age 65+; age split not needed in HHS model)
    //  and female (HCC 75)


    female_sex = ["2", "F", "Female"];

    if (female_sex.includes(sex) && ed_hemophilia.includes(dx)) {
      dx_dct[dx]['hccs'] = ["HCC75"];
    }
  }

  edit_dct = {}; // Build new dict after filtering out all HCCs edited out

  for (dx in dx_dct) {
    if (dx_dct[dx]['hccs'] != ["HCC1"]) {
      edit_dct[dx] = dx_dct[dx];
    }
  }

  return edit_dct;
}

function get_raf(demo_lst, hcc_lst, ver, model, verbose, baserate) {
  /*
  Look up demographic and hcc RAF for a member given codes. IMPORTANT: ASSUMES HCCs are already clean and deduped
  and hierarchy. Based on CMS V2218O1P.TXT.  Returns a dict of risk scores in the format:
  {
      raf: float of total risk factor,
      premium: PM PM payment for members of this raf and base rate($)
      demo_raf: float of demographic risk factor
      hcc_raf: float of hcc risk factor
      demo_detail: dict of {demographic_code: demo_raf} for each demographic code in list
      hcc_defail: dict of {hcc_code: hcc:raf} for each hcc code in list
  :param model: str
                  Hcc model for use
  :param demo_lst: list of str
                  List of applicable demographic codes for a member (eg CNA_F65_70)
  :param hcc_lst: list of str
                  List of hccs (assumes hccs have already been trumped)
  :param ver: str
                  Optional HCC version to be used in calculation
  :param model: str
          Optional HCC model to be used in calculation
  :param verbose: bool
  :param baserate: float
                  pmpm premium base rate
  :return: dict
          raf_dct
  */
  ver === null ? ver = default_ver : ver = ver.toLowerCase();
  model === null ? model = default_model : model = model.toUpperCase();
  baserate = baserate || default_baserate;
  verbose = verbose || default_verbose;
  var hcccoefn = default_hcccoefn[ver];
  var demo_detail = {};
  var hcc_detail = {};
  var demo_raf = 0.0;
  var hcc_raf = 0.0;
  var _iteratorNormalCompletion20 = true;
  var _didIteratorError20 = false;
  var _iteratorError20 = undefined;

  try {
    for (var _iterator20 = demo_lst[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
      var demo = _step20.value;

      if (hcccoefn.hasOwnProperty(demo)) {
        demo_detail[demo] = hcccoefn[demo];
        demo_raf += hcccoefn[demo];
      }
    }
  } catch (err) {
    _didIteratorError20 = true;
    _iteratorError20 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion20 && _iterator20["return"] != null) {
        _iterator20["return"]();
      }
    } finally {
      if (_didIteratorError20) {
        throw _iteratorError20;
      }
    }
  }

  for (var hcc = 0; hcc < hcc_lst.length; hcc++) {
    var label = model + "_" + hcc_lst[hcc];

    if (label in hcccoefn) {
      hcc_detail[label] = hcccoefn[label];
      hcc_raf += hcccoefn[label];
    } else if (verbose) {
      hcc_detail[label] = 0.0;
    }
  }

  var score = (demo_raf + hcc_raf).toFixed(4);
  var raf_dct = {
    "score": score,
    "premium": (score * baserate).toFixed(2),
    "demo_score": demo_raf.toFixed(4),
    "hcc_score": hcc_raf.toFixed(4),
    "demo_detail": demo_detail,
    "hcc_detail": hcc_detail
  };
  return raf_dct;
}

function agesex(age, sex, orec, model) {
  /*
      Create demographic variables used in regressions, from CMS SAS macro AGESEXV2
      Valid for V22, V23, V24
      :param age: float
                  Age of beneficiary
      :param sex: str
                  Gender of beneficiary
      :param orec: str
                  Original reason for enrollment
      :param model: str
                  Code for CMS model (str)
      :return: list of str
              list of demographic str for looking up demo coefficients
  */
  var age_maps = {
    "STD": ["0_34", "35_44", "45_54", "55_59", "60_64", "65_69", "70_74", "75_79", "80_84", "85_89", "90_94", "95_GT"],
    "NE": ["0_34", "35_44", "45_54", "55_59", "60_64", "65", "66", "67", "68", "69", "70_74", "75_79", "80_84", "85_89", "90_94", "95_GT"]
  };
  age = Math.trunc(age); // In case float is passed and someone at upper age bound

  var demo_str;
  var male_sex = ["M", "MALE", "1"];

  if (male_sex.includes(sex.toUpperCase())) {
    demo_str = 'M';
  } else {
    demo_str = "F";
  } // Directly from CMS AGESEXV2


  var disabl = age < 65 && orec != "0";
  var origds = orec == "1" && !disabl;
  var medicaid;
  var medicaid_condition = ["CP", "CF"];

  if (medicaid_condition.includes(model)) {
    medicaid = true;
  } else {
    medicaid = false;
  }

  var new_enrolee = model.endsWith("NE");
  var age_labels = [];

  if (new_enrolee) {
    age_labels = age_maps["NE"];
  } else {
    age_labels = age_maps["STD"];
  } // Derive the lower bound & upper bound of each age band from ordered list of age labels


  var age_lower_bounds = [];
  var age_upper_bounds = [];

  for (var _i3 in age_labels) {
    var split = age_labels[_i3].split("_");

    age_lower_bounds.push(split[0]);
    age_upper_bounds.push(split[1]);
  }

  var _iteratorNormalCompletion21 = true;
  var _didIteratorError21 = false;
  var _iteratorError21 = undefined;

  try {
    for (var _iterator21 = age_lower_bounds.entries()[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
      var _step21$value = _slicedToArray(_step21.value, 2),
          _i4 = _step21$value[0],
          lower_bound = _step21$value[1];

      if (_i4 == age_lower_bounds[age_lower_bounds.length] - 1) {
        demo_str += age_labels[_i4];
        break;
      }

      if (lower_bound >= age && lower_bound < age_lower_bounds[_i4 + 1]) {
        demo_str += age_labels[_i4];
        break;
      }
    }
  } catch (err) {
    _didIteratorError21 = true;
    _iteratorError21 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion21 && _iterator21["return"] != null) {
        _iterator21["return"]();
      }
    } finally {
      if (_didIteratorError21) {
        throw _iteratorError21;
      }
    }
  }

  if (model.endsWith("NE")) {
    if (medicaid) {
      var _mcaid_flag = "";
    } else {
      mcaid_flag = "N";
    }

    if (origds) {
      var _origds_flag = "";
    } else {
      origds_flag = "N";
    }

    demo_str = mcaid_flag + "MCAID_" + origds_flag + "ORIGDIS_NE" + demo_str;
  }

  var demo_lst = [model + "_" + demo_str];
  var model_type = ["CNA", "CFA", "CPA"];
  var ds_str;
  var sex_type;

  if (model_type.includes(model) && origds) {
    if (sex === "M") {
      sex_type = "Male";
    } else {
      sex_type = "Female";
    }

    ds_str = model + "_OriginallyDisabled_" + sex_type;
    demo_lst.push(ds_str);
  }

  return demo_lst;
}

function v22_interactions(ccs, disabl) {
  var age = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  /*
  Calculated interaction HCCs given a list of hccs, age, and disability flag
  :param ccs: List of HCCs in the format "HCC18" no trumping or cleaning of HCCs is done in this function
  :param disabl: CMS disabled flag
  :param age: Optional age of beneficiary; only one interaction uses age and it will be assumed false if not entered
  :return: List of HCC codes, including interaction codes
  */
  var cc_set = new Set(ccs);
  var int_hccs = {}; // diagnostic categories

  var diag_cats = {
    "CANCER": new Set(["HCC8", "HCC9", "HCC10", "HCC11", "HCC12"]),
    "DIABETES": new Set(["HCC17", "HCC18", "HCC19"]),
    "CARD_RESP_FAIL": new Set(["HCC82", "HCC83", "HCC84"]),
    "CHF": new Set(["HCC85"]),
    "gCopdCF": new Set(["HCC110", "HCC111", "HCC112"]),
    "RENAL": new Set(["HCC134", "HCC135", "HCC136", "HCC137"]),
    "SEPSIS": new Set(["HCC2"]),
    "gSubstanceAbuse": new Set(["HCC54", "HCC55"]),
    "gPsychiatric": new Set(["HCC57", "HCC58"])
  };
  var my_dcs = {};

  for (var key in diag_cats) {
    if (diag_cats.hasOwnProperty(key)) {
      var key_set = new Set(diag_cats[key]);
      var new_values = new Set(_toConsumableArray(key_set).filter(function (x) {
        return cc_set.has(x);
      }));
      my_dcs[key] = new_values;
    }
  } // Community Interactions


  var hcc85_set = new Set(_toConsumableArray(new Set(["HCC85"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc47_set = new Set(_toConsumableArray(new Set(["HCC47"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc96_set = new Set(_toConsumableArray(new Set(["HCC96"])).filter(function (x) {
    return cc_set.has(x);
  })); // int_hccs["HCC47_gCancer"] = my_dcs["CANCER"] && new Set([...new Set(["HCC47"])].filter(x => cc_set.has(x)));

  if (my_dcs["CANCER"].size && hcc47_set.size) {
    int_hccs["HCC47_gCancer"] = hcc47_set;
  } else {
    int_hccs["HCC47_gCancer"] = new Set();
  } // int_hccs["HCC85_gDiabetesMellit"] = my_dcs["DIABETES"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (my_dcs["DIABETES"].size && hcc85_set.size) {
    int_hccs["HCC85_gDiabetesMellit"] = hcc85_set;
  } else {
    int_hccs["HCC85_gDiabetesMellit"] = new Set();
  } // int_hccs["HCC85_gCopdCF"] = my_dcs["gCopdCF"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (my_dcs["gCopdCF"].size && hcc85_set.size) {
    int_hccs["HCC85_gCopdCF"] = hcc85_set;
  } else {
    int_hccs["HCC85_gCopdCF"] = new Set();
  } // int_hccs["HCC85_gRenal_V23"] = my_dcs["RENAL"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (my_dcs["RENAL"].size && hcc85_set.size) {
    int_hccs["HCC85_gRenal_V23"] = hcc85_set;
  } else {
    int_hccs["HCC85_gRenal_V23"] = new Set();
  } // int_hccs["gRespDepandArre_gCopdCF"] = my_dcs["gCopdCF"] && my_dcs["CARD_RESP_FAIL"];


  if (my_dcs["gCopdCF"].size && my_dcs["CARD_RESP_FAIL"].size) {
    int_hccs["gRespDepandArre_gCopdCF"] = my_dcs["CARD_RESP_FAIL"];
  } else {
    int_hccs["gRespDepandArre_gCopdCF"] = new Set();
  } // int_hccs["HCC85_HCC96"] = new Set([...new Set(["HCC96"])].filter(x => cc_set.has(x))) && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (hcc96_set.size && hcc85_set.size) {
    int_hccs["HCC85_HCC96"] = hcc96_set;
  } else {
    int_hccs["HCC85_HCC96"] = new Set();
  } // int_hccs["gSubstanceAbuse_gPsychiatric_V23"] = my_dcs["gPsychiatric"] && my_dcs["gSubstanceAbuse"];


  if (my_dcs["gPsychiatric"].size && my_dcs["gSubstanceAbuse"].size) {
    int_hccs["gSubstanceAbuse_gPsychiatric"] = my_dcs["gSubstanceAbuse"];
  } else {
    int_hccs["gSubstanceAbuse_gPsychiatric"] = new Set();
  } // institutional model interactions


  var hcc188_set = new Set(_toConsumableArray(new Set(["HCC188"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc114_set = new Set(_toConsumableArray(new Set(["HCC114"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc57_set = new Set(_toConsumableArray(new Set(["HCC57"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc79_set = new Set(_toConsumableArray(new Set(["HCC79"])).filter(function (x) {
    return cc_set.has(x);
  }));
  int_hccs["PRESSURE_ULCER"] = new Set(_toConsumableArray(new Set(["HCC157", "HCC158"])).filter(function (x) {
    return cc_set.has(x);
  })); //int_hccs["CHF_gCopdCF"] = my_dcs["CHF"] && my_dcs["gCopdCF"];

  if (my_dcs["CHF"].size && my_dcs["gCopdCF"].size) {
    int_hccs["CHF_gCopdCF"] = my_dcs["gCopdCF"];
  } else {
    int_hccs["CHF_gCopdCF"] = new Set();
  } //int_hccs["gCopdCF_CARD_RESP_FAIL"] = my_dcs["gCopdCF"] && my_dcs["CARD_RESP_FAIL"];


  if (my_dcs["CARD_RESP_FAIL"].size && my_dcs["gCopdCF"].size) {
    int_hccs["gCopdCF_CARD_RESP_FAIL"] = my_dcs["CARD_RESP_FAIL"];
  } else {
    int_hccs["gCopdCF_CARD_RESP_FAIL"] = new Set();
  } //int_hccs["SEPSIS_PRESSURE_ULCER"] = my_dcs["SEPSIS"] && int_hccs["PRESSURE_ULCER"];


  if (my_dcs["SEPSIS"].size && int_hccs["PRESSURE_ULCER"].size) {
    int_hccs["SEPSIS_PRESSURE_ULCER"] = int_hccs["PRESSURE_ULCER"];
  } else {
    int_hccs["SEPSIS_PRESSURE_ULCER"] = new Set();
  } // int_hccs["SEPSIS_ARTIF_OPENINGS"] = my_dcs["SEPSIS"] && new Set([...new Set(["HCC188"])].filter(x => cc_set.has(x)));


  if (my_dcs["SEPSIS"].size && hcc188_set.size) {
    int_hccs["SEPSIS_ARTIF_OPENINGS"] = hcc188_set;
  } else {
    int_hccs["SEPSIS_ARTIF_OPENINGS"] = new Set();
  } // int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = new Set([...new Set(["HCC188"])].filter(x => cc_set.has(x))) && int_hccs["PRESSURE_ULCER"];


  if (int_hccs["PRESSURE_ULCER"].size && hcc188_set.size) {
    int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = int_hccs["PRESSURE_ULCER"];
  } else {
    int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = new Set();
  } // int_hccs["DIABETES_CHF"] = my_dcs["DIABETES"] && my_dcs["CHF"];


  if (my_dcs["DIABETES"].size && my_dcs["CHF"].size) {
    int_hccs["DIABETES_CHF"] = my_dcs["CHF"];
  } else {
    int_hccs["DIABETES_CHF"] = new Set();
  } // int_hccs["gCopdCF_ASP_SPEC_B_PNEUM"] = my_dcs["gCopdCF"] && new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x)));


  if (my_dcs["gCopdCF"].size && hcc114_set.size) {
    int_hccs["gCopdCF_ASP_SPEC_B_PNEUM"] = hcc114_set;
  } else {
    int_hccs["gCopdCF_ASP_SPEC_B_PNEUM"] = new Set();
  } // int_hccs["ASP_SPEC_BACT_PNEUM_PRES_ULC"] = new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x))) && int_hccs["PRESSURE_ULCER"];


  if (int_hccs["PRESSURE_ULCER"].size && hcc114_set.size) {
    int_hccs["ASP_SPEC_BACT_PNEUM_PRES_ULC"] = int_hccs["PRESSURE_ULCER"];
  } else {
    int_hccs["ASP_SPEC_BACT_PNEUM_PRES_ULC"] = new Set();
  } // int_hccs["SEPSIS_ASP_SPEC_BACT_PNEUM"] = my_dcs["SEPSIS"] && new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x)));


  if (my_dcs["SEPSIS"].size && hcc114_set.size) {
    int_hccs["SEPSIS_ASP_SPEC_BACT_PNEUM"] = hcc114_set;
  } else {
    int_hccs["SEPSIS_ASP_SPEC_BACT_PNEUM"] = new Set();
  } // int_hccs["SCHIZOPHRENIA_gCopdCF"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && my_dcs["gCopdCF"];


  if (my_dcs["gCopdCF"].size && hcc57_set.size) {
    int_hccs["SCHIZOPHRENIA_gCopdCF"] = my_dcs["gCopdCF"];
  } else {
    int_hccs["SCHIZOPHRENIA_gCopdCF"] = new Set();
  } // int_hccs["SCHIZOPHRENIA_CHF"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && my_dcs["CHF"];


  if (my_dcs["CHF"].size && hcc57_set.size) {
    int_hccs["SCHIZOPHRENIA_CHF"] = my_dcs["CHF"];
  } else {
    int_hccs["SCHIZOPHRENIA_CHF"] = new Set();
  } // int_hccs["SCHIZOPHRENIA_SEIZURES"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && new Set([...new Set(["HCC79"])].filter(x => cc_set.has(x)));


  if (hcc79_set.size && hcc57_set.size) {
    int_hccs["SCHIZOPHRENIA_SEIZURES"] = hcc79_set;
  } else {
    int_hccs["SCHIZOPHRENIA_SEIZURES"] = new Set();
  }

  if (disabl === true) {
    int_hccs["DISABLED_HCC85"] = new Set(_toConsumableArray(new Set(["HCC85"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_PRESSURE_ULCER"] = int_hccs["PRESSURE_ULCER"];
    int_hccs["DISABLED_HCC161"] = new Set(_toConsumableArray(new Set(["HCC161"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_HCC39"] = new Set(_toConsumableArray(new Set(["HCC39"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_HCC77"] = new Set(_toConsumableArray(new Set(["HCC77"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_HCC6"] = new Set(_toConsumableArray(new Set(["HCC6"])).filter(function (x) {
      return cc_set.has(x);
    }));

    if (typeof age !== 'undefined' && age < 65) {
      int_hccs["disable_substAbuse_psych_V23"] = int_hccs["gSubstanceAbuse_gPsychiatric"];
    }
  }

  var int_hccs_new = [];

  for (var key in int_hccs) {
    if (int_hccs.hasOwnProperty(key)) {
      if (int_hccs[key].size !== 0) {
        int_hccs_new.push(key);
      }
    }
  }

  return ccs.concat(int_hccs_new);
}

function v23_interactions(ccs, disabl) {
  var age = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  /*
  Calculated interaction HCCs given a dict of hccs, age, and disability flag
  :param ccs: List of HCCs in the format "HCC18" no trumping or cleaning of HCCs is done in this function
  :param disabl: CMS disabled flag
  :param age: Optional age of beneficiary; only one interaction uses age and it will be assumed false if not entered
  :return: List of HCC codes, including interaction codes
  */
  var cc_set = new Set(ccs);
  var int_hccs = {}; // diagnostic categories

  var diag_cats = {
    "CANCER": new Set(["HCC8", "HCC9", "HCC10", "HCC11", "HCC12"]),
    "DIABETES": new Set(["HCC17", "HCC18", "HCC19"]),
    "CARD_RESP_FAIL": new Set(["HCC82", "HCC83", "HCC84"]),
    "CHF": new Set(["HCC85"]),
    "gCopdCF": new Set(["HCC110", "HCC111", "HCC112"]),
    "RENAL_V23": new Set(["HCC134", "HCC135", "HCC136", "HCC137", "HCC138"]),
    "SEPSIS": new Set(["HCC2"]),
    "gSubstanceAbuse_V23": new Set(["HCC54", "HCC55", "HCC56"]),
    "gPsychiatric_V23": new Set(["HCC57", "HCC58", "HCC59", "HCC60"])
  };
  var my_dcs = {};

  for (var key in diag_cats) {
    if (diag_cats.hasOwnProperty(key)) {
      var key_set = new Set(diag_cats[key]);
      var new_values = new Set(_toConsumableArray(key_set).filter(function (x) {
        return cc_set.has(x);
      }));
      my_dcs[key] = new_values;
    }
  } // Community Interactions


  var hcc85_set = new Set(_toConsumableArray(new Set(["HCC85"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc47_set = new Set(_toConsumableArray(new Set(["HCC47"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc96_set = new Set(_toConsumableArray(new Set(["HCC96"])).filter(function (x) {
    return cc_set.has(x);
  })); // int_hccs["HCC47_gCancer"] = my_dcs["CANCER"] && new Set([...new Set(["HCC47"])].filter(x => cc_set.has(x)));

  if (my_dcs["CANCER"].size && hcc47_set.size) {
    int_hccs["HCC47_gCancer"] = hcc47_set;
  } else {
    int_hccs["HCC47_gCancer"] = new Set();
  } // int_hccs["HCC85_gDiabetesMellit"] = my_dcs["DIABETES"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (my_dcs["DIABETES"].size && hcc85_set.size) {
    int_hccs["HCC85_gDiabetesMellit"] = hcc85_set;
  } else {
    int_hccs["HCC85_gDiabetesMellit"] = new Set();
  } // int_hccs["HCC85_gCopdCF"] = my_dcs["gCopdCF"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (my_dcs["gCopdCF"].size && hcc85_set.size) {
    int_hccs["HCC85_gCopdCF"] = hcc85_set;
  } else {
    int_hccs["HCC85_gCopdCF"] = new Set();
  } // int_hccs["HCC85_gRenal_V23"] = my_dcs["RENAL_V23"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (my_dcs["RENAL_V23"].size && hcc85_set.size) {
    int_hccs["HCC85_gRenal_V23"] = hcc85_set;
  } else {
    int_hccs["HCC85_gRenal_V23"] = new Set();
  } // int_hccs["gRespDepandArre_gCopdCF"] = my_dcs["gCopdCF"] && my_dcs["CARD_RESP_FAIL"];


  if (my_dcs["gCopdCF"].size && my_dcs["CARD_RESP_FAIL"].size) {
    int_hccs["gRespDepandArre_gCopdCF"] = my_dcs["CARD_RESP_FAIL"];
  } else {
    int_hccs["gRespDepandArre_gCopdCF"] = new Set();
  } // int_hccs["HCC85_HCC96"] = new Set([...new Set(["HCC96"])].filter(x => cc_set.has(x))) && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (hcc96_set.size && hcc85_set.size) {
    int_hccs["HCC85_HCC96"] = hcc96_set;
  } else {
    int_hccs["HCC85_HCC96"] = new Set();
  } // int_hccs["gSubstanceAbuse_gPsychiatric_V23"] = my_dcs["gPsychiatric_V23"] && my_dcs["gSubstanceAbuse_V23"];


  if (my_dcs["gPsychiatric_V23"].size && my_dcs["gSubstanceAbuse_V23"].size) {
    int_hccs["gSubstanceAbuse_gPsychiatric_V23"] = my_dcs["gSubstanceAbuse_V23"];
  } else {
    int_hccs["gSubstanceAbuse_gPsychiatric_V23"] = new Set();
  } // institutional model interactions


  var hcc188_set = new Set(_toConsumableArray(new Set(["HCC188"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc114_set = new Set(_toConsumableArray(new Set(["HCC114"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc57_set = new Set(_toConsumableArray(new Set(["HCC57"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc79_set = new Set(_toConsumableArray(new Set(["HCC79"])).filter(function (x) {
    return cc_set.has(x);
  }));
  int_hccs["PRESSURE_ULCER"] = new Set(_toConsumableArray(new Set(["HCC157", "HCC158"])).filter(function (x) {
    return cc_set.has(x);
  })); // int_hccs["CHF_gCopdCF"] = my_dcs["CHF"] && my_dcs["gCopdCF"];

  if (my_dcs["CHF"].size && my_dcs["gCopdCF"].size) {
    int_hccs["CHF_gCopdCF"] = my_dcs["gCopdCF"];
  } else {
    int_hccs["CHF_gCopdCF"] = new Set();
  } // int_hccs["gCopdCF_CARD_RESP_FAIL"] = my_dcs["gCopdCF"] && my_dcs["CARD_RESP_FAIL"];


  if (my_dcs["CARD_RESP_FAIL"].size && my_dcs["gCopdCF"].size) {
    int_hccs["gCopdCF_CARD_RESP_FAIL"] = my_dcs["CARD_RESP_FAIL"];
  } else {
    int_hccs["gCopdCF_CARD_RESP_FAIL"] = new Set();
  } // int_hccs["SEPSIS_PRESSURE_ULCER"] = my_dcs["SEPSIS"] && int_hccs["PRESSURE_ULCER"];


  if (my_dcs["SEPSIS"].size && int_hccs["PRESSURE_ULCER"].size) {
    int_hccs["SEPSIS_PRESSURE_ULCER"] = int_hccs["PRESSURE_ULCER"];
  } else {
    int_hccs["SEPSIS_PRESSURE_ULCER"] = new Set();
  } // int_hccs["SEPSIS_ARTIF_OPENINGS"] = my_dcs["SEPSIS"] && new Set([...new Set(["HCC188"])].filter(x => cc_set.has(x)));


  if (my_dcs["SEPSIS"].size && hcc188_set.size) {
    int_hccs["SEPSIS_ARTIF_OPENINGS"] = hcc188_set;
  } else {
    int_hccs["SEPSIS_ARTIF_OPENINGS"] = new Set();
  } // int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = new Set([...new Set(["HCC188"])].filter(x => cc_set.has(x))) && int_hccs["PRESSURE_ULCER"];


  if (int_hccs["PRESSURE_ULCER"].size && hcc188_set.size) {
    int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = int_hccs["PRESSURE_ULCER"];
  } else {
    int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = new Set();
  } // int_hccs["DIABETES_CHF"] = my_dcs["DIABETES"] && my_dcs["CHF"];


  if (my_dcs["DIABETES"].size && my_dcs["CHF"].size) {
    int_hccs["DIABETES_CHF"] = my_dcs["CHF"];
  } else {
    int_hccs["DIABETES_CHF"] = new Set();
  } // int_hccs["gCopdCF_ASP_SPEC_B_PNEUM"] = my_dcs["gCopdCF"] && new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x)));


  if (my_dcs["gCopdCF"].size && hcc114_set.size) {
    int_hccs["gCopdCF_ASP_SPEC_B_PNEUM"] = hcc114_set;
  } else {
    int_hccs["gCopdCF_ASP_SPEC_B_PNEUM"] = new Set();
  } // int_hccs["ASP_SPEC_BACT_PNEUM_PRES_ULC"] = new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x))) && int_hccs["PRESSURE_ULCER"];


  if (int_hccs["PRESSURE_ULCER"].size && hcc114_set.size) {
    int_hccs["ASP_SPEC_BACT_PNEUM_PRES_ULC"] = int_hccs["PRESSURE_ULCER"];
  } else {
    int_hccs["ASP_SPEC_BACT_PNEUM_PRES_ULC"] = new Set();
  } // int_hccs["SEPSIS_ASP_SPEC_BACT_PNEUM"] = my_dcs["SEPSIS"] && new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x)));


  if (my_dcs["SEPSIS"].size && hcc114_set.size) {
    int_hccs["SEPSIS_ASP_SPEC_BACT_PNEUM"] = hcc114_set;
  } else {
    int_hccs["SEPSIS_ASP_SPEC_BACT_PNEUM"] = new Set();
  } // int_hccs["SCHIZOPHRENIA_gCopdCF"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && my_dcs["gCopdCF"];


  if (my_dcs["gCopdCF"].size && hcc57_set.size) {
    int_hccs["SCHIZOPHRENIA_gCopdCF"] = my_dcs["gCopdCF"];
  } else {
    int_hccs["SCHIZOPHRENIA_gCopdCF"] = new Set();
  } // int_hccs["SCHIZOPHRENIA_CHF"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && my_dcs["CHF"];


  if (my_dcs["CHF"].size && hcc57_set.size) {
    int_hccs["SCHIZOPHRENIA_CHF"] = my_dcs["CHF"];
  } else {
    int_hccs["SCHIZOPHRENIA_CHF"] = new Set();
  } // int_hccs["SCHIZOPHRENIA_SEIZURES"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && new Set([...new Set(["HCC79"])].filter(x => cc_set.has(x)));


  if (hcc79_set.size && hcc57_set.size) {
    int_hccs["SCHIZOPHRENIA_SEIZURES"] = hcc79_set;
  } else {
    int_hccs["SCHIZOPHRENIA_SEIZURES"] = new Set();
  }

  if (disabl === true) {
    int_hccs["DISABLED_HCC85"] = new Set(_toConsumableArray(new Set(["HCC85"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_PRESSURE_ULCER"] = int_hccs["PRESSURE_ULCER"];
    int_hccs["DISABLED_HCC161"] = new Set(_toConsumableArray(new Set(["HCC161"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_HCC39"] = new Set(_toConsumableArray(new Set(["HCC39"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_HCC77"] = new Set(_toConsumableArray(new Set(["HCC77"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_HCC6"] = new Set(_toConsumableArray(new Set(["HCC6"])).filter(function (x) {
      return cc_set.has(x);
    }));

    if (typeof age !== 'undefined' && age < 65) {
      int_hccs["disable_substAbuse_psych_V23"] = int_hccs["gSubstanceAbuse_gPsychiatric_V23"];
    }
  }

  var int_hccs_new = [];

  for (var key in int_hccs) {
    if (int_hccs.hasOwnProperty(key)) {
      if (int_hccs[key].size !== 0) {
        int_hccs_new.push(key);
      }
    }
  }

  return ccs.concat(int_hccs_new);
}

function v24_interactions(ccs, disabl) {
  var age = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  /*
  Calculated interaction HCCs given a list of hccs, age, and disability flag
  :param ccs: List of HCCs in the format "HCC18" no trumping or cleaning of HCCs is done in this function
  :param disabl: CMS disabled flag
  :param age: Optional age of beneficiary; only one interaction uses age and it will be assumed false if not entered
  :return: List of HCC codes, including interaction codes
  */
  var cc_set = new Set(ccs);
  var int_hccs = {};
  var cnt = cc_set.length;

  if (cnt > 9) {
    int_hccs["D10P"];
  }

  if (cnt > 3 && cnt < 10) {
    var index = "D".concat(cnt);
    int_hccs[index];
  } // diagnostic categories


  var diag_cats = {
    "CANCER": new Set(["HCC8", "HCC9", "HCC10", "HCC11", "HCC12"]),
    "DIABETES": new Set(["HCC17", "HCC18", "HCC19"]),
    "CARD_RESP_FAIL": new Set(["HCC82", "HCC83", "HCC84"]),
    "CHF": new Set(["HCC85"]),
    "gCopdCF": new Set(["HCC110", "HCC111", "HCC112"]),
    "RENAL_V24": new Set(["HCC134", "HCC135", "HCC136", "HCC137", "HCC138"]),
    "SEPSIS": new Set(["HCC2"]),
    "gSubstanceAbuse_V24": new Set(["HCC54", "HCC55", "HCC56"]),
    "gPsychiatric_V24": new Set(["HCC57", "HCC58", "HCC59", "HCC60"])
  };
  var my_dcs = {};

  for (var key in diag_cats) {
    if (diag_cats.hasOwnProperty(key)) {
      var key_set = new Set(diag_cats[key]);
      var new_values = new Set(_toConsumableArray(key_set).filter(function (x) {
        return cc_set.has(x);
      }));
      my_dcs[key] = new_values;
    }
  } // Community Interactions


  var hcc85_set = new Set(_toConsumableArray(new Set(["HCC85"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc47_set = new Set(_toConsumableArray(new Set(["HCC47"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc96_set = new Set(_toConsumableArray(new Set(["HCC96"])).filter(function (x) {
    return cc_set.has(x);
  })); // int_hccs["HCC47_gCancer"] = my_dcs["CANCER"] && new Set([...new Set(["HCC47"])].filter(x => cc_set.has(x)));

  if (my_dcs["CANCER"].size && hcc47_set.size) {
    int_hccs["HCC47_gCancer"] = hcc47_set;
  } else {
    int_hccs["HCC47_gCancer"] = new Set();
  } // int_hccs["HCC85_gDiabetesMellit"] = my_dcs["DIABETES"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (my_dcs["DIABETES"].size && hcc85_set.size) {
    int_hccs["HCC85_gDiabetesMellit"] = hcc85_set;
  } else {
    int_hccs["HCC85_gDiabetesMellit"] = new Set();
  } // int_hccs["HCC85_gCopdCF"] = my_dcs["gCopdCF"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (my_dcs["gCopdCF"].size && hcc85_set.size) {
    int_hccs["HCC85_gCopdCF"] = hcc85_set;
  } else {
    int_hccs["HCC85_gCopdCF"] = new Set();
  } // int_hccs["HCC85_gRenal_V24"] = my_dcs["RENAL_V24"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (my_dcs["RENAL_V24"].size && hcc85_set.size) {
    int_hccs["HCC85_gRenal_V24"] = hcc85_set;
  } else {
    int_hccs["HCC85_gRenal_V24"] = new Set();
  } // int_hccs["gRespDepandArre_gCopdCF"] = my_dcs["gCopdCF"] && my_dcs["CARD_RESP_FAIL"];


  if (my_dcs["gCopdCF"].size && my_dcs["CARD_RESP_FAIL"].size) {
    int_hccs["gRespDepandArre_gCopdCF"] = my_dcs["CARD_RESP_FAIL"];
  } else {
    int_hccs["gRespDepandArre_gCopdCF"] = new Set();
  } // int_hccs["HCC85_HCC96"] = new Set([...new Set(["HCC96"])].filter(x => cc_set.has(x))) && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));


  if (hcc96_set.size && hcc85_set.size) {
    int_hccs["HCC85_HCC96"] = hcc96_set;
  } else {
    int_hccs["HCC85_HCC96"] = new Set();
  } // int_hccs["gSubstanceAbuse_gPsychiatric_V24"] = my_dcs["gPsychiatric_V24"] && my_dcs["gSubstanceAbuse_V24"];


  if (my_dcs["gPsychiatric_V24"].size && my_dcs["gSubstanceAbuse_V24"].size) {
    int_hccs["gSubstanceAbuse_gPsychiatric_V24"] = my_dcs["gSubstanceAbuse_V24"];
  } else {
    int_hccs["gSubstanceAbuse_gPsychiatric_V24"] = new Set();
  } // institutional model interactions


  var hcc188_set = new Set(_toConsumableArray(new Set(["HCC188"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc114_set = new Set(_toConsumableArray(new Set(["HCC114"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc57_set = new Set(_toConsumableArray(new Set(["HCC57"])).filter(function (x) {
    return cc_set.has(x);
  }));
  var hcc79_set = new Set(_toConsumableArray(new Set(["HCC79"])).filter(function (x) {
    return cc_set.has(x);
  }));
  int_hccs["PRESSURE_ULCER"] = new Set(_toConsumableArray(new Set(["HCC157", "HCC158"])).filter(function (x) {
    return cc_set.has(x);
  })); // int_hccs["SEPSIS_PRESSURE_ULCER"] = my_dcs["SEPSIS"] && int_hccs["PRESSURE_ULCER"];

  if (my_dcs["SEPSIS"].size && int_hccs["PRESSURE_ULCER"].size) {
    int_hccs["SEPSIS_PRESSURE_ULCER"] = int_hccs["PRESSURE_ULCER"];
  } else {
    int_hccs["SEPSIS_PRESSURE_ULCER"] = new Set();
  } // int_hccs["SEPSIS_ARTIF_OPENINGS"] = my_dcs["SEPSIS"] && new Set([...new Set(["HCC188"])].filter(x => cc_set.has(x)));


  if (my_dcs["SEPSIS"].size && hcc188_set.size) {
    int_hccs["SEPSIS_ARTIF_OPENINGS"] = hcc188_set;
  } else {
    int_hccs["SEPSIS_ARTIF_OPENINGS"] = new Set();
  } // int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = new Set([...new Set(["HCC188"])].filter(x => cc_set.has(x))) && int_hccs["PRESSURE_ULCER"];


  if (int_hccs["PRESSURE_ULCER"].size && hcc188_set.size) {
    int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = int_hccs["PRESSURE_ULCER"];
  } else {
    int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = new Set();
  } // int_hccs["gCopdCF_ASP_SPEC_B_PNEUM"] = my_dcs["gCopdCF"] && new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x)));


  if (my_dcs["gCopdCF"].size && hcc114_set.size) {
    int_hccs["gCopdCF_ASP_SPEC_B_PNEUM"] = hcc114_set;
  } else {
    int_hccs["gCopdCF_ASP_SPEC_B_PNEUM"] = new Set();
  } // int_hccs["ASP_SPEC_BACT_PNEUM_PRES_ULC"] = new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x))) && int_hccs["PRESSURE_ULCER"];


  if (int_hccs["PRESSURE_ULCER"].size && hcc114_set.size) {
    int_hccs["ASP_SPEC_BACT_PNEUM_PRES_ULC"] = int_hccs["PRESSURE_ULCER"];
  } else {
    int_hccs["ASP_SPEC_BACT_PNEUM_PRES_ULC"] = new Set();
  } // int_hccs["SEPSIS_ASP_SPEC_BACT_PNEUM"] = my_dcs["SEPSIS"] && new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x)));


  if (my_dcs["SEPSIS"].size && hcc114_set.size) {
    int_hccs["SEPSIS_ASP_SPEC_BACT_PNEUM"] = hcc114_set;
  } else {
    int_hccs["SEPSIS_ASP_SPEC_BACT_PNEUM"] = new Set();
  } // int_hccs["SCHIZOPHRENIA_gCopdCF"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && my_dcs["gCopdCF"];


  if (my_dcs["gCopdCF"].size && hcc57_set.size) {
    int_hccs["SCHIZOPHRENIA_gCopdCF"] = my_dcs["gCopdCF"];
  } else {
    int_hccs["SCHIZOPHRENIA_gCopdCF"] = new Set();
  } // int_hccs["SCHIZOPHRENIA_CHF"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && my_dcs["CHF"];


  if (my_dcs["CHF"].size && hcc57_set.size) {
    int_hccs["SCHIZOPHRENIA_CHF"] = my_dcs["CHF"];
  } else {
    int_hccs["SCHIZOPHRENIA_CHF"] = new Set();
  } // int_hccs["SCHIZOPHRENIA_SEIZURES"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && new Set([...new Set(["HCC79"])].filter(x => cc_set.has(x)));


  if (hcc79_set.size && hcc57_set.size) {
    int_hccs["SCHIZOPHRENIA_SEIZURES"] = hcc79_set;
  } else {
    int_hccs["SCHIZOPHRENIA_SEIZURES"] = new Set();
  }

  if (disabl == true) {
    int_hccs["DISABLED_HCC85"] = new Set(_toConsumableArray(new Set(["HCC85"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_PRESSURE_ULCER"] = int_hccs["PRESSURE_ULCER"];
    int_hccs["DISABLED_HCC161"] = new Set(_toConsumableArray(new Set(["HCC161"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_HCC39"] = new Set(_toConsumableArray(new Set(["HCC39"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_HCC77"] = new Set(_toConsumableArray(new Set(["HCC77"])).filter(function (x) {
      return cc_set.has(x);
    }));
    int_hccs["DISABLED_HCC6"] = new Set(_toConsumableArray(new Set(["HCC6"])).filter(function (x) {
      return cc_set.has(x);
    }));

    if (typeof age !== 'undefined' && age < 65) {
      int_hccs["disable_substAbuse_psych_V24"] = int_hccs["gSubstanceAbuse_gPsychiatric_V24"];
    }
  }

  var int_hccs_new = [];

  for (var key in int_hccs) {
    if (int_hccs.hasOwnProperty(key)) {
      if (int_hccs[key].size !== 0) {
        int_hccs_new.push(key);
      }
    }
  }

  return ccs.concat(int_hccs_new);
}
CustomFunctions.associate("DEMO_RAF", demo_raf);
CustomFunctions.associate("DX_DESC", dx_desc);
CustomFunctions.associate("DX2CC", dx2cc);
CustomFunctions.associate("DX_RAF", dx_raf);
CustomFunctions.associate("CLEAN_DX", clean_dx);
CustomFunctions.associate("CLEAN_CC", clean_cc);
CustomFunctions.associate("CC_DESC", cc_desc);
CustomFunctions.associate("CC_INFO", cc_info);
CustomFunctions.associate("CC_RAF", cc_raf);
CustomFunctions.associate("CC_COMBINE", cc_combine);
CustomFunctions.associate("CC_INCREMENT_RAF", cc_increment_raf);
CustomFunctions.associate("CC_INCREMENT", cc_increment);
CustomFunctions.associate("CC_GAPS", cc_gaps);
CustomFunctions.associate("CC_GAPS_RAF", cc_gaps_raf);
CustomFunctions.associate("CC_DIFF", cc_diff);
CustomFunctions.associate("CC_DIFF_RAF", cc_diff_raf);
CustomFunctions.associate("DX_INCREMENT", dx_increment);
CustomFunctions.associate("DX_INCREMENT_RAF", dx_increment_raf);
CustomFunctions.associate("DX_GAP", dx_gap);
CustomFunctions.associate("DX_GAP_RAF", dx_gap_raf);

/***/ })

/******/ });
//# sourceMappingURL=functions.js.map