import React, { useState, useEffect, useContext } from "react";
import { Box, Paper, makeStyles, Link, Grid } from "@material-ui/core";
import axios from "axios";
import Activity from "./Activity";
import Blocking from "./Blocking";
import { toast } from "react-toastify";
import EditProfile from "./EditProfile";
import Interest from "../Better/Better";
import Notification from "./Notification";
import { AuthContext } from "src/context/Auth";
import { useHistory, useLocation } from "react-router-dom";
import ApiConfig from "src/ApiConfig/ApiConfig";
import PasswordAndSecurity from "./PasswordAndSecurity";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    [theme.breakpoints.down("sm")]: {
      padding: "15px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& .mainbox": {
      backgroundColor: "#101010",
      BiBorderRadius: "5px",
      "& .leftbox": {
        padding: "25px",
        height: "100%",
        [theme.breakpoints.down("xs")]: {
          padding: "0px",
        },
      },
      "& .rightbox": {
        padding: "0px 25px",
        borderLeft: "0.25px solid #242526",
        height: "100%",
        [theme.breakpoints.down("xs")]: {
          padding: "10px",
        },
      },
      "& .buttonBox": {
        borderBottom: "1px solid #242526",
        padding: " 0 15px",
        [theme.breakpoints.down("xs")]: {
          padding: "0 0px",
          margin: "0 10px",
          display: "inline-block",
        },
        "& a": {
          width: "100%",
          cursor: "pointer",
          fontWeight: "600",
          display: "block",
          fontSize: "14px",
          color: "#fff",
          padding: "20px 0",
          [theme.breakpoints.down("xs")]: {
            fontSize: "12px",
          },
          "&:hover": {
            textDecoration: "none",
            color: "#e31a89",
          },
          "&.active": {
            color: "#e31a89",
          },
        },
      },
    },
  },
}));
function Index() {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory()
  const classes = useStyles();
  const [tabview, setTabView] = useState("Interest");
  const [userData1, setUserData1] = useState();
  const [userProfileData, setUserData] = useState();

  // useEffect(() => {
  //   if (auth?.userData?.userType === "Admin") {
  //     history.push("/dashboard")

  //   }
  // }, [auth?.userData?.userType])


  useEffect(() => {
    const ids = location.hash.split("#");
    if (ids[1] && ids[1] == "editProfile") {
      setTabView("EditProfile");
    } else {
      setTabView("Interest");
    }
  }, [location]);

  const listBlockedUserHandler = () => {
    axios
      .get(ApiConfig.listBlockedUser, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.responseCode === 409) {
          toast.error("dnsfbhsd");
        } else {
          setUserData1(response.data.result);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.responseMessage);
      });
  };

  useEffect(() => {
    setUserData(auth.userData);
  }, [auth.userData]);

  const handleUserProfileApi = () => {
    auth.handleUserProfileApi();
  };

  useEffect(() => {
    listBlockedUserHandler();
  }, []);

  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Box className="mainbox">
          <Grid container spacing={0}>
            <Grid item xs={12} sm={3}>
              <Box className="leftbox">
                {auth?.userData?.userType === "User" && (
                  <Box className="buttonBox">
                    <Link
                      className={tabview === "Interest" ? "active" : " "}
                      onClick={() => setTabView("Interest")}
                    >
                      Add Interest
                    </Link>
                  </Box>
                )}

                <Box className="buttonBox">
                  <Link
                    className={tabview === "EditProfile" ? "active" : " "}
                    onClick={() => setTabView("EditProfile")}
                  >
                    Edit Profile
                  </Link>
                </Box>
                {auth?.userData?.userType === "User" && (
                  <Box className="buttonBox">
                    <Link
                      className={tabview === "Blocking" ? "active" : " "}
                      onClick={() => setTabView("Blocking")}
                    >
                      Blocking
                    </Link>
                  </Box>
                )}
                {auth?.userData?.userType === "User" && (
                  <Box className="buttonBox">
                    <Link
                      className={tabview === "Notification" ? "active" : " "}
                      onClick={() => setTabView("Notification")}
                    >
                      Notification
                    </Link>
                  </Box>
                )}

                {!auth.userData?.socialType ? (
                  <Box className="buttonBox">
                    <Link
                      className={
                        tabview === "PasswordAndSecurity" ? "active" : " "
                      }
                      onClick={() => setTabView("PasswordAndSecurity")}
                    >
                      Password & Security
                    </Link>
                  </Box>
                ) : (
                  ""
                )}

                <Box className="buttonBox">
                  <Link
                    className={tabview === "Activity" ? "active" : " "}
                    onClick={() => setTabView("Activity")}
                  >
                    Activity Log
                  </Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Box className="rightbox">
                <Box py={3}>
                  {tabview === "EditProfile" ? (
                    <EditProfile
                      userProfileData={userProfileData}
                      callBackFun={handleUserProfileApi}
                    />
                  ) : (
                    ""
                  )}
                  {tabview === "Blocking" ? (
                    <Blocking
                      userData1={userData1}
                      callBackFun={listBlockedUserHandler}
                    />
                  ) : (
                    ""
                  )}
                  {tabview === "Notification" ? <Notification /> : ""}
                  {tabview === "PasswordAndSecurity" ? (
                    <PasswordAndSecurity />
                  ) : (
                    ""
                  )}
                  {tabview === "Activity" ? <Activity /> : ""}
                  {tabview === "Interest" ? <Interest /> : ""}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}

export default Index;
