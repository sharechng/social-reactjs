import React, { useContext, useState, useEffect } from "react";

import {
  makeStyles,
  Typography,
  Paper,
  Box,
  Grid,
  Avatar,
} from "@material-ui/core";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { AuthContext } from "src/context/Auth";
import moment from "moment";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";
import { useHistory } from "react-router-dom";

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
    backgroundColor: "#101010",
    borderRadius: "2rem",
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

function SubscriberList() {
  const classes = useStyles();
  const [searchUserList, setSearchUserList] = useState([]);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const trendingUserlistHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.get(Apiconfigs.trendingUserlist, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      if (res.data.responseCode === 200) {
        if (res.data.result.docs) {
          setSearchUserList(
            res.data.result.docs
              .filter(
                (data) =>
                  data.userType === "User" && data._id !== auth.userData?._id
              )
              .slice(0, 3)
          );
          setLoading(false);
        }
      } else {
        // setSearchUserList([]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setSearchUserList([]);
    }
  };
  useEffect(() => {
    trendingUserlistHandler();
  }, []);
  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Box className={classes.main}>
          <Box className={classes.box} pb={3}>
            <Typography variant="h4">All Trending Creator</Typography>
          </Box>
          {loading ? (
            <DataLoading />
          ) : (

            <>
              {searchUserList && searchUserList.length === 0 ? (
                <NoDataFound />
              ) : (

                <Grid container direction={"cloumn"} spacing={1}>
                  {searchUserList && searchUserList.length > 0 && (
                    <>
                      {searchUserList &&
                        searchUserList?.map((data, i) => {
                          return (
                            <Grid item xs={12} key={i}>
                              <Box pt={1} pb={2} className={classes.root1}>
                                <Box className={classes.mainContent}>
                                  <Box>
                                    <Avatar onClick={() => {
                                      history.push({
                                        pathname: "/about-creators",
                                        search: data._id,
                                      });
                                    }}
                                      src={
                                        data?.profilePic
                                          ? data?.profilePic
                                          : "images/user.png"
                                      }
                                      style={{ cursor: "pointer" }}
                                    />
                                  </Box>
                                  <Box ml={2}>
                                    <Typography
                                      style={{ cursor: "pointer" }}
                                      variant="h6"
                                      onClick={() => {
                                        history.push({
                                          pathname: "/about-creators",
                                          search: data._id,
                                        });
                                      }}
                                    >
                                      {data?.userName ? data?.userName : data?.name}
                                    </Typography>
                                    <Typography className={classes.type}>
                                      {moment(data?.createdAt).local().fromNow()}
                                    </Typography>
                                  </Box>
                                </Box>

                              </Box>
                            </Grid>
                          );
                        })}
                    </>
                  )}
                </Grid>

              )}

            </>

          )}

        </Box>
      </Paper>
    </>
  );
}

export default SubscriberList;
