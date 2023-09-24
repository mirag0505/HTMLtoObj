# HTMLtoObj

- The program must run from the CLI by reading a file and the browser by textarea input.
  For example, running node server.js markup.html should print out the Object
  specified above. The input format is an HTML string, and browser API should not be
  used. The solution should be designed as a library that can be used/run from the
  browser or nodejs.
- You can use any Javascript library alongside your code except those that do the
  HTML-to-object parsing and conversion themselves. The main parsing and conversion
  loop must still be written by you. You can also write everything from scratch - there is no preference, and you will not be graded less/more if you choose not to use libraries. As long as the code runs, it doesn't matter.

## Install

```pnpm i test_lybrary_for_browser_and_node```

## For client:

Add startScriptBothEnviroment in your file .js
```
import { startScriptBothEnviroment } from "test_lybrary_for_browser_and_node";
startScriptBothEnviroment();

Add textarea and button in your file .html
<textarea id="htmlInput"></textarea>
<button id="button">Click</button>
```

## For server:
Add startScriptBothEnviroment in your file server.js
```
const { startScriptBothEnviroment } = require("test_lybrary_for_browser_and_node");
startScriptBothEnviroment();
```

```
node server.js markup.html
```

## Update library

```pnpm changeset```
