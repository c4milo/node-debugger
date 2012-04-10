function Debugger() {
}

(function() {
    this.getScripts = function() {
        return Debug.scripts();
    };

    this.setBreakpoint = function(state, breakpoint) {
        var breakpointId = Debug.setScriptBreakPointById(breakpoint.sourceId,
                                                         breakpoint.line,
                                                         breakpoint.column,
                                                         breakpoint.condition);

        var locations = Debug.findBreakPointActualLocations(breakpointId);
        if (!locations.length) {
            return undefined;
        }

        var location = locations[0];
        breakpoint.line = location.line;
        breakpoint.column = location.column;

        return breakpointId.toString();
    };

    this.removeBreakpoint = function(state, args) {
        Debug.findBreakPoint(args.breakpointId, true);
    };

    this.clearBreakpoints = function(state, args) {
        Debug.clearAllBreakPoints();
    };

    this.activateBreakpoints = function(state, args) {
        Debug.debuggerFlags().breakPointsActive.setValue(true);
    };

    this.deactivateBreakpoints = function(state, args) {
        Debug.debuggerFlags().breakPointsActive.setValue(false);
    };

    this.setBreakOnException = function(state, args) {
        Debug.setBreakOnException();
    };

    this.clearBreakOnException = function(state, args) {
        Debug.clearBreakOnException();
    };

    this.setBreakOnUncaughtException = function(state, args) {
        Debug.setBreakOnUncaughtException();
    };

    this.clearBreakOnUncaughtException = function(state, args) {
        Debug.clearBreakOnUncaughtException();
    };

    this.currentFrame = function(state, args) {
        var count = state.frameCount();
        if (count === 0) {
            return undefined;
        }

        var topFrame = {};
        for (var i = count - 1; i >= 0; i--) {
            var frameMirror = state.frame(i);
            //topFrame = DebuggerScript._frameMirrorToJSCallFrame(frameMirror, topFrame);
        }

        return topFrame;
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

