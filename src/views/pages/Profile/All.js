import React, { useContext } from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/User";
import BlackMarketCard from "src/component/BlackMarketCard";
// import { exploreData } from "src/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 0px",
    "& .heading": {
      color: "#000000",
    },
  },
}));
const TeamMap = [
  {
    image1: "images/1.png",
    bPrice: "19",
    text1: "NK20",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/3.png",
    bPrice: "12",
    text1: "BLACK KI",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/4.png",
    bPrice: "84",
    text1: "Eagle (AMC)",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/5.png",
    bPrice: "23",
    text1: "Blackhawk (Stutz)",
    text2: "0/0/0",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/1.png",
    bPrice: "73",
    text1: "Tiger (Sunbeam)",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/3.png",
    bPrice: "95",
    text1: "Sunbird (Pontiac)",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
];
export default function Itembox() {
  const classes = useStyles();
  const user = useContext(UserContext);
  return (
    <Box className={classes.root}>
      <Grid container spacing={3}>
        {TeamMap.map((data, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={i}>
              <BlackMarketCard data={data} type="card" index={i} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
