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

/**
 * Setup the prototypical inheritance chain
 *
 * @param child {Object} The new component.
 */
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

/**
 * Calls the React.Component constructor ensuring this component is
 * a React.Component.
 *
 * @param child {Object} The new component.
 * @param args {Arguments} The arguments from child's constructor.
 * @param autobind {Boolean} Whether to autobind.
 */
extendsReactComponent.super = function(child, args, autobind) {
    React.Component.prototype.constructor.apply(child, args);
    if (autobind) child.bindOnHandlers(child);
};

module.exports = extendsReactComponent;

