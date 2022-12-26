# Setting up the Plugin

Follow these steps to get the plugin running on your machine:

## Prerequisites

1. Download [Node.js][node], which comes with NPM. This will allow you to install TypeScript and other libraries. You can find the download link here: https://nodejs.org/en/download/
2. Install TypeScript using the following command: `npm install -g typescript`

## Install Dependencies

In the plugin directory, run the following command to get the latest type definitions for the plugin API:

```bash
npm install --save-dev @figma/plugin-typings
```
## Compiling TypeScript

TypeScript requires a compiler to convert `.ts` files into `.js` files for the browser to run.

We recommend writing TypeScript code using Visual Studio Code:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Open the plugin directory in Visual Studio Code.
3. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item, then select "npm: watch". You will have to do this again every time you reopen Visual Studio Code.

Visual Studio Code will regenerate the JavaScript file every time you save.
