import { Typography, Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  UserBox: {
    display: "flex",
    alignItems: "center",
    "& h6": {
      fontWeight: "600",
    },
    "& select": {
      backgroundColor: "#595a5a",
      color: "#cac7c7",
      padding: "5px 10px",
      borderRadius: "3px",
      border: "none",
      "&:focus-visible": {
        outline: "none",
      },
    },
    "& figure": {
      margin: "0",
      marginRight: "15px",
      height: "60px",
      width: "60px",
      borderRadius: "50%",
      overflow: "hidden",
      backgroundColor: "#101010",
      "& img": {
        width: "auto",
        maxWidth: "100%",
        maxHeight: "60px",
      },
    },
  },
}));

export default function (props) {
  const classes = useStyles();
  return (
    <Box className={classes.UserBox}>
      <figure>
        <img src="images/user.png" />
      </figure>
      <Box>
        <Typography variant="h6">Umair Siddiqui</Typography>
        <select>
          <option>Public</option>
          <option>Privacy</option>
        </select>
      </Box>
    </Box>
  );
}
