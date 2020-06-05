import React from "react";
import "./Card.css";

const Card = ({ color, id, hidden, cardClick }) => (
  <div
    className={!hidden ? "card" : "card-hidden"}
    style={{
      backgroundColor: !hidden ? color : "gray",
    }}
    onClick={() => cardClick(id, color)}
  ></div>
);

export default Card;
