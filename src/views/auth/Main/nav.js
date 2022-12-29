import React from "react";
import { useHistory } from "react-router-dom";
import { RiMenu5Fill } from "react-icons/ri";
import { Typography, Container } from "@material-ui/core";
import Logo from "src/component/Logo";
export default function ({ buttonClick }) {
  const history = useHistory();
  return (
    <div className="navbar">
      <Container maxWidth="lg">
        <nav>
          <input type="checkbox" id="check" />

          <label for="check" className="checkbtn">
            <RiMenu5Fill size={22} color="black" />
          </label>
          <label clasnames="logo">
            <Logo  width="125" style={{ marginTop: "20px" }} />
          </label>
          <ul className="navigation">
            <li onClick={() => buttonClick("home")}>
              <Typography variant="h6" paragraph>
                Home
              </Typography>
            </li>
            <li onClick={() => buttonClick("about")}>
              <Typography variant="h6" paragraph>
                About Us
              </Typography>
            </li>
            <li onClick={() => buttonClick("features")}>
              <Typography variant="h6" paragraph>
                Features
              </Typography>
            </li>
            <li onClick={() => buttonClick("faq")}>
              {" "}
              <Typography variant="h6" paragraph>
                Faq's
              </Typography>
            </li>
            <li onClick={() => buttonClick("roadmap")}>
              {" "}
              <Typography variant="h6" paragraph>
                Roadmap
              </Typography>
            </li>
            <li onClick={() => buttonClick("contact")}>
              {" "}
              <Typography variant="h6" paragraph>
                Contact Us
              </Typography>
            </li>
            <li onClick={() => history.push("/login")}>
              {" "}
              <Typography variant="h6" paragraph className="loginButton">
                Login
              </Typography>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
}
