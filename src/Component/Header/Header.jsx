import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  faSearch,
  faUser,
  faCartArrowDown,
  faGlobe,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);

  function handleChangeLanguage() {
    if (language === "en") {
      i18n.changeLanguage("vi");
      setLanguage("vi");
    } else {
      i18n.changeLanguage("en");
      setLanguage("en");
    }
  }

  function handleToggleMenu() {
    setToggleMenu((prevState) => !prevState);
  }

  return (
    <header className="header">
      <Container>
        <div className="header__list">
          <button className="header__toggle" onClick={handleToggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Link to="/" className="header__logo">
            <span className="header__logo__text">Flatlogic</span>
          </Link>
          <div
            className="header_menu"
            style={{ display: toggleMenu ? "block" : "none" }}
          >
            <nav>
              <button
                className="header_menu__close-btn"
                onClick={handleToggleMenu}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className="header_menu__logo">
                <span>Flatlogic</span>
              </div>
              <ul className="header_menu__list">
                <li>
                  <Link className="header_menu__list__item" to="/">
                    <span>{t("Home")}</span>
                  </Link>
                </li>

                <li>
                  <Link className="header_menu__list__item" to="/shop">
                    <span>{t("Shop")}</span>
                  </Link>
                </li>

                <li>
                  <Link className="header_menu__list__item" to="/account">
                    <span>{t("Account")}</span>
                  </Link>
                </li>
              </ul>
              <div className="header_menu__account">
                <button
                  type="button"
                  onClick={handleChangeLanguage}
                  className="header_menu__account__item"
                >
                  <FontAwesomeIcon icon={faGlobe} />
                </button>
                <Link className="header_menu__account__item" to="/signin">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                <Link className="header_menu__account__item" to="/shop">
                  <FontAwesomeIcon icon={faSearch} />
                </Link>
              </div>
            </nav>
          </div>
          <nav className="header__nav">
            <ul className="header__nav__list">
              <li>
                <Link className="header__nav__item" to="/">
                  <span>{t("Home")}</span>
                </Link>
              </li>
              <li>
                <Link className="header__nav__item" to="/shop">
                  <span>{t("Shop")}</span>
                </Link>
              </li>
              <li>
                <Link className="header__nav__item" to="/account">
                  <span>{t("Account")}</span>
                </Link>
              </li>
            </ul>
          </nav>

          <ul className="header__account">
            <li className="header__account__list">
              <button
                type="button"
                onClick={handleChangeLanguage}
                className="header__account__item btn mobile-hide"
              >
                <FontAwesomeIcon icon={faGlobe} />
              </button>
              <Link className="header__account__item mobile-hide" to="/shop">
                <FontAwesomeIcon icon={faSearch} />
              </Link>
              <Link className="header__account__item mobile-hide" to="/signin">
                <FontAwesomeIcon icon={faUser} />
              </Link>
              <Link className="header__account__item cart" to="/cart">
                <FontAwesomeIcon icon={faCartArrowDown} />
                <span className="cart_total">{cartQuantity}</span>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
