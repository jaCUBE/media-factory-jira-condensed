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
            this.removeColumnConstraints();
        });
    }

    /**
     *  Remove board header.
     */
    removeHeader() {
        $('#ghx-header').remove();
    }

    /**
     * Remove column card count constraints.
     */
    removeColumnConstraints() {
        $('.ghx-busted-max').removeClass('ghx-busted-max'); // Red background remove
        $('.ghx-constraint').remove(); // Column header remove
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
