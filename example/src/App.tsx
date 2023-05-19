import React, { createContext, Component, useState } from "react";

import {
  PdfLoader,
  PdfHighlighter,
  Tip,
  Highlight,
  Popup,
  AreaHighlight,
} from "./react-pdf-highlighter";
// import { BrowserRouter, Route } from "react-router-dom";

// // react-pdf-highlighter-main\src\components\navBar.tsx
// import { NavBar } from "./navBar"

// import {HighLight}  from "./pages/highlighte";
import DarkMode from "./pages/darkmode";
import type { IHighlight, NewHighlight } from "./react-pdf-highlighter";

import { testHighlights as _testHighlights } from "./test-highlights";
import { Spinner } from "./Spinner";
import { Sidebar } from "./Sidebar";
import bookMarkIcon from "./assets/bookmark.png";
import "./style/App.css";
export const ThemeContext = createContext(null);

const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;

interface State {
  bookmarks: boolean;
  search: boolean;
  url: string;
  highlights: Array<IHighlight>;
  currentPage: number;
  searchResults: any
}

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({
  comment,
}: {
  comment: { text: string; emoji: string; color: string };
}) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text} {comment.color}
    </div>
  ) : null;

const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

const searchParams = new URLSearchParams(document.location.search);

const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;

class App extends Component<{}, State> {
  state = {
    url: initialUrl,
    highlights: testHighlights[initialUrl]
      ? [...testHighlights[initialUrl]]
      : [],
    bookmarks: false,
    search: false,
    currentPage: 1,
    searchResults: Array<object>,
  };

  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };

  toggleDocument = () => {
    const newUrl =
      this.state.url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

    this.setState({
      url: newUrl,
      highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : [],
    });
  };

  scrollViewerTo = () => {};

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find((highlight) => highlight.id === id);
  }

  addHighlight(highlight: NewHighlight) {
    const { highlights } = this.state;

    console.log("Saving highlight", highlight);

    this.setState({
      highlights: [{ ...highlight, id: getNextId() }, ...highlights],
    });
  }

  updateHighlight(highlightId: string, position: Object, content: Object) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState({
      highlights: this.state.highlights.map((h) => {
        const {
          id,
          position: originalPosition,
          content: originalContent,
          ...rest
        } = h;
        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h;
      }),
    });
  }

  getCurrentInViewElement() {
    const viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const viewportCenterX = Math.floor(viewportWidth / 2);
    console.log(viewportCenterX);
    const viewportCenterY = Math.floor(viewportHeight / 2);
    console.log(viewportCenterY);
    const element = document.elementFromPoint(viewportCenterX, viewportCenterY);
    console.log(element);
    console.log(element?.parentElement);
    const parentEle = element?.parentElement;
    const pageNum = parentEle?.getAttribute("data-page-number");

    return pageNum;
  }





  render() {
    const { url, highlights } = this.state;

    return (
      <div className="App" style={{ height: "100vh" }}>
        <div
          style={{
            borderBottom: "1px solid black",
            padding: "20px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button
            className="transparentBtn"
            onClick={() =>
              this.setState({
                bookmarks: true,
                search:false
              })
            }
          >
            Bookmarks
          </button>
          <button className="transparentBtn" onClick={() => {
            this.setState({search:true,bookmarks:false})
            // this.searchHandler()
          }}>
            Search
          </button>
          {/* <button className="transparentBtn" onClick={this.scrollToPage}>
            Scroll To
          </button> */}

          <button
            className="bookmarkBtn"
            onClick={() => {
              const currentPage = this.getCurrentInViewElement();
              if (currentPage) {
                const bookMark = {
                  content: {},
                  comment: {
                    bookMark: true,
                    text: "",
                    emoji: "",
                    color: "",
                    title: `Book marked on Page ${currentPage}`,
                  },
                  position: {
                    boundingRect: {
                      x1: 255.73419189453125,
                      y1: 139.140625,
                      x2: 574.372314453125,
                      y2: 165.140625,
                      width: 809.9999999999999,
                      height: 1200,
                    },
                    pageNumber: Number(currentPage),
                    rects: [
                      {
                        x1: 255.73419189453125,
                        y1: 139.140625,
                        x2: 574.372314453125,
                        y2: 165.140625,
                        width: 809.9999999999999,
                        height: 1200,
                      },
                    ],
                  },
                };
                this.addHighlight(bookMark);
              } else {
                alert("Scroll a bit to properly defining page number!!");
              }
            }}
          >
            <img src={bookMarkIcon} width="20px" />
          </button>
          <button
            className="transparentBtn"
            onClick={() =>
              this.setState({
                bookmarks: false,
                search:false
              })
            }
          >
            Heighlights
          </button>
        </div>
        <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar
            highlights={highlights}
            resetHighlights={this.resetHighlights}
            toggleDocument={this.toggleDocument}
            bookmarks={this.state.bookmarks}
            search={this.state.search}
          />
          <div
            style={{
              height: "100vh",
              width: "75vw",
              position: "relative",
            }}
          >
            <PdfLoader url={url} beforeLoad={<Spinner />}>
              {(pdfDocument) => (
                <PdfHighlighter
                  pdfDocument={pdfDocument}
                  enableAreaSelection={(event) => event.altKey}
                  onScrollChange={resetHash}
                  // pdfScaleValue="page-width"
                  scrollRef={(scrollTo) => {
                    this.scrollViewerTo = scrollTo;

                    this.scrollToHighlightFromHash();
                  }}
                  onSelectionFinished={(
                    position,
                    content,
                    hideTipAndSelection,
                    transformSelection
                  ) => (
                    <Tip
                      onOpen={transformSelection}
                      onConfirm={(comment) => {
                        this.addHighlight({ content, position, comment });

                        hideTipAndSelection();
                      }}
                    />
                  )}
                  highlightTransform={(
                    highlight,
                    index,
                    setTip,
                    hideTip,
                    viewportToScaled,
                    screenshot,
                    isScrolledTo
                  ) => {
                    const isTextHighlight = !Boolean(
                      highlight.content && highlight.content.image
                    );

                    const component = isTextHighlight ? (
                      <Highlight
                        isScrolledTo={isScrolledTo}
                        position={highlight.position}
                        comment={highlight.comment}
                      />
                    ) : (
                      <AreaHighlight
                        isScrolledTo={isScrolledTo}
                        highlight={highlight}
                        onChange={(boundingRect) => {
                          this.updateHighlight(
                            highlight.id,
                            { boundingRect: viewportToScaled(boundingRect) },
                            { image: screenshot(boundingRect) }
                          );
                        }}
                      />
                    );

                    return (
                      <Popup
                        popupContent={<HighlightPopup {...highlight} />}
                        onMouseOver={(popupContent) =>
                          setTip(highlight, () => popupContent)
                        }
                        onMouseOut={hideTip}
                        key={index}
                        children={component}
                      />
                    );
                  }}
                  highlights={highlights}
                />
              )}
            </PdfLoader>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
