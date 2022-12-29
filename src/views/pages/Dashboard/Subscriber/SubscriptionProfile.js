import React, { useEffect, useState, useContext } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogContent,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "src/context/Auth";
import { tokenName, sortAddress } from "src/utils";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import { sortAddress, } from "src/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    backgroundColor: "#373636",
    transition: "0.5s",
    "&:hover": {
      transform: "translateY(-10px)",
    },
    "@media(max-width:600px)": {
      padding: "10px",
    },
    "& .postImg": {
      width: "100%",
      margin: "16px 0",
      borderRadius: "10px",
      overflow: "hidden",
      "& img": {
        width: "100%",
      },
    },
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
        "&:first-child": {
          marginLeft: "0px",
        },
        "& .profileimage": {
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#101010",
          "@media(max-width:600px)": {
            height: "20px",
            width: "20px",
            borderRadius: "50%",
          },
          "& img": {
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "50px",
          },
        },
        "& .vector": {
          position: "absolute",
          top: "-3px",
          right: "-6px",
          "@media(max-width:600px)": {
            top: "-5px",
            right: "-15px",
          },
          "& img": {
            width: "auto",
            maxWidth: "100%",
            maxHeight: "35px",
            "@media(max-width:600px)": {
              width: "auto",
              maxWidth: "57%",
              maxHeight: "24px",
            },
          },
        },
      },
    },
  },
  // iconbutton: {
  //   backgroundColor: "#FFF",
  //   width: "20px",
  //   height: "20px",
  //   margin: "0px",
  //   padding: "0",
  //   "& svg": {
  //     fontSize: "14px",
  //   },
  // },
  icons: {
    color: "#e24444",
    "@media(max-width:600px)": {
      fontSize: "14px",
    },
  },
  mainimg: {
    width: "100%",
    height: "200px !important",
    // height:"100%",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    // backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px",
    backgroundColor: "#000",
    cursor:"pointer",
    [theme.breakpoints.down("xs")]: {
      height: "120px !important",
    },
  },
  Dialogmainimg: {
    width: "100%",
    height: "200px !important",
    // height:"100%",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    // backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px",
    backgroundColor: "#000",
    [theme.breakpoints.down("xs")]: {
      height: "120px !important",
    },
  },
  text: {
    whiteSpace: "pre",
    // textOverflow: "ellipsis",
    // overflow: "hidden",
    width: "calc(100% - 5px)",
  },
  btnbox: {
    fontSize: "10px !important",
    padding: "6px 10px !important",
    [theme.breakpoints.down("xs")]: {
      fontSize: "5px !important",
    },
  },
  socialbox: {
    fontSize: "14px",
  },
  deskiText: {
    "& h4": {
      fontSize: "14px",
    },
  },
  videoBox: {
    height: "200px",
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    background: "#242526",
    borderRadius: "10px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "120px",
    },
  },
  bundleText: {
    "& h4": {
      whiteSpace: "pre",
      textOverflow: "ellipsis",
      overflow: "hidden",
      width: "calc(100% - 5px)",
    },
  },
  PhotoBox: {
    width: "100%",
    // height: 600px;
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
      width: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "400px",
      borderRadius: "15px",
    },
  },
  dialogProfileImage: {
    minWidth: "40px",
    height: "40px",
    overflow: "hidden",
    borderRadius: "50%",
    backgroundColor: "#101010",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
}));

function BundlesCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { calBackFunc, data } = props;
  const auth = useContext(AuthContext);
  const [open3, setOpen3] = React.useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [subscribedUser, setSubscribedUser] = useState(false);
  // console.log("collection_Id", data?.collectionId?.image);
  let isLike = false;
  if (auth.userData?._id && data) {
    const likeUser = data?.collectionId?.likesUsers?.filter(
      (data) => data === auth.userData?._id
    );
    isLike = likeUser?.length > 0;
  }

  const likesHandler = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: ApiConfig.likeDislikeCollection + data?.collectionId?._id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          postId: data?.collectionId?._id,
        },
      });
      if (res.data.responseCode === 200) {
        // if (particularUserList) {
        if (calBackFunc) {
          calBackFunc();
        } else {
          calBackFunc();
        }
        // }

        toast.success(res.data.responseMessage);
      }
    } catch (error) {}
  };

  return (
    <>
      <Paper elevation={2} className={classes.root}>
        {/* {fileType == "image" && ( */}
        <Box
          id={`imagecard${data?.collectionId?._id}`}
          className={classes.mainimg}
          style={{ background: "url(" + data?.collectionId?.image + ")" }}
          onClick={() => {
            history.push({
              pathname: "/bundles-details",
              search: data?.collectionId?._id,
              state: data?.collectionId,
            });
          }}
        ></Box>
        {/* )} */}
        {/* {(fileType == "video" || fileType == "audio") && (
          <Box
            id={`imagecard${data?.collectionId?._id}`}
            className={classes.mainimg}
            style={{ background: "url(" + data?.collectionId.image + ")" }}
          >
            <video
              className={classes.videoBox}
              width="100%"
              height="100%"
              loop={false}
              autoPlay={false}
              muted={true}
              controls
            >
              <source src={data?.collectionId?.image} type="video/mp4" />
            </video>
          </Box>
        )} */}
        {/* <figure className="postImg">
          <img src={data?.image} ali="Auction Image" />
        </figure> */}
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={8}>
            <Box className="UserBox">
              <Box className="figure">
                <Box className="profileimage">
                  <img
                    src={
                      data?.userId?.profilePic
                        ? data?.userId?.profilePic
                        : "/images/user.png"
                    }
                    alt="user data"
                  />
                </Box>
                <Box className="vector">
                  {/* <img src="images/Vector.png" /> */}
                </Box>
              </Box>
              <Box className="timeline">
                <Typography variant="h6" className={classes.text}>
                  {data?.userId?.userName?.length > 40
                    ? sortAddress(data?.userId?.userName)
                    : sortAddress(data?.userId?.bnbAccount?.address)}
                  {/* {data?.name} */}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4} align="right">
            <IconButton className={classes.iconbutton} onClick={likesHandler}>
              {isLike ? (
                <>
                  <FavoriteIcon style={{ color: "red" }} />
                </>
              ) : (
                <>
                  <FavoriteBorderIcon style={{ color: "#BFBFBF" }} />
                </>
              )}
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={1} align="left">
          <Grid item xs={6}>
            <Typography variant="body1">Collection Title</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="body1">{sortAddress(data?.collectionId?.title)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Collection Price</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="body1">
              {data?.collectionId?.amount > 1
                ? data?.collectionId?.amount
                : Number(data?.collectionId?.amount)?.toFixed(4)}
              &nbsp; {tokenName}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={6} align="left">
            <Typography variant="body1">Duration:</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="body1">
              {data?.collectionId?.duration} &nbsp; Days
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default BundlesCard;
