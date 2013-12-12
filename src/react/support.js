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
 * @jsx React.DOM
 */

var React = require('React');
var Site = require('./core/Site.js');
var center = require('./core/center.js');
var H2 = require('./core/H2.js');

var support = React.createClass({
  render: function() {
    return (
      <Site section="support">

        <section className="content wrap documentationContent nosidebar">
          <div className="inner-content">
            <h1>Need help?</h1>
            <div className="subHeader"></div>
            <p>
              <strong>React</strong> is worked on full-time by Facebook&#39;s
              product infrastructure and Instagram&#39;s user interface
              engineering teams. They&#39;re often around and available for
              questions.
            </p>

            <H2>Stack Overflow</H2>
            <p>Many members of the community use Stack Overflow to ask questions. Read through the <a href="http://stackoverflow.com/questions/tagged/reactjs">existing questions</a> tagged with <strong>reactjs</strong> or <a href="http://stackoverflow.com/questions/ask">ask your own</a>!</p>
            <H2>Google Groups mailing list</H2>
            <p><a href="http://groups.google.com/group/reactjs" target="_blank">The <strong>reactjs</strong> Google Group</a> is also a good place to ask questions and find answers.</p>
            <H2>IRC</H2>
            <p>Many developers and users idle on Freenode.net&#39;s IRC network in <strong><a href="irc://chat.freenode.net/reactjs">#reactjs on freenode</a></strong>.</p>
            <H2>Twitter</H2>
            <p><a href="https://twitter.com/search?q=%23reactjs"><strong>#reactjs</strong> hash tag on Twitter</a> is used to keep up with the latest React news.</p>

            <p><center><a className="twitter-timeline" data-dnt="true" data-chrome="nofooter noheader transparent" href="https://twitter.com/search?q=%23reactjs" data-widget-id="342522405270470656"></a></center></p>
          </div>
        </section>

      </Site>
    );
  }
});

module.exports = support;
