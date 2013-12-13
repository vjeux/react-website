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
 * @providesModule DocsLayout
 * @jsx React.DOM
 */

var React = require('React');
var Site = require('Site');
var Metadata = require('Metadata');
var Markdown = require('Markdown');

var DocsSideBar = React.createClass({

  getCategories: function() {
    var metadatas = Metadata.filter((metadata) => metadata.filename.match(/^(docs|tips)/));
    typeof console !== 'undefined' && console.log(metadatas.length);

    // Build a hashmap of article_id -> metadata
    // Find the first metadata
    var first = null;
    var articles = {}
    for (var i = 0; i < metadatas.length; ++i) {
      var metadata = metadatas[i];
      articles[metadata.id + '.html'] = metadata;
      if (!metadata.prev) {
        first = metadata;
      }
    }

    var categories = [];
    var currentCategory = null;

    var metadata = first;
    while (metadata) {
      if (!currentCategory || metadata.category !== currentCategory.name) {
        currentCategory && categories.push(currentCategory);
        currentCategory = {
          name: metadata.category,
          links: []
        }
      }
      currentCategory.links.push(metadata);
      metadata = articles[metadata.next];
    }
    categories.push(currentCategory);

    return categories;
  },

  render: function() {
    return <div className="nav-docs">
      {this.getCategories().map((category) =>
        <div className="nav-docs-section">
          <h3>{category.name}</h3>
          <ul>
            {category.links.map((metadata) =>
              <li>
                <a
                  style={{marginLeft: metadata.indent ? 20 : 0}}
//                  className={metadata.filename === this.props.metadata.filename ? 'active' : ''}
                  href={metadata.href}>
                  {metadata.title}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>;
  }
});


var DocsLayout = React.createClass({
  render: function() {
    return (
      <Site section="docs">
        <section className="content wrap documentationContent">
          <DocsSideBar />
          <div className="inner-content">
            <h1>{this.props.metadata.title}</h1>
            <Markdown>{this.props.children}</Markdown>
          </div>
        </section>
      </Site>
    );
  }
});

module.exports = DocsLayout;
