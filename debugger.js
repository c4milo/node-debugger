function Debugger() {

}

(function() {
    this.getScripts = function() {
        return Debug.scripts();
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

    return new Debugger();
}).call(Debugger.prototype);

