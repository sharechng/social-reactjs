import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Grid,
} from "@material-ui/core";
import { MdCollectionsBookmark } from "react-icons/md";
import { FaUserFriends, FaUsersSlash, FaWallet } from "react-icons/fa";
import { SiSpringCreators } from "react-icons/si";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { RiAuctionFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";
import { RiRadioButtonLine } from "react-icons/ri";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { MdOnlinePrediction } from "react-icons/md";

import Axios from "axios";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
    padding: "15px 15px 50px 15px",
  },
  gridBox: {
    margin: "15px 0px",
  },
  dashboardContent: {
    height: "100%",
    padding: "15px",
    backgroundColor: "#373636",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.down("xs")]: {
      height: "auto",
    },
    "&:hover": {
      boxShadow:
        "0 0 1rem #000000, 0 0 0rem #373636, 0 0 1rem #000000, 0 0 4rem #101010",
    },
    "& svg": {
      fontSize: "30px",
      color: "#fff",
    },
    "& h3": {
      color: "#FFF",
      whiteSpace: "pre",
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "calc(100% - 5px)",
    },
  },
}));

function Dashboard({ data, index }) {
  const classes = useStyles();
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [dashboarddata, setdashboarddata] = useState();
  useEffect(() => {
    if (auth?.userData?.userType === "User") {
      history.push("/explore")

    }
  }, [auth?.userData?.userType])
  // const walletBalance = `${dashboarddata?.binanceRes.toFixed(2)}`;

  const dashboardapi = async () => {
    try {
      const response = await Axios({
        method: "GET",
        url: Apiconfigs.dashboard,
      });
      if (response.data.responseCode === 200) {
        setdashboarddata(response.data.result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    dashboardapi();
  }, []);

  return (
    <>
      <Paper className={classes.root}>
        <Box className={classes.heading}>
          <Typography
            variant="h3"
            // color="primary.main"
            style={{ color: "#e6e5e8" }}
          >
            Dashboard
          </Typography>
        </Box>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.gridBox}>
              <Box className={classes.dashboardContent} align="center">
                <FaUserFriends />
                <Box mt={1} mb={1}>
                  <Typography variant="h5">Total Active Users</Typography>
                </Box>
                <Typography variant="h3">
                  {dashboarddata?.totalActiveUser
                    ? dashboarddata?.totalActiveUser
                    : "0"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.gridBox}>
              <Box className={classes.dashboardContent} align="center">
                <FaUsersSlash />
                <Box mt={1} mb={1}>
                  <Typography variant="h5">Total Blocked Users</Typography>
                </Box>
                <Typography variant="h3">
                  {dashboarddata?.totalBlockUser
                    ? dashboarddata?.totalBlockUser
                    : "0"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.gridBox}>
              <Box className={classes.dashboardContent} align="center">
                <MdCollectionsBookmark />
                <Box mt={1} mb={1}>
                  <Typography variant="h5"> Total Collection</Typography>
                </Box>
                <Typography variant="h3">
                  {dashboarddata?.totalCollection
                    ? dashboarddata?.totalCollection
                    : "0"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.gridBox}>
              <Box className={classes.dashboardContent} align="center">
                <RiAuctionFill />
                <Box mt={1} mb={1}>
                  <Typography variant="h5"> Total Auctions</Typography>
                </Box>
                <Typography variant="h3">
                  {dashboarddata?.totalAuction
                    ? dashboarddata?.totalAuction
                    : "0"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.gridBox}>
              <Box className={classes.dashboardContent} align="center">
                <SiSpringCreators />
                <Box mt={1} mb={1}>
                  <Typography variant="h5">Total Creators</Typography>
                </Box>
                <Typography variant="h3">
                  {" "}
                  {dashboarddata?.totalUser ? dashboarddata?.totalUser : "0"}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              lg={3}
              md={4}
              sm={6}
              xs={12}
              className={classes.gridBox}
              style={{ cursor: "pointer" }}
            >
              <Box className={classes.dashboardContent} align="center">
                <BiTransfer />
                <Box mt={1} mb={1}>
                  <Typography
                    variant="h5"
                    onClick={() => history.push("/transaction-history")}
                  >
                    {" "}
                    Total Transactions
                  </Typography>
                </Box>
                <Typography variant="h3">
                  {dashboarddata?.totalTransaction
                    ? dashboarddata?.totalTransaction
                    : "0"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.gridBox}>
              <Box className={classes.dashboardContent} align="center">
                <FaWallet />
                <Box mt={1} mb={1}>
                  <Typography variant="h5">
                    {" "}
                    Total Admin Wallet Balance
                  </Typography>
                </Box>
                <Typography variant="h3">
                  {dashboarddata?.binanceRes
                    ? dashboarddata?.binanceRes
                    : "0"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.gridBox}>
              <Box className={classes.dashboardContent} align="center">
                <MdOnlinePrediction />
                <Box mt={1} mb={1}>
                  <Typography variant="h5">
                    {" "}
                    Total Active User 3 days
                  </Typography>
                </Box>
                <Typography variant="h3">
                  {dashboarddata?.activeUser3days
                    ? dashboarddata?.activeUser3days
                    : "0"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.gridBox}>
              <Box className={classes.dashboardContent} align="center">
                <MdOutlineOnlinePrediction />
                <Box mt={1} mb={1}>
                  <Typography variant="h5">
                    {" "}
                    Total Active User 7 days
                  </Typography>
                </Box>
                <Typography variant="h3">
                  {dashboarddata?.activeUser3days
                    ? dashboarddata?.activeUser3days
                    : "0"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12} className={classes.gridBox}>
              <Box className={classes.dashboardContent} align="center">
                <RiRadioButtonLine />
                <Box mt={1} mb={1}>
                  <Typography variant="h5">
                    {" "}
                    Total Active User 24 hours
                  </Typography>
                </Box>
                <Typography variant="h3">
                  {dashboarddata?.user24Hours
                    ? dashboarddata?.user24Hours
                    : "0"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default Dashboard;
