# NetSuite Command Palette

This project was created by Eric Birdsall in hopes to provide the basic structure for a custom NetSuite command palette. The command palette allows NetSuite "power users" to be able to navigate to certain pages, or execute code quickly. This project is created as a Chrome Extension using manifest v3. 

## Installation

1. Open the Google Chrome browser.
2. Click on the three-dot menu icon in the top right corner.
3. Navigate to `More Tools > Extensions`.
4. In the Extensions page, turn on `Developer mode` by clicking the toggle switch in the top right corner.
5. Click on `Load unpacked`.
6. Navigate to the directory of where you've save the `netsuite-command-palette` folder.
7. Select the folder and click `Open`.
8. The extension should now be added to your Chrome browser.

## Usage

When navigating any NetSuite page, you can open the Command Palette by pressing `Ctrl+Shift+P` or `Ctrl+Shift+Space` (`Cmd+Shift+P` or `Cmd+Shift+Space` for Mac users). Note that scripts can only be run from from pages where NetSuite has pre-loaded `requirejs` (this includes all record pages, and some others as well).

Once opened, you can type commands to filter the list of commands that is displayed. You can click on any command or use the arrow keys and 'Enter' to select commands. For links, you can hold `Ctrl` to open links in a new tab or `Ctrl+Shift` to open in a new tab and focus that tab (Mac users should use `Cmd` rather than `Ctrl`)

## Recommendation
Navigate through the `COMMAND_PALETTE.defaultCommands` object and see what each function does, then edit / copy functions to your preference.

## License

MIT License

Copyright (c) 2024 Eric Birdsall

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.