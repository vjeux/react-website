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
var ReactPlayground = require('./core/ReactPlayground.js');

var index = React.createClass({
  render: function() {
    return (
      <Site>
        <div className="hero">
          <div className="wrap">
            <div className="text"><strong>React</strong></div>
            <div className="minitext">
              A JavaScript library for building user interfaces
            </div>

            <div className="buttons-unit">
              <a href="/react/docs/getting-started.html" className="button">Get Started</a>
              <a href="/react/downloads.html" className="button">Download React v0.5.1</a>
            </div>
          </div>
        </div>

        <section className="content wrap">
          <p></p>
          <section className="light home-section">
            <div className="marketing-row">
              <div className="marketing-col">
                <h3>Just the UI</h3>
                <p>
                  Lots of people use React as the V in MVC.
                  Since React makes no assumptions about the rest of your technology stack,
                  it{"'"}s easy to try it out on a small feature in an existing project.
                </p>
              </div>
              <div className="marketing-col">
                <h3>Virtual DOM</h3>
                <p>
                  React uses a <i>virtual DOM</i> diff implementation for ultra-high performance. It can also
                  render on the server using Node.js — no heavy browser DOM required.
                </p>
              </div>
              <div className="marketing-col">
                <h3>Data flow</h3>
                <p>
                  React implements one-way reactive data flow which reduces boilerplate and is
                  easier to reason about than traditional data binding.
                </p>
              </div>
            </div>
          </section>
          <hr className="home-divider" />
          <section className="home-section">
            <div id="examples">
              <div className="example">
                <h3>A Simple Component</h3>
                <p>
                  React components implement a <code>render()</code> method that takes input data and
                  returns what to display. This example uses an XML-like syntax called
                  JSX. Input data that is passed into the component can be accessed by
                  <code>render()</code> via <code>this.props</code>.<br />
                  <strong>JSX is optional and not required to use React.</strong>
                </p>
                <ReactPlayground id="helloExample" codeText={`
                  /** @jsx React.DOM */
                  var HelloMessage = React.createClass({
                    render: function() {
                      return <div>{'Hello ' + this.props.name}</div>;
                    }
                  });

                  React.renderComponent(<HelloMessage name="John" />, mountNode);
                `} />
              </div>
              <div className="example">
                <h3>A Stateful Component</h3>
                <p>
                  In addition to taking input data (accessed via <code>this.props</code>), a
                  component can maintain internal state data (accessed via <code>this.state</code>).
                  When a component{"'"}s state data changes, the rendered markup will be
                  updated by re-invoking <code>render()</code>.<br />
                  <strong>This example demonstrates use of React without JSX.</strong>
                </p>
                <ReactPlayground id="timerExample" codeText={`
                  var Timer = React.createClass({
                    getInitialState: function() {
                      return {secondsElapsed: 0};
                    },
                    tick: function() {
                      this.setState({secondsElapsed: this.state.secondsElapsed + 1});
                    },
                    componentDidMount: function() {
                      this.interval = setInterval(this.tick, 1000);
                    },
                    componentWillUnmount: function() {
                      clearInterval(this.interval);
                    },
                    render: function() {
                      return React.DOM.div({},
                        'Seconds Elapsed: ', this.state.secondsElapsed
                      );
                    }
                  });

                  React.renderComponent(Timer({}), mountNode);
                `} />
              </div>
              <div className="example">
                <h3>An Application</h3>
                <p>
                  Using <code>props</code> and <code>state</code>, we can put together a small Todo application.
                  This example uses <code>state</code> to track the current list of items as well as
                  the text that the user has entered. Although event handlers appear to be
                  rendered inline, they will be collected and implemented using event
                  delegation.
                </p>
                <ReactPlayground id="todoExample" codeText={`
                  /** @jsx React.DOM */
                  var TodoList = React.createClass({
                    render: function() {
                      var createItem = function(itemText) {
                        return <li>{itemText}</li>;
                      };
                      return <ul>{this.props.items.map(createItem)}</ul>;
                    }
                  });
                  var TodoApp = React.createClass({
                    getInitialState: function() {
                      return {items: [], text: ''};
                    },
                    onChange: function(e) {
                      this.setState({text: e.target.value});
                    },
                    handleSubmit: function(e) {
                      e.preventDefault();
                      var nextItems = this.state.items.concat([this.state.text]);
                      var nextText = '';
                      this.setState({items: nextItems, text: nextText});
                    },
                    render: function() {
                      return (
                        <div>
                          <h3>TODO</h3>
                          <TodoList items={this.state.items} />
                          <form onSubmit={this.handleSubmit}>
                            <input onChange={this.onChange} value={this.state.text} />
                            <button>{'Add #' + (this.state.items.length + 1)}</button>
                          </form>
                        </div>
                      );
                    }
                  });
                  React.renderComponent(<TodoApp />, mountNode);
                `} />
              </div>
              <div className="example">
                <h3>A Component Using External Plugins</h3>
                <p>
                  React is flexible and provides hooks that allow you to interface with
                  other libraries and frameworks. This example uses Showdown, an external
                  Markdown library, to convert the textarea{"'"}s value in real-time.
                </p>
              </div>
              <ReactPlayground id="markdownExample" codeText={`
                /** @jsx React.DOM */

                var converter = new Showdown.converter();

                var MarkdownEditor = React.createClass({
                  getInitialState: function() {
                    return {value: 'Type some *markdown* here!'};
                  },
                  handleChange: function() {
                    this.setState({value: this.refs.textarea.getDOMNode().value});
                  },
                  render: function() {
                    return (
                      <div className="MarkdownEditor">
                        <h3>Input</h3>
                        <textarea
                          onChange={this.handleChange}
                          ref="textarea"
                          defaultValue={this.state.value} />
                        <h3>Output</h3>
                        <div
                          className="content"
                          dangerouslySetInnerHTML={{
                            __html: converter.makeHtml(this.state.value)
                          }}
                        />
                      </div>
                    );
                  }
                });

                React.renderComponent(<MarkdownEditor />, mountNode);
              `} />
            </div>
          </section>
          <hr className="home-divider" />
          <section className="home-bottom-section">
            <div className="buttons-unit">
              <a href="docs/getting-started.html" className="button">Get Started</a>
              <a href="downloads.html" className="button">Download React v0.5.1</a>
            </div>
          </section>
          <p></p>
        </section>
      </Site>
    );
  }
});

module.exports = index;
