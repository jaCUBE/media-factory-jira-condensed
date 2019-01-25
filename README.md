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

**You need Tampermonkey first, please, follow the first step in previous list. Then return here.**

1. Clone this repository:
    ```
    git clone https://github.com/jaCUBE/media-factory-jira-condensed.git
    ```

2. Install `node_modules` packages:
    ```
    npm i
    ```

3. Run `gulp watch` in your folder, it will watch and minify JS file:
    ```
    npx gulp watch
    ```

4. Allow Tampermonkey extension to access local files.
    - Visit Chrome extension settings page at: chrome://extensions/
    - Find Tampermonkey, click to `Details`
    - Turn `Allow access to file URLs` checkbox on

5. Create new Tampermonkey script for dev purposes (load JS file from localhost).
    Disable original one.

    - **❗  Replace your own `// @require` filepath according to your cloned folder.**
    - Example filepath: `file:///C:/dev/media-factory-jira-condensed/dist/KanbanCondensedTampermonkey.js`

    ```
    // ==UserScript==
    // @name         [DEV] MEDIA FACTORY: JIRA Kanban Board Condensed
    // @namespace    http://jira.mediafactory.cz/
    // @description  DEVELOPER VERSION. Make your eyes *not* to bleed with new board.
    // @match        *jira.mediafactory.cz/secure/RapidBoard.jspa?*rapidView=*
    // @require      <------REPLACE-ME-WITH-YOUR-FILEPATH------>
    // ==/UserScript==
    ```


6. Easily switch between production version linked to GreasyFork and your local file.