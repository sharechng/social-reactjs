import React from "react";
import {
  Box,
  makeStyles,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
} from "@material-ui/core";

import StarsIcon from "@material-ui/icons/Stars";
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  bannerImg: {
    position: "relative",
    filter: "drop-shadow(0px 24px 54px rgba(13, 167, 233, 0.25))",

    //background:
    //  'linear-gradient(39deg, rgb(63 17 120 / 28%) 21%, rgb(139 70 191 / 32%) 70%, rgba(255,0,204,1) 100%)',
    //padding: '15px',
    //borderRadius: '10px',
    //boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    cursor: "pointer",

    "& img": {
      width: "auto",
      maxWidth: "100%",
      maxHeight: "200px",
    },

    "& p": {
      display: "flex",
      fontWeight: "500",
      color: "#ffffff",
      fontSize: "13px",
      "& span": {
        color: "#28e7f0",
      },
    },
  },
  carbox: {
    position: "relative",
    padding: "35px 26px 25px 24px",
    border: "2px solid #19999A",
    borderRadius: "9px",
    transition: "0.3s",
    marginLeft:"7px",
    "&:hover": {
      background: "linear-gradient(19.68deg, #075F7D 22%, #012633 67.37%)",
      transform: "translateY(-5px)",
    },
  },
  dummybox: {
    background: "#07030d91",
    "& h5": {
      display: "flex",
      fontWeight: "500",
      color: "#ffffff",
    },
  },
  box: {
    backgroundColor: "#241B30",
    padding: "20px",
  },
  headtext: {
    "& h2": {
      fontSize: "25px",
      fontWeight: "500",
      color: "#ffffff",
    },
    "& p": {
      fontSize: "16px",
      fontWeight: "400",
      color: "#ffffff",
      paddingTop: "10px",
      "@media(max-width:768px)": {
        fontSize: "20px",
      },
    },
  },
  price: {
    fontSize: "18px",
    fontWeight: "300",
    color: "#ffffff",
    paddingTop: "30px",
    paddingBottom: "10px",
    backgroundColor: "#231437 ",
  },
  btnbox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    fontSize: "20px",
    backgroundColor: "#2D2D4A",
    paddingTop: "4px",
    paddingBottom: "4px",
    borderRadius: "21px",
  },
  price: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "11px",
    // backgroundColor: "#231437 ",
    "& h4": {
      fontSize: "16px",
      fontWeight: "500",
      color: "#fff",

      letterSpacing: "1px",
    },
  },
  icons: {
    backgroundColor: "#FA1C5F",
    color: "#3D122F",
    borderRadius: "50px",
    fontSize: "36px",
  },

  pricesection: {
    marginTop: "5px",
    "& h6": {
      fontSize: "16px",
      lineHeignt: "20px",
      fontWeight: "500",
      color: "#AE8C3F",
      letterSpacing: "1px",
    },
    "& p": {
      fontSize: "13px",
      fontWeight: "300",
      display: "block",
    },
  },
  cardImages: {
    border: "1px solid #c29c29",
    width: "100%",
    height: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function BlackMarketCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { data, blackMarket } = props
  return (
    <Box
      onClick={() => {
        history.push({
          pathname: "/nft-details",
          search: blackMarket,
          state: {
            data: data,
          },
        });
      }}
      className={classes.gallryBox}
    >
      <Box className={classes.bannerImg}>
        <Box className={classes.carbox}>
          <Box className={classes.cardImages}>
            <img src="./images/banner/magicbox1.png" alt="" />
          </Box>
          <Box classname={classes.dummybox}>
            <Box mt={2}>
              <Typography variant="h4" style={{ color: "#25FCFF" }}>
                {data.text1}
              </Typography>
            </Box>
            <Box className={classes.price}>
              <Typography variant="body1">{data.text3}</Typography>
            </Box>

            <Grid container spacing={1} className={classes.pricesection}>
              <Grid item xs={6}>
                <Typography variant="body2">{data.text4}</Typography>
              </Grid>
              <Grid item xs={6} align="right">
                <Typography variant="body2">
                  {data.text5}
                  </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  {data.text6}
                  </Typography>
              </Grid>
              <Grid item xs={6} align="right">
                <Typography variant="h6">$ 
                {data.text7}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
