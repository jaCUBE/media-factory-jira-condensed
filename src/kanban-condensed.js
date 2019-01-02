// ==UserScript==
// @name         MEDIA FACTORY: JIRA Kanban Board Condensed
// @namespace    http://jira.mediafactory.cz/
// @version      3.0
// @description  Make your eyes *not* to bleed with new board.
// @author       Jakub Rychecký <jakub@rychecky.cz>
// @match        *jira.mediafactory.cz/secure/RapidBoard.jspa?*rapidView=96*
// @grant        none
// ==/UserScript==


const hiddenColumnsIds = [836]; // Acceptance column

const cssFixVersion = {
    'color': '#444444',
    'font-weight': 'bold',
    'font-size': '11px',
    'margin-right': '5px',
};

const cssLabels = {
    'font-size': '9px',
    'font-weight': 'bold',
    'color': '#AAAAAA',
};

const cssEpic = {
    'font-size': '9px',
};

const cssIssueSummary = {
    'font-size': '12px',
};

const cssIssueContent = {
    'padding': '5px 5px 0px 35px',
    'min-height': '0px',
};

const cssAvatar = {
    'width': '22px',
    'height': '22px',
};

// General CSS for extra fields as time, labels, epic...
const cssExtraFields = {
    'display': 'inline-flex',
    'margin-top': '5px',
};

const labelsColors = {
    'PHP': '#E1D5FF',
    'JS': '#FEFFD5',
    'HTML': '#FFEAD5',
};

const agingMinimalOpacity = 0.5; // 1.0 = disabled aging at all


/**
 *  Basic class for manage JIRA kanban board page.
 */
class JiraBoard {
    /**
     *  Constructor does AJAX even binding and basic stuff.
     */
    constructor() {
        this.bind();
        this.removeHeader();

        this.filter = new JiraFilter();
    }

    /**
     *  Bind board processing on AJAX request.
     */
    bind() {
        $(document).ajaxComplete((event, xhr, settings) => {
            // TODO: This might use some optimization not to call every request (settings.url?)
            this.processIssues();
        });
    }

    /**
     *  Remove board header.
     */
    removeHeader() {
        $('#ghx-header').remove();
    }

    /**
     *  Process every issue card at kanban board.
     */
    processIssues() {
        $('.ghx-issue').each((i, element) => {
            (new JiraIssue(element)); // Every card is JiraIssue instance
        });
    }

    /**
     * Hide columns like "acceptance" which are useless for devs.
     */
    hideColumns() {
        hiddenColumnsIds.forEach((id) => {
            $('.ghx-column[data-id=' + id + '], .ghx-column[data-column-id= ' + id + ']').hide();
        });
    }
}

/**
 * Instance of every issue card at kanban board page.
 */
class JiraIssue {
    /**
     * Constructor runs all necessary processing for issue card.
     * @param {HTMLElement} issue Issue card in DOM
     */
    constructor(issue) {
        this.issue = $(issue);

        // Remove useless parts of card
        this.removeNoneRows();
        this.removeDays();
        this.removeProgress();
        this.removeNormalPriority();

        // CSS tweaks (font-size, padding...)
        this.cssIssue();
        this.cssLabels();
        this.cssFixVersion();
        this.cssAvatar();

        // New features
        this.aging();
        this.colorLabels();
    }

    /**
     * Remove "None" rows of card.
     */
    removeNoneRows() {
        // Browse every extra field row and remove "None" ones
        this.issue.find('.ghx-extra-field').each((x, elementRow) => {
            let row = $(elementRow);

            if (row.text() === 'None') {
                row.remove();
            }
        });
    }

    /**
     * Do basic CSS card tweaks.
     */
    cssIssue() {
        this.issue.find('.ghx-issue-content').css(cssIssueContent); // General issue style
        this.issue.find('.ghx-summary').css(cssIssueSummary); // Issue text
        this.issue.find('.aui-label[data-epickey]').css(cssEpic); // Epic label style
        this.issue.find('.ghx-highlighted-fields, .ghx-extra-fields').css(cssExtraFields);
    }


    cssLabels() {
        // Labels: style
        this.issue.find('[data-tooltip^="Labels"]').css(cssLabels);

        // Labels: normalize letter case
        this.issue.find('[data-tooltip^="Labels"]').each((x, elementRow) => {
            let label = $(elementRow);
            label.text(label.text().toUpperCase());
        });
    }

    /**
     * Edit styles of "Fixed Version" card tag.
     */
    cssFixVersion() {
        this.issue.find('[data-tooltip^="Fix"]').each((x, elementRow) => {
            $(elementRow).css(cssFixVersion);
        });
    }


    /**
     *
     */
    colorLabels() {
        // Each labels field...
        this.issue.find('[data-tooltip^=Labels]').each((i, element) => {
            let labelsElement = $(element);
            let labels = labelsElement.text();

            labelsElement.attr('data-original', labels); // Store original HTML

            // Loop through each label and set span color for it
            Object.keys(labelsColors).forEach((key) => {
                labels = labels.replace(key, '<span style="padding: 4px; background: ' + labelsColors[key] + '">' + key + '</span>');
            });

            labelsElement.html(labels);
        });
    }


    cssAvatar() {
        // Avatar: default avatar size
        this.issue.find('.ghx-avatar img').css(cssAvatar);

        // Avatar: wider card content if no avatar is assigned
        if (this.issue.find('.ghx-avatar img').length === 0) {
            this.issue.find('.ghx-issue-fields').css({
                'padding': '0px',
            });
        } else {
            this.issue.find('.ghx-issue-fields').css({
                'padding-right': '25px',
            });
        }
    }

    removeDays() {
        this.issue.find('.ghx-days').remove();
    }

    removeProgress() {
        this.issue.find('[data-tooltip*="Progress"]').remove(); // Time: remove logged time from card
    }

    removeNormalPriority() {
        this.issue.find('.ghx-priority[title=Normal').remove();
    }

    aging() {
        if (agingMinimalOpacity < 1.0) {
            let age = parseInt(this.issue.find('.ghx-days').attr('title'));
            let opacity = 1 - (age / 100 * 2);
            this.issue.css({
                'opacity': opacity <= agingMinimalOpacity ? agingMinimalOpacity : opacity,
            });
        }
    }

}

class JiraFilter {
    constructor() {
        this.insertInput();
        this.bindFilter();
    }


    insertInput() {
        // Filter input
        this.input = $('<input>').attr('type', 'text').addClass('jira-media-factory');
        this.input.attr('placeholder', 'Filter (press F)').css({'margin-top': '5px'});
        $('.ghx-controls-work').append(this.input);
    }

    getQuery() {
        return this.input.val().toLowerCase();
    }

    /**
     *
     */
    bindFilter() {
        this.input.on('keyup', () => {
            let query = this.getQuery();

            // Nothing to filter, show all cards as default
            if (query.length === 0) {
                $('.ghx-issue, .ghx-parent-stub').show();
                return;
            }

            // Hide parent stup for subtasks
            $('.ghx-parent-stub').hide();

            // Browsing all card issues
            $('.ghx-issue').each((i, element) => {
                this.filterIssue(element, query);
            });
        });
    }

    filterIssue(element, query) {
        let issue = $(element);
        let text = this.getIssueText(issue); // Text issue + jméno assignee

        // Card contains search query in its normalized text
        if (text.toLowerCase().indexOf(query) !== -1) {
            issue.show();
            issue.closest('.ghx-parent-group').find('.ghx-parent-stub').show(); // Show parent for subtask
        } else {
            issue.hide(); // Card doesn't contain query
        }
    }


    getIssueText(issue) {
        return issue.text() + issue.find('.ghx-avatar img').attr('data-tooltip');
    }
}

/**
 *
 */
$(function () {
    window.jiraBoard = new JiraBoard();
});
