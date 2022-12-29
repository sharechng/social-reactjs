import React, { useContext } from "react";
import { Typography, Box, makeStyles, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { UserContext } from "src/context/User";
import BlackMarketCard from "src/component/BlackMarketCard";
import { exploreData } from "src/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px 0px",
    "& .heading": {
      color: "#000000",
    },
  },
}));

export default function Itembox() {
  const classes = useStyles();
  const user = useContext(UserContext);
  return (
    <Box className={classes.root}>
      <Grid container spacing={1}>
        {exploreData.map((data, i) => {
          return (
            <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
              <BlackMarketCard type="card" data={data} key={i} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
