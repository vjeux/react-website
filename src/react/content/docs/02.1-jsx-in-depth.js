module.exports = `---
id: jsx-in-depth
title: JSX in Depth
layout: docs
category: Guides
indent: true
permalink: jsx-in-depth.html
prev: displaying-data.html
next: jsx-gotchas.html
---

JSX is a JavaScript XML syntax transform recommended for use
with React.


## Why JSX?

React works out of the box without JSX. Simply construct your markup using the
functions on \`React.DOM\`. For example, here's how to construct a simple link:

\`\`\`javascript
var link = React.DOM.a({href: 'http://facebook.github.io/react'}, 'React');
\`\`\`

We recommend using JSX for many reasons:

* It's easier to visualize the structure of the DOM.
* Designers are more comfortable making changes.
* It's familiar for those who have used MXML or XAML.


## The Transform

JSX transforms from an XML-like syntax into native JavaScript. XML elements and
attributes are transformed into function calls and objects, respectively.

\`\`\`javascript
var Nav;
// Input (JSX):
var app = <Nav color="blue" />;
// Output (JS):
var app = Nav({color:"blue"});
\`\`\`

Notice that in order to use \`<Nav />\`, the \`Nav\` variable must be in scope.

JSX also allows specifying children using XML syntax:

\`\`\`javascript
var Nav, Profile;
// Input (JSX):
var app = <Nav color="blue"><Profile>click</Profile></Nav>;
// Output (JS):
var app = Nav({color:"blue"}, Profile(null, "click"));
\`\`\`

Use the [JSX Compiler](/react/jsx-compiler.html) to try out JSX and see how it
desugars into native JavaScript.

If you want to use JSX, the [Getting Started](getting-started.html) guide shows
how to setup compilation.

> Note:
>
> Details about the code transform are given here to increase understanding, but
> your code should not rely on these implementation details.


## React and JSX

React and JSX are independent technologies, but JSX was primarily built with
React in mind. The two valid uses of JSX are:

* To construct instances of React DOM components (\`React.DOM.*\`).
* To construct instances of composite components created with
  \`React.createClass()\`.

### React DOM Components

To construct a \`<div>\` is to create a variable that refers to \`React.DOM.div\`.

\`\`\`javascript
var div = React.DOM.div;
var app = <div className="appClass">Hello, React!</div>;
\`\`\`

### React Composite Components

To construct an instance of a composite component, create a variable that
references the class.

\`\`\`javascript
var MyComponent = React.createClass({/*...*/});
var app = <MyComponent someProperty={true} />;
\`\`\`

See [Multiple Components](multiple-components.html) to learn more about using composite components.

> Note:
>
> Since JSX is JavaScript, identifiers such as \`class\` and \`for\` are discouraged
> as XML attribute names. Instead, React DOM components expect attributes like
> \`className\` and \`htmlFor\`, respectively.

## DOM Convenience

Having to define variables for every type of DOM element can get tedious
(e.g. \`var div, span, h1, h2, ...\`). JSX provides a convenience to address this
problem by allowing you to specify a variable in an \`@jsx\` docblock field. JSX
will use that field to find DOM components.

\`\`\`javascript
/**
 * @jsx React.DOM
 */
var Nav;
// Input (JSX):
var tree = <Nav><span /></Nav>;
// Output (JS):
var tree = Nav(null, React.DOM.span(null));
\`\`\`

> Remember:
>
> JSX simply transforms elements into function calls and has no notion of the
> DOM. The docblock parameter is only a convenience to resolve the most commonly
> used elements. In general, JSX has no notion of the DOM.

## JavaScript Expressions

### Attribute Expressions

To use a JavaScript expression as an attribute value, wrap the expression in a
pair of curly braces (\`{}\`) instead of quotes (\`""\`).

\`\`\`javascript
// Input (JSX):
var person = <Person name={window.isLoggedIn ? window.name : ''} />;
// Output (JS):
var person = Person({name: window.isLoggedIn ? window.name : ''});
\`\`\`

### Child Expressions

Likewise, JavaScript expressions may be used to express children:

\`\`\`javascript
// Input (JSX):
var content = <Container>{window.isLoggedIn ? <Nav /> : <Login />}</Container>;
// Output (JS):
var content = Container(null, window.isLoggedIn ? Nav(null) : Login(null));
\`\`\`

### Comments

It's easy to add comments within your JSX; they're just JS expressions:

\`\`\`javascript
var content = <Container>{/* this is a comment */}<Nav /></Container>;
\`\`\`


## Prior Work

JSX is similar to several other JavaScript embedded XML language
proposals/projects. Some of the features of JSX that distinguish it from similar
efforts include:

* JSX is a simple syntactic transform.
* JSX neither provides nor requires a runtime library.
* JSX does not alter or add to the semantics of JavaScript.

JSX is similar to HTML, but not exactly the same. See [JSX gotchas](./jsx-gotchas.html) for some key differences.
`;