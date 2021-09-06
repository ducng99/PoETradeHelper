// ==UserScript==
// @name         PoE Trade Helper
// @namespace    maxhyt.poetradehelper
// @version      2.0.0.0
// @description  PoE Trade helper script
// @author       Maxhyt
// @match        https://www.pathofexile.com/trade*
// @icon         https://icons.duckduckgo.com/ip2/pathofexile.com.ico
// @require      https://code.jquery.com/jquery-3.5.1.min.js
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
                resolve();
            }
        });
    });
};

(function() {
    'use strict'

    let helper = document.createElement('div');
    helper.id = 'PoETradeHelper';
    document.body.append(helper);

    $('body').append(`
    <script type="module" crossorigin src="https://cdn.jsdelivr.net/gh/ducng99/PoETradeHelper@2.0/dist/index.js"></script>
    <link rel="modulepreload" href="https://cdn.jsdelivr.net/gh/ducng99/PoETradeHelper@2.0/dist/vendor.js">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ducng99/PoETradeHelper@2.0/dist/index.css">`);
})();