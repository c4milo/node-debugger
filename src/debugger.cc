// Copyright 2012, Camilo Aguilar. Cloudescape, LLC.
#include "debugger.h"

namespace dbg {
    Persistent<ObjectTemplate> Debugger::debugger_template_;

    void Debugger::Initialize(Handle<Object> target) {
        HandleScope scope;

        debugger_template_ = Persistent<ObjectTemplate>::New(ObjectTemplate::New());
        debugger_template_->SetInternalFieldCount(1);

        Local<Object> debuggerObj = debugger_template_->NewInstance();

        NODE_SET_METHOD(debuggerObj, "initialize", Debugger::InitDebugger);

        target->Set(String::NewSymbol("debugger"), debuggerObj);
    }

    Debugger::Debugger() : ObjectWrap() {}
    Debugger::~Debugger() {}

    Handle<Value> Debugger::InitDebugger(const Arguments& args) {

    }

} //namespace dbg
