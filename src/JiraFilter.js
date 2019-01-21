class JiraFilter {

    /**
     * JiraFilter constructor.
     */
    constructor() {
        this.insertInput();
        this.bindFilter();
    }

    /**
     * Create filter element.
     */
    insertInput() {
        // Filter input
        this.input = $('<input>').attr('type', 'text').addClass('jira-media-factory');
        this.input.attr('placeholder', 'Filter (press F)').css({'margin-top': '5px'});
        $('.ghx-controls-work').append(this.input);
    }

    /**
     * Get the input query.
     *
     * @returns {string}
     */
    getQuery() {
        return this.input.val().toLowerCase();
    }

    /**
     * Bind events for filter.
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

    /**
     * Apply current filter.
     *
     * @param element
     * @param query
     */
    filterIssue(element, query) {
        let issue = $(element);
        let text = JiraFilter.getIssueText(issue); // Text issue + jméno assignee

        // Card contains search query in its normalized text
        if (text.toLowerCase().indexOf(query) !== -1) {
            issue.show();
            issue.closest('.ghx-parent-group').find('.ghx-parent-stub').show(); // Show parent for subtask
        } else {
            issue.hide(); // Card doesn't contain query
        }
    }

    /**
     * Get text from issue.
     *
     * @param issue
     *
     * @returns {string}
     */
    static getIssueText(issue) {
        return issue.text() + issue.find('.ghx-avatar img').attr('data-tooltip');
    }
}

export default JiraFilter;
