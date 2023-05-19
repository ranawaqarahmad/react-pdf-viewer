import React, { Component } from "react";

import "../style/Tip.css";

interface State {
  compact: boolean;
  bookMark: boolean;
  title: string;
  text: string;
  emoji: string;
  color: string;
}

interface Props {
  onConfirm: (comment: {
    bookMark: boolean;
    title: string;
    text: string;
    emoji: string;
    color: string;
  }) => void;
  onOpen: () => void;
  onUpdate?: () => void;
}

export class Tip extends Component<Props, State> {
  state: State = {
    compact: true,
    bookMark: false,
    title: "",
    text: "",
    emoji: "",
    color: "",
  };

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen } = this.props;
    const { compact, bookMark, title, text, emoji, color } = this.state;

    return (
      <div className="Tip">
        {compact ? (
          <div
            className="Tip__compact"
            onClick={() => {
              onOpen();
              this.setState({ compact: false });
            }}
          >
            Add highlight
          </div>
        ) : (
          <form
            className="Tip__card"
            onSubmit={(event) => {
              event.preventDefault();
              onConfirm({ title, text, emoji, color, bookMark });
            }}
          >
            <div className="resize ">
              <label className="textfont">Title</label>
              <input
                className="inputfield"
                placeholder="Title"
                autoFocus
                value={title}
                onChange={(event) =>
                  this.setState({ title: event.target.value })
                }
              />
              <label className="textfont">Comment</label>
              <textarea
                placeholder="Your comment"
                autoFocus
                value={text}
                onChange={(event) =>
                  this.setState({ text: event.target.value })
                }
              />
              {/* <div style={{ margin: "10px 0" }}>
                {["💩", "😱", "😍", "🔥", "😳", "⚠️"].map((_emoji) => (
                  <label key={_emoji}>
                    <input
                      checked={emoji === _emoji}
                      type="radio"
                      name="emoji"
                      value={_emoji}
                      onChange={(event) =>
                        this.setState({ emoji: event.target.value })
                      }
                    />
                    {_emoji}
                  </label>
                ))}
              </div> */}
              {/* <div className="colors">
                {["red", "green", "yellow", "blue", "pink"].map((_color) => (
                  <button
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "16px",
                      backgroundColor: _color,
                      marginRight: "10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ color: _color });
                    }}
                  ></button>
                ))}
              </div> */}
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "18px"
            }}>
            <div className="colors">
                {["red", "green", "yellow", "blue", "pink"].map((_color) => (
                  <button
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "16px",
                      backgroundColor: _color,
                      marginRight: "10px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({ color: _color });
                    }}
                  ></button>
                ))}
              </div>
            <div>
              <input type="submit" value="Save" className="savebtn" />
            </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Tip;
