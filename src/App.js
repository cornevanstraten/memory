import React, { Component } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      count: 0,
    };
    this.cardClick = this.cardClick.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  newGame() {
    let unshuffled = Array(10)
      .fill()
      .map(() => {
        return {
          color: this.getRandomColor(),
          hidden: true,
          found: false,
        };
      });
    unshuffled = unshuffled.concat(unshuffled);

    let shuffled = unshuffled
      .map((a) => ({ rank: Math.random(), ...a }))
      .sort((a, b) => a.rank - b.rank)
      .map((a, index) => {
        return { ...a, id: index };
      });
    this.setState({ cards: shuffled, count: 0 });
  }

  getRandomColor() {
    const colorIndex = Math.floor(Math.random() * this.props.allColors.length);
    return this.props.allColors[colorIndex];
  }

  cardClick(id, color) {
    let count = this.state.count + 1;
    const cards = this.state.cards.map((card, index) => {
      if (card.id === id) {
        return { ...card, hidden: false };
      }
      return card;
    });
    this.setState({ cards, count }, () => {
      this.evaluate(color);
    });
  }

  evaluate(color) {
    let count = this.state.count;
    if (count > 1) {
      count = 0;
      const openCardsThisColor = this.state.cards.filter(
        (card) => card.hidden === false && card.color === color
      );
      if (openCardsThisColor.length > 1) {
        const cards = this.state.cards.map((card) => {
          if (card.hidden === false && card.color === color) {
            return { ...card, found: true };
          }
          return card;
        });
        setTimeout(() => {
          this.setState({ cards, count }, () => {
            this.checkWin();
          });
        }, 300);
      } else {
        const cards = this.state.cards.map((card) => {
          if (card.found === false) {
            return { ...card, hidden: true };
          }
          return card;
        });
        setTimeout(() => {
          this.setState({ cards, count });
        }, 500);
      }
    }
  }

  checkWin() {
    const unfound = this.state.cards.reduce((acc, card) => {
      return acc + !card.found;
    }, 0);
    if (unfound === 0) {
      alert("You win!");
      this.newGame();
    }
  }

  render() {
    const cards = this.state.cards.map((card, index) => (
      <Card
        key={index}
        color={card.color}
        id={card.id}
        hidden={card.hidden}
        cardClick={this.cardClick}
      />
    ));
    return (
      <div className="App">
        <Navbar onNewGame={this.newGame} />
        <div>{cards}</div>
      </div>
    );
  }
}

App.defaultProps = {
  allColors: [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "Darkorange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ],
};

export default App;
