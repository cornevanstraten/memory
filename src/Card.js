import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Card.css";

class Card extends Component {
  render() {
    const { color, id, hidden, cardClick } = this.props;
    return (
      <div
        className={!hidden ? "card" : "card-hidden"}
        style={{
          backgroundColor: !hidden ? color : "gray",
        }}
        onClick={() => cardClick(id, color)}
      ></div>
    );
  }
}

export default Card;
