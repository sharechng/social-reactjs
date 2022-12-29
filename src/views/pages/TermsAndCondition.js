import React from "react";
import { Box, Typography, makeStyles, Container, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import Page from "src/component/Page";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  headingBox: {
    marginTop: "30px",
    position: "relative",
    "& .closeicon": {
      position: 'absolute',
      top: "0px",
      right: "-90px",
      "& Button": {
        color: "#FFFFFF",
        backgroundColor: "rgba(255, 255, 255, 0.12)"
      }
    },
    "& h1": {
      color: "#fff"
    }
  },
  mainBox: {
    margin: "30px 0px",
    "& .textbox": { 
      marginTop: "30px",
      "& p": {
        color: "#fff"
      }
    }
  }
}));

export default function TermsAndCondition() {
  const classes = useStyles();
  const history = useHistory();
  return (<>
    <Page title="Terms and condition">

      <Container maxWidth="lg">
        <Box textAlign="center" className={classes.headingBox}>
          <Typography variant="h1" >
            Terms and condition
          </Typography>
          <Box className="closeicon">
            <IconButton onClick={() => history.push("/signup")}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.mainBox}>
          <Box className="textbox">
            <Typography variant="body2">
            SHARECHING builds technologies and services that enable people to connect with each other, build communities and grow businesses. These Terms govern your use of Facebook, Messenger and the other products, features, apps, services, technologies and software that we offer (the SHARECHING Products or Products), except where we expressly state that separate terms (and not these) apply. These Products are provided to you by SHARECHING Platforms, Inc.
            </Typography>
          </Box>
          <Box className="textbox">
            <Typography variant="body2">
            We don't charge you to use Facebook or the other products and services covered by these Terms, unless we state otherwise. Instead, businesses, organisations and other persons pay us to show you ads for their products and services. By using our Products, you agree that we can show you ads that we think may be relevant to you and your interests. We use your personal data to help determine which personalised ads to show you.
            </Typography>
          </Box>
          <Box className="textbox">
            <Typography variant="body2">
            We don't sell your personal data to advertisers, and we don't share information that directly identifies you (such as your name, email address or other contact information) with advertisers unless you give us specific permission. Instead, advertisers can tell us things such as the kind of audience that they want to see their ads, and we show those ads to people who may be interested. We provide advertisers with reports about the performance of their ads that help them understand how people are interacting with their content. See Section 2 below to learn more about how personalised advertising under these Terms works on the SHARECHING Products.
            </Typography>
          </Box>
          <Box className="textbox">
            <Typography variant="body2">
            Our Privacy Policy explains how we collect and use your personal data to determine some of the ads that you see and provide all of the other services described below. You can also go to your settings pages of the relevant SHARECHING Product at any time to review the privacy choices that you have about how we use your data.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Page>
  </>
  );
}
