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
            onInput={event => props.setState({ ipa: event.target.value })}
          />
          <label>IPA Transcription</label>

          <input
            type="checkbox"
            placeholder=""
            onInput={event => {
              props.setState({
                source: {
                  ...props.state.source,
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
                source: {
                  ...props.state.source,
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
                source: {
                  ...props.state.source,
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
                source: {
                  ...props.state.source,
                  note: event.target.value || null,
                },
              })
            }
          />

          <input type="submit" value="Post" />
        </form>

        <div className="postPreview">
          {!props.state.ipa ? (
            ""
          ) : (
            <>
              <h2>
                Preview:{" "}
                <span className="invalid">
                  {props.state.ipa &&
                  props.state.source?.user &&
                  props.state.source?.dialect
                    ? ""
                    : "(Missing values)"}
                </span>
              </h2>
              <SearchEntry
                ipa={props.state.ipa}
                source={[
                  { ...props.state.source, time: Date.now() },
                ]}
              />
            </>
          )}
        </div>
      </details>
    </div>
  );
}
