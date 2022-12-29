import React, { useContext, useState, useEffect } from "react";

import {
  makeStyles,
  Box,
  Paper,
  Typography,
  Grid,
  Link,
} from "@material-ui/core";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import axios from "axios";
import Apiconfigs, { websiteName } from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";
import { tokenName } from "src/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    padding: "15px",
    "& .heading": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: "15px",
      borderBottom: "0.5px solid #737373",
    },
  },
  creators: {
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
          top: "0px",
          right: "0px",
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

const trendingData = [
  {
    image: "images/User1.png",
    name: "Sophia Valentine",
    prise: "0.99  ETH",
  },
  {
    image: "images/User2.png",
    name: "The Metakey",
    prise: "0.49  ETH",
  },
  {
    image: "images/User3.png",
    name: "Diamond HODLR",
    prise: "4.73  ETH",
  },
];

function Trending({ serchTrending, trendingUserlistHandler }) {
  const classes = useStyles();
  const [searchUserList, setSearchUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = useContext(AuthContext);

  // const trendingUserlistHandler = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(Apiconfigs.trendingUserlist, {
  //       // headers: {
  //       //   token: window.localStorage.getItem("token"),
  //       // },
  //     });

  //     if (res.data.responseCode === 200) {
  //       if (res.data.result.docs) {
  //         setSearchUserList(
  //           res.data.result.docs
  //             .filter(
  //               (data) =>
  //                 data.userType === "User" && data._id !== auth.userData?._id
  //             )
  //             .slice(0, 3)
  //         );
  //         setLoading(false);
  //       }
  //     } else {
  //       setSearchUserList([]);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     setSearchUserList([]);
  //   }
  // };
  // useEffect(() => {
  //   trendingUserlistHandler();
  // }, []);

  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Box className="heading" mb={2}>
          <Typography variant="h6" style={{ fontWeight: "500" }}>
            Trending Creator
          </Typography>
          <Link component={RouterComponent} to="/trending-list" style={{ color: "#E31A89" }}>
            See All
          </Link>
        </Box>
        <Grid container direction={"cloumn"} spacing={1}>
          {serchTrending &&
            serchTrending?.map((data, i) => {
              return (
                <Grid item key={i} xs={12}>
                  <CreatorsCard data={data} type="data" key={i} />
                </Grid>
              );
            })}
        </Grid>
      </Paper>
    </>
  );
}

export default Trending;

const CreatorsCard = (props) => {
  const { data } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box className={classes.creators}>
        <Box className="UserBox">
          <Box className="figure">
            <Box style={{ cursor: "pointer" }} className="profileimage" onClick={() => {
              history.push({
                pathname: "/about-creators",
                search: data._id,
              });
            }}>
              <img
                src={data?.profilePic ? data?.profilePic : "images/user.png"}
                alt="user data"
              />
            </Box>
            {/* <Box className="vector">
              <img src="images/Vector.png" />
            </Box> */}
          </Box>
          <Box>
            <Link
              style={{ cursor: "pointer" }}
              onClick={() => {
                history.push({
                  pathname: "/about-creators",
                  search: data._id,
                });
              }}
            >
              <Typography variant="h6">
                {data.userName ? data.userName : data.name}
              </Typography>
            </Link>
            <Typography variant="body2" component="small">
              {data?.bnbBalace ? data?.bnbBalace.toFixed(0) : 0}&nbsp;{tokenName}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
