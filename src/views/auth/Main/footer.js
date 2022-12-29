import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@material-ui/core";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import {} from "react-feather";
export default function Footer() {
  return (
    <Box py={5} className="footerHome">
      <Container maxWidth="lg">
        <Box className="white-text">
          <Grid container spacing={1}>
            <Grid
              item
              xs={12}
              sm={12}
              data-aos="zoom-in-up"
              data-aos-delay={0}
              className="text-center"
            >
              <Box display="flex" className="text-center justify-center">
                <IconButton style={{ color: "white", marginRight: "3px" }}>
                  <FaFacebookF size={14} color="white" />
                </IconButton>
                <IconButton style={{ color: "white", marginRight: "3px" }}>
                  <FaTwitter size={14} color="white" />
                </IconButton>
                <IconButton style={{ color: "white", marginRight: "3px" }}>
                  <FaLinkedinIn size={14} color="white" />
                </IconButton>
                <IconButton style={{ color: "white", marginRight: "3px" }}>
                  <FaInstagram size={14} color="white" />
                </IconButton>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              data-aos="zoom-in-up"
              data-aos-delay={0}
              className="text-center"
            >
              <Typography className="white-text " variant="body2">
                © copyright 2021 | All right reserved.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
