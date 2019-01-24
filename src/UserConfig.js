import {GM_configStruct} from '../lib/dev/GM_config';

const CONFIG = {
    cssFixVersion: {
        'color': '#444444',
        'font-weight': 'bold',
        'font-size': '11px',
        'margin-right': '5px',
    },

    cssLabels: {
        'font-size': '9px',
        'font-weight': 'bold',
        'color': '#777777',
    },

    cssIssueContent: {
        'padding': '5px 5px 0px 27px',
        'min-height': '0px',
    },

    cssExtraFields: {
        'display': 'inline-flex',
        'margin-top': '5px',
    },
};

const gmConfig = new GM_configStruct({
    'id': 'default',
    'fields': {
        /*- Labels -*/
        /*-- Colors --*/
        'labels.colors.PHP': {
            'section': ['Labels', 'Colors'],
            'label': 'PHP',
            'title': 'Color for the PHP label',
            'type': 'text',
            'default': '#E1D5FF',
        },
        'labels.colors.JS': {
            'label': 'JS',
            'type': 'text',
            'default': '#FEFFD5',
        },
        'labels.colors.HTML': {
            'label': 'HTML',
            'type': 'text',
            'default': '#FFEAD5',
        },
        'labels.colors.CSS': {
            'label': 'CSS',
            'type': 'text',
            'default': '#D5EAFF',
        },

        /*- Issues -*/
        /*-- Colors --*/
        'issues.colors.background': {
            'section': ['Issues', 'My issues - Colors'],
            'label': 'Background',
            'type': 'text',
            'default': '#EFF2FF',
        },
        'issues.colors.border-left': {
            'label': 'Left border',
            'type': 'text',
            'default': '4px solid #99ACF7',
        },
        'issues.colors.border-right': {
            'label': 'Right border',
            'type': 'text',
            'default': '4px solid #99ACF7',
        },

        /*-- Aging --*/
        'issues.aging.enabled': {
            'section': ['', 'Aging'],
            'label': 'Enable aging',
            'type': 'checkbox',
            'default': true,
        },
        'issues.aging.invert': {
            'label': 'Invert aging (older are opaque)',
            'type': 'checkbox',
            'default': false,
        },
        'issues.aging.min_opacity': {
            'label': 'Minimum opacity (0 - 100, in %)',
            'type': 'float',
            'default': 50,
        },
        'issues.aging.max_days': {
            'label': 'Days to reach max/min opacity',
            'type': 'int',
            'default': 25,
        },

        /*-- Avatar --*/
        'issues.avatar.width': {
            'section': ['', 'Avatar'],
            'label': 'Avatar width',
            'type': 'float',
            'default': 22.0,
        },
        'issues.avatar.height': {
            'label': 'Avatar height',
            'type': 'float',
            'default': 22.0,
        },

        /*-- Summary --*/
        'issues.summary.description.font_size': {
            'section': ['', 'Summary'],
            'label': 'Description font size',
            'type': 'float',
            'default': 12.0,
        },
        'issues.summary.epic.font_size': {
            'label': 'Epic link font size',
            'type': 'float',
            'default': 9.0,
        },
    },
});

class UserConfig {
    constructor(gmConfig) {
        this.config = gmConfig;
    }

    open() {
        this.config.open();
    }

    get cssIssueSummary() {
        return {
            'font-size': this.config.get('issues.summary.description.font_size') + 'px',
        };
    }

    get cssEpic() {
        return {
            'font-size': this.config.get('issues.summary.epic.font_size') + 'px',
        };
    }

    get cssAvatar() {
        return {
            'width': this.config.get('issues.avatar.width'),
            'height': this.config.get('issues.avatar.height'),
        };
    }

    get labelsColors() {
        return ['PHP', 'JS', 'HTML', 'CSS'].reduce((out, label) => {
            out[label] = this.config.get(`labels.colors.${label}`);
            return out;
        }, {});
    }

    get myIssueHighlight() {
        return {
            'background': this.config.get('issues.colors.background'),
            'border-left': this.config.get('issues.colors.border-left'),
            'border-right': this.config.get('issues.colors.border-right'),
        };
    }

    get agingMinimalOpacity() {
        return this.config.get('issues.aging.min_opacity') / 100;
    }

    get cssFixVersion() {
        return CONFIG.cssFixVersion;
    }

    get cssLabels() {
        return CONFIG.cssLabels;
    }

    get cssIssueContent() {
        return CONFIG.cssIssueContent;
    }

    get cssExtraFields() {
        return CONFIG.cssExtraFields;
    }
}

export default new UserConfig(gmConfig);