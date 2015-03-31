# react-es5-component

Use `React.Component` in ES5.

This simple library allows React.Component to be used with today's
Javascript without `React.createClass`. React is moving to a simple
class in the future so it's better to start using `React.Component` now.

One nicety this library provides is `bindOnHandlers`. React.Component
no longer autobinds handlers for you, so you must bind handlers to the
instance. `bindOnHandlers` binds all functions in the prototype
that match `/^on[A-Z]/` to the instance.

Instead of this

```js
this.onStoreChange = this.onStoreChange.bind(this)
this.onHandleClick = this.onHandleClick.bind(this)
```

do this

```js
reactComponent.super(this, arguments);
this.bindOnHandlers(this)

OR

reactComponent.super(this, arguments, true);
```

This library depends on "React" being installed in your project.

## Example

```js
var React = require("react");
var reactComponent = require("react-es5-component");
var MyStore = require("../stores/MyStore");

function MyComponent() {
    // true means autobind on* handlers
    reactComponent.super(this, arguments, true);
    this.state = MyStore.getState();
}
// extends React.Component using prototypical inheritance
reactComponent(MyComponent);

MyComponent.prototype.componentDidMount = function() {
    MyStore.listen(this.onStoreChange);
}

MyComponent.prototype.onHandleClick = function(e) {
    e.preventDefault();
    // ...
}

MyComponent.prototype.onStoreChange = function(state) {
    this.setState(state);
}

MyComponent.prototype.render = function() {
    return (
        <div onClick={this.onHandleClick}>
            Hello {this.state.name}
        </div>
    );
};

MyComponent.propTypes = {location: React.PropTypes.string};

module.exports = MyComponent;
```
