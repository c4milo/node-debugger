var fs = require('fs');
var v8debugger = require('./bindings').v8debugger;

/**
 * We need to compile this script in the v8 debug context,
 * in order to have access to internal v8 debug objects
 **/
var debuggerjs = fs.readFileSync('./debugger.js', 'ascii');
module.exports = v8debugger.initialize(debuggerjs);
