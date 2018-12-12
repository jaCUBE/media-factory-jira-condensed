// ==UserScript==
// @name         MEDIA FACTORY: JIRA Kanban Board Condensed
// @namespace    http://jira.mediafactory.cz/
// @version      1.0
// @description  Make your eyes *not* to bleed with new board.
// @author       Jakub Rychecký <jakub@rychecky.cz>
// @match        *jira.mediafactory.cz/secure/RapidBoard.jspa?rapidView=96*
// @grant        none
// ==/UserScript==


const hiddenColumnsIds = [836]; // Acceptance column

const cssFixVersion = {
    'color': '#E30E0E',
    'font-weight': 'bold',
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
    'padding': '5px 5px 5px 35px',
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

// ----------------------------------


(function () {
    // Hide columns
    hiddenColumnsIds.forEach((id) => {
        $('.ghx-column[data-id=' + id + '], .ghx-column[data-column-id= ' + id + ']').hide();
    });

    // Header remove for more vertical space
    $('#ghx-header').remove();


    $(document).ajaxComplete(() => {
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

            // Fix version: highligh
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

            // Issue card aging
            let age = parseInt(issue.find('.ghx-days').attr('title'));
            let opacity = 1 - (age / 100 * 2);
            issue.css({
               'opacity': opacity <= 0.2 ? 0.2 : opacity,
            });
        });

    });
})();