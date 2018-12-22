"use strict";

// ==UserScript==
// @name         MEDIA FACTORY: JIRA Kanban Board Condensed
// @namespace    http://jira.mediafactory.cz/
// @version      2.2
// @description  Make your eyes *not* to bleed with new board.
// @author       Jakub Rychecký <jakub@rychecky.cz>
// @match        *jira.mediafactory.cz/secure/RapidBoard.jspa?*rapidView=96*
// @grant        none
// ==/UserScript==
var hiddenColumnsIds = [836]; // Acceptance column

var cssFixVersion = {
  'color': '#444444',
  'font-weight': 'bold',
  'font-size': '11px',
  'margin-right': '5px'
};
var cssLabels = {
  'font-size': '9px',
  'font-weight': 'bold',
  'color': '#AAAAAA'
};
var cssEpic = {
  'font-size': '9px'
};
var cssIssueSummary = {
  'font-size': '12px'
};
var cssIssueContent = {
  'padding': '5px 5px 0px 35px',
  'min-height': '0px'
};
var cssAvatar = {
  'width': '22px',
  'height': '22px'
}; // General CSS for extra fields as time, labels, epic...

var cssExtraFields = {
  'display': 'inline-flex',
  'margin-top': '5px'
};
var agingMinimalOpacity = 0.5; // 1.0 = disabled aging at all
// ----------------------------------

(function () {
  // Header remove for more vertical space
  $('#ghx-header').remove();
  jiraBoardFilter();
  $(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.url.indexOf('allData.json') === -1) {
      return;
    } // Hide columns


    hiddenColumnsIds.forEach(function (id) {
      $('.ghx-column[data-id=' + id + '], .ghx-column[data-column-id= ' + id + ']').hide();
    }); // EACH ISSUE EDITS

    $('.ghx-issue').each(function (i, element) {
      var issue = $(element); // Change issue padding

      issue.find('.ghx-issue-content').css(cssIssueContent); // Hide annoying "None" rows

      issue.find('.ghx-extra-field').each(function (x, elementRow) {
        var row = $(elementRow);

        if (row.text() === 'None') {
          row.remove();
        }
      }); // Issue text: style

      issue.find('.ghx-summary').css(cssIssueSummary); // Epic: style

      issue.find('.aui-label[data-epickey]').css(cssEpic); // Time: remove logged time from card

      issue.find('[data-tooltip*="Progress"]').remove(); // Labels: style

      issue.find('[data-tooltip^="Labels"]').css(cssLabels); // Labels: normalize letter case

      issue.find('[data-tooltip^="Labels"]').each(function (x, elementRow) {
        var label = $(elementRow);
        label.text(label.text().toUpperCase());
      }); // Fix version: highlight

      issue.find('[data-tooltip^="Fix"]').each(function (x, elementRow) {
        $(elementRow).css(cssFixVersion);
      }); // Epic, labels: margin

      issue.find('.ghx-highlighted-fields, .ghx-extra-fields').css(cssExtraFields); // Avatar: default avatar size

      issue.find('.ghx-avatar img').css(cssAvatar); // Avatar: wider card content if no avatar is assigned

      if (issue.find('.ghx-avatar img').length === 0) {
        issue.find('.ghx-issue-fields').css({
          'padding': '0px'
        });
      } else {
        issue.find('.ghx-issue-fields').css({
          'padding-right': '25px'
        });
      } // Days: remove bar with days spent in column chart


      issue.find('.ghx-days').remove(); // Issue card aging

      if (agingMinimalOpacity < 1.0) {
        var age = parseInt(issue.find('.ghx-days').attr('title'));
        var opacity = 1 - age / 100 * 2;
        issue.css({
          'opacity': opacity <= agingMinimalOpacity ? agingMinimalOpacity : opacity
        });
      }
    });
    jiraLabelColoring();
  });
})();

function jiraBoardFilter() {
  // Filter input
  var input = $('<input>').attr('type', 'text').addClass('jira-media-factory');
  input.attr('placeholder', 'Filter (press F)').css({
    'margin-top': '5px'
  }); // Filtering

  input.on('keyup', function () {
    var query = input.val().toLowerCase(); // Nothing to filter, show all cards as default

    if (query.length === 0) {
      $('.ghx-issue, .ghx-parent-stub').show();
      return;
    } // Hide parent stup for subtasks


    $('.ghx-parent-stub').hide(); // Browsing all card issues

    $('.ghx-issue').each(function (i, element) {
      var issue = $(element);
      var text = issue.text() + issue.find('.ghx-avatar img').attr('data-tooltip'); // Text issue + jméno assignee

      if (text.toLowerCase().indexOf(query) !== -1) {
        issue.show();
        issue.closest('.ghx-parent-group').find('.ghx-parent-stub').show(); // Show parent for subtask
      } else {
        issue.hide(); // Card doesn't contain query
      }
    });
  }); // Injecting filter input

  $('.ghx-controls-work').append(input); // Filter shortcut: F to focus filter

  $(document).keypress(function (e) {
    if (e.charCode === 102) {
      // F key
      $('.jira-media-factory').focus();
      e.preventDefault();
    }
  });
}

function jiraLabelColoring() {
  // Defined labels and their hex colors
  var labelsColors = {
    'PHP': '#E1D5FF',
    'JS': '#FEFFD5',
    'HTML': '#FFEAD5'
  }; // Each labels field...

  $('[data-tooltip^=Labels]').each(function (i, element) {
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