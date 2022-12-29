import React from "react";
import { Box, Typography, makeStyles, Container, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import Page from "src/component/Page";

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
      "& h4": {
        paddingBottom: "10px",
        color:"#ffffff"
      },
      "& p": {
        color: "#f1f1f1"
      }
    }
  }
}));


export default function PrivacyPolicy() {
  const classes = useStyles();
  const history = useHistory();
  return (<>
    <Page title="Privacy Policy">

      <Container maxWidth="lg">
        <Box textAlign="center" className={classes.headingBox}>
          <Typography variant="h1" >
            Privacy Policy
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
              We at SHARECHING want you to understand what information we collect, and how we use and share it. That's why we encourage you to read our Privacy Policy. This helps you use SHARECHING Products in the way that's right for you.
              In the Privacy Policy, we explain how we collect, use, share, retain and transfer information. We also let you know your rights. Each section of the Policy includes helpful examples and simpler language to make our practices easier to understand. We've also added links to resources where you can learn more about the privacy topics that interest you.
              It's important to us that you know how to control your privacy, so we also show you where you can manage your information in the settings of the SHARECHING Products you use. You can  to shape your experience.
              Read the full policy below.
            </Typography>
          </Box>
          <Box className="textbox">
            <Typography variant="h4">What if you don't let us collect certain information?</Typography>
            <Typography variant="body2">
              Some information is required for our products to work. Other information is optional, but without it, the quality of your experience might be affected.
            </Typography>
          </Box>
          <Box className="textbox">
            <Typography variant="h4">How do we use your information?</Typography>
            <Typography variant="body2">
              We use  to provide a personalised experience to you, including ads, along with the other purposes that we explain in detail below.
              For some of these purposes, we use information  and . The information that we use for these purposes is automatically processed by our systems. But in some cases, we also use  to access and review your information.
              To use less information that's connected to individual users, in some cases we de-identify or aggregate information. We might also anonymise it so that it no longer identifies you. We use this information in the same ways we use your information as described in this section.
              Here are the ways we use your information:

            </Typography>
          </Box>
          <Box className="textbox">
            <Typography variant="h4">How long do we keep your information for?</Typography>
            <Typography variant="body2">
              We keep information for as long as we need it to provide our products, comply with legal obligations or to protect our or other's interests. We decide how long we need information on a case-by-case basis. Here's what we consider when we decide:
              If we need it to operate or provide our products. For example, we need to keep some of your information to maintain your account. .
              The feature that we use it for and how that feature works. For example, messages sent using Messenger's vanish mode are retained for less time than regular messages. .
              How long we need to retain the information for to comply with certain legal obligations. .
              If we need it for other legitimate purposes, such as to prevent harm; investigate possible violations of our terms or policies; promote safety, security and integrity; or protect ourselves, including our rights, property or products
              In some instances and for specific reasons, we'll keep information for an extended period of time.  about when we may preserve your information.
            </Typography>
          </Box>
          <Box className="textbox">
            <Typography variant="h4">How do we respond to legal requests, comply with applicable law and prevent harm?</Typography>
            <Typography variant="body2">
              We access, preserve, use and share your information:
              In response to legal requests, such as search warrants, court orders, production orders or subpoenas. These requests come from third parties such as civil litigants, law enforcement and other government authorities.  about when we respond to legal requests.
              In accordance with applicable law
              To promote the safety, security and integrity of SHARECHING Products, users, employees, property and the public. .
              We may access or preserve your information for an extended amount of time. .
            </Typography>
          </Box>
        </Box>
      </Container>
    </Page>

  </>

  );
}
