// ==UserScript==
// @name         MEDIA FACTORY: JIRA Kanban Board Condensed
// @namespace    http://jira.mediafactory.cz/
// @version      0.1
// @description  Make your eyes *not* to bleed with new board.
// @author       Jakub Rychecký <jakub@rychecky.cz>
// @match        https://jira.mediafactory.cz/secure/RapidBoard.jspa?rapidView=96*
// @grant        none
// ==/UserScript==


const hiddenColumnsIds = [836]; // Acceptance column
const fixVersionColor = '#e30e0e'; // Color for Fix Version text



(function() {
    $(document).ajaxComplete(() => {
        // Hide columns
        hiddenColumnsIds.forEach((id) => {
            $('.ghx-column[data-id=' + id + '], .ghx-column[data-column-id= ' + id + ']').hide();
        });



        // Header remove for more vertical space
        $('#ghx-header').remove();



        // EACH ISSUE EDITS
        $('.ghx-issue').each((i, element) => {
            const issue = $(element);

            // Change issue padding
            issue.find('.ghx-issue-content').css({
                'padding': '5px 5px 5px 35px',
            });


            // Hide "None" rows
            issue.find('.ghx-extra-field').each((x, elementRow) => {
                let row = $(elementRow);

                if (row.text() === 'None') {
                    row.remove();
                };
            });


            // Smaller issue text
            issue.find('.ghx-summary').css({
                'font-size': '13px',
            });

            // Smaller epic link
            issue.find('.aui-label[data-epickey]').css({
                'font-size': '9px',
            });

            // Remove logged time from card
            issue.find('[data-tooltip*="Progress"]').remove();


            // Change style of labels
            issue.find('[data-tooltip^="Labels"]').css({
                'font-size': '9px',
                'font-weight': 'bold',
                'color': '#AAAAAA',
            });

            // Normalize label case
            issue.find('[data-tooltip^="Labels"]').each((x, elementRow) => {
                let label = $(elementRow);
                label.text(label.text().toUpperCase());
            });

            // Highligh for fix version
            issue.find('[data-tooltip^="Fix"]').each((x, elementRow) => {
                $(elementRow).css({
                    'color': fixVersionColor,
                    'font-weight': 'bold',
                });
            });

            // Margin of epic link
            issue.find('.ghx-highlighted-fields').css({
                'margin-top': '5px',
            });

            // Margin of labels
            issue.find('.ghx-extra-fields').css({
                'margin-top': '5px',
            });
        });

    });
})();