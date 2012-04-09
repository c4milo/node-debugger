// Copyright 2012, Camilo Aguilar. Cloudescape, LLC.
#include "debugger.h"

namespace dbg {
    Persistent<ObjectTemplate> Debugger::debugger_template_;

    static Persistent<String> source_id_sym     = NODE_PSYMBOL("sourceId");
    static Persistent<String> line_sym          = NODE_PSYMBOL("line");
    static Persistent<String> column_sym        = NODE_PSYMBOL("column");
    static Persistent<String> condition_sym     = NODE_PSYMBOL("condition");

    void Debugger::Initialize(Handle<Object> target) {
        HandleScope scope;

        debugger_template_ = Persistent<ObjectTemplate>::New(ObjectTemplate::New());
        debugger_template_->SetInternalFieldCount(1);

        Local<Object> debuggerObj = debugger_template_->NewInstance();

        NODE_SET_METHOD(debuggerObj, "initialize", Debugger::InitDebugger);
        NODE_SET_METHOD(debuggerObj, "getScripts", Debugger::GetScripts);
        NODE_SET_METHOD(debuggerObj, "setBreakpoint", Debugger::SetBreakpoint);

        target->Set(String::NewSymbol("v8debugger"), debuggerObj);
    }

    Debugger::Debugger() : ObjectWrap() {}
    Debugger::~Debugger() {
        script.Dispose();
    }

    Handle<Value> Debugger::InitDebugger(const Arguments& args) {
        HandleScope scope;
        if (args.Length() == 0 ) {
            return ThrowException(Exception::TypeError(
            String::New("You must specify arguments to invoke this function")));
        }

        if (!args[0]->IsString()) {
            return ThrowException(Exception::TypeError(
            String::New("First argument must be a string")));
        }

        Local<Context> debuggerContext = Debug::GetDebugContext();
        Context::Scope contextScope(debuggerContext);

        Debugger* debugger = new Debugger();

        TryCatch try_catch;
        debugger->script = Persistent<Object>::New(Local<Object>::Cast(Script::Compile(args[0]->ToString())->Run()));
        if (try_catch.HasCaught()) {
            FatalException(try_catch);
        }

        Local<Object> obj = args.This();
        debugger->Wrap(obj);

        //Debug::SetDebugEventListener2(&Debugger::v8DebugEventCallback, External::New(debugger));

        return scope.Close(obj);
    }

    Handle<Value> Debugger::GetScripts(const Arguments& args) {
        HandleScope scope;
        Debugger* debugger = ObjectWrap::Unwrap<Debugger>(args.This());

        Local<Function> scriptsFn = Local<Function>::Cast(debugger->script->Get(String::New("getScripts")));

        Local<Context> debuggerContext = Debug::GetDebugContext();
        Context::Scope contextScope(debuggerContext);

        TryCatch try_catch;
        Local<Value> scripts = scriptsFn->Call(debugger->script, 0, NULL);

        if (try_catch.HasCaught()) {
            FatalException(try_catch);
        }

        return scripts;
    }

    Handle<Value> Debugger::SetBreakpoint(const Arguments& args) {
        HandleScope scope;

        if (args.Length() == 0 || !args[0]->IsObject()) {
            return ThrowException(Exception::TypeError(
            String::New("You must specify an object as argument")));
        }

        Local<Object> arg = args[0]->ToObject();

        if (!arg->Has(source_id_sym) ||
            !arg->Get(source_id_sym)->IsInt32()) {
            return ThrowException(Exception::TypeError(
            String::New("You must specify a valid source identifier")));
        }

        if (!arg->Has(line_sym) ||
            !arg->Get(line_sym)->IsInt32()) {
            return ThrowException(Exception::TypeError(
            String::New("You must specify a valid line number")));
        }

        if (!arg->Has(column_sym) ||
            !arg->Get(column_sym)->IsInt32()) {
            return ThrowException(Exception::TypeError(
            String::New("You must specify a valid column number")));
        }

        if (!arg->Has(condition_sym) ||
            !arg->Get(condition_sym)->IsString()) {
            arg->Set(condition_sym, String::New(""));
        }

        Debugger* debugger = ObjectWrap::Unwrap<Debugger>(args.This());

        Local<Function> setBreakpointFn = Local<Function>::Cast(debugger->script->Get(String::New("setBreakpoint")));

        Local<Context> debuggerContext = Debug::GetDebugContext();
        Context::Scope contextScope(debuggerContext);

        Handle<Value> breakpointId = Debug::Call(setBreakpointFn, arg);

        return breakpointId->ToString();
    }

} //namespace dbg
