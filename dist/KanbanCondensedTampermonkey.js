"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _cssFixVersion = {
  'color': '#444444',
  'font-weight': 'bold',
  'font-size': '11px',
  'margin-right': '5px'
};
var _cssLabels = {
  'font-size': '9px',
  'font-weight': 'bold',
  'color': '#777777'
};
var cssEpic = {
  'font-size': '9px'
};
var cssIssueSummary = {
  'font-size': '12px'
};
var cssIssueContent = {
  'padding': '5px 5px 0px 27px',
  'min-height': '0px'
};
var _cssAvatar = {
  'width': '22px',
  'height': '22px'
}; // General CSS for extra fields as time, labels, epic...

var cssExtraFields = {
  'display': 'inline-flex',
  'margin-top': '5px'
};
var labelsColors = {
  'PHP': '#E1D5FF',
  'JS': '#FEFFD5',
  'HTML': '#FFEAD5'
}; // My issue highlight styles

var myIssueHighlight = {
  'background': '#EFF2FF',
  'border-left': '4px solid #99ACF7',
  'border-right': '4px solid #99ACF7'
};
var agingMinimalOpacity = 0.5; // 1.0 = disabled aging at all

/**
 *  Basic class for manage JIRA kanban board page.
 */

var JiraBoard =
/*#__PURE__*/
function () {
  /**
   *  Constructor does AJAX even binding and basic stuff.
   */
  function JiraBoard() {
    _classCallCheck(this, JiraBoard);

    this.bind();
    this.removeHeader();
    this.filter = new JiraFilter();
  }
  /**
   *  Bind board processing on AJAX request.
   */


  _createClass(JiraBoard, [{
    key: "bind",
    value: function bind() {
      var _this = this;

      $(document).ajaxComplete(function (event, xhr, settings) {
        // TODO: This might use some optimization not to call every request (settings.url?)
        _this.processIssues();

        _this.removeColumnConstraints();
      });
    }
    /**
     *  Remove board header.
     */

  }, {
    key: "removeHeader",
    value: function removeHeader() {
      $('#ghx-header').remove();
    }
    /**
     * Remove column card count constraints.
     */

  }, {
    key: "removeColumnConstraints",
    value: function removeColumnConstraints() {
      $('.ghx-busted-max').removeClass('ghx-busted-max'); // Red background remove

      $('.ghx-constraint').remove(); // Column header remove
    }
    /**
     *  Process every issue card at kanban board.
     */

  }, {
    key: "processIssues",
    value: function processIssues() {
      $('.ghx-issue').each(function (i, element) {
        new JiraIssue(element); // Every card is JiraIssue instance
      });
    }
  }]);

  return JiraBoard;
}();

var JiraFilter =
/*#__PURE__*/
function () {
  function JiraFilter() {
    _classCallCheck(this, JiraFilter);

    this.insertInput();
    this.bindFilter();
  }

  _createClass(JiraFilter, [{
    key: "insertInput",
    value: function insertInput() {
      // Filter input
      this.input = $('<input>').attr('type', 'text').addClass('jira-media-factory');
      this.input.attr('placeholder', 'Filter (press F)').css({
        'margin-top': '5px'
      });
      $('.ghx-controls-work').append(this.input);
    }
  }, {
    key: "getQuery",
    value: function getQuery() {
      return this.input.val().toLowerCase();
    }
    /**
     *
     */

  }, {
    key: "bindFilter",
    value: function bindFilter() {
      var _this2 = this;

      this.input.on('keyup', function () {
        var query = _this2.getQuery(); // Nothing to filter, show all cards as default


        if (query.length === 0) {
          $('.ghx-issue, .ghx-parent-stub').show();
          return;
        } // Hide parent stup for subtasks


        $('.ghx-parent-stub').hide(); // Browsing all card issues

        $('.ghx-issue').each(function (i, element) {
          _this2.filterIssue(element, query);
        });
      });
    }
  }, {
    key: "filterIssue",
    value: function filterIssue(element, query) {
      var issue = $(element);
      var text = this.getIssueText(issue); // Text issue + jméno assignee
      // Card contains search query in its normalized text

      if (text.toLowerCase().indexOf(query) !== -1) {
        issue.show();
        issue.closest('.ghx-parent-group').find('.ghx-parent-stub').show(); // Show parent for subtask
      } else {
        issue.hide(); // Card doesn't contain query
      }
    }
  }, {
    key: "getIssueText",
    value: function getIssueText(issue) {
      return issue.text() + issue.find('.ghx-avatar img').attr('data-tooltip');
    }
  }]);

  return JiraFilter;
}();
/**
 * Instance of every issue card at kanban board page.
 */


var JiraIssue =
/*#__PURE__*/
function () {
  /**
   * Constructor runs all necessary processing for issue card.
   * @param {HTMLElement} issue Issue card in DOM
   */
  function JiraIssue(issue) {
    _classCallCheck(this, JiraIssue);

    this.issue = $(issue); // Remove useless parts of card

    this.removeNoneRows();
    this.hideDays();
    this.removeProgress();
    this.removeNormalPriority(); // CSS tweaks (font-size, padding...)

    this.cssIssue();
    this.cssLabels();
    this.cssFixVersion();
    this.cssAvatar(); // New features

    this.aging();
    this.colorLabels();
    this.highlightMyTask();
  }
  /**
   * Remove "None" rows of card.
   */


  _createClass(JiraIssue, [{
    key: "removeNoneRows",
    value: function removeNoneRows() {
      // Browse every extra field row and remove "None" ones
      this.issue.find('.ghx-extra-field').each(function (x, elementRow) {
        var row = $(elementRow);

        if (row.text() === 'None') {
          row.remove();
        }
      });
    }
    /**
     * Do basic CSS card tweaks.
     */

  }, {
    key: "cssIssue",
    value: function cssIssue() {
      this.issue.find('.ghx-issue-content').css(cssIssueContent); // General issue style

      this.issue.find('.ghx-summary').css(cssIssueSummary); // Issue text

      this.issue.find('.aui-label[data-epickey]').css(cssEpic); // Epic label style

      this.issue.find('.ghx-highlighted-fields, .ghx-extra-fields').css(cssExtraFields);
      this.issue.find('.ghx-type, .ghx-flags').css({
        // Move flags
        'left': '5px'
      });
    }
  }, {
    key: "cssLabels",
    value: function cssLabels() {
      // Labels: style
      this.issue.find('[data-tooltip^="Labels"]').css(_cssLabels); // Labels: normalize letter case

      this.issue.find('[data-tooltip^="Labels"]').each(function (x, elementRow) {
        var label = $(elementRow);
        label.text(label.text().toUpperCase());
      });
    }
    /**
     * Edit styles of "Fixed Version" card tag.
     */

  }, {
    key: "cssFixVersion",
    value: function cssFixVersion() {
      this.issue.find('[data-tooltip^="Fix"]').each(function (x, elementRow) {
        $(elementRow).css(_cssFixVersion);
      });
    }
    /**
     *
     */

  }, {
    key: "colorLabels",
    value: function colorLabels() {
      // Each labels field...
      this.issue.find('[data-tooltip^=Labels]').each(function (i, element) {
        var labelsElement = $(element);
        var labels = labelsElement.text();
        labelsElement.attr('data-original', labels); // Store original HTML
        // Loop through each label and set span color for it

        Object.keys(labelsColors).forEach(function (key) {
          labels = labels.replace(key, '<span style="padding: 4px; background: ' + labelsColors[key] + '">' + key + '</span>');
        });
        labelsElement.html(labels);
      });
    }
  }, {
    key: "cssAvatar",
    value: function cssAvatar() {
      // Avatar: default avatar size
      this.issue.find('.ghx-avatar img').css(_cssAvatar); // Avatar: wider card content if no avatar is assigned

      if (this.issue.find('.ghx-avatar img').length === 0) {
        this.issue.find('.ghx-issue-fields').css({
          'padding': '0px'
        });
      } else {
        this.issue.find('.ghx-issue-fields').css({
          'padding-right': '30px'
        });
      }
    }
  }, {
    key: "hideDays",
    value: function hideDays() {
      this.issue.find('.ghx-days').hide();
    }
  }, {
    key: "removeProgress",
    value: function removeProgress() {
      this.issue.find('[data-tooltip*="Progress"]').remove(); // Time: remove logged time from card
    }
  }, {
    key: "removeNormalPriority",
    value: function removeNormalPriority() {
      this.issue.find('.ghx-priority[title=Normal').remove();
    }
  }, {
    key: "aging",
    value: function aging() {
      if (agingMinimalOpacity < 1.0) {
        var age = parseInt(this.issue.find('.ghx-days').attr('title'));
        var opacity = 1 - age / 100 * 2;
        this.issue.css({
          'opacity': opacity <= agingMinimalOpacity ? agingMinimalOpacity : opacity
        });
      }
    }
  }, {
    key: "highlightMyTask",
    value: function highlightMyTask() {
      var logged = $('#header-details-user-fullname').attr('data-displayname');
      var assignee = this.issue.find('.ghx-avatar-img').attr('data-tooltip');

      if (typeof assignee !== 'undefined' && assignee.indexOf(logged) !== -1) {
        this.issue.css(myIssueHighlight);
      }
    }
  }]);

  return JiraIssue;
}(); // ==UserScript==
// @name         MEDIA FACTORY: JIRA Kanban Board Condensed
// @namespace    http://jira.mediafactory.cz/
// @version      3.0
// @description  Make your eyes *not* to bleed with new board.
// @author       Jakub Rychecký <jakub@rychecky.cz>
// @match        *jira.mediafactory.cz/secure/RapidBoard.jspa?*rapidView=*
// @grant        none
// ==/UserScript==


$(function () {
  window.jiraBoard = new JiraBoard();
});