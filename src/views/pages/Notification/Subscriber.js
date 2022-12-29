import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Paper,
  Typography,
  Grid,
  Link,
} from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import NoDataFound from "src/component/NoDataFound";
import DataLoading from "src/component/DataLoading";
import { useHistory, Link as RouterComponent } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    backgroundColor: "#000000",
    "& .heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: "15px",
      borderBottom: "0.5px solid #737373",
    },
  },
  Users: {
    width: "100% !important",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .UserBox": {
      display: "flex",
      alignItems: "center",
      padding: "10px 0px",
      "& h6": {
        fontWeight: "600",
      },
      "& small": {
        color: "#BFBFBF",
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
          "& img": {
            // width: "auto",
            maxWidth: "100%",
            // maxHeight: "50px",
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
    "& .timeline": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
}));


function Subscriber() {
  const classes = useStyles();
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [followerListCount, setFollowerListCount] = useState();

  const listPublicExclusiveHandler = async () => {
    try {
      // setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listFollowerUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setDataList(res.data.result.followers.slice(0, 6));
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
        <Box className="heading">
          <Typography variant="h5">
            Subscriber
          </Typography>
          {dataList.length > 6 && (
            <Link component={RouterComponent} to="/subscriber-list"  style={{ color: "#E31A89" }}>
              See All
            </Link>
          )}
        </Box>
        {isLoading ? (
          <DataLoading />
        ) : (
          <Grid container direction={"cloumn"} spacing={1}>
            {dataList && dataList.length > 0 ? (
              <>
                {dataList &&
                  dataList?.map((data, i) => {
                    return (
                      <Grid item xs={12} key={i}>
                        <Users
                          isLoading={isLoading}
                          data={data}
                          type="data"
                          key={i}
                        />
                      </Grid>
                    );
                  })}
              </>
            ) : (
              <NoDataFound />
            )}
          </Grid>
        )}
      </Paper>
    </>
  );
}

export default Subscriber;

const Users = (props) => {
  const { data } = props;
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      <Box className={classes.Users}>
        <Box className="UserBox">
          <Box className="figure">
            <Box className="profileimage">
              <img
                src={data.profilePic ? data.profilePic : "images/user.png"}
                alt="user data"
              />
            </Box>
            {/* <Box className="vector">
              <img src="images/Vector.png" />
            </Box> */}
          </Box>
          <Box className="timeline">
            <Typography
              variant="h6"
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push({
                  pathname: "/about-creators",
                  search: data?._id,
                });
              }}
            >
              {data.userName ? data.userName : data.name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
