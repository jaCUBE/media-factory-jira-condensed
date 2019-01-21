import JiraFilter from './JiraFilter';
import JiraIssue from './JiraIssue';

/**
 *  Basic class for manage JIRA kanban board page.
 */
class JiraBoard {

    /**
     * Constructor does AJAX even binding and basic stuff.
     */
    constructor() {
        this.init();
        this.bind();
        this.removeHeader();
        this.initKeyboardShortcut();

        this.filter = new JiraFilter();
    }

    /**
     * Initialize
     */
    init() {
        this.processIssues();
        this.removeColumnConstraints();
    }

    /**
     * Bind board processing on AJAX request.
     */
    bind() {
        // TODO: This might use some optimization not to call every request (settings.url?)
        $(document).ajaxComplete(() => this.init());
    }

    /**
     * Remove board header.
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
     * Process every issue card at kanban board.
     */
    processIssues() {
        $('.ghx-issue').each((i, element) => {
            (new JiraIssue(element)); // Every card is JiraIssue instance
        });
    }

    /**
     * Press "F" to focus filter.
     */
    initKeyboardShortcut() {
        $(document).on('keydown', function (e) {
            var tag = e.target.tagName.toLowerCase();

            if (e.which === 70 && tag !== 'input' && tag !== 'textarea') {
                e.preventDefault();
                $('.jira-media-factory').focus();
            }
        });
    }
}

export default JiraBoard;