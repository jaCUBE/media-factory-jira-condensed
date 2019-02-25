import JiraFilter from './JiraFilter';
import JiraIssue from './JiraIssue';
import CONFIG from './UserConfig';

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
        this.initSidebar();

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
        $('.ghx-busted-max, .ghx-busted-min').removeClass('ghx-busted-min ghx-busted-max'); // Red/yellow background remove
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
            const tag = e.target.tagName.toLowerCase();

            if (e.which === 70 && tag !== 'input' && tag !== 'textarea') {
                e.preventDefault();
                $('.jira-media-factory').focus();
            }
        });
    }

    /**
     * Add buttons to sidebar.
     */
    initSidebar() {
        const sidebar = $('.aui-sidebar');
        const sidebarBody = sidebar.find('.aui-sidebar-body');
        const sidebarNav = sidebarBody.find('.aui-nav');

        const icons = CONFIG.icons;

        const generateNav = nav => `
        <li>
            <a class="aui-nav-item " href="${nav.link || '#'}">
                <span class="aui-icon aui-icon-large agile-icon-${nav.icon}" style="background-image: url('${icons[nav.icon]}'); background-size: cover;"></span>
                <span class="aui-nav-item-label" title="${nav.label}">${nav.label}</span>
            </a>
        </li>
        `;

        const navs = [
            {
                icon: 'settings',
                label: 'Settings',
                onClick: () => CONFIG.open(),
            },
            {
                icon: 'mf-logo',
                label: 'MF',
                link: 'https://mediafactory.cz/'
            }
        ];

        navs.forEach(nav => {
            const navElement = $(generateNav(nav)).appendTo(sidebarNav);

            if (nav.onClick) {
                navElement.on('click', nav.onClick);
            }
        });
    }
}

export default JiraBoard;