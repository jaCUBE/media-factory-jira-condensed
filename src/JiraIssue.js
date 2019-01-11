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

    hideDays() {
        this.issue.find('.ghx-days').hide();
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
