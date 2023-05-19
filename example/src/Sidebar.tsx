import React, { useState } from "react";
import type { IHighlight } from "./react-pdf-highlighter";

interface Props {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  toggleDocument: () => void;
  bookmarks: boolean;
  search: boolean;
}

const updateHash = (highlight: IHighlight) => {
  console.log(highlight.id);
  document.location.hash = `highlight-${highlight.id}`;
};

export function Sidebar({
  highlights,
  toggleDocument,
  resetHighlights,
  bookmarks,
  search,
}: Props) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  function searchHandler() {
    function searchDocument(query: string | RegExp) {
      // const elements = documentRef.querySelectorAll(
      //   `:not(script):not(style):not(iframe):not(canvas):not(nav)`
      // );
      const elements = document.querySelectorAll('[role="presentation"]');
      console.log(elements);
      const matches: any[] = [];

      elements.forEach((element) => {
        const regex = new RegExp(query, "gi");
        // console.log(regex)

        const text = element.innerText;
        if (regex.test(text)) {
          console.log(text);
          const pageNumber =
            element.parentElement?.parentElement?.getAttribute(
              "data-page-number"
            );
          console.log(element.parentElement?.parentElement);
          console.log(pageNumber);
          var re = new RegExp(searchQuery, "gi");
          console.log(re);
          console.log(text.match(re));
          text
            .match(re)
            ?.map((t: any[]) =>
              matches.push({ text: t, pageNumber: pageNumber })
            );

          // matches.push(text);
        }
      });

      return matches;
    }

    setSearchResults(searchDocument(searchQuery));
  }

  function scrollToPage(pageNumber: any) {
    const targetElement = document.querySelector(
      `[data-page-number='${pageNumber}']`
    );

    targetElement?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div className="sidebar" style={{ width: "25vw" }}>
      {search ? (
        <>
          <div className="description" style={{ padding: "1rem" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <input
                placeholder="search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={searchHandler}>Search</button>
            </div> </div>

            <ul className="sidebar__highlights">
              {searchResults?.map((result, index) => (
                <li
                  key={index}
                  className="sidebar__highlight"
                  onClick={() => scrollToPage(result.pageNumber)}
                >
                  <div>
                    <strong>{result.text}</strong>
                  </div>
                  <div className="highlight__location">
                    Page {result.pageNumber}
                  </div>
                </li>
              ))}
            </ul>
         
        </>
      ) : (
        <>
          <div className="description" style={{ padding: "1rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>react-pdf-highlighter</h2>

            <p style={{ fontSize: "0.7rem" }}>
              <a href="https://github.com/agentcooper/react-pdf-highlighter">
                Open in GitHub
              </a>
            </p>

            <p>
              <small>
                To create area highlight hold ⌥ Option key (Alt), then click and
                drag.
              </small>
            </p>
          </div>
          <h2 style={{ margin: "1rem" }}>
            {bookmarks ? "Bookmarks" : "Highlights"}
          </h2>
          <ul className="sidebar__highlights">
            {bookmarks ? (
              <>
                {highlights
                  .filter((h) => h.comment.bookMark === true)
                  .map((highlight, index) => (
                    <li
                      key={index}
                      className="sidebar__highlight"
                      onClick={() => {
                        updateHash(highlight);
                      }}
                    >
                      <div>
                        <strong>{highlight.comment.title}</strong>
                        <p>{highlight.comment.text}</p>
                        {highlight.content.text ? (
                          <blockquote style={{ marginTop: "0.5rem" }}>
                            {`${highlight.content.text.slice(0, 90).trim()}…`}
                          </blockquote>
                        ) : null}
                        {highlight.content.image ? (
                          <div
                            className="highlight__image"
                            style={{ marginTop: "0.5rem" }}
                          >
                            <img
                              src={highlight.content.image}
                              alt={"Screenshot"}
                            />
                          </div>
                        ) : null}
                      </div>
                      <div className="highlight__location">
                        Page {highlight.position.pageNumber}
                      </div>
                    </li>
                  ))}
              </>
            ) : (
              <>
                {highlights
                  .filter((h) => h.comment.bookMark === false)
                  .map((highlight, index) => (
                    <li
                      key={index}
                      className="sidebar__highlight"
                      onClick={() => {
                        updateHash(highlight);
                      }}
                    >
                      <div>
                        <strong>{highlight.comment.title}</strong>
                        <p>{highlight.comment.text}</p>

                        {highlight.content.text ? (
                          <blockquote style={{ marginTop: "0.5rem" }}>
                            {`${highlight.content.text.slice(0, 90).trim()}…`}
                          </blockquote>
                        ) : null}
                        {highlight.content.image ? (
                          <div
                            className="highlight__image"
                            style={{ marginTop: "0.5rem" }}
                          >
                            <img
                              src={highlight.content.image}
                              alt={"Screenshot"}
                            />
                          </div>
                        ) : null}
                      </div>
                      <div className="highlight__location">
                        Page {highlight.position.pageNumber}
                      </div>
                    </li>
                  ))}
              </>
            )}
          </ul>
          <div style={{ padding: "1rem" }}>
            <button onClick={toggleDocument}>Toggle PDF document</button>
          </div>
          {highlights.length > 0 ? (
            <div style={{ padding: "1rem" }}>
              <button onClick={resetHighlights}>Reset highlights</button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
