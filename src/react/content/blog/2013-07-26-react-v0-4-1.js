module.exports = `---
title: "React v0.4.1"
layout: post
author: Paul O'Shannessy
---

React v0.4.1 is a small update, mostly containing correctness fixes. Some code has been restructured internally but those changes do not impact any of our public APIs.


## React

* \`setState\` callbacks are now executed in the scope of your component.
* \`click\` events now work on Mobile Safari.
* Prevent a potential error in event handling if \`Object.prototype\` is extended.
* Don't set DOM attributes to the string \`"undefined"\` on update when previously defined.
* Improved support for \`<iframe>\` attributes.
* Added checksums to detect and correct cases where server-side rendering markup mismatches what React expects client-side.


## JSXTransformer

* Improved environment detection so it can be run in a non-browser environment.


[Download it now!](/react/downloads.html)
`;