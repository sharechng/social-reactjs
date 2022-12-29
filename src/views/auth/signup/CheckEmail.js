import React, { useState } from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Button,
  Link,
  Paper,
} from "@material-ui/core";
import Page from "src/component/Page";
import { Link as RouterComponent, useHistory } from "react-router-dom";
import { FaTransgender } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  get: {
    alignItems: "center",
    textAlign: "center",
    marginTop: "5rem",
    marginBottom: "1rem",
  },
  loginBox: {
    padding: "40px 30px",
    textAlign: "center",
  },
}));

function CheckEmail() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Page title="Check Email">
        <Container maxWidth="sm">
          <Box textAlign="center" mt={5} mb={5}>
            <Typography variant="h2">Check your email</Typography>
            <Typography variant="h6">
              We’ve sent a link to your email address: abcd@gmail.com
            </Typography>
          </Box>
          <Paper
            className="coin_list"
            elevation={2}
            className={classes.loginBox}
          >
            <Box mb={3}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                onClick={() => history.push("/")}
              >
                Skip Now
              </Button>
            </Box>
            <Box>
              Don’t receive an email?&nbsp;
              <Link component={RouterComponent} to="/">
                Resend
              </Link>
            </Box>
          </Paper>
        </Container>
      </Page>
    </>
  );
}

export default CheckEmail;
