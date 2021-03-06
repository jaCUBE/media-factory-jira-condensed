import {GM_configStruct} from '../lib/dev/GM_config';

class UserConfig {
    constructor(gmConfig) {
        this.config = gmConfig;
        this.callbacks = {};
    }

    // Config value getters
    get cssIssueSummary() {
        return {
            'font-size': this.config.get('issues.summary.description.font-size') + 'px',
        };
    }

    get cssEpic() {
        return {
            'font-size': this.config.get('issues.summary.epic.font-size') + 'px',
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
        return this.config.get('issues.aging.min-opacity') / 100;
    }

    get cssFixVersion() {
        return {
            'color': this.config.get('issues.fix-version.color'),
            'font-weight': 'bold',
            'font-size': this.config.get('issues.fix-version.font-size') + 'px',
            'margin-right': '5px',
        };
    }

    get cssLabels() {
        return {
            'font-weight': 'bold',
            'color': this.config.get('labels.style.color'),
            'font-size': this.config.get('labels.style.font-size') + 'px',
        };
    }

    get cssIssueContent() {
        return {
            'padding': '5px 5px 0px 27px',
            'min-height': '0px',
        };
    }

    get cssExtraFields() {
        return {
            'display': 'inline-flex',
            'margin-top': '5px',
        };
    }

    get icons() {
        return {
            'settings': this.config.get('icons.sidebar.settings'),
            'mf-logo': this.config.get('icons.sidebar.mf-logo'),
            'github-logo': this.config.get('icons.sidebar.github-logo'),
        };
    }

    // Events
    trigger(event, ...args) {
        const events = this.callbacks[event] || [];
        events.forEach(cb => cb(...args));
    }

    bind(event, callback) {
        this.callbacks[event] = this.callbacks[event] || [];
        this.callbacks[event].push(callback);
    }

    // Methods
    open() {
        this.config.open();
    }
}

let userConfig;
const gmConfig = new GM_configStruct({
    'id': 'default',
    'events': {
        // 'init': (...args) => {
        //     userConfig.trigger('init', ...args);
        // },
        'open': (...args) => {
            userConfig.trigger('open', ...args);
        },
        'save': (...args) => {
            userConfig.trigger('save', ...args);
        },
        'close': (...args) => {
            userConfig.trigger('close', ...args);
        },
        'reset': (...args) => {
            userConfig.trigger('reset', ...args);
        },
    },
    'fields': {
        /*- Labels -*/
        /*-- Colors --*/
        'labels.colors.PHP': {
            'section': ['Labels', 'Colors'],
            'label': 'PHP',
            'labelPos': 'left',
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

        /*-- Style --*/
        'labels.style.font-size': {
            'section': ['', 'Style'],
            'label': 'Font size (px)',
            'labelPos': 'left',
            'type': 'float',
            'default': '9',
        },
        'labels.style.color': {
            'label': 'Text color',
            'type': 'text',
            'default': '#777777',
        },

        /*- Issues -*/
        /*-- My issues - colors --*/
        'issues.colors.background': {
            'section': ['Issues', 'My issues - Colors'],
            'label': 'Background',
            'labelPos': 'left',
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
            'labelPos': 'left',
            'type': 'checkbox',
            'default': true,
        },
        'issues.aging.invert': {
            'label': 'Invert aging (older are opaque)',
            'type': 'checkbox',
            'default': false,
        },
        'issues.aging.min-opacity': {
            'label': 'Minimum opacity (0 - 100, in %)',
            'type': 'float',
            'default': 50,
        },
        'issues.aging.max-days': {
            'label': 'Days to reach max/min opacity',
            'type': 'int',
            'default': 25,
        },

        /*-- Avatar --*/
        'issues.avatar.width': {
            'section': ['', 'Avatar'],
            'label': 'Avatar width (px)',
            'labelPos': 'left',
            'type': 'float',
            'default': 22.0,
        },
        'issues.avatar.height': {
            'label': 'Avatar height (px)',
            'labelPos': 'left',
            'type': 'float',
            'default': 22.0,
        },

        /*-- Summary --*/
        'issues.summary.description.font-size': {
            'section': ['', 'Summary'],
            'label': 'Description font size (px)',
            'labelPos': 'left',
            'type': 'float',
            'default': 12.0,
        },
        'issues.summary.epic.font-size': {
            'label': 'Epic link font size (px)',
            'type': 'float',
            'default': 9.0,
        },

        /*-- Fix version --*/
        'issues.fix-version.font-size': {
            'section': ['', 'Fix version'],
            'label': 'Font size (px)',
            'labelPos': 'left',
            'type': 'float',
            'default': '9',
        },
        'issues.fix-version.color': {
            'label': 'Text color',
            'type': 'text',
            'default': '#777777',
        },

        /*- Icons -*/
        /*-- Sidebar --*/
        'icons.sidebar.settings': {
            'section': ['Icons', 'Sidebar'],
            'label': 'Settings',
            'labelPos': 'left',
            'type': 'text',
            'default': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU0IDU0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NCA1NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwYXRoIGQ9Ik01MS4yMiwyMWgtNS4wNTJjLTAuODEyLDAtMS40ODEtMC40NDctMS43OTItMS4xOTdzLTAuMTUzLTEuNTQsMC40Mi0yLjExNGwzLjU3Mi0zLjU3MWMwLjUyNS0wLjUyNSwwLjgxNC0xLjIyNCwwLjgxNC0xLjk2NmMwLTAuNzQzLTAuMjg5LTEuNDQxLTAuODE0LTEuOTY3bC00LjU1My00LjU1M2MtMS4wNS0xLjA1LTIuODgxLTEuMDUyLTMuOTMzLDBsLTMuNTcxLDMuNTcxYy0wLjU3NCwwLjU3My0xLjM2NiwwLjczMy0yLjExNCwwLjQyMUMzMy40NDcsOS4zMTMsMzMsOC42NDQsMzMsNy44MzJWMi43OEMzMywxLjI0NywzMS43NTMsMCwzMC4yMiwwSDIzLjc4QzIyLjI0NywwLDIxLDEuMjQ3LDIxLDIuNzh2NS4wNTJjMCwwLjgxMi0wLjQ0NywxLjQ4MS0xLjE5NywxLjc5MmMtMC43NDgsMC4zMTMtMS41NCwwLjE1Mi0yLjExNC0wLjQyMWwtMy41NzEtMy41NzFjLTEuMDUyLTEuMDUyLTIuODgzLTEuMDUtMy45MzMsMGwtNC41NTMsNC41NTNjLTAuNTI1LDAuNTI1LTAuODE0LDEuMjI0LTAuODE0LDEuOTY3YzAsMC43NDIsMC4yODksMS40NCwwLjgxNCwxLjk2NmwzLjU3MiwzLjU3MWMwLjU3MywwLjU3NCwwLjczLDEuMzY0LDAuNDIsMi4xMTRTOC42NDQsMjEsNy44MzIsMjFIMi43OEMxLjI0NywyMSwwLDIyLjI0NywwLDIzLjc4djYuNDM5QzAsMzEuNzUzLDEuMjQ3LDMzLDIuNzgsMzNoNS4wNTJjMC44MTIsMCwxLjQ4MSwwLjQ0NywxLjc5MiwxLjE5N3MwLjE1MywxLjU0LTAuNDIsMi4xMTRsLTMuNTcyLDMuNTcxYy0wLjUyNSwwLjUyNS0wLjgxNCwxLjIyNC0wLjgxNCwxLjk2NmMwLDAuNzQzLDAuMjg5LDEuNDQxLDAuODE0LDEuOTY3bDQuNTUzLDQuNTUzYzEuMDUxLDEuMDUxLDIuODgxLDEuMDUzLDMuOTMzLDBsMy41NzEtMy41NzJjMC41NzQtMC41NzMsMS4zNjMtMC43MzEsMi4xMTQtMC40MmMwLjc1LDAuMzExLDEuMTk3LDAuOTgsMS4xOTcsMS43OTJ2NS4wNTJjMCwxLjUzMywxLjI0NywyLjc4LDIuNzgsMi43OGg2LjQzOWMxLjUzMywwLDIuNzgtMS4yNDcsMi43OC0yLjc4di01LjA1MmMwLTAuODEyLDAuNDQ3LTEuNDgxLDEuMTk3LTEuNzkyYzAuNzUxLTAuMzEyLDEuNTQtMC4xNTMsMi4xMTQsMC40MmwzLjU3MSwzLjU3MmMxLjA1MiwxLjA1MiwyLjg4MywxLjA1LDMuOTMzLDBsNC41NTMtNC41NTNjMC41MjUtMC41MjUsMC44MTQtMS4yMjQsMC44MTQtMS45NjdjMC0wLjc0Mi0wLjI4OS0xLjQ0LTAuODE0LTEuOTY2bC0zLjU3Mi0zLjU3MWMtMC41NzMtMC41NzQtMC43My0xLjM2NC0wLjQyLTIuMTE0UzQ1LjM1NiwzMyw0Ni4xNjgsMzNoNS4wNTJjMS41MzMsMCwyLjc4LTEuMjQ3LDIuNzgtMi43OFYyMy43OEM1NCwyMi4yNDcsNTIuNzUzLDIxLDUxLjIyLDIxeiBNNTIsMzAuMjJDNTIsMzAuNjUsNTEuNjUsMzEsNTEuMjIsMzFoLTUuMDUyYy0xLjYyNCwwLTMuMDE5LDAuOTMyLTMuNjQsMi40MzJjLTAuNjIyLDEuNS0wLjI5NSwzLjE0NiwwLjg1NCw0LjI5NGwzLjU3MiwzLjU3MWMwLjMwNSwwLjMwNSwwLjMwNSwwLjgsMCwxLjEwNGwtNC41NTMsNC41NTNjLTAuMzA0LDAuMzA0LTAuNzk5LDAuMzA2LTEuMTA0LDBsLTMuNTcxLTMuNTcyYy0xLjE0OS0xLjE0OS0yLjc5NC0xLjQ3NC00LjI5NC0wLjg1NGMtMS41LDAuNjIxLTIuNDMyLDIuMDE2LTIuNDMyLDMuNjR2NS4wNTJDMzEsNTEuNjUsMzAuNjUsNTIsMzAuMjIsNTJIMjMuNzhDMjMuMzUsNTIsMjMsNTEuNjUsMjMsNTEuMjJ2LTUuMDUyYzAtMS42MjQtMC45MzItMy4wMTktMi40MzItMy42NGMtMC41MDMtMC4yMDktMS4wMjEtMC4zMTEtMS41MzMtMC4zMTFjLTEuMDE0LDAtMS45OTcsMC40LTIuNzYxLDEuMTY0bC0zLjU3MSwzLjU3MmMtMC4zMDYsMC4zMDYtMC44MDEsMC4zMDQtMS4xMDQsMGwtNC41NTMtNC41NTNjLTAuMzA1LTAuMzA1LTAuMzA1LTAuOCwwLTEuMTA0bDMuNTcyLTMuNTcxYzEuMTQ4LTEuMTQ4LDEuNDc2LTIuNzk0LDAuODU0LTQuMjk0QzEwLjg1MSwzMS45MzIsOS40NTYsMzEsNy44MzIsMzFIMi43OEMyLjM1LDMxLDIsMzAuNjUsMiwzMC4yMlYyMy43OEMyLDIzLjM1LDIuMzUsMjMsMi43OCwyM2g1LjA1MmMxLjYyNCwwLDMuMDE5LTAuOTMyLDMuNjQtMi40MzJjMC42MjItMS41LDAuMjk1LTMuMTQ2LTAuODU0LTQuMjk0bC0zLjU3Mi0zLjU3MWMtMC4zMDUtMC4zMDUtMC4zMDUtMC44LDAtMS4xMDRsNC41NTMtNC41NTNjMC4zMDQtMC4zMDUsMC43OTktMC4zMDUsMS4xMDQsMGwzLjU3MSwzLjU3MWMxLjE0NywxLjE0NywyLjc5MiwxLjQ3Niw0LjI5NCwwLjg1NEMyMi4wNjgsMTAuODUxLDIzLDkuNDU2LDIzLDcuODMyVjIuNzhDMjMsMi4zNSwyMy4zNSwyLDIzLjc4LDJoNi40MzlDMzAuNjUsMiwzMSwyLjM1LDMxLDIuNzh2NS4wNTJjMCwxLjYyNCwwLjkzMiwzLjAxOSwyLjQzMiwzLjY0YzEuNTAyLDAuNjIyLDMuMTQ2LDAuMjk0LDQuMjk0LTAuODU0bDMuNTcxLTMuNTcxYzAuMzA2LTAuMzA1LDAuODAxLTAuMzA1LDEuMTA0LDBsNC41NTMsNC41NTNjMC4zMDUsMC4zMDUsMC4zMDUsMC44LDAsMS4xMDRsLTMuNTcyLDMuNTcxYy0xLjE0OCwxLjE0OC0xLjQ3NiwyLjc5NC0wLjg1NCw0LjI5NGMwLjYyMSwxLjUsMi4wMTYsMi40MzIsMy42NCwyLjQzMmg1LjA1MkM1MS42NSwyMyw1MiwyMy4zNSw1MiwyMy43OFYzMC4yMnoiLz48cGF0aCBkPSJNMjcsMThjLTQuOTYzLDAtOSw0LjAzNy05LDlzNC4wMzcsOSw5LDlzOS00LjAzNyw5LTlTMzEuOTYzLDE4LDI3LDE4eiBNMjcsMzRjLTMuODU5LDAtNy0zLjE0MS03LTdzMy4xNDEtNyw3LTdzNywzLjE0MSw3LDdTMzAuODU5LDM0LDI3LDM0eiIvPjwvZz48L3N2Zz4=',
        },
        'icons.sidebar.mf-logo': {
            'label': 'MediaFactory',
            'type': 'text',
            'default': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnPiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPiAgPHJlY3QgZmlsbD0ibm9uZSIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjQwMiIgd2lkdGg9IjU4MiIgeT0iLTEiIHg9Ii0xIi8+IDwvZz4gPGc+ICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+ICA8cGF0aCBpZD0ic3ZnXzEiIGZpbGw9IiMwMDAwIiBzdHJva2U9IiNlNDBkMGQiIGQ9Im05LjY5NywxNy42Yy0wLjI0MiwwLjA0OSAtMC40MzYsMC4yOTEgLTAuNDg1LDAuNTMzbC0wLjgyNCwzLjgzYy0wLjA0OSwwLjI0MiAwLDAuNDg1IDAuMTk0LDAuNjNsNi43MzksNi43MzljMC4xNDUsMC4xNDUgMC4yOTEsMC4xOTQgMC40ODUsMC4xOTRzMC4zMzksLTAuMDk3IDAuNDg1LC0wLjE5NGMwLDAgMCwwIDAsMGwyLjQyNCwtMi40MjRjMC4yNDIsLTAuMjkxIDAuMTQ1LC0wLjYzIC0wLjA5NywtMC44NzNsLTguMTk0LC04LjI0MmMtMC4yNDIsLTAuMTk0IC0wLjQ4NSwtMC4yOTEgLTAuNzI3LC0wLjE5NGwwLDAuMDAxeiIvPiAgPHBhdGggaWQ9InN2Z18yIiBmaWxsPSIjMDAwMCIgc3Ryb2tlPSIjMDAwIiBkPSJtMTYuMzg4LDMuMTAzYy0wLjI5MSwtMC4yOTEgLTAuNzI3LC0wLjI0MiAtMC45NywwbC0xMi43MDMsMTIuNjU1Yy0wLjI5MSwwLjI5MSAtMC4yOTEsMC43MjcgMCwwLjk3bDIuMjc5LDIuMjc5YzAuMjkxLDAuMjkxIDAuNzI3LDAuMjQyIDAuOTcsMGw0Ljc1MSwtNC43NTJsOS44NDIsOS44NDJjMC4yNDIsMC4yNDIgMC42NzksMC4yNDIgMC45NywwbDIuMjc5LC0yLjI3OWMwLjI5MSwtMC4yOTEgMC4yOTEsLTAuNjc5IDAsLTAuOTdsLTkuNzk0LC05Ljg0MmwxLjg5MSwtMS44OTFsOS43OTQsOS44NDJjMC4yNDIsMC4yNDIgMC42NzksMC4yNDIgMC45NywwbDIuMjc5LC0yLjI3OWMwLjI5MSwtMC4yOTEgMC4yOTEsLTAuNjc5IDAsLTAuOTdsLTEwLjI3OSwtMTAuMzI3YzAsMCAwLDAgMCwwbC0yLjI3OSwtMi4yNzkiLz4gPC9nPjwvc3ZnPg==',
        },
        'icons.sidebar.github-logo': {
            'label': 'Github',
            'type': 'text',
            'default': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDM4LjU0OXB4IiBoZWlnaHQ9IjQzOC41NDlweCIgdmlld0JveD0iMCAwIDQzOC41NDkgNDM4LjU0OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM4LjU0OSA0MzguNTQ5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZD0iTTQwOS4xMzIsMTE0LjU3M2MtMTkuNjA4LTMzLjU5Ni00Ni4yMDUtNjAuMTk0LTc5Ljc5OC03OS44QzI5NS43MzYsMTUuMTY2LDI1OS4wNTcsNS4zNjUsMjE5LjI3MSw1LjM2NWMtMzkuNzgxLDAtNzYuNDcyLDkuODA0LTExMC4wNjMsMjkuNDA4Yy0zMy41OTYsMTkuNjA1LTYwLjE5Miw0Ni4yMDQtNzkuOCw3OS44QzkuODAzLDE0OC4xNjgsMCwxODQuODU0LDAsMjI0LjYzYzAsNDcuNzgsMTMuOTQsOTAuNzQ1LDQxLjgyNywxMjguOTA2YzI3Ljg4NCwzOC4xNjQsNjMuOTA2LDY0LjU3MiwxMDguMDYzLDc5LjIyN2M1LjE0LDAuOTU0LDguOTQ1LDAuMjgzLDExLjQxOS0xLjk5NmMyLjQ3NS0yLjI4MiwzLjcxMS01LjE0LDMuNzExLTguNTYyYzAtMC41NzEtMC4wNDktNS43MDgtMC4xNDQtMTUuNDE3Yy0wLjA5OC05LjcwOS0wLjE0NC0xOC4xNzktMC4xNDQtMjUuNDA2bC02LjU2NywxLjEzNmMtNC4xODcsMC43NjctOS40NjksMS4wOTItMTUuODQ2LDFjLTYuMzc0LTAuMDg5LTEyLjk5MS0wLjc1Ny0xOS44NDItMS45OTljLTYuODU0LTEuMjMxLTEzLjIyOS00LjA4Ni0xOS4xMy04LjU1OWMtNS44OTgtNC40NzMtMTAuMDg1LTEwLjMyOC0xMi41Ni0xNy41NTZsLTIuODU1LTYuNTdjLTEuOTAzLTQuMzc0LTQuODk5LTkuMjMzLTguOTkyLTE0LjU1OWMtNC4wOTMtNS4zMzEtOC4yMzItOC45NDUtMTIuNDE5LTEwLjg0OGwtMS45OTktMS40MzFjLTEuMzMyLTAuOTUxLTIuNTY4LTIuMDk4LTMuNzExLTMuNDI5Yy0xLjE0Mi0xLjMzMS0xLjk5Ny0yLjY2My0yLjU2OC0zLjk5N2MtMC41NzItMS4zMzUtMC4wOTgtMi40MywxLjQyNy0zLjI4OWMxLjUyNS0wLjg1OSw0LjI4MS0xLjI3Niw4LjI4LTEuMjc2bDUuNzA4LDAuODUzYzMuODA3LDAuNzYzLDguNTE2LDMuMDQyLDE0LjEzMyw2Ljg1MWM1LjYxNCwzLjgwNiwxMC4yMjksOC43NTQsMTMuODQ2LDE0Ljg0MmM0LjM4LDcuODA2LDkuNjU3LDEzLjc1NCwxNS44NDYsMTcuODQ3YzYuMTg0LDQuMDkzLDEyLjQxOSw2LjEzNiwxOC42OTksNi4xMzZjNi4yOCwwLDExLjcwNC0wLjQ3NiwxNi4yNzQtMS40MjNjNC41NjUtMC45NTIsOC44NDgtMi4zODMsMTIuODQ3LTQuMjg1YzEuNzEzLTEyLjc1OCw2LjM3Ny0yMi41NTksMTMuOTg4LTI5LjQxYy0xMC44NDgtMS4xNC0yMC42MDEtMi44NTctMjkuMjY0LTUuMTRjLTguNjU4LTIuMjg2LTE3LjYwNS01Ljk5Ni0yNi44MzUtMTEuMTRjLTkuMjM1LTUuMTM3LTE2Ljg5Ni0xMS41MTYtMjIuOTg1LTE5LjEyNmMtNi4wOS03LjYxNC0xMS4wODgtMTcuNjEtMTQuOTg3LTI5Ljk3OWMtMy45MDEtMTIuMzc0LTUuODUyLTI2LjY0OC01Ljg1Mi00Mi44MjZjMC0yMy4wMzUsNy41Mi00Mi42MzcsMjIuNTU3LTU4LjgxN2MtNy4wNDQtMTcuMzE4LTYuMzc5LTM2LjczMiwxLjk5Ny01OC4yNGM1LjUyLTEuNzE1LDEzLjcwNi0wLjQyOCwyNC41NTQsMy44NTNjMTAuODUsNC4yODMsMTguNzk0LDcuOTUyLDIzLjg0LDEwLjk5NGM1LjA0NiwzLjA0MSw5LjA4OSw1LjYxOCwxMi4xMzUsNy43MDhjMTcuNzA1LTQuOTQ3LDM1Ljk3Ni03LjQyMSw1NC44MTgtNy40MjFzMzcuMTE3LDIuNDc0LDU0LjgyMyw3LjQyMWwxMC44NDktNi44NDljNy40MTktNC41NywxNi4xOC04Ljc1OCwyNi4yNjItMTIuNTY1YzEwLjA4OC0zLjgwNSwxNy44MDItNC44NTMsMjMuMTM0LTMuMTM4YzguNTYyLDIxLjUwOSw5LjMyNSw0MC45MjIsMi4yNzksNTguMjRjMTUuMDM2LDE2LjE4LDIyLjU1OSwzNS43ODcsMjIuNTU5LDU4LjgxN2MwLDE2LjE3OC0xLjk1OCwzMC40OTctNS44NTMsNDIuOTY2Yy0zLjksMTIuNDcxLTguOTQxLDIyLjQ1Ny0xNS4xMjUsMjkuOTc5Yy02LjE5MSw3LjUyMS0xMy45MDEsMTMuODUtMjMuMTMxLDE4Ljk4NmMtOS4yMzIsNS4xNC0xOC4xODIsOC44NS0yNi44NCwxMS4xMzZjLTguNjYyLDIuMjg2LTE4LjQxNSw0LjAwNC0yOS4yNjMsNS4xNDZjOS44OTQsOC41NjIsMTQuODQyLDIyLjA3NywxNC44NDIsNDAuNTM5djYwLjIzN2MwLDMuNDIyLDEuMTksNi4yNzksMy41NzIsOC41NjJjMi4zNzksMi4yNzksNi4xMzYsMi45NSwxMS4yNzYsMS45OTVjNDQuMTYzLTE0LjY1Myw4MC4xODUtNDEuMDYyLDEwOC4wNjgtNzkuMjI2YzI3Ljg4LTM4LjE2MSw0MS44MjUtODEuMTI2LDQxLjgyNS0xMjguOTA2QzQzOC41MzYsMTg0Ljg1MSw0MjguNzI4LDE0OC4xNjgsNDA5LjEzMiwxMTQuNTczeiIvPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=',
        },
    },
});

userConfig = new UserConfig(gmConfig);

export default userConfig;