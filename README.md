# Media Factory Kanban JIRA Condensed

A tiny script to make JIRA kanban board better... like... *not* eyes bleeding.

------------------------------------------------------------------------------

## User Installation
1. Install Tampermonkey extension for your browser:
    - [Tampermonkey for Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
    - [Tampermonkey for Mozilla Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)

2. Install Javascript via Greasy Fork:
    - [**Media Factory Kanban JIRA Condensed at greasyfork.org**](https://greasyfork.org/cs/scripts/375433-media-factory-jira-kanban-board-condensed)

------

## Developer Installation

Wanna contribute? Great!

1. Clone this repository:
    ```
    git clone https://github.com/jaCUBE/media-factory-jira-condensed.git
    ```

2. Install `node_modules` packages:
    ```
    npm i
    ```

3. Run Gulp watch and server, it will minify your JS and serve the file:
    ```
    npx gulp watch
    ```

4. Then you can access result JS through URL:
    ```
    http://localhost:8000/dist/KanbanCondensedTampermonkey.js
    ```

5. Create new Tampermonkey script for dev purposes (load JS file from localhost).
    Disable original one.
    ```
    // ==UserScript==
    // @name         [DEV] MEDIA FACTORY: JIRA Kanban Board Condensed
    // @namespace    http://jira.mediafactory.cz/
    // @description  DEVELOPER VERSION. Make your eyes *not* to bleed with new board.
    // @match        *jira.mediafactory.cz/secure/RapidBoard.jspa?*rapidView=*
    // ==/UserScript==

    $('<script>')
        .attr('src', 'http://localhost:8000/dist/KanbanCondensedTampermonkey.js')
        .appendTo('<head>');
    ```