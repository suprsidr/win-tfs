## Windows Team Foundation Server(TFS) version control via Node.js

  * No dependencies
  * Easy API
  * Intuitive
  * License: ISC

[![NPM Stats](https://nodei.co/npm/win-tfs.png?downloads=true&downloadRank=false)](https://npmjs.org/packages/win-tfs/)

## Install
```javascript
npm install win-tfs
```

## Usage
```javascript
var tfs = require('win-tfs'),
    path = require('path'),
    basePath = path.resolve('C:/User/suprsidr/project/files/'),
    exe = tfs.findVisualStudioPath() + 'tf.exe';

var paths = [
  path.join(basePath, 'file.json'),
  path.join(basePath, 'file.js')
];

var params = ['/login:tfsusername@domain,PASSWORD', '/comment:Updated from nodejs', '/noprompt'];

// get latest
tfs.get(exe, paths, params);

// checkout
tfs.checkout(exe, paths, params);

// checkin
tfs.checkin(exe, paths, params);

// undo checkout
tfs.undo(exe, paths, params);

```

All commands: get, add, delete, undelete, checkout, checkin, undo, rollback, history, workflod
