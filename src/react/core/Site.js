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
var ReactStyle = require('ReactStyle');
var ReactStyleHead = require('ReactStyleHead');

var Site = React.createClass({
  render: function() {
    return (
      <html>
        <ReactStyleHead>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title>React | A JavaScript library for building user interfaces</title>
          <meta name="viewport" content="width=device-width" />
          <meta property="og:title" content="React | A JavaScript library for building user interfaces" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://facebook.github.io/react/index.html" />
          <meta property="og:image" content="http://facebook.github.io/react/img/logo_og.png" />
          <meta property="og:description" content="A JavaScript library for building user interfaces" />
          <meta property="fb:app_id" content="623268441017527" />

          <link rel="shortcut icon" href="http://facebook.github.io/react/favicon.ico" />
          <link rel="alternate" type="application/rss+xml" title="React" href="http://facebook.github.io/react/feed.xml" />

          <link rel="stylesheet" href="http://facebook.github.io/react/css/react.css" />
          <link rel="stylesheet" href="http://facebook.github.io/react/css/syntax.css" />
          <link rel="stylesheet" href="http://facebook.github.io/react/css/codemirror.css" />

          <script type="text/javascript" src="//use.typekit.net/vqa1hcx.js"></script>
          <script type="text/javascript">{'try{Typekit.load();}catch(e){}'}</script>

          <script type="text/javascript" src="js/codemirror.js"></script>
          <script type="text/javascript" src="js/javascript.js"></script>
          <script type="text/javascript" src="js/JSXTransformer.js"></script>
          <script type="text/javascript" src="js/showdown.js"></script>
        </ReactStyleHead>
        <body>

          <div className="container">
            <div className="nav-main">
              <div className="wrap">
                <a className="nav-home" href="/react/index.html">
                  <img className="nav-logo" alt="" src="/react/img/logo_small.png" width="38" height="38" />
                  React
                </a>
                <ul className="nav-site">
                  <li><a href="/react/docs/getting-started.html">docs</a></li>
                  <li><a href="/react/support.html" className={this.props.section === 'support' ? 'active' : ''}>support</a></li>
                  <li><a href="/react/downloads.html">download</a></li>
                  <li><a href="/react/blog/">blog</a></li>
                  <li><a href="http://github.com/facebook/react">github</a></li>
                </ul>
              </div>
            </div>

            {this.props.children}

            <footer className="wrap">
              <div className="left">A Facebook &amp; Instagram collaboration.</div>
              <div className="right">© 2013 Facebook Inc.</div>
            </footer>
          </div>

          <div id="fb-root" />
          <script dangerouslySetInnerHTML={{__html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-41298772-1', 'facebook.github.io');
            ga('send', 'pageview');

            !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)
            ){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=623268441017527";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `}} />
        </body>
      </html>
    );
  }
});

module.exports = Site;
