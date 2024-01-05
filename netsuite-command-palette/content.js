
// Listen for the 'load' event on the window object
window.addEventListener( "load", () => {
    // Inject your webpage script dynamically
    const script = document.createElement( "script" );
    script.src = chrome.runtime.getURL( "command-palette.js" );
    document.body.appendChild( script );
});
