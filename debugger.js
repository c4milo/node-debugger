var bindings = require('./bindings').debugger;

function Debugger() {

}

(function() {
    this.getScripts = function(ctxData) {

    };

    this.setBreakpoint = function(state, args) {

    };

    this.removeBreakpoint = function(state, args) {

    };

    this.clearBreakpoints = function(state, args) {

    };

    this.activateBreakpoints = function(state, args) {

    };

    this.deactivateBreakpoints = function(state, args) {

    };

    this.pauseOnExceptionState = function(exceptionState) {
        if (exceptionState) {
            //set
        } else {
            //return
        }
    };

    this.currentFrame = function(state, args) {

    };

    this.stepInto = function(state) {

    };

    this.stepOver = function(state) {

    };

    this.stepOut = function(state) {

    };

    this.setScriptSource = function(scriptId, newSource, preview) {

    };

    this.getAfterCompileScript = function(eventData) {

    };
}).call(Debugger.prototype);

/**
 * We need to compile this script in the v8 debug context,
 * in order to have access to internal v8 debug objects
 **/
module.exports = bindings.initialize(JSON.stringify(new Debugger()));
