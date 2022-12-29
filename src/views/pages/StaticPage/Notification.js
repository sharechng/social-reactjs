import React, { useContext, useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { useHistory } from "react-router-dom";
import NoDataFound from "src/component/NoDataFound";
import DataLoading from "src/component/DataLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& .main": {
      backgroundColor: "#101010",
      padding: "15px",
      borderRadius: "15px",
      [theme.breakpoints.down("xs")]: {
        borderRadius: "15px",
      },
    },
  },
  user: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "0.5px solid #737373",
    "& .UserBox": {
      display: "flex",
      alignItems: "center",
      padding: "20px 0px 0",
      "& h6": {
        fontWeight: "600",
      },
      "& small": {
        color: "#BFBFBF",
        [theme.breakpoints.down("xs")]: {
          fontSize: "10px",
        },
      },
      "& .figure": {
        margin: "0",
        marginRight: "15px",
        position: "relative",
        "& .profileimage": {
          height: "40px",
          width: "40px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#101010",
          [theme.breakpoints.down("xs")]: {
            height: "40px",
            width: "40px",
          },
          "& img": {
            width: "auto",
            maxWidth: "100%",
            minHeight: "100%",
            [theme.breakpoints.down("xs")]: {
              maxHeight: "40px",
            },
          },
        },
        "& .vector": {
          position: "absolute",
          top: "-3px",
          right: "-6px",
          "& img": {
            width: "auto",
            maxWidth: "100%",
            maxHeight: "35px",
          },
        },
      },
    },
  },
}));

function Notification() {
  const classes = useStyles();
  const [searchUserList, setSearchUserList] = useState([]);
  const [tempArr, settempArr] = useState([]);
  const [loader, setloader] = React.useState(true);

  const [arrSubArre, setarrSubArre] = useState();
  useEffect(() => {
    if (tempArr.length > 0) {
      sessionStorage.setItem("ignoreUser", JSON.stringify(tempArr));
    }
    setarrSubArre(sessionStorage.getItem("ignoreUser"));
  }, [tempArr]);
  const creatorListHandler = async () => {
    try {
      const res = await axios.get(Apiconfigs.migthtList, {
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setloader(false);
        if (res.data.result) {
          setSearchUserList(res.data.result.mightUser);
        }
      } else {
        setloader(false);
        setSearchUserList([]);
      }
    } catch (error) {
      setloader(false);
      setSearchUserList([]);
    }
  };
  useEffect(() => {
    if (arrSubArre) {
      creatorListHandler();
    } else {
      creatorListHandler();
    }
  }, [arrSubArre, tempArr]);
  return (
    <>
      <Paper className={classes.root} elevation={2}>
        {loader ? (
          <DataLoading />
        ) : (
          <Box className="main">
            <Box mb={2}>
              <Typography variant="h4" color="primary.main">
                All Creators You May Like
              </Typography>
            </Box>
            {tempArr?.length !== searchUserList?.length ? (
              <Grid container direction={"column"} spacing={2}>
                {searchUserList &&
                  searchUserList?.map((data, i) => {
                    const ignoreData = JSON.parse(arrSubArre);
                    const isTrue = ignoreData?.includes(data._id);
                    if (isTrue) {
                      return null;
                    } else {
                      return (
                        <Grid item xs={12} sm={12} md={12} lg={12} key={i}>
                          <User
                            data={data}
                            settempArr={(id) =>
                              settempArr((prev) => [...prev, id])
                            }
                            key={1}
                            callbackFun={creatorListHandler}
                          />
                        </Grid>
                      );
                    }
                  })}
              </Grid>
            ) : (
              <NoDataFound />
            )}
          </Box>
        )}
      </Paper>
    </>
  );
}
export default Notification;

const User = (props) => {
  const { data, callbackFun, settempArr } = props;
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setisFollowing] = useState(false);
  const history = useHistory();
  const auth = useContext(AuthContext);

  const followUnfollowHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.followUnfollowUser + data?._id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success(res.data.responseMessage);
        if (callbackFun) {
          callbackFun();
        }
      } else {
        toast.error(res.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      toast.error(error.response.data.responseMessage);
    }
  };

  useEffect(() => {
    if (data && auth?.userData) {
      const filterFun = data?.followers?.filter((data) => {
        return data === auth?.userData?._id;
      });
      if (filterFun[0]) {
        setisFollowing(true);
      } else {
        setisFollowing(false);
      }
    }
  }, [data, auth?.userData]);
  return (
    <>
      <Box className={classes.user}>
        <Box className="UserBox">
          <Box className="figure">
            <Box className="profileimage">
              <img
                src={data?.profilePic ? data?.profilePic : "images/user.png"}
              />
            </Box>
          </Box>
          <Box>
            <Typography
              variant="h6"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push({
                  pathname: "/about-creators",
                  search: data._id,
                });
              }}
            >
              {data?.userName ? data?.userName : data?.name}
            </Typography>
            <Typography variant="body2" component="small">
              {data?.userType === "User" ? "Creator" : "Admin"}
            </Typography>
          </Box>
        </Box>
        <Box className="buttonbox" mt={3}>
          <Button
            variant="contained"
            onClick={() => settempArr(data._id)}
            size="large"
            color="primary"
            disabled={isLoading}
          >
            Ignore
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={followUnfollowHandler}
            style={{ marginLeft: "15px" }}
            disabled={isLoading}
          >
            {isFollowing ? "Unfollow" : "Follow"}
            {isLoading && <ButtonCircularProgress />}
          </Button>
        </Box>
      </Box>
    </>
  );
};
