// ==UserScript==
// @name         MEDIA FACTORY: JIRA Kanban Board Condensed
// @namespace    http://jira.mediafactory.cz/
// @version      0.2
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
    'font-size': '13px',
};

const cssIssueContent = {
    'padding': '5px 5px 5px 35px',
};

// General CSS for extra fields as time, labels, epic...
const cssExtraFields = {
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


            // Hide "None" rows
            issue.find('.ghx-extra-field').each((x, elementRow) => {
                let row = $(elementRow);

                if (row.text() === 'None') {
                    row.remove();
                }
            });


            // Smaller issue text
            issue.find('.ghx-summary').css(cssIssueSummary);

            // Smaller epic link
            issue.find('.aui-label[data-epickey]').css(cssEpic);

            // Remove logged time from card
            issue.find('[data-tooltip*="Progress"]').remove();


            // Change style of labels
            issue.find('[data-tooltip^="Labels"]').css(cssLabels);

            // Normalize label case
            issue.find('[data-tooltip^="Labels"]').each((x, elementRow) => {
                let label = $(elementRow);
                label.text(label.text().toUpperCase());
            });

            // Highligh for fix version
            issue.find('[data-tooltip^="Fix"]').each((x, elementRow) => {
                $(elementRow).css(cssFixVersion);
            });

            // Margin of epic link
            issue.find('.ghx-highlighted-fields, .ghx-extra-fields').css(cssExtraFields);
        });

    });
})();