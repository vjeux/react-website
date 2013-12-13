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
var Markdown = require('Markdown');
var DocsSidebar = require('DocsSidebar');

var DocsLayout = React.createClass({
  render: function() {
    var metadata = this.props.metadata;
    return (
      <Site section="docs">
        <section className="content wrap documentationContent">
          <DocsSidebar metadata={metadata} />
          <div className="inner-content">
            <h1>{metadata.title}</h1>
            <Markdown>{this.props.children}</Markdown>
            <div className="docs-prevnext">
              {metadata.prev && <a className="docs-prev" href={metadata.prev}>&larr; Prev</a>}
              {metadata.next && <a className="docs-next" href={metadata.next}>Next &rarr;</a>}
            </div>
          </div>
        </section>
      </Site>
    );
  }
});

module.exports = DocsLayout;
