import React from "react";
import { Box, Grid } from "@material-ui/core";
import { exploreData } from "src/constants";
import ExploreCard from "src/component/ExploreCard";
import BundlesCard from "src/component/BundlesCard";

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
  {
    image1: "images/4.png",
    bPrice: "85",
    text1: "Borno",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
  {
    image1: "images/5.png",
    bPrice: "16",
    text1: "Lark (Studebaker)",
    text2: "Alberts",
    text3: "#4023",
    text4: "Min Bid",
    text5: "Price",
    text6: "0.2",
    text7: "4",
  },
];
const OnSale = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        {TeamMap.map((data, i) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <BundlesCard data={data} type="card" index={i} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default OnSale;
