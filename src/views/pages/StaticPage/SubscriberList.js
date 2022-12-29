import React, { useState, useEffect } from "react";

import { makeStyles, Typography, Paper, Box, Grid } from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import NoDataFound from "src/component/NoDataFound";

import Apiconfigs from "src/ApiConfig/ApiConfig";
import { useHistory } from "react-router-dom";
import DataLoading from "src/component/DataLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
  },
  root1: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "0.25px solid #737373",
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "0.25px solid #737373",
  },
  main: {
    backgroundColor: "black",
    borderRadius: "15px",
    padding: "20px",
  },
  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "#B55A06",
  },
  mainContent: {
    display: "flex",
    alignItems: "center",

    "& figure": {
      width: "50px",
      border: "2px solid #161616",
      height: "50px",
      margin: "0 auto",
      position: "relative",
      maxWidth: "130px",
      background:
        "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      borderRadius: "50%",
      backdropFilter: "blur(42px)",
    },

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%",
    },
  },
  btnSection: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  type: {
    fontSize: "10px",
    color: "#838282",
  },
}));

function SubscriberList({ data }) {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const listPublicExclusiveHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listFollowerUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setDataList(res.data.result.followers);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    listPublicExclusiveHandler();
  }, []);
  return (
    <>
      <Paper className={classes.root}>
        <Box className={classes.main}>
          <Box className={classes.box} pb={3}>
            <Typography variant="h4">All Subscribers</Typography>
          </Box>
          {isLoading ? (
            <DataLoading />
          ) : (
            <>
              {dataList && dataList.length > 0 ? (
                <Grid container direction={"cloumn"} spacing={1}>
                  {dataList &&
                    dataList?.map((data, i) => {
                      return (
                        <Grid item xs={12} key={i}>
                          <Box pt={1} pb={2} className={classes.root1}>
                            <Box className={classes.mainContent}>
                              <figure>
                                <img
                                  src={
                                    data?.profilePic
                                      ? data?.profilePic
                                      : "images/user.png"
                                  }
                                />
                              </figure>

                              <Box ml={2}>
                                <Typography
                                  style={{ cursor: "pointer" }}
                                  variant="body2"
                                  onClick={() => {
                                    history.push({
                                      pathname: "/about-creators",
                                      search: data._id,
                                    });
                                  }}
                                >
                                  {data?.userName ? data?.userName : data?.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className={classes.type}
                                >
                                  {moment(data?.createdAt).local().fromNow()}
                                </Typography>
                              </Box>
                            </Box>
                            {/* <Box
                              mt={2.5}
                              mr={2}
                              style={{
                                height: "10px",
                                width: "10px",
                                backgroundColor: "green",
                                borderRadius: "50%",
                              }}
                            >
                              {" "}
                            </Box> */}
                          </Box>
                        </Grid>
                      );
                    })}
                </Grid>
              ) : (
                <NoDataFound />
              )}
            </>
          )}
        </Box>
      </Paper>
    </>
  );
}

export default SubscriberList;
