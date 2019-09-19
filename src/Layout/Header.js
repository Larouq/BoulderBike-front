import React, { Component } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./Layout.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "black",
      displayBurger: true
    };
  }

  listenScrollEvent = e => {
    if (window.scrollY > 50) {
      this.setState({ color: "rgba(0, 0, 0, 0.6)" });
    } else {
      this.setState({ color: "black" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.listenScrollEvent);
    window.addEventListener("resize", this.listenResizeEvent);
  }

  listenResizeEvent = e => {
    if (window.innerWidth < 1024) {
      this.setState({ displayBurger: false });
    } else {
      this.setState({ displayBurger: true });
    }
  };

  render() {
    const isMenuOpen = function(state) {
      return state.isOpen;
    };

    return (
      <header className="App-header" style={{ background: this.state.color }}>
        <nav>
          <Link style={{ textDecoration: "none" }} to="/">
            <h1 className="name">BoulderBikeTour</h1>
          </Link>
          {this.state.displayBurger ? (
            <div className="navbar">
              <Link className="navlink" to="/">
                Home
              </Link>
              <Link className="navlink" to="/photos">
                Photos
              </Link>
              <Link className="navlink" to="/location">
                Location
              </Link>
              <Link className="navlink" to="/riders">
                Riders
              </Link>
              <Link className="navlink" to="/sponsoring">
                Sponsoring
              </Link>
              <p
                className="bar"
                style={{
                  color: "white",
                  marginRight: "10px",
                  marginLeft: "10px"
                }}
              >
                |
              </p>
              <div className="styleicon">
                {icons.map((icon, index) => (
                  <div className={"iconback"} key={index}>
                    <a
                      className={icon.image}
                      href={icon.link}
                      target={"blank"}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Menu className="bm-menu-wrap" right onStateChange={isMenuOpen}>
              <Link className="menu-item" to="/">
                Home
              </Link>
              <Link className="menu-item" to="/photos">
                Photos
              </Link>
              <Link className="menu-item" to="/location">
                Location
              </Link>
              <Link className="menu-item" to="/riders">
                Riders
              </Link>
              <Link className="menu-item" to="/sponsoring">
                Sponsoring
              </Link>
            </Menu>
          )}
        </nav>
      </header>
    );
  }
}

const icons = [
  { image: "icon icon-facebook", link: "https://www.facebook.com" },
  { image: "icon icon-instagram", link: "https://www.instagram.com" },
  { image: "icon icon-twitter", link: "https://www.twitter.com" }
];

export default Header;
