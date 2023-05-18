import React, { Component } from "react";

import "../style/Highlight.css";

import type { LTWHP } from "../types.js";

interface Props {
  position: {
    boundingRect: LTWHP;
    rects: Array<LTWHP>;
  };
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  comment: {
    emoji: string;
    text: string;
    color: string;
    bookMark : string

  };
  isScrolledTo: boolean;
}

export class Highlight extends Component<Props> {
  static position: { pageNumber: any; };
  render() {
    const {
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      comment,
      isScrolledTo,
    } = this.props;

    const { rects, boundingRect } = position;
    const colorStyle = {background: comment?.color ?? ''}

    // const bookMark = {pageNumber: comment?.bookMark ?? ''}
    return (
      <div
        className={`Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}`}
      >
        {comment ? (
          <div
            className="Highlight__emoji"
            style={{
              left: 20,
              top: boundingRect.top,
            }}
          >
           
            {comment.emoji}
          </div>
        ) : null}
        <div className="Highlight__parts">
          
          {rects.map((rect, index) => {
           
            // console.log(rects)
            
            const updatedRect = {...rect , ...colorStyle};
            return (
              <>
              <div
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                key={index}
                style={updatedRect}
  
                className={`Highlight__part`}
              />
              </>
            )
           
          } 
          )}
        </div>
      </div>
    );
  }
}

export default Highlight;
