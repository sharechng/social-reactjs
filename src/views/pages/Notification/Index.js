import React from "react";
import { makeStyles, Box, Grid, Paper } from "@material-ui/core";
import NotificationList from "./NotificationList";
import Subscriber from "./Subscriber";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    "@media(max-width:767px)": {
      padding: "8px",
    },
  },
}));
function Index() {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Grid container spacing={2}>
          <Grid item lg={8} sm={12} md={7} xs={12}>
            <NotificationList />
          </Grid>
          <Grid item lg={4} sm={12} md={5} xs={12}>
            <Subscriber />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Index;
