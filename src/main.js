// ==UserScript==
// @name         MEDIA FACTORY: JIRA Kanban Board Condensed
// @namespace    http://jira.mediafactory.cz/
// @version      3.0
// @description  Make your eyes *not* to bleed with new board.
// @author       Jakub Rychecký <jakub@rychecky.cz>
// @match        *jira.mediafactory.cz/secure/RapidBoard.jspa?*rapidView=96*
// @grant        none
// ==/UserScript==


$(function () {
    window.jiraBoard = new JiraBoard();
});
