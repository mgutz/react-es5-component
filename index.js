"use strict";

var React = require("react");

// shamelessly borrowed from CoffeeScript
var __extends = function(child, parent) {
    for (var key in parent) {
        if (parent.hasOwnProperty(key))
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

// used to export any handler that is prefixed with "do" or "on"
var reHandlers = /^(do|on)[A-Z]/;

/**
 * Setup the prototypical inheritance chain
 *
 * @param child {Object} The new component.
 */
function extendsReactComponent(child) {
    var c = __extends(child, React.Component);

    // binds do* and on* handlers
    c.prototype.bindHandlers = function(inst) {
        for (var key in c.prototype) {
            if (c.prototype.hasOwnProperty(key)
                  && typeof inst[key] === "function" && reHandlers.test(key)
                ) {
                    inst[key] = inst[key].bind(inst);
            }
        }
    };
}

/**
 * Calls the React.Component constructor ensuring this component is
 * a React.Component.
 *
 * @param child {Object} The new component.
 * @param args {Arguments} The arguments from child's constructor.
 * @param autobind {Boolean} Whether to autobind do* and on* handlers.
 */
extendsReactComponent.super = function(child, args, autobind) {
    React.Component.prototype.constructor.apply(child, args);
    if (autobind) child.bindHandlers(child);
};

module.exports = extendsReactComponent;
