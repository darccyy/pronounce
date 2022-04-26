import SearchEntry from "./SearchEntry";

export default function PostForm(props) {
  return (
    <div className="PostForm">
      <hr />
      <details>
        <summary>Upload Transcription</summary>
        <br />

        <form
          className="postForm"
          onSubmit={event => {
            props.post();
            event.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="IPA"
            required
            onInput={event => props.setState({ postIpa: event.target.value })}
          />
          <label>IPA Transcription</label>

          <input
            type="checkbox"
            placeholder=""
            onInput={event => {
              props.setState({
                postSource: {
                  ...props.state.postSource,
                  narrow: event.target.checked,
                },
              });
            }}
          />
          <label>Narrow</label>
          <br />

          <input
            type="text"
            placeholder="Name"
            required
            onInput={event =>
              props.setState({
                postSource: {
                  ...props.state.postSource,
                  user: event.target.value || null,
                },
              })
            }
          />

          <input
            type="text"
            placeholder="Dialect (eg. en-au)"
            required
            onInput={event =>
              props.setState({
                postSource: {
                  ...props.state.postSource,
                  dialect: event.target.value || null,
                },
              })
            }
          />

          <input
            type="text"
            placeholder="Note (optional)"
            onInput={event =>
              props.setState({
                postSource: {
                  ...props.state.postSource,
                  note: event.target.value || null,
                },
              })
            }
          />

          <input type="submit" value="Post" />
        </form>

        <div className="postPreview">
          {!props.state.postIpa ? (
            ""
          ) : (
            <>
              <h2>
                Preview:{" "}
                <span className="invalid">
                  {props.state.postIpa &&
                  props.state.postSource?.user &&
                  props.state.postSource?.dialect
                    ? ""
                    : "(Missing values)"}
                </span>
              </h2>
              <SearchEntry
                ipa={props.state.postIpa}
                source={[
                  { ...props.state.postSource, time: Date.now() - 100000 },
                ]}
              />
            </>
          )}
        </div>
      </details>
    </div>
  );
}
