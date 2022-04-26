import F from "fortissimo";

import "./SearchEntry.scss";

function formatTime(time) {
  return !time ? (
    "Unknown time"
  ) : (
    <>
      <span>
        {F.parseTime(Date.now() - time, undefined, (unit, index, all) => {
          if (unit.size < 2 || all.length - unit.size > 3) {
            if (all.length < 2 || unit.size < 1) {
              return "1m";
            }
            return;
          }

          return Math.floor(unit.amount).toString() + unit.prefix;
        })}
      </span>{" "}
      ago
    </>
  );
}

export default function SearchEntry(props) {
  var { ipa, source } = props;
  if (!ipa) {
    return <></>;
  }

  // If majority say narrow
  var narrow = source
    ? source.reduce((acc, post) => {
        if (post?.narrow) {
          return acc + 1;
        }
        return 0;
      }, 0) /
        source.length >
      0.5
    : 0;

  return (
    <article className="SearchEntry">
      <h1 className={"ipa" + (narrow ? " narrow" : "")}>{ipa}</h1>

      <ul className="source">
        {!source || source.length < 1 ? (
          <span className="empty">
            <i>No source</i>
          </span>
        ) : (
          source.map((post, i) => {
            if (!post) {
              return "";
            }
            return (
              <li key={i} className="post">
                <p className="commas">
                  <i className="user">{post.user || "Unknown user"}</i>

                  <b className="dialect">{post.dialect}</b>

                  <span className="time">{formatTime(post.time)}</span>

                  {post.narrow ? (
                    <span className="narrow">Narrow Transcription</span>
                  ) : null}
                </p>

                {post.note ? (
                  <blockquote className="note">{post.note}</blockquote>
                ) : null}
              </li>
            );
          })
        )}
      </ul>
    </article>
  );
}
