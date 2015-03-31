"use strict";

var React = require("react");

// shamelessly borrowed from CoffeeScript
var __hasProp = {}.hasOwnProperty;
var __extends = function(child, parent) {
    for (var key in parent) {
        if (__hasProp.call(parent, key))
            child[key] = parent[key];
    }
    function Ctor() {
        this.constructor = child;
    }
    Ctor.prototype = parent.prototype;
    child.prototype = new Ctor();
    child.__super__ = parent.prototype;
    return child;
};

// used to export any handler that is prefixed with "on"
var reOnHandlers = /^on[A-Z]/;

function extendsReactComponent(child) {
    var c = __extends(child, React.Component);

    c.prototype.bindOnHandlers = function(inst) {
        for (var key in c.prototype) {
            if (__hasProp.call(c.prototype, key)) {
                if (typeof inst[key] === "function" && reOnHandlers.test(key)) {
                    inst[key] = inst[key].bind(inst);
                }
            }
        }
    };
}

extendsReactComponent.super = function(child, args) {
    React.Component.prototype.constructor.apply(child, args);
    child.bindOnHandlers(child);
};

module.exports = extendsReactComponent;

