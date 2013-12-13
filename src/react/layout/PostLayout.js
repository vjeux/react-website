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
var Metadata = require('Metadata');

var Markdown = React.createClass({
  render: function() {
    var unindent = require('unindent');
    var code = unindent(this.props.children);
    code = code.replace(/^---([\s\S]+)---/, '');
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
        <section className="content wrap blogContent">
          <div className="nav-docs nav-blog">
            <div className="nav-docs-section">
              <h3>Recent posts</h3>
              <ul>
                {Metadata
                  .filter((metadata) => metadata.filename.match(/^blog/))
                  .reverse()
                  .map((metadata) => <li>
                    <a
                      className={metadata.filename === this.props.metadata.filename ? 'active' : ''}
                      href={metadata.href}>
                      {metadata.title}
                    </a>
                  </li>)
                }
              </ul>
            </div>
          </div>
          <div className="inner-content">
            <h1>{this.props.metadata.title}</h1>
            <Markdown>{this.props.children}</Markdown>
          </div>
        </section>
      </Site>
    );
  }
});

module.exports = PostLayout;
