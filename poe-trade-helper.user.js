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
                           '<li><a href="#tabs-bookmark"><span class="ui-icon ui-icon-folder-open"></span>Bookmarks</a></li>' +
                           '<li><a href="#tabs-pins"><span class="ui-icon ui-icon-pin-s"></span>Pins</a></li>' +
                           '<li><a href="#tabs-history"><span class="ui-icon ui-icon-calendar"></span>History</a></li>' +
                           '</ul>' +
                           '<div id="tabs-bookmark" style="overflow-y: auto; padding: 0 0.6em; flex-grow: 1"></div>' +
                           '<div id="tabs-pins" style="overflow-y: auto; padding: 0 0.6em; flex-grow: 1"></div>' +
                           '</div>');
    
    $('body').append(helperContainer);
    $('#helper_tabs').tabs();
    
    let addBookmarkFolderButton = $('<button class="ui-button">Create new folder</button>');
    addBookmarkFolderButton.on('click', AddBookmarkFolder);
    $('#tabs-bookmark').append(addBookmarkFolderButton);
    $('#tabs-bookmark').append('<hr/>');
    $('#tabs-bookmark').append('<div id="folderContainer"></div>');

    $('#folderContainer').sortable({
        axis: 'y',
        cursor: "move",
        handle: 'div.moveFolder',
        update: RearrangeBookmarksFolder
    });
    
    let addBookmarkFolderModal = $('<div id="addBookmarkFolderModal"><label for="bookmark_newFolderName">Folder name:</label><br/><input id="bookmark_newFolderName"/><br/><label for="bookmark_newFolderColor">Background color:</label><br/><input type="color" id="bookmark_newFolderColor" value="#133d62"/></div>');
    addBookmarkFolderModal.dialog({
        autoOpen: false
    });
    
    let addBookmarkModal = $('<div id="addBookmarkModal"><label for="bookmark_newName">Bookmark name:</label><br/><input id="bookmark_newName" style="width: 100%"/><br/><label for="bookmark_newURL">Bookmark URL:</label><br/><input id="bookmark_newURL" style="width: 100%"/></div>');
    addBookmarkModal.dialog({
        autoOpen: false
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
                
                let header = $('<h3 style="display: flex; align-items: center; padding: .2em; background-color: ' + folder.bgColor + '">' + folder.name + '</h3>');
                folderNode.append(header);
                header.append('<div class="ui-button moveFolder" style="margin-left: auto"><span class="ui-icon ui-icon-caret-2-n-s">Move</span></div>');
                let removeButton = $('<button class="ui-button"><span class="ui-icon ui-icon-trash">Remove</span></button>');
                header.append(removeButton);
                removeButton.on('click', RemoveBookmarkFolder);
                
                folderNode.append('<div style="display:flex;flex-direction:column"><div class="bookmarksContainer" style="display:flex;flex-direction:column"></div><div class="ui-button addBookmarkButton">Add bookmark</div></div>');
                folderNode.find('div.addBookmarkButton').on('click', AddBookmark);
                
                folderNode.accordion({
                    active: false,
                    collapsible: true,
                    header: 'h3',
                    heightStyle: 'content'
                });
            }
            
            for (const bm of folder.bookmarks)
            {
                if ($('div[folder-id="' + folder.id + '"] .bookmarksContainer div[bookmark-id="' + bm.id + '"]').length === 0)
                {
                    let container = $('div[folder-id="' + folder.id + '"] .bookmarksContainer');
                    let bookmarkNode = $('<div bookmark-id="' + bm.id + '" folder-id="' + folder.id + '" style="display:flex;align-items:center"><a href="' + bm.url + '" style="flex-grow:1"><div style="background: #222; border: 1px solid #555; padding: .2em .4em; margin: .2em .1em">' + bm.name + '</div></a></div>');
                    container.append(bookmarkNode);
                    let removeButton = $('<button class="ui-button"><span class="ui-icon ui-icon-trash">Remove</span></button>');
                    bookmarkNode.append(removeButton);
                    removeButton.on('click', RemoveBookmark);
                }
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
        addBookmarkFolderModal.dialog('option', {
            appendTo: '#helperContainer',
            title: 'Create new folder',
            width: 400,
            buttons: [
                {
                    text: 'Add',
                    click: () => {
                        let name = addBookmarkFolderModal.find('#bookmark_newFolderName').val();
                        let color = addBookmarkFolderModal.find('#bookmark_newFolderColor').val();
                        
                        if (name && color)
                        {
                            bookmarks.push({ id: uuidv4(), name: name, bgColor: color, bookmarks: [] });
                            $('#bookmark_newFolderName').val('');

                            UpdateBookmarks();
                            addBookmarkFolderModal.dialog('close');
                        }
                    }
                }
            ]
        });
        addBookmarkFolderModal.dialog('open');
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
        let folderID = event.currentTarget.parentElement.parentElement.getAttribute('folder-id');
        
        addBookmarkModal.dialog('option', {
            appendTo: '#helperContainer',
            title: 'Add new bookmark',
            open: () => {
                addBookmarkModal.find('#bookmark_newURL').val(window.location.href);
            },
            width: 400,
            buttons: [
                {
                    text: 'Add',
                    click: () => {
                        let name = addBookmarkModal.find('#bookmark_newName').val();
                        let url = addBookmarkModal.find('#bookmark_newURL').val();
                        
                        if (name && url)
                        {
                            for (const folder of bookmarks)
                            {
                                if (folder.id === folderID)
                                {
                                    folder.bookmarks.push({ id: uuidv4(), name: name, url: url });
                                    UpdateBookmarks();
                                    addBookmarkModal.dialog('close');
                                    break;
                                }
                            }
                        }
                    }
                }
            ]
        });
        addBookmarkModal.dialog('open');
    }
    
    function RemoveBookmark(event)
    {
        let bookmarkNode = event.currentTarget.parentElement;
        let folderID = bookmarkNode.getAttribute('folder-id');
        let bookmarkID = bookmarkNode.getAttribute('bookmark-id');
        
        for (const folder of bookmarks)
        {
            if (folder.id === folderID)
            {
                for (const bm of folder.bookmarks)
                {
                    if (bm.id === bookmarkID)
                    {
                        folder.bookmarks.splice(folder.bookmarks.indexOf(bm), 1);
                        bookmarkNode.remove();
                        UpdateBookmarks();
                        break;
                    }
                }
            }
        }
    }
})();
