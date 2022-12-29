import React, { useState } from "react";
import {
  Grid,
  Box,
  IconButton,
  Container,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { ImShare2 } from "react-icons/im";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link } from "react-router-dom";
const ShareNreport = () => {
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(false);
  const toggleClass = () => {
    setActive(!isActive);
  };
  const toggleClass1 = () => {
    setActive1(!isActive1);
  };
  return (
    <Box className="usersView">
      <Container maxWidth="lg">
        <figure className="figure">
          <img src="/images/ProfilebgMain.svg" className="img-responsive" alt="" />
          <Box className="share_Box ">
            <Box>
              <Box className={isActive ? "toggel_box show" : "toggel_box hide"}>
                Share link to this page
                <List>
                  <ListItem>
                    <label>
                      <SiFacebook />
                    </label>
                    <Typography variant="h6">Facebook</Typography>
                  </ListItem>
                  <ListItem>
                    <label>
                      <FaTwitter />
                    </label>
                    <Typography variant="h6">Twitter</Typography>
                  </ListItem>
                  <ListItem>
                    <label>
                      <FaTelegramPlane />
                    </label>
                    <Typography variant="h6">Telegram</Typography>
                  </ListItem>
                  <ListItem>
                    <label>
                      <GrMail />
                    </label>
                    <Typography variant="h6">E-mail</Typography>
                  </ListItem>
                </List>
              </Box>
              <Button className="share-btn" onClick={toggleClass}>
                <ImShare2 />
              </Button>
            </Box>
            <Box>
              <Box
                className={isActive1 ? "toggel_box show" : "toggel_box hide"}
              >
                Report Page
              </Box>
              <Button className="share-btn" onClick={toggleClass1}>
                <FiMoreHorizontal />
              </Button>
            </Box>
          </Box>
        </figure>
      </Container>
    </Box>
  );
};

export default ShareNreport;
