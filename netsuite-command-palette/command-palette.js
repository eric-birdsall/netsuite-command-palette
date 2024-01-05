const GLOBAL = {};
GLOBAL.PRODUCTION_ACCOUNT_ID = "123456"; // Replace with your Production Account ID
GLOBAL.SANDBOX_ACCOUNT_ID = "123456_SB1"; // Replace with your Sandbox Account ID
GLOBAL.RELEASE_ACCOUNT_ID = "123456_RL1"; // Replace with your Release Account ID

const COMMAND_PALETTE = {};
COMMAND_PALETTE.defaultCommands = [
    {
        name: "Load Modules",
        javascript: loadCommonlyUsedModules,
    },
    {
        name: "Toggle Field IDs",
        javascript: toggleFieldIds,
    },
    {
        name: "Copy Records URL",
        javascript: copyRecordURL,
    },
    {
        name: "Search Scripts",
        javascript: displayScripts,
        remain_open: true,
    },
    {
        name: "Custom Records",
        javascript: showCustomRecords,
        remain_open: true,
    },
    {
        name: "Convert Saved Search to Code Snippet",
        javascript: returnSearchString,
    },
    {
        name: "New Saved Search",
        javascript: getSearchTypes,
        remain_open: true,
    },
    {
        name: "Get Internal IDs from Search Results",
        javascript: returnArrayOfInternalIdsFromSearch,
    },
    {
        name: "Time Machine Current Loan",
        javascript: timeMachine,
    },
    { name: "Switch Accounts",
        subcommands: [
            {
                name: "Production Account",
                url: `https://${GLOBAL.PRODUCTION_ACCOUNT_ID}.app.netsuite.com/app/center/card.nl?sc=-29&whence=`,
            },
            {
                name: "Sandbox Account",
                url: `https://${GLOBAL.SANDBOX_ACCOUNT_ID}.app.netsuite.com/app/center/card.nl?sc=-29&whence=`,

            },
        ] },
    { name: "Settings",
        subcommands: [
            {
                name: "Enable Auto Edit Mode",
                javascript: () => COMMAND_PALETTE.setSetting( "autoEditMode", true ),
            },
            {
                name: "Disable Auto Edit Mode",
                javascript: () => COMMAND_PALETTE.setSetting( "autoEditMode", false ),
            },
            {
                name: "Enable Tinting",
                javascript: () => COMMAND_PALETTE.setSetting( "tinting", true ),
            },
            {
                name: "Disable Tinting",
                javascript: () => COMMAND_PALETTE.setSetting( "tinting", false ),
            },
        ] },
    { name: "Lists",
        subcommands: [
            {
                name: "Assembly Builds",
                url: "/app/accounting/transactions/transactionlist.nl?Transaction_TYPE=Build&whence=",
            },
            {
                name: "Employees",
                url: "/app/common/entity/employeelist.nl",
            },
            {
                name: "Inventory Adjustments",
                url: "/app/accounting/transactions/transactionlist.nl?Transaction_TYPE=InvAdjst&whence=",
            },
            {
                name: "Invoices",
                url: "/app/accounting/transactions/transactionlist.nl?Transaction_TYPE=CustInvc",
            },
            {
                name: "Item Fulfillments",
                url: "/app/accounting/transactions/transactionlist.nl?Transaction_TYPE=ItemShip&whence=",
            },
            {
                name: "Order Confirmations",
                url: "/app/accounting/transactions/transactionlist.nl?Transaction_TYPE=SalesOrd&whence=",
            },
            {
                name: "Purchase Orders",
                url: "/app/accounting/transactions/transactionlist.nl?Transaction_TYPE=PurchOrd&whence=",
            },
            {
                name: "Return Authorizations (RMAs)",
                url: "/app/accounting/transactions/transactionlist.nl?Transaction_TYPE=RtnAuth&whence=",
            },
            {
                name: "Roles",
                url: "/app/setup/rolelist.nl",
            },
            {
                name: "Scripts",
                url: "/app/common/search/searchresults.nl?searchid=3289&whence=",
            },
            {
                name: "Users",
                url: "/app/setup/listusers.nl",
            },
            {
                name: "Work Orders",
                url: "/app/accounting/transactions/transactionlist.nl?Transaction_TYPE=WorkOrd",
            },
        ] },
    {
        name: "New",
        subcommands: [
            {
                name: "New - Inventory Adjustment",
                url: "/app/accounting/transactions/invadjst.nl?whence=",
            },
            {
                name: "New - CSV Import",
                url: "/app/setup/assistants/nsimport/importassistant.nl?new=T",
            },
            {
                name: "New - Saved CSV Import",
                url: "/app/setup/assistants/nsimport/savedimports.nl",
            },
        ],
    },
    {
        name: "Saved Searches",
        subcommands: [
            {
                name: "New - Saved Search - Customer",
                url: "/app/common/search/search.nl?searchtype=Customer&rectype=-1&cu=T&e=F",
            },
            {
                name: "New - Saved Search - Item",
                url: "/app/common/search/search.nl?searchtype=Item&rectype=-1&cu=T&e=F",
            },
            {
                name: "New - Saved Search - Transaction",
                url: "/app/common/search/search.nl?searchtype=Transaction&rectype=-1&cu=T&e=F",
            },
        ],
    },
    { name: "Print",
        subcommands: [
            {
                name: "Print - Picking Tickets",
                url: "/app/accounting/print/printform.nl?trantype=salesord&printtype=pickingticket&method=print&printtype=pickingticket&whence=&title=Picking+Tickets",
            },
            {
                name: "Print - Purchase Orders",
                url: "/app/accounting/print/printform.nl?printtype=transaction&trantype=purchord&method=print&title=Purchase+Orders&whence=",
            },
            {
                name: "Print - Work Orders (BOMs)",
                url: "/app/accounting/print/printframe.nl?printtype=bom&trantype=workord&method=print",
            },
        ] },

];

COMMAND_PALETTE.createCommandPaletteHTML = () => {
    let commandPaletteDiv = document.getElementById( "command-palette" );
    if ( commandPaletteDiv ) {
        commandPaletteDiv.remove();
    }
    commandPaletteDiv = document.createElement( "div" );
    commandPaletteDiv.id = "command-palette";
    commandPaletteDiv.innerHTML = `
        <input type="text" id="search-input" autocomplete="off" placeholder="Search commands..." value="">
        <ul id="command-list"></ul>
        `;
    document.body.appendChild( commandPaletteDiv );

    COMMAND_PALETTE.searchInput = document.querySelector( "#search-input" );
    COMMAND_PALETTE.commandList = document.querySelector( "#command-list" );

    COMMAND_PALETTE.addEventListeners();

    // Display the full list of commands initially
    COMMAND_PALETTE.currentCommands = COMMAND_PALETTE.defaultCommands;
    COMMAND_PALETTE.previousCommands = COMMAND_PALETTE.currentCommands;
    COMMAND_PALETTE.displayCommands();
};

COMMAND_PALETTE.createToastHTML = () => {
    let toastDiv = document.getElementById( "command-palette-toast" );
    if ( toastDiv ) {
        toastDiv.style.display = "";
    }
    else {
        toastDiv = document.createElement( "div" );
        toastDiv.id = "command-palette-toast";
        toastDiv.classList.add( "toast" );
        toastDiv.innerHTML = `
        <div class="toast-content">
          <span id="toast-message" class="toast-message">This is a toast notification.</span>
        </div>
        `;
        document.body.appendChild( toastDiv );
    }
};


COMMAND_PALETTE.addKeyboardShortcutHandler = () => {
    document.body.addEventListener( "keydown", ( e ) => {
        if (( e.metaKey && e.shiftKey && e.key === "p" ) ||
        ( e.metaKey && e.shiftKey && e.key === " " )) {
            COMMAND_PALETTE.createCommandPaletteHTML();
            COMMAND_PALETTE.createToastHTML();
        }
    });
};

COMMAND_PALETTE.hideCommandPalette = () => {
    const commandPaletteDiv = document.getElementById( "command-palette" );
    commandPaletteDiv.style.display = "none";
};

COMMAND_PALETTE.addEventListeners = () => {
    // Listen for changes to the search input field
    COMMAND_PALETTE.searchInput.addEventListener( "input", COMMAND_PALETTE.handleSearchInput );
    COMMAND_PALETTE.searchInput.addEventListener( "keyup", ( e ) => {
        if ( e.key === "Backspace" ) {
            COMMAND_PALETTE.handleSearchInput();
        }
    });

    // Listen for clicks on the command list items
    COMMAND_PALETTE.commandList.addEventListener( "click", ( event ) => {
    // Get the clicked command name and URL
        const commandName = event.target.textContent;
        const command = COMMAND_PALETTE.currentCommands.find(( _command ) => _command.name === commandName );
        COMMAND_PALETTE.handleCommandSelection( command, event );
    });

    // Listen for keyboard events on the search input field
    COMMAND_PALETTE.searchInput.addEventListener( "keydown", ( event ) => {
        const commandItems = COMMAND_PALETTE.commandList.querySelectorAll( "li" );
        const numberOfCommands = commandItems.length;
        let highlightedIndex = -1;

        // Find the index of the currently highlighted command
        for ( let i = 0; i < commandItems.length; i++ ) {
            if ( commandItems[i].classList.contains( "highlighted" )) {
                highlightedIndex = i;
                COMMAND_PALETTE.highlightedCommand = commandItems[i];
                break;
            }
        }

        // Handle arrow key presses
        if ( event.key === "ArrowUp" ) {
            COMMAND_PALETTE.handleArrowUp( highlightedIndex, numberOfCommands );
        }
        else if ( event.key === "ArrowDown" ) {
            COMMAND_PALETTE.handleArrowDown( highlightedIndex, commandItems );
        }
        else if ( event.key === "Enter" ) {
            COMMAND_PALETTE.handleEnter( event, highlightedIndex, commandItems );
        }
        else if ( event.key === "Backspace" ) {
            COMMAND_PALETTE.handleBackspace();
        }
        else if ( event.key === "Escape" ) {
            COMMAND_PALETTE.hideCommandPalette();
        }
    });

    document.addEventListener( "click", ( event ) => {
        const { target } = event;
        if ( event.path && !event.path.includes( document.getElementById( "command-palette" ))) {
            COMMAND_PALETTE.hideCommandPalette();
        }
        if ( target.path && !target.path.includes( document.getElementById( "command-palette" ))) {
            COMMAND_PALETTE.hideCommandPalette();
        }
    });

    document.addEventListener( "keydown", ( event ) => {
        if ( event.key === "Escape" ) {
            COMMAND_PALETTE.hideCommandPalette();
        }
    });
};

// Ensure the highlighted command is visible in the list
COMMAND_PALETTE.scrollToHighlightedCommand = () => {
    const { highlightedCommand } = COMMAND_PALETTE;
    if ( highlightedCommand ) {
        const listRect = COMMAND_PALETTE.commandList.getBoundingClientRect();
        const scrollAmount = highlightedCommand.offsetTop - listRect.top;
        COMMAND_PALETTE.commandList.scrollTop = scrollAmount;
    }
};

// Callback function for the search input event
COMMAND_PALETTE.handleSearchInput = () => {
    // Get the current search query
    const query = COMMAND_PALETTE.searchInput.value.trim().toLowerCase();
    // Filter the list of commands by the search query
    const filteredCommands = COMMAND_PALETTE.currentCommands.filter(( command ) => command.name.toLowerCase().includes( query ));
    // Sort the filtered list of commands based on the position of the search query in the command name
    COMMAND_PALETTE.currentCommands = filteredCommands.sort(( a, b ) => {
        const indexA = a.name.toLowerCase().indexOf( query );
        const indexB = b.name.toLowerCase().indexOf( query );
        if ( indexA < indexB ) {
            return -1;
        } if ( indexA > indexB ) {
            return 1;
        }
        return 0;
    });

    // Display the sorted list of commands
    COMMAND_PALETTE.displayCommands();

    // Highlight the first command in the list
    COMMAND_PALETTE.highlightCommand( 0 );
};

COMMAND_PALETTE.handleCommandSelection = ( command, event ) => {
    if ( command.subcommands ) {
        // Display the list of subcommands for this command
        COMMAND_PALETTE.currentCommands = command.subcommands;
        COMMAND_PALETTE.previousCommands = command.subcommands;
        COMMAND_PALETTE.displayCommands( true );
    }
    else if ( command.javascript ) {
        command.javascript();
    }
    else if ( command.url && ( event.metaKey || event.ctrlKey )) {
        // Open the clicked command URL in a new tab when Ctrl is held
        window.open( command.url );
    }
    else if ( command.url ) {
        window.location = command.url;
    }

    if ( !command.subcommands && !command.remain_open ) COMMAND_PALETTE.hideCommandPalette();
};

// Handle arrow up key press
COMMAND_PALETTE.handleArrowUp = ( highlightedIndex, numberOfCommands ) => {
    if ( COMMAND_PALETTE.searchInput.value === "" ) {
        COMMAND_PALETTE.searchInput.value = COMMAND_PALETTE.lastUsedCommand || "";
        COMMAND_PALETTE.handleSearchInput();
    }
    if ( highlightedIndex > 0 ) {
        COMMAND_PALETTE.unhighlightAllCommands();
        COMMAND_PALETTE.highlightCommand( highlightedIndex - 1 );
        COMMAND_PALETTE.scrollToHighlightedCommand();
    }
    else if ( highlightedIndex === 0 ) {
        COMMAND_PALETTE.unhighlightAllCommands();
        COMMAND_PALETTE.focusSearch();
    }
    else if ( highlightedIndex === -1 ) {
        COMMAND_PALETTE.unhighlightAllCommands();
        COMMAND_PALETTE.highlightCommand( numberOfCommands - 1 );
        COMMAND_PALETTE.focusSearch();
    }
};

// Handle arrow down key press
COMMAND_PALETTE.handleArrowDown = ( highlightedIndex, commandItems ) => {
    if ( highlightedIndex < commandItems.length - 1 ) {
        COMMAND_PALETTE.unhighlightAllCommands();
        COMMAND_PALETTE.highlightCommand( highlightedIndex + 1 );
    }
    COMMAND_PALETTE.scrollToHighlightedCommand();
};

// Handle enter key press
COMMAND_PALETTE.handleEnter = ( event, highlightedIndex, commandItems ) => {
    if ( highlightedIndex >= 0 ) {
        const highlightedCommand = commandItems[highlightedIndex];
        const commandName = highlightedCommand.textContent;
        const command = COMMAND_PALETTE.currentCommands.find(( _command ) => _command.name === commandName );
        COMMAND_PALETTE.lastUsedCommand = commandName;
        COMMAND_PALETTE.handleCommandSelection( command, event );
        COMMAND_PALETTE.searchInput.value = "";
    }
};

// Handle backspace key press
COMMAND_PALETTE.handleBackspace = () => {
    const query = COMMAND_PALETTE.searchInput.value.trim().toLowerCase();
    COMMAND_PALETTE.currentCommands = COMMAND_PALETTE.previousCommands;
    if ( !query ) {
        COMMAND_PALETTE.currentCommands = COMMAND_PALETTE.defaultCommands;
        COMMAND_PALETTE.previousCommands = COMMAND_PALETTE.defaultCommands;
        COMMAND_PALETTE.displayCommands( true );
    }
    else {
        COMMAND_PALETTE.displayCommands();
    }
};

COMMAND_PALETTE.focusSearch = () => {
    setTimeout(() => {
        COMMAND_PALETTE.searchInput.focus();
    });
    setTimeout(() => {
        COMMAND_PALETTE.searchInput.setSelectionRange( COMMAND_PALETTE.searchInput.value.length, COMMAND_PALETTE.searchInput.value.length );
    });
};

// Function to display a list of commands
COMMAND_PALETTE.displayCommands = ( clearSearch ) => {
    // Clear the current command list
    COMMAND_PALETTE.commandList.innerHTML = "";

    COMMAND_PALETTE.currentCommands.sort(( a, b ) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if ( nameA < nameB ) {
            return -1;
        } if ( nameA > nameB ) {
            return 1;
        }
        return 0;
    });

    // Create a list item for each command
    COMMAND_PALETTE.currentCommands.forEach(( command ) => {
        const li = document.createElement( "li" );
        const commandName = command.name;
        const query = COMMAND_PALETTE.searchInput.value.trim().toLowerCase();
        const queryIndex = commandName.toLowerCase().indexOf( query );

        // If the search query is found in the command name, add bold tags to highlight it
        if ( queryIndex !== -1 ) {
            const start = commandName.substring( 0, queryIndex );
            const highlighted = commandName.substring( queryIndex, queryIndex + query.length );
            const end = commandName.substring( queryIndex + query.length );
            li.innerHTML = `${start}<b>${highlighted}</b>${end}`;
        }
        else {
            li.textContent = commandName;
        }

        COMMAND_PALETTE.commandList.appendChild( li );
    });

    if ( clearSearch ) {
        COMMAND_PALETTE.searchInput.value = "";
    }
    COMMAND_PALETTE.focusSearch();
};

// Function to highlight a command
COMMAND_PALETTE.highlightCommand = ( index ) => {
    const commandItems = COMMAND_PALETTE.commandList.querySelectorAll( "li" );
    if ( index >= 0 && index < commandItems.length ) {
        commandItems[index].classList.add( "highlighted" );
    }
};

// Function to unhighlight all commands
COMMAND_PALETTE.unhighlightAllCommands = () => {
    const commandItems = COMMAND_PALETTE.commandList.querySelectorAll( "li" );
    commandItems.forEach(( item ) => item.classList.remove( "highlighted" ));
};

let record;
let search;
let query;
let currentRecord;
function loadCommonlyUsedModules() {
    try {
        require([ "N/record", "N/search", "N/query", "N/currentRecord" ], ( _record, _search, _query, _currentRecord ) => {
            record = _record;
            search = _search;
            query = _query;
            currentRecord = _currentRecord.get();
            console.log( "Loaded modules", { record, search, query, currentRecord });
        });
    }
    catch ( error ) {
        console.log( "ERROR in Command Palette", error );
        if ( typeof require === "undefined" ) {
            COMMAND_PALETTE.showRequireJSWarning( 5000 );
        }
        else {
            COMMAND_PALETTE.showToastNotification( "ERROR in Command Palette - See console for more detail", 5000 );
        }
    }
}

function getAllSettings() {
    const stSettingsJSON = localStorage.getItem( "command-palette-settings" );
    if ( !stSettingsJSON ) return {};
    const objSettings = JSON.parse( stSettingsJSON );
    return objSettings;
}

function getSetting( setting ) {
    const settingsJSON = localStorage.getItem( "command-palette-settings" );
    if ( !settingsJSON ) {
        return false; // Key doesn't exist, return false
    }
    const settings = JSON.parse( settingsJSON );
    return settings[setting] || false; // Return the value or false if key doesn't exist
}

COMMAND_PALETTE.setSetting = ( key, value ) => {
    const objSettings = getAllSettings();
    if ( key !== null && value !== null ) {
        objSettings[key] = value;
    }
    console.log( "Updated Settings", objSettings );
    localStorage.setItem( "command-palette-settings", JSON.stringify( objSettings ));
};

// eslint-disable-next-line no-unused-vars
function copyFieldIDToClipboard( element ) {
    const text = element.textContent;
    navigator.clipboard.writeText( text );
    element.textContent = `${text} - COPIED TO CLIPBOARD!`;
    setTimeout(() => {
        element.textContent = text;
    }, 1000 );
}

function toggleFieldIds() {
    const arrAllFieldsIdSpans = Array.from( document.querySelectorAll( ".showfieldids" ));
    if ( arrAllFieldsIdSpans.length ) hideAllFieldIds();
    else showAllFieldIds();
}

function hideAllFieldIds() {
    // Remove All Existing Field IDs from the Page
    const arrAllFieldsIdSpans = Array.from( document.querySelectorAll( ".showfieldids" ));
    arrAllFieldsIdSpans.forEach(( fieldIdSpan ) => {
        fieldIdSpan.remove();
    });
}

function showAllFieldIds() {
    hideAllFieldIds();
    // Add Field IDs to the Page
    const arrAllFields = Array.from( document.querySelectorAll( ".uir-field-wrapper" ));
    arrAllFields.forEach(( field ) => {
        const stFieldId = field?.dataset?.walkthrough?.split( ":" )[1];
        field.innerHTML += `<span class="showfieldids smallgraytextnolink uir-label" ondblclick="copyFieldIDToClipboard(this)">${stFieldId}</span>`;
    });
}

COMMAND_PALETTE.showToastNotification = ( message, length ) => {
    const toastDiv = document.querySelector( ".toast" );
    toastDiv.textContent = message;
    toastDiv.classList.add( "show" );
    if ( length ) {
        setTimeout( COMMAND_PALETTE.hideToastNotification, length );
    }
};

COMMAND_PALETTE.hideToastNotification = () => {
    const toastDiv = document.querySelector( ".toast" );
    toastDiv.classList.remove( "show" );
};

COMMAND_PALETTE.showRequireJSWarning = () => {
    const toastDiv = document.querySelector( ".toast" );
    toastDiv.textContent = "RequireJS not loaded. Please navigate to a record page and try again.";
    toastDiv.classList.add( "show" );
    toastDiv.classList.add( "requirejs" );
    setTimeout(() => {
        toastDiv.classList.remove( "show" );
        toastDiv.classList.remove( "requirejs" );
    }, 5000 );
};

function runAutoEditMode() {
    const autoEditModeSetting = getSetting( "autoEditMode" );
    if ( autoEditModeSetting === true ) {
        const bodyDiv = document.getElementById( "body" );
        if ( bodyDiv ) {
            const links = bodyDiv.querySelectorAll( "a" );
            links.forEach(( link ) => {
                // Skip Menu Bar and Tab Bar Links
                if ( !link.closest( ".page-title-menu" ) && !link.closest( ".bgtabbar" )) {
                    const href = link.getAttribute( "href" );
                    if ( href && !href.includes( "?e=T" ) && !href.includes( "&e=T" ) && !href.startsWith( "javascript:" ) && href !== "#" ) {
                        const updatedHref = href + ( href.includes( "?" ) ? "&e=T" : "?e=T" );
                        link.setAttribute( "href", updatedHref );
                        link.textContent += " (Edit)";
                    }
                }
            });
        }
    }
}

function showCustomRecords() {
    try {
        require([ "N/query" ], ( query ) => {
            const commands = [];
            const sql = `
            SELECT
                Name,
                InternalID,
            FROM
                CustomRecordType
            ORDER BY
                Name
        `;
            const arrResults = query.runSuiteQL({ query: sql, params: [] }).asMappedResults();
            arrResults.forEach(( result ) => {
                const customRecordId = result.internalid;
                const customRecordName = result.name;
                commands.push({
                    name: customRecordName,
                    url: `/app/common/custom/custrecord.nl?e=T&id=${customRecordId}`,
                });
                return true;
            });
            COMMAND_PALETTE.currentCommands = commands;
            COMMAND_PALETTE.previousCommands = commands;
            COMMAND_PALETTE.displayCommands();
        });
    }
    catch ( error ) {
        console.log( "ERROR in Command Palette", error );
        if ( typeof require === "undefined" ) {
            COMMAND_PALETTE.showRequireJSWarning( 5000 );
        }
        else {
            COMMAND_PALETTE.showToastNotification( "ERROR in Command Palette - See console for more detail", 5000 );
        }
    }
}

function displayScripts() {
    try {
        require([ "N/search" ], ( search ) => {
            const commands = [];
            const scriptSearchObj = search.create({
                type: "script",
                filters:
            [
            ],
                columns:
            [
                search.createColumn({
                    name: "name",
                    sort: search.Sort.ASC,
                    label: "Name",
                }),
            ],
            });
            scriptSearchObj.run().each(( result ) => {
                const scriptId = result.id;
                const scriptName = result.getValue( "name" );
                commands.push({
                    name: scriptName,
                    url: `/app/common/scripting/script.nl?id=${scriptId}`,
                });
                return true;
            });
            COMMAND_PALETTE.currentCommands = commands;
            COMMAND_PALETTE.previousCommands = commands;
            COMMAND_PALETTE.displayCommands();
        });
    }
    catch ( error ) {
        console.log( "ERROR in Command Palette", error );
        if ( typeof require === "undefined" ) {
            COMMAND_PALETTE.showRequireJSWarning( 5000 );
        }
        else {
            COMMAND_PALETTE.showToastNotification( "ERROR in Command Palette - See console for more detail", 5000 );
        }
    }
}

function copyRecordURL() {
    const recordName = document.querySelector( ".uir-record-name" ).textContent;
    const url = window.location.href;
    // eslint-disable-next-line no-undef
    navigator.clipboard.writeText( `${recordName}\n${url}` );
}

function addReleaseAccountBanner() {
    if ( window.location.href.includes( GLOBAL.RELEASE_ACCOUNT_ID )) {
        // Create the banner element
        const banner = document.createElement( "marquee" );

        // // Apply CSS styles to the banner
        banner.style.width = "100%";
        banner.style.height = "60px";
        banner.style.backgroundColor = "red";
        banner.style.textAlign = "center";
        banner.style.fontSize = "18pt";
        banner.style.fontWeight = "bold";
        banner.style.color = "white";
        banner.direction = "down";
        banner.behavior = "alternate";
        banner.innerHTML = `RELEASE ACCOUNT! RELEASE ACCOUNT! RELEASE ACCOUNT! RELEASE ACCOUNT! RELEASE ACCOUNT! RELEASE ACCOUNT! `;

        // Add the banner to the document body
        const elBody = document.getElementById( "body" );
        if ( elBody ) elBody.prepend( banner );
    }
}

/**
 * This adds a "Execution Log" link to Script pages to quickly open the Execution Log for that script
 * NOTE: Link is added to top right of page, next to "List" and "Search" links
 *
 * @returns {void} This function does not return anything.
 */
function addScriptExecutionLogLink() {
    if ( window.location.href.includes( "/scripting/script" )) {
        try {
            require([ "N/currentRecord" ], ( currentRecord ) => {
                currentRecord = currentRecord.get();
                const stRecordType = currentRecord.getValue( "type" );
                if ([ "script", "scriptrecord" ].includes( stRecordType )) {
                    const stScriptId = currentRecord.getValue( "script" ) || currentRecord.id;
                    const stToday = `${new Date().getMonth() + 1}%2F${new Date().getDate()}%2F${new Date().getFullYear()}`;
                    const stURL = `/app/common/scripting/scriptnotearchive.nl?loglevel=&daterange=TODAY&datefrom=${stToday}&dateto=${stToday}&scriptId=${stScriptId}&scriptRecordId=&sortcol=timestamp&sortdir=DESC&csv=HTML&OfficeXML=F&pdf=&size=1000&datemodi=WITHIN&date=TODAY`;

                    const ulElement = document.getElementById( "NS_MENU_ID0" );
                    const firstLiElement = ulElement.querySelector( "li" );

                    if ( firstLiElement ) {
                        const clonedLiElement = firstLiElement.cloneNode( true );
                        const clonedAnchorElement = clonedLiElement.querySelector( "a" );
                        clonedAnchorElement.innerText = "Execution Log";
                        clonedAnchorElement.href = stURL;

                        const lastLiElement = ulElement.querySelector( "li:last-child" );
                        ulElement.insertBefore( clonedLiElement, lastLiElement );
                    }
                }
            });
        }
        catch ( error ) {
            console.log( "ERROR in Command Palette", error );
            if ( typeof require === "undefined" ) {
                COMMAND_PALETTE.showRequireJSWarning( 5000 );
            }
            else {
                COMMAND_PALETTE.showToastNotification( "ERROR in Command Palette - See console for more detail", 5000 );
            }
        }
    }
}

/**
 * This function retrieves all internal IDs from a page with search results on it
 * and copies them to the clipboard in a format that can be used in a forEach loop.
 * This can be used to quickly run a script on all records returned by a search.
 *
 * @returns {void} This function does not return anything.
 */
function returnArrayOfInternalIdsFromSearch() {
    const table = document.getElementById( "div__bodytab" );
    if ( !table ) {
        console.error( "Search Table not found" );
        return;
    }
    const rows = table.querySelectorAll( "tr" );

    const arrInternalIds = [];

    for ( let i = 1; i < rows.length; i++ ) {
        const row = rows[i];
        if ( row.classList.contains( "uir-list-row-tr" )) {
            const tds = row.querySelectorAll( "td" );
            if ( tds.length >= 2 ) {
                let stInternalId;
                const stFirstColumn = tds[1].textContent.trim();
                // When "Edit" option is enabled on results, use the second column
                if ( stFirstColumn.toUpperCase().includes( "EDIT" ) && stFirstColumn.toUpperCase().includes( "VIEW" )) {
                    stInternalId = tds[2].textContent.trim();
                }
                else {
                    stInternalId = stFirstColumn;
                }
                if ( !arrInternalIds.includes( stInternalId )) {
                    arrInternalIds.push( stInternalId );
                }
            }
        }
    }

    navigator.clipboard.writeText( `let arrInternalIds = ['${arrInternalIds.join( "','" )}'];\n\narrInternalIds.forEach(internalId=>{\n\n})` );
    COMMAND_PALETTE.showToastNotification( "Values Copied!", 3000 );
}

function returnSearchString() {
    try {
        require([ "N/currentRecord", "N/search" ], ( currentRecord, search ) => {
            currentRecord = currentRecord.get();
            let stFullString =
`const arrFilters = [];`;
            const objSearch = search.load({ id: currentRecord.getValue( "id" ) });
            const arrSearchFilters = objSearch.filters;
            arrSearchFilters.forEach(( objFilter ) => {
                objFilter = objFilter.toJSON();
                if ( objFilter.isor === false ) delete objFilter.isor;
                if ( objFilter.isnot === false ) delete objFilter.isnot;
                if ( objFilter.rightparens === 0 ) delete objFilter.rightparens;
                if ( objFilter.leftparens === 0 ) delete objFilter.leftparens;

                const stSingleFilterString = JSON.stringify( objFilter );
                stFullString += `
arrFilters.push(search.createFilter(${stSingleFilterString}));`;
            });

            stFullString += `
        
const arrColumns = [];`;

            const arrCleanedUpColumns = [];
            const arrSearchColumns = objSearch.columns;
            arrSearchColumns.forEach(( objColumn ) => {
                objColumn = objColumn.toJSON();
                delete objColumn.type;
                delete objColumn.label;
                // Move .sortdir to .sort
                if ( objColumn.sortdir !== "NONE" ) objColumn.sort = objColumn.sortdir;
                delete objColumn.sortdir;
                if ( !objColumn.formula ) delete objColumn.formula;
                if ( !objColumn.function ) delete objColumn.function;
                if ( !objColumn.summary ) delete objColumn.summary;
                if ( !objColumn.whenorderedby ) delete objColumn.whenorderedby;
                if ( !objColumn.whenorderedbyalias ) delete objColumn.whenorderedbyalias;
                if ( !objColumn.whenorderedbyjoin ) delete objColumn.whenorderedbyjoin;
                if ( !objColumn.join ) {
                    delete objColumn.join;
                }
                else {
                // Convert join to lowercase
                    objColumn.join = objColumn.join.toLowerCase();
                }

                arrCleanedUpColumns.push( objColumn );

                const stSingleColumnString = JSON.stringify( objColumn );
                stFullString += `
arrColumns.push(search.createColumn(${stSingleColumnString}));`;
            });

            stFullString += `
    
const arrSearchResults = commonUtil.search('${objSearch.searchType}', null, arrFilters, arrColumns);

const objAllResults = {};`;


            stFullString +=
`
if(arrSearchResults.length > 0)
{
    for (let intSearchIndex = 0; intSearchIndex < arrSearchResults.length; intSearchIndex++)
    {
        const objSingleResult = arrSearchResults[intSearchIndex];
        const objResult = {};
        for(let intColumnIndex = 0; intColumnIndex < arrColumns.length; intColumnIndex++)
        {
            const stName = arrColumns[intColumnIndex].name;
            if(stName){
                objResult[stName] = objSingleResult.getValue(arrColumns[intColumnIndex]);
            }
        }
        objAllResults[objSingleResult.id] = objResult;
    }
}`;

            console.log( stFullString );
            navigator.clipboard.writeText( stFullString );
            COMMAND_PALETTE.showToastNotification( "Search Snippet Copied to Clipboard! (also printed in console)", 5000 );
        });
    }
    catch ( error ) {
        console.log( "ERROR in Command Palette", error );
        if ( typeof require === "undefined" ) {
            COMMAND_PALETTE.showRequireJSWarning( 5000 );
        }
        else {
            COMMAND_PALETTE.showToastNotification( "ERROR in Command Palette - See console for more detail", 5000 );
        }
    }
}

function timeMachine() {
    const params = new URLSearchParams( window.location.search );
    const id = params.get( "id" );
    window.open( `https://tstdrv2034547.app.netsuite.com/app/site/hosting/scriptlet.nl?script=575&deploy=1&compid=TSTDRV2034547&custpage_loan_filter=${id}` );
}

function getSearchTypes() {
    fetch( "/app/common/search/search.nl?cu=T&e=F&whence=" )
        .then(( response ) => response.text())
        .then(( html ) => {
            const tempElement = document.createElement( "div" );
            tempElement.innerHTML = html;
            tempElement.id = "temp-element";
            document.body.append( tempElement );

            const elNewSavedSearchTable = tempElement.querySelector( ".listtable" );
            const arrLinks = getAnchorTagsFromTable( elNewSavedSearchTable );

            // Clean up the temporary element if needed
            tempElement.remove();

            COMMAND_PALETTE.currentCommands = arrLinks;
            COMMAND_PALETTE.displayCommands();
        })
        .catch(( error ) => {
            console.error( "Error:", error );
        });

    function getAnchorTagsFromTable( table ) {
        const anchorTags = table.getElementsByTagName( "a" );
        const anchorObjects = [];

        for ( let i = 0; i < anchorTags.length; i++ ) {
            const anchorTag = anchorTags[i];
            const name = `New ${anchorTag.textContent} Search`;
            const url = anchorTag.href;

            anchorObjects.push({ name, url });
        }

        return anchorObjects;
    }
}

function runOnLoad() {
    COMMAND_PALETTE.addKeyboardShortcutHandler();
    addReleaseAccountBanner();
    addScriptExecutionLogLink();
    runAutoEditMode();
    console.log( "NetSuite Command Palette loaded successfully..." );
}
runOnLoad();

