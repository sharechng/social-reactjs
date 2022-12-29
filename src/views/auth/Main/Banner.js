import React from "react";
import { Box, Button, Typography, Container, Grid } from "@material-ui/core";
import { CallMade, Telegram } from "@material-ui/icons";

import {} from "react-feather";
export default function Banner() {
  return (
    <Box className="home-banner" style={{}}>
      <Container maxWidth="lg">
        <Box my={8} className="white-text">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} data-aos="zoom-in-up" data-aos-delay={0}>
              <Typography className="white-text" variant="h1">
                A custom bottle for your dark spots and no one else's
              </Typography>
              <Typography className="white-text" variant="h6">
                Get glowing skin with a powerful cream mixed for you.
              </Typography>
              <Box mt={4}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Telegram />}
                  style={{ marginBottom: 20 }}
                >
                  Unlock your free offer
                </Button>
                <Typography>
                  30-day trial. $4.95 S&H. Subject to consultation.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              data-aos="zoom-in-up"
              data-aos-delay={200}
              className="text-center"
            >
              <img
                src="images/home_img.png"
                alt="ico"
                style={{ maxWidth: "100%" }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box maxWidth={600}></Box>

        <div className="lines">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="circle4"></div>
        </div>
      </Container>
    </Box>
  );
}
