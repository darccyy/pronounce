import { Component } from "react";
import F from "fortissimo";

import "./App.scss";

export default class App extends Component {
  state = { msg: null, searchWord: "bruh", searchResult: null };

  componentDidMount() {
    this.getWord();

    fetch("./api/test")
      .then(res => res.json())
      .then(json => this.setState(json))
      .catch(err => console.error(err));
  }

  getWord() {
    console.log("get:", this.state.searchWord);

    fetch(`./api/get?word=${this.state.searchWord}`)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        this.setState({ searchResult: null });
      })
      .then(json => this.setState({ searchResult: json }))
      .catch(err => console.error(err));
  }

  formatTime(time) {
    return !time ? (
      "Unknown time"
    ) : (
      <>
        <span>
          {F.parseTime(Date.now() - time, undefined, unit => {
            if (unit.size < 2) {
              return;
            }

            return Math.floor(unit.amount).toString() + unit.prefix;
          })}
        </span>{" "}
        ago
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <h1>Pronounce</h1>

        <p>
          Server test message:{" "}
          <span className="msg">{this.state.msg || "Loading..."}</span>
        </p>

        <div className="searchInput">
          <input
            type="text"
            defaultValue={this.state.searchWord}
            placeholder="Search word"
            onInput={event => {
              this.setState({ searchWord: event.target.value }, this.getWord);
            }}
          />

          {/* <button>Post</button> */}
        </div>

        <ul className="searchList">
          {!this.state.searchResult ? (
            <span className="empty">No results</span>
          ) : (
            Object.keys(this.state.searchResult).map((ipa, i) => {
              if (!ipa) {
                return;
              }
              var source = this.state.searchResult[ipa];
              // If majority say narrow
              var narrow =
                source.reduce((acc, post) => {
                  return acc + (post.narrow ? 1 : 0);
                }, 0) /
                  source.length >
                0.5;

              return (
                <li key={i} className="entry">
                  <span className={"ipa" + (narrow ? " narrow" : "")}>
                    {ipa}
                  </span>

                  <ul className="source">
                    {!source || source.length < 1 ? (
                      <span className="empty">
                        <i>No source</i>
                      </span>
                    ) : (
                      source.map((post, j) => {
                        return (
                          <li key={j} className="post">
                            <p className="commas">
                              <i className="user">
                                {post.user || "Unknown user"}
                              </i>

                              <b className="dialect">{post.dialect}</b>

                              <span className="time">
                                {this.formatTime(post.time)}
                              </span>

                              {post.narrow ? (
                                <span className="narrow">
                                  Narrow Transcription
                                </span>
                              ) : null}
                            </p>

                            {post.note ? (
                              <blockquote className="note">
                                {post.note}
                              </blockquote>
                            ) : null}
                          </li>
                        );
                      })
                    )}
                  </ul>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}
