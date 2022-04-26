import { Component } from "react";
import $ from "jquery";

import "./App.scss";
import PostForm from "./PostForm";
import SearchEntry from "./SearchEntry";

export default class App extends Component {
  state = {
    msg: null,
    searchWord: "cringe",
    searchResult: null,
    postIpa: null,
    postSource: null,
  };

  componentDidMount() {
    this.get();

    fetch("./api/test")
      .then(res => res.json())
      .then(json => this.setState(json))
      .catch(err => console.error(err));
  }

  get() {
    console.log("get");

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

  post = () => {
    console.log("post");

    fetch(
      "/api/post?" +
        $.param({
          word: this.state.searchWord,
          ipa: this.state.postIpa,
          ...this.state.postSource,
        }),
    )
      .then(res => {
        console.log(res);
        $(".PostForm form")[0].reset();
        this.get();
        this.setState({ postIpa: null });
        this.setState({ postSource: null });
      })
      .catch(err => console.error(err));

    $(".PostForm > details").attr("open", false);
  };

  render() {
    return (
      <div className="App">
        <h1>How to Pronounce</h1>

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
              this.setState({ searchWord: event.target.value }, this.get);
            }}
          />
        </div>

        <PostForm
          post={this.post}
          state={this.state}
          setState={value => this.setState(value)}
        />

        <hr />

        <div className="searchList">
          {!this.state.searchResult ? (
            <span className="empty">No results</span>
          ) : (
            Object.keys(this.state.searchResult).map((ipa, i) => (
              <SearchEntry
                key={i}
                ipa={ipa}
                source={this.state.searchResult[ipa]}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}
