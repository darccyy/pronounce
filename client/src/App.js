import { Component } from "react";
import $ from "jquery";

import "./App.scss";
import PostForm from "./PostForm";
import SearchEntry from "./SearchEntry";

export default class App extends Component {
  state = {
    msg: null,
    loading: null,
    word: "cringe",
    search: null,
    ipa: null,
    source: null,
  };

  componentDidMount() {
    this.get();

    fetch("./api/test")
      .then(res => res.json())
      .then(json => this.setState(json))
      .catch(err => console.error(err));
  }

  get() {
    console.log("get:", this.state.word);
    this.setState({ loading: true });

    if (!this.state.word) {
      this.setState({ search: null, loading: false });
      return;
    }

    fetch(`./api/get?word=${this.state.word}`)
      .then(res => res.json())
      .then(json => this.setState({ search: json, loading: false }))
      .catch(err => console.error(err));
  }

  post = () => {
    console.log("post:", this.state.word, this.state.ipa);
    this.setState({ loading: true });

    fetch(
      "/api/post?" +
        $.param({
          word: this.state.word,
          ipa: this.state.ipa,
          ...this.state.source,
        }),
    )
      .then(() => {
        $(".PostForm form")[0].reset();
        this.get();
        this.setState({ ipa: null });
        this.setState({ source: null });
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
            defaultValue={this.state.word}
            placeholder="Search word"
            autoFocus
            onInput={event => {
              this.setState({ word: event.target.value });
            }}
            onKeyDown={event => {
              if (event.key === "Enter") {
                this.get();
              }
            }}
          />

          <button onClick={() => this.get()}>Search</button>
        </div>

        <PostForm
          post={this.post}
          state={this.state}
          setState={value => this.setState(value)}
        />

        <hr />

        <div className="searchList">
          {this.state.loading ? (
            <span className="loading">Loading...</span>
          ) : !this.state.search ||
            Object.keys(this.state.search).length < 1 ? (
            <span className="empty">No results</span>
          ) : (
            Object.keys(this.state.search).map((ipa, i) => (
              <SearchEntry key={i} ipa={ipa} source={this.state.search[ipa]} />
            ))
          )}
        </div>
      </div>
    );
  }
}
