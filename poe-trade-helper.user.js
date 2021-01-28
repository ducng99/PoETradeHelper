// ==UserScript==
// @name         PoE Trade Helper
// @namespace    maxhyt.poetradehelper
// @version      0.1
// @description  poe.com/trade help
// @author       Maxhyt
// @match        https://www.pathofexile.com/trade*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var $ = jQuery;

var rawPriceData = null;
var helperIsOpen = true;

let helperContainer = $('<div style="position: fixed; right: 0; top: 0; height: 100vh; background-color: #000000aa; width: 370px"></div>');
helperContainer.append('<button id="toggleHelperButton" style="background-color: #111"><span>Show/Hide</span></button><br/>' + 
                       '<div id="helper_tabs" style="height: 95%">' + 
                       '<ul>' +
                       '<li><a href="#tabs-bookmark">Bookmarks</a></li>' +
                       '<li><a href="#tabs-pins">Pins</a></li>' +
                       '<li><a href="#tabs-history">Pin History</a></li>' +
                       '</ul>' +
                       '<div id="tabs-bookmark" style="height: 100%; overflow-y: auto"></div>' +
                       '<div id="tabs-pins" style="height: 100%; overflow-y: auto"></div>' +
                       '</div>');

(function() {
    'use strict';
    
    $('head').append('<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"/>');
    
    setTimeout(() => {
        $('div#app > div.content').css('width', 'calc(100% - 370px)');
        $('body').append(helperContainer);
        $('#helper_tabs').tabs();

        document.querySelector('#toggleHelperButton').addEventListener('click', ToggleHelper);
    }, 2000);
    
    setInterval(() => {
        let buttonsInResults = $('.results span.pull-left:not(.checked)');
        
        for (let options of buttonsInResults)
        {
            let addBookmarkButton = $('<button class="btn btn-default whisper-btn helper-addBookmark">Pin</button>');
            addBookmarkButton.on('click', AddToBookmark);

            $(options).append(addBookmarkButton);
            
            $(options).addClass('checked');
        }
    }, 3000);
    
    UpdatePrices();
    setInterval(UpdatePrices, 120000);
})();

function UpdatePrices()
{
    let league = document.querySelector('span.multiselect__single').textContent;
    GM_xmlhttpRequest({
        url: 'https://poe.ninja/api/data/currencyoverview?league=' + league + '&type=Currency',
        method: 'GET',
        onload: function(response) {
            rawPriceData = JSON.parse(response.responseText).lines;
        }
    });
}

function ToggleHelper()
{
    helperIsOpen = !helperIsOpen;
    helperContainer.css('height', helperIsOpen ? "100vh" : "50px");
    document.querySelector('div#app > div.content').style.width = helperIsOpen ? 'calc(100% - 370px)' : '100%';
}

function AddToBookmark(event)
{
    let resultBox = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement;
    let itemShowcase = resultBox.querySelector('div.itemPopupContainer').cloneNode(true);
    let [price, currency, chaosEquiv] = GetPrice(resultBox.querySelector('span[data-field="price"]'));
    
    let bmContainer = $('<div></div>');
    bmContainer.append($('<button class="removeBM" style="background-color: #111">Remove</button>'));
    bmContainer.append(itemShowcase);
    bmContainer.append($('<div style="padding: 15px; background-color: #000">Price: ' + price + ' ' + currency + (chaosEquiv ? ' &#8776; ' + chaosEquiv + 'c' : '') + '</div><hr style="margin: 0"/>'));
    
    $(bmContainer).find('.removeBM').on('click', RemoveBookmark);
    
    $('#tabs-bookmark').append(bmContainer);
}

function RemoveBookmark(event)
{
    event.currentTarget.parentElement.remove();
}

function GetPrice(dom)
{
    let spans = dom.querySelectorAll('span');
    let priceNum = spans[1].textContent;
    let currency = spans[3].querySelector('span').textContent;
    let chaosPrice = 0;
    
    if (currency !== 'Chaos Orb')
    {
        for (let tCurrency of rawPriceData)
        {
            if (tCurrency.currencyTypeName === currency)
            {
                chaosPrice = tCurrency.receive.value;
                break;
            }
        }
        
        let chaosEquivPrice = parseFloat((priceNum * chaosPrice).toFixed(2));
        
        return [priceNum, currency, chaosEquivPrice];
    }

    return [priceNum, currency];
}
