/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule PostLayout
 * @jsx React.DOM
 */

var React = require('React');
var Site = require('Site');
var Showdown = require('showdown');

var Markdown = React.createClass({
  render: function() {
    var unindent = require('unindent');
    var code = unindent(this.props.children);
    var html = new Showdown.converter().makeHtml(code);

    return (
      <div
        className="content"
        dangerouslySetInnerHTML={{__html: html}}
      />
    );
  }
});

var PostLayout = React.createClass({
  render: function() {
    return (
      <Site section="blog">
        <Markdown>{this.props.children}</Markdown>
      </Site>
    );
  }
});

module.exports = PostLayout;
