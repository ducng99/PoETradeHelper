// ==UserScript==
// @name         PoE Trade Helper
// @namespace    maxhyt.poetradehelper
// @version      1.0
// @description  poe.com/trade help
// @author       Maxhyt
// @match        https://www.pathofexile.com/trade*
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @require      https://ducng99.github.io/PoETradeHelper/jquery-ui/jquery-ui.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/uuid/8.1.0/uuidv4.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const $ = jQuery;
    
function ArrayIndexMove(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
};

(function() {
    'use strict';
    
    const STORAGE_HELPER_BOOKMARKS = 'PoETradeHelper_Bookmarks';
    
    $('head').append('<link rel="stylesheet" href="https://ducng99.github.io/PoETradeHelper/jquery-ui/jquery-ui.min.css"/>');
    $('head').append(`
    <style>
        #helperContainer .ui-button {
            padding: .2em .4em;
            margin: .2em .1em;
        }

        #helperContainer .ui-tabs .ui-tabs-nav .ui-tabs-anchor {
            padding: .3em .6em;
        }
        #helperContainer input {
            background: #1e2124;
            border: 0;
            padding: .3em .6em;
        }
        #helperContainer .ui-accordion .ui-accordion-content {
            padding: .5em .5em;
        }
    </style>`);

    var rawPriceData = null;
    var helperIsOpen = true;
    var bookmarks = JSON.parse(window.localStorage.getItem(STORAGE_HELPER_BOOKMARKS));
    if (bookmarks === null)
    {
        bookmarks = [];
    }

    let helperContainer = $('<div style="display: flex; flex-direction: column; position: fixed; right: 0; top: 0; height: 100vh; background-color: #000000aa; width: 370px" id="helperContainer"></div>');
    helperContainer.append('<button id="toggleHelperButton" class="ui-button">Show/Hide</button><br/>' + 
                           '<div id="helper_tabs" style="flex-grow: 1; display: flex; flex-direction: column">' + 
                           '<ul>' +
                           '<li><a href="#tabs-bookmark">Bookmarks</a></li>' +
                           '<li><a href="#tabs-pins">Pins</a></li>' +
                           '<li><a href="#tabs-history">Pin History</a></li>' +
                           '</ul>' +
                           '<div id="tabs-bookmark" style="overflow-y: auto; padding: 0 0.6em; flex-grow: 1"></div>' +
                           '<div id="tabs-pins" style="overflow-y: auto; padding: 0 0.6em; flex-grow: 1"></div>' +
                           '</div>');
    
    $('body').append(helperContainer);
    $('#helper_tabs').tabs();
    
    let addBookmarkFolderForm = $('<form></form>');
    addBookmarkFolderForm.append('<label for="bookmark_newFolderName">Folder name:</label><br/><input id="bookmark_newFolderName"/><br/><button type="submit" class="ui-button">Add</button><hr/>');
    addBookmarkFolderForm.on('submit', AddBookmarkFolder);
    $('#tabs-bookmark').append(addBookmarkFolderForm);
    $('#tabs-bookmark').append('<div id="folderContainer"></div>');

    $('#folderContainer').sortable({
        axis: 'y',
        cursor: "move",
        handle: 'div.moveFolder',
        update: RearrangeBookmarksFolder
    });
    
    UpdateBookmarks();

    helperContainer.find('#toggleHelperButton').on('click', ToggleHelper);
    
    setTimeout(() => {
        $('div#app > div.content').css('width', 'calc(100% - 370px)');
    
        UpdatePrices();
    }, 2000);
    
    setInterval(() => {
        let buttonsInResults = $('.results span.pull-left:not(.checked)');
        
        for (let options of buttonsInResults)
        {
            let addPinButton = $('<button class="btn btn-default whisper-btn">Pin</button>');
            addPinButton.on('click', AddToPin);

            $(options).append(addPinButton);
            
            $(options).addClass('checked');
        }
    }, 3000);
    
    setInterval(UpdatePrices, 120000);
    
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
    
    function UpdateBookmarks()
    {
        window.localStorage.setItem(STORAGE_HELPER_BOOKMARKS, JSON.stringify(bookmarks));
                
        for (const folder of bookmarks)
        {
            if ($('#folderContainer').find('div[folder-id="' + folder.id + '"]').length === 0)
            {
                let folderNode = $('<div folder-id="' + folder.id + '"></div>');
                $('#folderContainer').append(folderNode);
                
                let header = $('<h3 style="display: flex; align-items: center; padding: .2em">' + folder.name + '</h3>');
                folderNode.append(header);
                header.append('<div class="ui-button moveFolder" style="margin-left: auto"><span class="ui-icon ui-icon-caret-2-n-s">Move</span></div>');
                let removeButton = $('<button class="ui-button"><span class="ui-icon ui-icon-trash">Remove</span></button>');
                header.append(removeButton);
                removeButton.on('click', RemoveBookmarkFolder);
                
                folderNode.append('<div style="display:flex;flex-direction:column">abcede<div class="ui-button" id="addBookmarkButton">Add bookmark</div></div>');
                folderNode.find('#addBookmarkButton').on('click', AddBookmark);
                
                folderNode.accordion({
                    active: false,
                    collapsible: true,
                    header: 'h3'
                });
            }
        }
    }
    
    function RearrangeBookmarksFolder(event, ui)
    {
        let folderNode = ui.item;
        let folderID = folderNode.attr('folder-id');
        let folderNewIndex = folderNode.parent().children().index(folderNode);
        
        for (const folder of bookmarks)
        {
            if (folder.id === folderID)
            {
                let oldIndex = bookmarks.indexOf(folder);
                ArrayIndexMove(bookmarks, oldIndex, folderNewIndex);
                break;
            }
        }
        
        UpdateBookmarks();
    }

    function ToggleHelper()
    {
        helperIsOpen = !helperIsOpen;
        helperContainer.css('height', helperIsOpen ? "100vh" : "30px");
        if (helperIsOpen)
        {
            $("#helper_tabs").show();
        }
        else
        {
            $("#helper_tabs").hide();
        }
        document.querySelector('div#app > div.content').style.width = helperIsOpen ? 'calc(100% - 370px)' : '100%';
    }

    function AddToPin(event)
    {
        let resultBox = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement;
        let itemShowcase = $(resultBox).find('div.itemPopupContainer').clone(true);
        $(itemShowcase).css('margin', '0px');
        $(itemShowcase).css('margin-top', '0.5em');
        let [price, currency, chaosEquiv] = GetPrice(resultBox.querySelector('span[data-field="price"]'));

        let bmContainer = $('<div></div>');
        bmContainer.append(itemShowcase);

        let optionsPanel = $('<div style="padding: .5em; background-color: #000">Price: ' + price + ' ' + currency + (chaosEquiv ? ' &#8776; ' + chaosEquiv + 'c' : '') + '<br/></div>');
        let removeButton = $('<button class="ui-button ui-widget ui-corner-all">Remove</button>');
        optionsPanel.append(removeButton);
        let scrollToButton = $('<button class="ui-button ui-widget ui-corner-all">Scroll to</button>');
        optionsPanel.append(scrollToButton);

        bmContainer.append(optionsPanel);
        bmContainer.append('<hr style="margin: 0"/>');

        removeButton.on('click', RemovePin);
        scrollToButton.on('click', () => {
            let boxRect = resultBox.getBoundingClientRect();

            let windowPadding = Math.floor(window.innerHeight / 2 - boxRect.height / 2);
            let offset = Math.floor(boxRect.top - windowPadding);
            if (Math.floor(boxRect.top) != windowPadding)
            {
                window.scrollBy(0, offset);
                resultBox.style.transition = 'background 0.5s linear';
                resultBox.style.background = '#ffffff50';
                setTimeout(() => {
                    resultBox.style.background = '';
                }, 500);
            }
        });

        $('#tabs-pins').append(bmContainer);
    }

    function RemovePin(event)
    {
        event.currentTarget.parentElement.parentElement.remove();
    }

    function GetPrice(dom)
    {
        let spans = dom.querySelectorAll('span');
        let priceNum = spans[1].textContent;
        let currency = spans[3].querySelector('span').textContent;
        let chaosPrice = 0;

        if (currency !== 'Chaos Orb')
        {
            for (const tCurrency of rawPriceData)
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
    
    function AddBookmarkFolder(event)
    {
        event.preventDefault();
        bookmarks.push({ id: uuidv4(), name: $('#bookmark_newFolderName').val(), bookmarks: [] });
        $('#bookmark_newFolderName').val('');
        
        UpdateBookmarks();
    }
    
    function RemoveBookmarkFolder(event)
    {
        let folderNode = event.currentTarget.parentElement.parentElement;
        
        let folderID = folderNode.getAttribute("folder-id");
        
        for (const folder of bookmarks)
        {
            if (folder.id === folderID)
            {
                bookmarks.splice(bookmarks.indexOf(folder), 1);
                break;
            }
        }
        
        folderNode.remove();
        
        UpdateBookmarks();
    }
    
    function AddBookmark(event)
    {
        $('<div><label for="bookmark_newName">Bookmark name:</label><br/><input id="bookmark_newName"/><br/><label for="bookmark_newURL">Bookmark URL:</label><br/><input id="bookmark_newURL" value="' + window.location.href + '"/></div>').dialog({
            appendTo: '#helperContainer',
            title: 'Add new bookmark',
            buttons: [
                {
                    text: 'Add',
                    click: () => {
                        
                    }
                }
            ]
        });
    }
})();
