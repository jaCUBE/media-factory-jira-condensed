// ==UserScript==
// @name         MEDIA FACTORY: JIRA Kanban Board Condensed
// @namespace    http://jira.mediafactory.cz/
// @version      1.4
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

const agingMinimalOpacity = 0.5; // 1.0 = disabled aging at all



// ----------------------------------



(function () {
    // Header remove for more vertical space
    $('#ghx-header').remove();


    $(document).ajaxComplete(() => {
        // Hide columns
        hiddenColumnsIds.forEach((id) => {
            $('.ghx-column[data-id=' + id + '], .ghx-column[data-column-id= ' + id + ']').hide();
        });

        // EACH ISSUE EDITS
        $('.ghx-issue').each((i, element) => {
            const issue = $(element);

            // Change issue padding
            issue.find('.ghx-issue-content').css(cssIssueContent);


            // Hide annoying "None" rows
            issue.find('.ghx-extra-field').each((x, elementRow) => {
                let row = $(elementRow);

                if (row.text() === 'None') {
                    row.remove();
                }
            });


            // Issue text: style
            issue.find('.ghx-summary').css(cssIssueSummary);

            // Epic: style
            issue.find('.aui-label[data-epickey]').css(cssEpic);

            // Time: remove logged time from card
            issue.find('[data-tooltip*="Progress"]').remove();


            // Labels: style
            issue.find('[data-tooltip^="Labels"]').css(cssLabels);

            // Labels: normalize letter case
            issue.find('[data-tooltip^="Labels"]').each((x, elementRow) => {
                let label = $(elementRow);
                label.text(label.text().toUpperCase());
            });

            // Fix version: highlight
            issue.find('[data-tooltip^="Fix"]').each((x, elementRow) => {
                $(elementRow).css(cssFixVersion);
            });

            // Epic, labels: margin
            issue.find('.ghx-highlighted-fields, .ghx-extra-fields').css(cssExtraFields);

            // Avatar: default avatar size
            issue.find('.ghx-avatar img').css(cssAvatar);

            // Avatar: wider card content if no avatar is assigned
            if (issue.find('.ghx-avatar img').length === 0) {
                issue.find('.ghx-issue-fields').css({
                   'padding': '0px',
                });
            } else {
                issue.find('.ghx-issue-fields').css({
                    'padding-right': '25px',
                });
            }

            // Days: remove bar with days spent in column chart
            issue.find('.ghx-days').remove();

            // Issue card aging
            if (agingMinimalOpacity < 1.0) {
                let age = parseInt(issue.find('.ghx-days').attr('title'));
                let opacity = 1 - (age / 100 * 2);
                issue.css({
                    'opacity': opacity <= agingMinimalOpacity ? agingMinimalOpacity : opacity,
                });
            }
        });
    });
})();