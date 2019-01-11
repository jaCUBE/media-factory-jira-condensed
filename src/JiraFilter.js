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
