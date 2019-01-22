// ==UserScript==
// @name         MEDIA FACTORY: JIRA Kanban Board Condensed
// @namespace    http://jira.mediafactory.cz/
// @version      4.1.0
// @description  Make your eyes *not* to bleed with new board.
// @author       Jakub Rychecký <jakub@rychecky.cz>
// @match        *jira.mediafactory.cz/secure/RapidBoard.jspa?*rapidView=*
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        none
// ==/UserScript==
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/JiraBoard.js":
/*!**************************!*\
  !*** ./src/JiraBoard.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _JiraFilter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JiraFilter */ \"./src/JiraFilter.js\");\n/* harmony import */ var _JiraIssue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JiraIssue */ \"./src/JiraIssue.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n/**\r\n *  Basic class for manage JIRA kanban board page.\r\n */\n\nvar JiraBoard =\n/*#__PURE__*/\nfunction () {\n  /**\r\n   * Constructor does AJAX even binding and basic stuff.\r\n   */\n  function JiraBoard() {\n    _classCallCheck(this, JiraBoard);\n\n    this.init();\n    this.bind();\n    this.removeHeader();\n    this.initKeyboardShortcut();\n    this.filter = new _JiraFilter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n  /**\r\n   * Initialize\r\n   */\n\n\n  _createClass(JiraBoard, [{\n    key: \"init\",\n    value: function init() {\n      this.processIssues();\n      this.removeColumnConstraints();\n    }\n    /**\r\n     * Bind board processing on AJAX request.\r\n     */\n\n  }, {\n    key: \"bind\",\n    value: function bind() {\n      var _this = this;\n\n      // TODO: This might use some optimization not to call every request (settings.url?)\n      $(document).ajaxComplete(function () {\n        return _this.init();\n      });\n    }\n    /**\r\n     * Remove board header.\r\n     */\n\n  }, {\n    key: \"removeHeader\",\n    value: function removeHeader() {\n      $('#ghx-header').remove();\n    }\n    /**\r\n     * Remove column card count constraints.\r\n     */\n\n  }, {\n    key: \"removeColumnConstraints\",\n    value: function removeColumnConstraints() {\n      $('.ghx-busted-max, .ghx-busted-min').removeClass('ghx-busted-min ghx-busted-max'); // Red/yellow background remove\n\n      $('.ghx-constraint').remove(); // Column header remove\n    }\n    /**\r\n     * Process every issue card at kanban board.\r\n     */\n\n  }, {\n    key: \"processIssues\",\n    value: function processIssues() {\n      $('.ghx-issue').each(function (i, element) {\n        new _JiraIssue__WEBPACK_IMPORTED_MODULE_1__[\"default\"](element); // Every card is JiraIssue instance\n      });\n    }\n    /**\r\n     * Press \"F\" to focus filter.\r\n     */\n\n  }, {\n    key: \"initKeyboardShortcut\",\n    value: function initKeyboardShortcut() {\n      $(document).on('keydown', function (e) {\n        var tag = e.target.tagName.toLowerCase();\n\n        if (e.which === 70 && tag !== 'input' && tag !== 'textarea') {\n          e.preventDefault();\n          $('.jira-media-factory').focus();\n        }\n      });\n    }\n  }]);\n\n  return JiraBoard;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (JiraBoard);\n\n//# sourceURL=webpack:///./src/JiraBoard.js?");

/***/ }),

/***/ "./src/JiraFilter.js":
/*!***************************!*\
  !*** ./src/JiraFilter.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar JiraFilter =\n/*#__PURE__*/\nfunction () {\n  /**\r\n   * JiraFilter constructor.\r\n   */\n  function JiraFilter() {\n    _classCallCheck(this, JiraFilter);\n\n    this.insertInput();\n    this.bindFilter();\n  }\n  /**\r\n   * Create filter element.\r\n   */\n\n\n  _createClass(JiraFilter, [{\n    key: \"insertInput\",\n    value: function insertInput() {\n      // Filter input\n      this.input = $('<input>').attr('type', 'text').addClass('jira-media-factory');\n      this.input.attr('placeholder', 'Filter (press F)').css({\n        'margin-top': '5px'\n      });\n      $('.ghx-controls-work').append(this.input);\n    }\n    /**\r\n     * Get the input query.\r\n     *\r\n     * @returns {string}\r\n     */\n\n  }, {\n    key: \"getQuery\",\n    value: function getQuery() {\n      return this.input.val().toLowerCase();\n    }\n    /**\r\n     * Bind events for filter.\r\n     */\n\n  }, {\n    key: \"bindFilter\",\n    value: function bindFilter() {\n      var _this = this;\n\n      this.input.on('keyup', function () {\n        var query = _this.getQuery(); // Nothing to filter, show all cards as default\n\n\n        if (query.length === 0) {\n          $('.ghx-issue, .ghx-parent-stub').show();\n          return;\n        } // Hide parent stup for subtasks\n\n\n        $('.ghx-parent-stub').hide(); // Browsing all card issues\n\n        $('.ghx-issue').each(function (i, element) {\n          _this.filterIssue(element, query);\n        });\n      });\n    }\n    /**\r\n     * Apply current filter.\r\n     *\r\n     * @param element\r\n     * @param query\r\n     */\n\n  }, {\n    key: \"filterIssue\",\n    value: function filterIssue(element, query) {\n      var issue = $(element);\n      var text = JiraFilter.getIssueText(issue); // Text issue + jméno assignee\n      // Card contains search query in its normalized text\n\n      if (text.toLowerCase().indexOf(query) !== -1) {\n        issue.show();\n        issue.closest('.ghx-parent-group').find('.ghx-parent-stub').show(); // Show parent for subtask\n      } else {\n        issue.hide(); // Card doesn't contain query\n      }\n    }\n    /**\r\n     * Get text from issue.\r\n     *\r\n     * @param issue\r\n     *\r\n     * @returns {string}\r\n     */\n\n  }], [{\n    key: \"getIssueText\",\n    value: function getIssueText(issue) {\n      return issue.text() + issue.find('.ghx-avatar img').attr('data-tooltip');\n    }\n  }]);\n\n  return JiraFilter;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (JiraFilter);\n\n//# sourceURL=webpack:///./src/JiraFilter.js?");

/***/ }),

/***/ "./src/JiraIssue.js":
/*!**************************!*\
  !*** ./src/JiraIssue.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n/**\r\n * Instance of every issue card at kanban board page.\r\n */\n\nvar JiraIssue =\n/*#__PURE__*/\nfunction () {\n  /**\r\n   * Constructor runs all necessary processing for issue card.\r\n   *\r\n   * @param {HTMLElement} issue Issue card in DOM\r\n   */\n  function JiraIssue(issue) {\n    _classCallCheck(this, JiraIssue);\n\n    this.issue = $(issue); // Remove useless parts of card\n\n    this.removeNoneRows();\n    this.hideDays();\n    this.removeProgress();\n    this.removeNormalPriority(); // CSS tweaks (font-size, padding...)\n\n    this.cssIssue();\n    this.cssLabels();\n    this.cssFixVersion();\n    this.cssAvatar(); // New features\n\n    this.aging();\n    this.colorLabels();\n    this.highlightMyTask();\n  }\n  /**\r\n   * Remove \"None\" rows of card.\r\n   */\n\n\n  _createClass(JiraIssue, [{\n    key: \"removeNoneRows\",\n    value: function removeNoneRows() {\n      // Browse every extra field row and remove \"None\" ones\n      this.issue.find('.ghx-extra-field').each(function (x, elementRow) {\n        var row = $(elementRow);\n\n        if (row.text() === 'None') {\n          row.remove();\n        }\n      });\n    }\n    /**\r\n     * Do basic CSS card tweaks.\r\n     */\n\n  }, {\n    key: \"cssIssue\",\n    value: function cssIssue() {\n      this.issue.find('.ghx-issue-content').css(_config__WEBPACK_IMPORTED_MODULE_0__[\"CONFIG\"].cssIssueContent); // General issue style\n\n      this.issue.find('.ghx-summary').css(_config__WEBPACK_IMPORTED_MODULE_0__[\"CONFIG\"].cssIssueSummary); // Issue text\n\n      this.issue.find('.aui-label[data-epickey]').css(_config__WEBPACK_IMPORTED_MODULE_0__[\"CONFIG\"].cssEpic); // Epic label style\n\n      this.issue.find('.ghx-highlighted-fields, .ghx-extra-fields').css(_config__WEBPACK_IMPORTED_MODULE_0__[\"CONFIG\"].cssExtraFields);\n      this.issue.find('.ghx-type, .ghx-flags').css({\n        // Move flags\n        'left': '5px'\n      });\n    }\n  }, {\n    key: \"cssLabels\",\n    value: function cssLabels() {\n      // Labels: style\n      this.issue.find('[data-tooltip^=\"Labels\"]').css(_config__WEBPACK_IMPORTED_MODULE_0__[\"CONFIG\"].cssLabels); // Labels: normalize letter case\n\n      this.issue.find('[data-tooltip^=\"Labels\"]').each(function (x, elementRow) {\n        var label = $(elementRow);\n        label.text(label.text().toUpperCase());\n      });\n    }\n    /**\r\n     * Edit styles of \"Fixed Version\" card tag.\r\n     */\n\n  }, {\n    key: \"cssFixVersion\",\n    value: function cssFixVersion() {\n      this.issue.find('[data-tooltip^=\"Fix\"]').each(function (x, elementRow) {\n        $(elementRow).css(_config__WEBPACK_IMPORTED_MODULE_0__[\"CONFIG\"].cssFixVersion);\n      });\n    }\n    /**\r\n     * Color issue labels.\r\n     */\n\n  }, {\n    key: \"colorLabels\",\n    value: function colorLabels() {\n      // Each labels field...\n      this.issue.find('[data-tooltip^=Labels]').each(function (i, element) {\n        var labelsElement = $(element);\n        var labels = labelsElement.text();\n        labelsElement.attr('data-original', labels); // Store original HTML\n        // Loop through each label and set span color for it\n\n        var _arr = Object.entries(_config__WEBPACK_IMPORTED_MODULE_0__[\"CONFIG\"].labelsColors);\n\n        for (var _i = 0; _i < _arr.length; _i++) {\n          var _arr$_i = _slicedToArray(_arr[_i], 2),\n              key = _arr$_i[0],\n              value = _arr$_i[1];\n\n          labels = labels.replace(key, '<span style=\"padding: 4px; background: ' + value + '\">' + key + '</span>');\n        }\n\n        labelsElement.html(labels);\n      });\n    }\n    /**\r\n     * Change avatar style\r\n     */\n\n  }, {\n    key: \"cssAvatar\",\n    value: function cssAvatar() {\n      // Avatar: default avatar size\n      this.issue.find('.ghx-avatar img').css(_config__WEBPACK_IMPORTED_MODULE_0__[\"CONFIG\"].cssAvatar); // Avatar: wider card content if no avatar is assigned\n\n      if (this.issue.find('.ghx-avatar img').length === 0) {\n        this.issue.find('.ghx-issue-fields').css({\n          'padding': '0px'\n        });\n      } else {\n        this.issue.find('.ghx-issue-fields').css({\n          'padding-right': '30px'\n        });\n      }\n    }\n    /**\r\n     * Hide days indicator.\r\n     */\n\n  }, {\n    key: \"hideDays\",\n    value: function hideDays() {\n      this.issue.find('.ghx-days').hide();\n    }\n    /**\r\n     * Removed planned and logged time progress.\r\n     */\n\n  }, {\n    key: \"removeProgress\",\n    value: function removeProgress() {\n      this.issue.find('[data-tooltip*=\"Progress\"]').remove(); // Time: remove logged time from card\n    }\n    /**\r\n     * Remove normal priority indicator.\r\n     */\n\n  }, {\n    key: \"removeNormalPriority\",\n    value: function removeNormalPriority() {\n      this.issue.find('.ghx-priority[title=Normal').remove();\n    }\n    /**\r\n     * Change opacity for old issues.\r\n     */\n\n  }, {\n    key: \"aging\",\n    value: function aging() {\n      var agingMinimalOpacity = _config__WEBPACK_IMPORTED_MODULE_0__[\"CONFIG\"].agingMinimalOpacity;\n\n      if (agingMinimalOpacity < 1.0) {\n        var age = parseInt(this.issue.find('.ghx-days').attr('title'));\n        var opacity = 1 - age / 100 * 2;\n        this.issue.css({\n          'opacity': opacity <= agingMinimalOpacity ? agingMinimalOpacity : opacity\n        });\n      }\n    }\n    /**\r\n     * Highlight current user's issues.\r\n     */\n\n  }, {\n    key: \"highlightMyTask\",\n    value: function highlightMyTask() {\n      var logged = $('#header-details-user-fullname').attr('data-displayname');\n      var assignee = this.issue.find('.ghx-avatar-img').attr('data-tooltip');\n\n      if (typeof assignee !== 'undefined' && assignee.indexOf(logged) !== -1) {\n        this.issue.css(_config__WEBPACK_IMPORTED_MODULE_0__[\"CONFIG\"].myIssueHighlight);\n      }\n    }\n  }]);\n\n  return JiraIssue;\n}();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (JiraIssue);\n\n//# sourceURL=webpack:///./src/JiraIssue.js?");

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: CONFIG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CONFIG\", function() { return CONFIG; });\nvar CONFIG = {\n  cssFixVersion: {\n    'color': '#444444',\n    'font-weight': 'bold',\n    'font-size': '11px',\n    'margin-right': '5px'\n  },\n  cssLabels: {\n    'font-size': '9px',\n    'font-weight': 'bold',\n    'color': '#777777'\n  },\n  cssEpic: {\n    'font-size': '9px'\n  },\n  cssIssueSummary: {\n    'font-size': '12px'\n  },\n  cssIssueContent: {\n    'padding': '5px 5px 0px 27px',\n    'min-height': '0px'\n  },\n  cssAvatar: {\n    'width': '22px',\n    'height': '22px'\n  },\n  // General CSS for extra fields as time, labels, epic...\n  cssExtraFields: {\n    'display': 'inline-flex',\n    'margin-top': '5px'\n  },\n  labelsColors: {\n    'PHP': '#E1D5FF',\n    'JS': '#FEFFD5',\n    'HTML': '#FFEAD5',\n    'CSS': '#D5EAFF'\n  },\n  // My issue highlight styles\n  myIssueHighlight: {\n    'background': '#EFF2FF',\n    'border-left': '4px solid #99ACF7',\n    'border-right': '4px solid #99ACF7'\n  },\n  agingMinimalOpacity: 0.5 // 1.0 = disabled aging at all\n\n};\n\n//# sourceURL=webpack:///./src/config.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _JiraBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./JiraBoard */ \"./src/JiraBoard.js\");\n\n$(function () {\n  window.jiraBoard = new _JiraBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });