import React, { useContext, useEffect, useState } from "react";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { BsFillChatFill } from "react-icons/bs";
import { sortAddress } from "src/utils";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
  root: { paddingBottom: "70px" },
  root2: { paddingTop: "30px" },
  boxsection: {
    padding: "15px",
    backgroundColor: "rgba(255, 255, 255, 0.26);",
    borderRadius: "10px",
    "& h6": {
      color: " #3B0D60",
      fontWeight: "bold",
      fontSize: "18px",
      paddingTop: "7px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    [theme.breakpoints.down("xs")]: {
      borderRadius: "10px",
    },
    "& figure": {
      width: "100%",
      maxWidth: "70px",
      height: "70px",
      borderRadius: "50%",
      overflow: "hidden",
      position: "absolute",
      marginTop: "-40px",
      marginLeft: "10px",
      margin: "0px",
      display: "flex",
      background:
        "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      backdropFilter: " blur(42px)",
      border: "3px solid #161616",
      // background: "rgb(42 123 135)",
      "& img": {
        width: "100%",
      },
    },
  },
  // box3: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   "& svg": {
  //     color: theme.palette.primary.main,
  //     background: "#FCF2FA",
  //     padding: "15px",
  //     width: "30px",
  //     height: "30px",
  //     borderRadius: "50%",
  //     "@media(max-width:280px)": {
  //       width: "25px",
  //       height: "25px",
  //     },
  //   },
  //   "& h6": {
  //     color: "#C6BECC",
  //     marginLeft: "10px",
  //     paddingBottom: "10px",
  //     [theme.breakpoints.up("sm")]: {
  //       fontSize: "15px",
  //     },
  //     [theme.breakpoints.up("xs")]: {
  //       fontSize: "12px",
  //     },
  //   },
  //   "& img": {
  //     width: 50,
  //     height: 50,
  //     borderRadius: 25,
  //   },
  //   "& h5": {
  //     color: "#C6BECC",
  //     marginRight: "10px",
  //     [theme.breakpoints.up("sm")]: {
  //       fontSize: "29px",
  //     },
  //     [theme.breakpoints.up("xs")]: {
  //       fontSize: "16px",
  //     },
  //   },
  // },
  text3: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h5": {
      color: "#E4C3DE",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "14px",
      lineHeight: "130%",
    },
  },
  text4: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "10px",
    "& h4": {
      color: "#D200A5",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "14px",
      lineHeight: "130%",
      "@media(max-width:767px)": {
        fontSize: "11px",
      },
    },
  },
  price: {
    paddingBottom: "11px",
    "& h6": {
      fontWeight: "bold",
      fontSize: "10px",
      lineHeight: "130%",
      color: "#E4C3DE",
    },
  },
  box4: {
    backgroundColor: "#FCF2FA",
    borderRadius: "16px",
    padding: "0px 5px 10px",
    marginTop: "8px",
  },
  dotimg: {
    background: "#D200A5",
    boxShadow: "0px 4px 7px rgba(210, 0, 165, 0.25)",
  },
  nftImg: {
    position: "relative",
    width: "100%",
    height: "210px",
    overflow: "hidden",
    cursor: "pointer",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px",
    backgroundColor: "#9572b4 !important",
    // [theme.breakpoints.down("xs")]: {
    //   borderRadius: "20px 20px 10px 10px",
    // },
    "& img": {
      objectPosition: "center bottom",
      height: "100%",
      position: "absolute",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
      maxWidth: "fit-content",
      objectFit: "cover"
    },
  },
  iconBox: {
    "& .iconbutton": {
      backgroundColor: "#FFFFFF",
      width: "35px",
      height: "35px",
      margin: "3px",
      [theme.breakpoints.down("xs")]: {
        width: "15px",
        height: "15px",
        padding: "3px",
      },
    },
  },
}));

function CreatorsCard(props) {
  const classes = useStyles();
  const { data, index, callbackFun } = props;
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setisFollowing] = useState(false);
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

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
        // toast.error(res.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      // toast.error(error.response.data.responseMessage);
    }
  };
  useEffect(() => {
    if (data && auth?.userData) {
      const filterFun = data.followers.filter((data) => {
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
    <Box className={classes.boxsection}>
      <Box
        id={`imagecard${index}`}
        className={classes.nftImg}
        // style={{ background: "url(" + data?.nftId?.coverImage + ")" }}
        onClick={() => {
          history.push({
            pathname: "/about-creators",
            search: data._id,
          });
        }}
      >
        <img
          src={
            data?.coverPic
              ? data?.coverPic
              : "images/userback.png"
          }
          alt=""
          style={{ objectFit: "cover" }}
        />
        {data?.nftId?.mediaType === "video" && (
          <Box style={{ position: "absolute", right: "20px", top: "10px" }}>
            {/* <PlayCircleOutlineIcon
              onClick={() => {
                history.push({
                  pathname: "/nft",
                  search: data._id,
                });
              }}
              style={{ cursor: "pointer", color: "white" }}
            /> */}
          </Box>
        )}
        {data?.nftId?.mediaType === "audio" && (
          <Box style={{ position: "absolute", right: "20px", top: "10px" }}>
            {/* <AudiotrackIcon
              onClick={() => {
                history.push({
                  pathname: "/nft",
                  search: data._id,
                });
              }}
            /> */}
          </Box>
        )}
      </Box>
      <figure>
        <img
          src={data?.profilePic ? data?.profilePic : "images/user.png"}
          onClick={() =>
            history.push({
              pathname: "/about-creators",
              search: data._id,
            })
          }
          style={{ cursor: "pointer", objectFit: "cover" }}
          alt=""
        />
      </figure>
      <Box mt={4}>
        <Grid container spacing={2}>
          <Grid item xs={6} align="left">
            {/* <Box style={{ display: "flex", alignItems: "center" }}>
             
              <Typography
                variant="h6"
                onClick={() => {
                  history.push({
                    pathname: "/nft",
                    search: data._id,
                  });
                }}
              >
                {data?.nftId?.tokenName}{" "}
              </Typography>
            </Box> */}
            {data?.userName ? (
              <Typography variant="h6" style={{ color: "#fff" }}>
                {data?.userName?.length <= 20
                  ? data?.userName
                  : data?.userName?.length > 20
                    ? sortAddress(data?.userName)
                    : ""}
              </Typography>
            ) : (
              <Typography variant="h6" style={{ color: "#fff" }}>
                {data?.name?.length <= 20
                  ? data?.name
                  : data?.name?.length > 20
                    ? sortAddress(data?.name)
                    : ""}
              </Typography>
            )}
          </Grid>
          <Grid item xs={6} align="right">
            <Box className="top">
              {auth?.userData?._id !== data?._id && (
                <Box className={classes.iconBox}>
                  <IconButton
                    className="iconbutton"
                    onClick={() =>
                      history.push({
                        pathname: "/chat-history",
                        search: data?._id,
                      })
                    }
                  >
                    <BsFillChatFill style={{ color: "#000000" }} />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="nameChianImage">
        <img src={`/images/chainImages/${data?.nftId?.network}.png`} alt="" />
      </Box>

      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {auth?.userData?._id !== data._id && (
          <Button
            variant="contained"
            color="secondary"
            onClick={followUnfollowHandler}
            className={classes.btnSection}
          >
            {isFollowing ? "Unfollow" : "Follow"}
            {isLoading && <ButtonCircularProgress />}
          </Button>
        )}
        &nbsp;&nbsp;
        <Button
          variant="contained"
          color="secondary"
          className={classes.btnSection}
          onClick={() =>
            history.push({
              pathname: "/about-creators",
              search: data._id,
            })
          }
        >
          View
        </Button>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="h5">{data?.likesUsers?.length}</Typography>
      </Box>
    </Box>
  );
}

export default CreatorsCard;
