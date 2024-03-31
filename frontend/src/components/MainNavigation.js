import { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthForm from "./AuthForm";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [isPopupOpen, setPopupOpen] = useState({
    isOpen: false,
    popupFor: "",
  });

  const popupRef = useRef();

  const handlePopupOpen = (forValue) => {
    localStorage.setItem("popupForOpen", true);
    setPopupOpen({ ...isPopupOpen, isOpen: true, popupFor: forValue });
    localStorage.setItem("popupFor", forValue);
  };

  let popupForOpen = JSON.parse(localStorage.getItem("popupForOpen")) || false;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handlePopupClose();
      }
    };

    if (isPopupOpen.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopupOpen.isOpen]);

  useEffect(() => {
    setPopupOpen({ ...isPopupOpen, isOpen: popupForOpen });
  }, [localStorage.getItem("popupForOpen")]);

  const handlePopupClose = () => {
    setPopupOpen({ ...isPopupOpen, isOpen: false });
    localStorage.setItem("popupForOpen", false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section === "home-page") {
      scrollToTop();
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isLoggedInAndOnMainPage = token && location.pathname === "/";

  return (
    <>
      {(isLoggedInAndOnMainPage || !token) && (
        <header className={classes.header}>
          <nav>
            <ul className={classes.list}>
              <li>
                <NavLink
                  className={classes.button}
                  onClick={() => scrollToSection("root")}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={classes.button}
                  onClick={() => scrollToSection("about-us")}
                >
                  About Us
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={classes.button}
                  onClick={() => scrollToSection("contact-us")}
                >
                  Contact Us
                </NavLink>
              </li>

              {!token && (
                <>
                  <li>
                    <NavLink
                      className={classes.button}
                      onClick={() => handlePopupOpen("signup")}
                    >
                      Join
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={classes.button}
                      onClick={() => handlePopupOpen("login")}
                    >
                      Sign in
                    </NavLink>
                  </li>
                </>
              )}

              {token && isLoggedInAndOnMainPage && (
                <li>
                  <button className={classes.logoutButton} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </nav>

          {isPopupOpen.isOpen && (
            <div className={classes.popup} ref={popupRef}>
              {/* Your popup content goes here */}
              {/* <button onClick={handlePopupClose}>Close Popup</button> */}
              <AuthForm
                Mode={isPopupOpen.popupFor}
                show={isPopupOpen.isOpen}
                onClickOutside={handlePopupClose}
              />
            </div>
          )}
        </header>
      )}
    </>
  );
}

export default MainNavigation;
