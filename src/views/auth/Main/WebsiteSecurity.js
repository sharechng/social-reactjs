import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import ExploreIcon from "@material-ui/icons/Explore";
import InfoIcon from "@material-ui/icons/Info";
import LanguageIcon from "@material-ui/icons/Language";
import WifiIcon from "@material-ui/icons/Wifi";
import {} from "react-feather";
const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.background.default,
    padding: 20,
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  iconBox: {
    background: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px",
    },
  },
}));
export default function WebsiteSecurity() {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className="sectionPadding">
      <Box textAlign="center">
        <Container maxWidth="sm" data-aos="zoom-in-up">
          <Typography variant="h4" paragraph>
            Best Features
          </Typography>
          <Typography>
            The ICO crypto team combines a passion for esports, industry
            experise & proven record in finance, development, marketing.
          </Typography>
        </Container>
      </Box>
      <Box my={5}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            data-aos="zoom-in-up"
            data-aos-delay={0}
          >
            <Box className={`${classes.card} single-security boxShadow`}>
              <Box className={`${classes.iconBox} icon-Box`} mb={2}>
                <ExploreIcon fontSize="large" />
              </Box>
              <Typography variant="h5" paragraph>
                Instant Exchange
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            data-aos="zoom-in-up"
            data-aos-delay={200}
          >
            <Box className={`${classes.card} single-security`}>
              <Box className={`${classes.iconBox} icon-Box`} mb={2}>
                <WifiIcon fontSize="large" />
              </Box>
              <Typography variant="h5" paragraph>
                Instant Cashout
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            data-aos="zoom-in-up"
            data-aos-delay={400}
          >
            <Box className={`${classes.card} single-security`}>
              <Box className={`${classes.iconBox} icon-Box`} mb={2}>
                <InfoIcon fontSize="large" />
              </Box>
              <Typography variant="h5" paragraph>
                Safe & Secure
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            data-aos="zoom-in-up"
            data-aos-delay={600}
          >
            <Box className={`${classes.card} single-security`}>
              <Box className={`${classes.iconBox} icon-Box`} mb={2}>
                <LanguageIcon fontSize="large" />
              </Box>
              <Typography variant="h5" paragraph>
                Instant Cashout
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            data-aos="zoom-in-up"
            data-aos-delay={200}
          >
            <Box className={`${classes.card} single-security`}>
              <Box className={`${classes.iconBox} icon-Box`} mb={2}>
                <WifiIcon fontSize="large" />
              </Box>
              <Typography variant="h5" paragraph>
                Instant Cashout
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            data-aos="zoom-in-up"
            data-aos-delay={400}
          >
            <Box className={`${classes.card} single-security`}>
              <Box className={`${classes.iconBox} icon-Box`} mb={2}>
                <InfoIcon fontSize="large" />
              </Box>
              <Typography variant="h5" paragraph>
                Safe & Secure
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
