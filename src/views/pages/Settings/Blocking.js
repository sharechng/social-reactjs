import React from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  TextField,
} from "@material-ui/core";
import BlockingCard from "./BlockingCard";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function Blocking({ userData1, callBackFun }) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h3" color="primary.main">
          Blocked Users
        </Typography>
        <Box mt={2}>
          <BlockingCard userData1={userData1} callBackFun={callBackFun} />
        </Box>
      </Box>
    </>
  );
}

export default Blocking;
