import React from "react";
import "../styles/header.css";
import logo from "../assets/react.svg";
import { Container, Row } from "reactstrap";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
];
const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>ProductCatalog</h1>
              </div>
            </div>
            <div className="navigation">
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    {item.display}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mobile__menu">
              <span>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
