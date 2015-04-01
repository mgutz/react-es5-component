# react-es5-component

Use `React.Component` in ES5.

This simple library allows React.Component to be used with today's
Javascript without `React.createClass`. React is moving to a simple
class in the future so it's better to start using `React.Component` now.

One nicety this library provides is `bindHandlers`. React.Component
no longer autobinds handlers for you, so you must bind handlers to the
instance. `bindHandlers` binds all functions in the prototype
that match `/^(do|on)[A-Z]/` to the instance.

Instead of this

```js
this.onStoreChange = this.onStoreChange.bind(this)
this.doClick = this.doClick.bind(this)
```

do this

```js
reactComponent.super(this, arguments);
this.bindHandlers(this)

OR

reactComponent.super(this, arguments, true);
```

This library depends on `react` being installed in your project.

## Example

```js
var React = require("react");
var reactComponent = require("react-es5-component");
var MyStore = require("../stores/MyStore");

function MyComponent() {
    // true means autobind handlers
    reactComponent.super(this, arguments, true);
    this.state = MyStore.getState();
}
reactComponent(MyComponent);

MyComponent.propTypes = {location: React.PropTypes.string};

var o = MyComponent.prototype;

o.componentDidMount = function() {
    MyStore.listen(this.onStoreChange);
}

// do* handlers is our convention for UI events
o.doClick = function(e) {
    e.preventDefault();
    // ...
};

// on* handlers is our conventino for store events
o.onStoreChange = function(state) {
    this.setState(state);
}

o.render = function() {
    return (
        <div onClick={this.doClick}>
            Hello {this.state.name}
        </div>
    );
};

module.exports = MyComponent;
```
