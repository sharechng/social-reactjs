import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Paper,
  Typography,
  Grid,
  Link,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NoDataFound from "src/component/NoDataFound";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import DataLoading from "src/component/DataLoading";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    "& .heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: "15px",
      borderBottom: "0.5px solid #737373",
    },
  },
  Users: {
    display: "flex",
    justifyContent: "space-between",
    "& .active": {
      width: "10px",
      height: "10px",
      backgroundColor: "#22D83F",
      borderRadius: "50%",
    },
    width: "100% !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .UserBox": {
      display: "flex",
      alignItems: "center",
      padding: "10px 0px 0",
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
            height: "100%",
            maxWidth: "100%",
            maxHeight: "50px",
            [theme.breakpoints.down("xs")]: {
              maxHeight: "40px",
            },
          },
        },
        "& .vector": {
          position: "absolute",
          top: "0px",
          right: "0px",
          "& img": {
            width: "100%",
            maxWidth: "100%",
            maxHeight: "35px",
          },
        },
      },
    },
    "& .timeline": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& .timeline1": {
      display: "flex",
      justifyContent: "end",
      alignItems: "end",
    },
  },
}));

function Subscriber({ data }) {
  const classes = useStyles();
  const history = useHistory();
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followerListCount, setFollowerListCount] = useState();

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
        setFollowerListCount(res.data.result.count);
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
      <Paper className={classes.root} elevation={2}>
        <Box className="heading" mb={2}>
          <Typography variant="h6" color="primary.main">
            Subscription
          </Typography>
        </Box>
        <Grid container direction={"cloumn"} spacing={1}>
          <Grid item xs={12}>
            <Users isLoading={isLoading} data={dataList} type="data" />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Subscriber;

const Users = (props) => {
  const { data, isLoading } = props;
  console.log("data",data)
  const history = useHistory();

  const classes = useStyles();
  return (
    <>
      {isLoading ? (
        <DataLoading />
      ) : (
        <Box className={classes.Users}>
          {data && data.length > 0 ? (
            <Box>
              {/* <Box className="UserBox">
                <Box className="figure">
                  <Box className="profileimage">
                    <img
                      src={
                        data[0]?.profilePic
                          ? data[0]?.profilePic
                          : "images/User.png"
                      }
                    />
                  </Box>
                </Box>
                <Box className="timeline">
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push({
                        pathname: "/about-creators",
                        search: data[0]?._id,
                      });
                    }}
                  >
                    <Typography variant="h6">{data[0]?.userName}</Typography>
                  </Link>
                </Box>
              </Box> */}
              <Box className="timeline1" textAlign="end">
                <Typography variant="h6">
                  {data[0]?.collectionId?.duration}
                </Typography>
              </Box>
            </Box>
          ) : (
            <NoDataFound />
          )}
        </Box>
      )}
    </>
  );
};
