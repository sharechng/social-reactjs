import React, { useContext, useState, useEffect } from "react";

import {
  makeStyles,
  Typography,
  Paper,
  Box,
  Link,
  Button,
} from "@material-ui/core";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import Apiconfigs, { websiteName } from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    padding: "15px",
    "& .heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: "15px",
      "& h6": {
        fontSize: "15px",
        fontWeight: "500",
      },
    },
    "& .UserBox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 0px 0",
      borderTop: "0.5px solid #737373",
      "& a": {
        textDecoration: "none",
        "& h6": {
          fontWeight: "600",
          color: "#fff",
        },
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
            width: "100%",
            minHeight: "100%",
            // maxHeight: "50px",
            [theme.breakpoints.down("xs")]: {
              maxHeight: "40px",
            },
          },
        },
        "& .vector": {
          position: "absolute",
          top: "0",
          right: "0",
          "& img": {
            width: "auto",
            maxWidth: "100%",
            maxHeight: "35px",
          },
        },
      },
    },
    "& .buttonbox": {
      display: "flex",
      justifyContent: "center",
      padding: "10px 0px",
    },
  },
}));

function Might({
  searchUserList,
  creatorListHandler,
  setSerachValue,
  searchValue,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setisFollowing] = useState(false);
  const auth = useContext(AuthContext);

  const handleFllowerFunc = () => {
    setSerachValue(searchValue + 1);
    followUnfollowHandler();
  };
  const followUnfollowHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.followUnfollowUser + searchUserList[0]?._id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success("User followed successfully");
        if (creatorListHandler) {
          creatorListHandler();
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
    if (searchUserList[0] && auth?.userData) {
      const filterFun = searchUserList[0]?.followers.filter((data) => {
        return data === auth?.userData?._id;
      });
      if (filterFun[0]) {
        setisFollowing(true);
      } else {
        setisFollowing(false);
      }
    }
  }, [searchUserList[0], auth?.userData]);
  const handleIgnorFunction = () => {
    setSerachValue(searchValue + 1);
    ignorUnignoreTousers();
  };
  const ignorUnignoreTousers = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: Apiconfigs.ignoreUnignorUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          _id: searchUserList[0]?._id,
        },
      });
      if (res.data.responseCode === 200) {
        // if (particularUserList) {
        if (creatorListHandler) {
          creatorListHandler();
          // toast.success(res.data.responseMessage);
        } else {
        }
        // }

        // toast.success(res.data.responseMessage);
      }
    } catch (error) { }
  };
  return (
    <>
      {open && (
        <Paper className={classes.root} elevation={2}>
          <Box className="heading">
            <Typography variant="h6">Creators You May Like</Typography>
            {searchUserList && searchUserList?.length > 1 && (
              <Link
                component={RouterComponent}
                to="/notification"
                style={{ color: "#E31A89" }}
              >
                See All
              </Link>
            )}
          </Box>
          <>
            <Box className="UserBox">
              <Box style={{ display: "flex", alignitems: "center" }}>
                <Box className="figure">
                  <Box style={{ cursor: "pointer" }} className="profileimage" onClick={() => {
                    history.push({
                      pathname: "/about-creators",
                      search: searchUserList[searchValue]?._id,
                    });
                  }}>
                    {searchUserList && (
                      <img
                        src={
                          searchUserList[searchValue]?.profilePic
                            ? searchUserList[searchValue]?.profilePic
                            : "images/user.png"
                        }
                      />
                    )}
                  </Box>
                </Box>
                <Box className="name">
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push({
                        pathname: "/about-creators",
                        search: searchUserList[searchValue]?._id,
                      });
                    }}
                  >
                    <Typography variant="h6">
                      {searchUserList[searchValue]?.userName
                        ? searchUserList[searchValue]?.userName
                        : searchUserList[searchValue]?.name}
                    </Typography>
                  </Link>
                  <Typography variant="body1" component="small">
                    {searchUserList[searchValue]?.userType === "User"
                      ? " @Creator"
                      : ""}
                  </Typography>
                </Box>
              </Box>
              <Box className="buttonbox">
                {/* <Button
                  variant="contained"
                  onClick={() => settempArr(data._id)}
                  size="large"
                  color="primary"
                >
                  Ignore
                </Button> */}
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  style={{ marginLeft: "15px" }}
                  onClick={handleFllowerFunc}
                >
                  Follow
                  {isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </>
        </Paper>
      )}
    </>
  );
}

export default Might;
