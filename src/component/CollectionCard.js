import React, { useEffect } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Container,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { tokenName } from "@/utils";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    // padding: "20px",
    cursor: "pointer",
    border: "2px solid #19999A",
    borderRadius: "9px",
    transition: "0.3s",
    backgroundColor: "transparent",
    "&:hover": {
      background: "linear-gradient(19.68deg, #075F7D 22%, #012633 67.37%)",
      transform: "translateY(-5px)",
    },
    "& h6": {
      width: "100%",
      maxWidth: "70%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      margin: "3px auto",
      color: "#ffffff",
    },
    "& figure": {
      width: "100%",
      maxWidth: "70px",
      height: "70px",
      borderRadius: "50%",
      overflow: "hidden",
      margin: "0 auto",
      marginTop: "-40px",
      position: "relative",
      background:
        "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: " blur(42px)",
      border: "3px solid #161616",
      background: "rgb(42 123 135)",
      "& img": {
        width: "100%",
      },
      "& .vectorBox": {
        position: "absolute",
        top: "0px",
        right: "0px",
        zIndex: "1",
      },
    },
  },
  mainimg: {
    width: "100%",
    height: "130px !important",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px 10px 0px 0px",
    backgroundColor: "#ccc !important",
  },
  pricedata: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "8px",
    "& h6": {
      fontSize: "14px",
      color: "#ae8c3f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));
export default function HotCollectionCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, index } = props;
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Paper className={classes.root}>
      <Box
        id={`imagecard${index}`}
        className={classes.mainimg}
        style={{ background: "url(" + data?.image + ")" }}
        onClick={() => {
          history.push("/collection-details");
        }}
      ></Box>
      <figure>
        <img src={data?.img} alt="user" />
      </figure>
      <Typography variant="h6" align="center">
        {" "}
        {data?.name}{" "}
      </Typography>
      <Box className={classes.pricedata}>
        <Typography variant="h6">
          &nbsp;&nbsp;
          {data?.price}&nbsp;
          {tokenName}
        </Typography>
      </Box>
    </Paper>
  );
}
