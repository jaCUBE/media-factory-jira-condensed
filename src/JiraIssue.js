import {CONFIG} from './config';

/**
 * Instance of every issue card at kanban board page.
 */
class JiraIssue {

    /**
     * Constructor runs all necessary processing for issue card.
     *
     * @param {HTMLElement} issue Issue card in DOM
     */
    constructor(issue) {
        this.issue = $(issue);

        // Remove useless parts of card
        this.removeNoneRows();
        this.hideDays();
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
        this.highlightMyTask();
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
        this.issue.find('.ghx-issue-content').css(CONFIG.cssIssueContent); // General issue style
        this.issue.find('.ghx-summary').css(CONFIG.cssIssueSummary); // Issue text
        this.issue.find('.aui-label[data-epickey]').css(CONFIG.cssEpic); // Epic label style
        this.issue.find('.ghx-highlighted-fields, .ghx-extra-fields').css(CONFIG.cssExtraFields);

        this.issue.find('.ghx-type, .ghx-flags').css({ // Move flags
            'left': '5px',
        });
    }

    cssLabels() {
        // Labels: style
        this.issue.find('[data-tooltip^="Labels"]').css(CONFIG.cssLabels);

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
            $(elementRow).css(CONFIG.cssFixVersion);
        });
    }

    /**
     * Color issue labels.
     */
    colorLabels() {
        // Each labels field...
        this.issue.find('[data-tooltip^=Labels]').each((i, element) => {
            let labelsElement = $(element);
            let labels = labelsElement.text();

            labelsElement.attr('data-original', labels); // Store original HTML

            // Loop through each label and set span color for it
            for (let [key, value] of Object.entries(CONFIG.labelsColors)) {
                labels = labels.replace(key, '<span style="padding: 4px; background: ' + value + '">' + key + '</span>');
            }

            labelsElement.html(labels);
        });
    }

    /**
     * Change avatar style
     */
    cssAvatar() {
        // Avatar: default avatar size
        this.issue.find('.ghx-avatar img').css(CONFIG.cssAvatar);

        // Avatar: wider card content if no avatar is assigned
        if (this.issue.find('.ghx-avatar img').length === 0) {
            this.issue.find('.ghx-issue-fields').css({
                'padding': '0px',
            });
        } else {
            this.issue.find('.ghx-issue-fields').css({
                'padding-right': '30px',
            });
        }
    }

    /**
     * Hide days indicator.
     */
    hideDays() {
        this.issue.find('.ghx-days').hide();
    }

    /**
     * Removed planned and logged time progress.
     */
    removeProgress() {
        this.issue.find('[data-tooltip*="Progress"]').remove(); // Time: remove logged time from card
    }

    /**
     * Remove normal priority indicator.
     */
    removeNormalPriority() {
        this.issue.find('.ghx-priority[title=Normal').remove();
    }

    /**
     * Change opacity for old issues.
     */
    aging() {
        const agingMinimalOpacity = CONFIG.agingMinimalOpacity;
        if (agingMinimalOpacity < 1.0) {
            let age = parseInt(this.issue.find('.ghx-days').attr('title'));
            let opacity = 1 - (age / 100 * 2);
            this.issue.css({
                'opacity': opacity <= agingMinimalOpacity ? agingMinimalOpacity : opacity,
            });
        }
    }

    /**
     * Highlight current user's issues.
     */
    highlightMyTask() {
        let logged = $('#header-details-user-fullname').attr('data-displayname');
        let assignee = this.issue.find('.ghx-avatar-img').attr('data-tooltip');

        if (typeof assignee !== 'undefined' && assignee.indexOf(logged) !== -1) {
            this.issue.css(CONFIG.myIssueHighlight);
        }
    }
}

export default JiraIssue;