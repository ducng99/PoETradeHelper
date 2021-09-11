// ==UserScript==
// @name         PoE Trade Helper
// @namespace    maxhyt.poetradehelper
// @version      2.1.3
// @description  PoE Trade helper script
// @author       Maxhyt
// @match        https://www.pathofexile.com/trade*
// @icon         https://icons.duckduckgo.com/ip2/pathofexile.com.ico
// @require      https://cdn.jsdelivr.net/gh/jquery/jquery@3.6/dist/jquery.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

unsafeWindow.SendGetRequest = function(url) {
    return new Promise(resolve => {
        GM_xmlhttpRequest({
            url,
            method: 'GET',
            onload: function(response) {
                resolve(JSON.parse(response.responseText));
            },
            onerror: function(err) {
                throw err;
            }
        });
    });
};

(function() {
    'use strict'

    $('body').append('<div id="PoETradeHelper"></div>');

    const version = '2.1.3';
    $('body').append(`
    <script type="module" crossorigin src="https://cdn.jsdelivr.net/gh/ducng99/PoETradeHelper@${version}/dist/index.js"></script>
    <link rel="modulepreload" href="https://cdn.jsdelivr.net/gh/ducng99/PoETradeHelper@${version}/dist/vendor.js">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ducng99/PoETradeHelper@${version}/dist/index.css">`);
})();