# Setting up the Plugin
Follow these steps to get the plugin running on your machine:

## Prerequisites
Install [install Node.js][node] and NPM (comes with Node.js)
Install TypeScript using the following command: npm install -g typescript
Install Dependencies
In the plugin directory, run the following command to get the latest type definitions for the plugin API:
  $ npm install --save-dev @figma/plugin-typings

## Compiling TypeScript
TypeScript requires a compiler to convert .ts files into .js files for the browser to run.

I recommend using Visual Studio Code for writing and compiling TypeScript code.

To compile TypeScript to JavaScript in Visual Studio Code:

Open the plugin directory in Visual Studio Code.
Run the "Terminal > Run Build Task..." menu item.
Select "npm: watch".
Visual Studio Code will regenerate the JavaScript file every time you save. You will need to run the build task again every time you reopen Visual Studio Code.

Additional Resources
For more information on using TypeScript and the Figma Plugin API, see the following resources:

Figma Plugin Docs: Setup
TypeScript documentation