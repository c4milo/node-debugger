function Debugger() {

}

(function() {
    this.getScripts = function() {
        return Debug.scripts();
    };

    this.setBreakpoint = function(state, breakpoint) {
        var breakId = Debug.setScriptBreakPointById(breakpoint.sourceId,
                                                    breakpoint.line,
                                                    breakpoint.column,
                                                    braekpoint.condition);

        var locations = Debug.findBreakPointActualLocations(breakId);
        if (!locations.length) {
            return undefined;
        }

        var location = locations[0];
        breakpoint.line = location.line;
        breakpoint.column = location.column;

        return breakId.toString();
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

