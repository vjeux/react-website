module.exports = `---
id: children-props-type
title: Type of the Children props
layout: tips
permalink: children-props-type.html
prev: style-props-value-px.html
next: controlled-input-null-value.html
---

Usually, a component's children (\`this.props.children\`) is an array of components:

\`\`\`js
/** @jsx React.DOM */

var GenericWrapper = React.createClass({
  componentDidMount: function() {
    console.log(Array.isArray(this.props.children)); // => true
  },
  render: function() {
    return <div />;
  }
});

React.renderComponent(
  <GenericWrapper><span/><span/><span/></GenericWrapper>,
  mountNode
);
\`\`\`

However, when there is only a single child, \`this.props.children\` will be the single child component itself _without the array wrapper_. This saves an array allocation.

\`\`\`js
/** @jsx React.DOM */

var GenericWrapper = React.createClass({
  componentDidMount: function() {
    console.log(Array.isArray(this.props.children)); // => false

    // warning: yields 5 for length of the string 'hello', not 1 for the
    // length of the non-existant array wrapper!
    console.log(this.props.children.length);
  },
  render: function() {
    return <div />;
  }
});

React.renderComponent(<GenericWrapper>hello</GenericWrapper>, mountNode);
\`\`\`
`;