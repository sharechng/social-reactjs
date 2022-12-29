import React, { useEffect, useState, useContext } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Button,
  Dialog,
  Grid,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { sortAddress, tokenName, sortAddressPostTitle } from "src/utils";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";

import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#373636",
    padding: "15px",
    margin: "0 5px",
    "& .postImg": {
      width: "100%",
      margin: "0",
      borderRadius: "20px",
      overflow: "hidden",
      height: "160px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#101010",
      "& img": {
        width: "100%",
        maxWidth: "100%",
        maxHeight: "160px",
      },
    },
    "& .UserBox": {
      display: "flex",
      alignItems: "center",
      padding: "10px 0px 0",
      "& .figure": {
        position: "relative",
        display: "flex",
        alignItems: "center",
        "& .profileimage": {
          height: "40px",
          width: "40px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#101010",
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        },
        // "& .vector": {
        //   position: "absolute",
        //   top: "0",
        //   right: "0",
        //   "& img": {
        //     width: "100%",
        //     maxWidth: "100%",
        //     maxHeight: "35px",
        //   },
        // },
        "& .userName": {
          marginLeft: "15px",
          "& h6": {},
        },
      },
    },
    "& .text": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0px 0px",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    },
    "& .buttonbox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  // mainimg: {
  //   height: "auto !important",
  //   cursor:"pointer"
  // },
  mainimg: {
    width: "100%",
    height: "235px !important",
    // height:"100%",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    // backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px",
    cursor: "pointer",
    // backgroundColor: "#000",
    [theme.breakpoints.down("xs")]: {
      height: "120px !important",
    },
  },
  deskiText: {
    "& h4": {
      fontSize: "14px",
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
  videoBox: {
    width: "100%",
    height: "180px",
    margin: "0 auto",
    overflow: "hidden",
    position: "relative",
    borderRadius: "10px",
    backgroundSize: "100% !important",
    backgroundColor: "#000",
    backgroundRepeat: "no-repeat !important",
    backgroundPosition: "center !important",

    "& img": {
      top: "50%",
      left: "50%",
      width: "auto",
      height: "auto",
      position: "absolute",
      minWidth: "100%",
      transform: "translate(-50%, -50%)",
      minHeight: "100%",
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
    display: "flex",
    alignItems: "center",
    width: "calc(100% - 31px)",
    "& .userImage": {
      minWidth: "40px",
      width: "40px",
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
    "& .username": {
      marginLeft: "8px",
      width: "calc(100% - 45px)",
      "& h6": {
        fontSize: "14px",
        fontWeight: "500",
        color: "#FFF",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
      },
    },
  },
  modalBannerImage: {
    "& figure": {
      height: "350px",
      margin: "0 auto",
      overflow: "hidden",
      position: "relative",
      background: "rgba(0,0,0,0.7)",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundSize: "100% !important",
      backgroundRepeat: "no-repeat !important",
      backgroundPosition: "center !important",
      "& img": {
        height: "auto",
        width: "100%",
        borderRadius: "10px",
      },
    },
  },
}));

function StoryCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { data, type, index, calBackFunc } = props;
  const [loader, setLoader] = React.useState(false);
  const [isloading, setIsloading] = useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [subscribedUser, setSubscribedUser] = useState(false);
  const [viewCollectionDetails, setOpenData] = React.useState();
  const fileExtention = viewCollectionDetails?.image.split(".").pop();
  const [isLoading, setIsLoading] = useState(false);

  const fileType =
    fileExtention == "mp4" || fileExtention == "webp"
      ? "video"
      : fileExtention == "mp3"
        ? "audio"
        : "image";

  // console.log("viewCollectionDetails", data?.userId?.bnbAccount?.address);

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

  useEffect(() => {
    const userSubscriberd = data?.subscriptionUsers?.filter((value) => {
      return value === auth.userData?._id;
    });
    if (userSubscriberd[0]) {
      setSubscribedUser(true);
    } else {
      setSubscribedUser(false);
    }
  }, [
    data?.subscriptionUser,
    subscribedUser,
    data?.subscriptionUsers,
    auth.userData?._id,
  ]);
  const subscribeNowHandler = async (isCheck) => {
    setIsloading(true);
    await axios({
      method: "POST",
      url: ApiConfig.subscribeNow,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: {
        collectionId: data._id,
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.responseCode === 200) {
          // auth.updateUserData()
          // history.push('/profile')
          setOpen4(false);
          toast.success("You have subscribed successfully");
          if (calBackFunc) {
            calBackFunc();
          }
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        setIsloading(false);
        toast.error(err?.response?.data?.responseMessage);

        if (calBackFunc) {
          calBackFunc();
        }

        // toast.error("Something went wrong");
      });
    // } else {
    //   toast.error("Balance is low");
    //   setIsloading(false);
    // }
  };
  const isVideo = data.image.includes(".mp4");
  let isLike = false;
  if (auth.userData?._id && data) {
    const likeUser = data?.likesUsers?.filter(
      (data) => data === auth.userData?._id
    );
    // console.log("likeUser", likeUser);
    isLike = likeUser?.length > 0;
  }
  // console.log("isLike", isLike, data);
  const likesHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.likeDislikeCollection + data._id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          postId: data._id,
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
    } catch (error) { }
  };

  const handleCollection = () => {
    // colletionDetails();
    setOpenData(data);
    setOpen4(true);
  };

  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Box
          id={`imagecard${index}`}
          className={classes.mainimg}
          onClick={() => {
            history.push({
              pathname: "/bundles-details",
              search: data?._id,
              state: data,
            });
          }}
        >
          {fileType == "image" && (
            <Box
              id={`imagecard${data?._id}`}
              className={classes.mainimg}
              style={{ background: "url(" + data.image + ")" }}
            ></Box>
          )}
          {(fileType == "video" || fileType == "audio") && (
            <Box
              id={`imagecard${data?._id}`}
              className={classes.mainimg}
              style={{ background: "url(" + data.image + ")" }}
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
                <source src={data.image} type="video/mp4" />
              </video>
            </Box>
          )}
        </Box>
        <Box mt={2}>
          <Grid container spacing={1} alignItems="center">
            <Box className="mainText">
              <Box className={classes.dialogProfileImage}>
                <Box className="userImage">
                  <img
                    src={
                      data?.userId?.profilePic
                        ? data?.userId?.profilePic
                        : "/images/user.png"
                    }
                    alt="user data"
                  />
                </Box>
                <Box className="username">
                  <Typography variant="h6" className={classes.text}>
                    {data?.userId?.userName
                      ? `${data?.userId?.userName?.length > 15
                        ? sortAddress(data?.userId?.userName)
                        : data?.userId?.userName
                      }`
                      : `${sortAddress(data?.userId?.bnbAccount?.address)}`}
                  </Typography>
                </Box>
              </Box>


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
                {/* <FavoriteBorderIcon
                className={classes.socialbox}
                style={isLike ? { color: "red" } : { color: "#BFBFBF" }}
              />{" "} */}
              </IconButton>
            </Box>
          </Grid>
        </Box>
        <Box className="text">
          <Typography variant="body1">Collection Title</Typography>
          <Typography variant="body1">{sortAddress(data?.title)}</Typography>
        </Box>
        <Box className="text" mb={2}>
          <Typography variant="body1">Collection Price</Typography>
          <Typography variant="body1">
            {data?.amount > 1 ? data?.amount : Number(data?.amount)?.toFixed(4)}
            &nbsp;
            {tokenName}
          </Typography>
        </Box>
        <Box className="buttonbox">
          {!subscribedUser && data?.userId?._id !== auth?.userData?._id && (
            <Box align="center">
              <Box
                onClick={() => handleCollection(data)}
                // onClick={() => subscribeNowHandler()}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="secondary">
                  Subscribe {loader && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          )}
          {subscribedUser && data?.userId?._id !== auth?.userData?._id && (
            <Box align="center">
              <Box
                // onClick={() => subscribeNowHandler()}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="secondary">
                  Subscribed
                </Button>
              </Box>
            </Box>
          )}
          {data?.userId?._id === auth?.userData?._id && (
            <Box align="center">
              <Box
                onClick={() => setOpen3(true)}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="secondary">
                  View
                </Button>
              </Box>
            </Box>
          )}
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => subscribeNowHandler()}
            // component={Link}
            // to="/about-creators"
          >
            {" "}
            Subscribe {loader && <ButtonCircularProgress />}
          </Button> */}
        </Box>
        {open3 && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={open3}
            onClose={() => setOpen3(false)}
            aria-labelledby="max-width-dialog-title"
          // disableBackdropClick={isLoading}
          // disableEscapeKeyDown={isLoading}
          >
            <DialogContent>
              <Box className="img-container">
                {/* {isVideo ? (
                <div>
                  <video width="100%" controls>
                    <source src={data?.nftId[0]?.mediaUrl} type="video/mp4" />
                  </video>
                </div>
              ) : ( */}
                <img
                  src={data?.image}
                  alt=""
                // style={{
                //   width: "440px",
                //   maxWidth: "100%",
                //   height: "auto",
                //   borderRadius:"15px !important"
                // }}
                />
              </Box>
              {/* <Box mt={2} className={classes.bundleText} textAlign="center">
                <Typography variant="h4" className="red">
                  {data?.name}
                </Typography>
              </Box> */}
              <Box mt={2}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6} align="left">
                    <Box className={classes.dialogProfileImage}>
                      <Box className="userImage">
                        <img
                          src={
                            data?.userId?.profilePic
                              ? data?.userId?.profilePic
                              : "/images/user.png"
                          }
                          alt="user data"
                        />
                      </Box>
                      <Box className="username">
                        <Typography variant="h6" className={classes.text}>
                          {data?.userId?.userName
                            ? data?.userId?.userName
                            : data?.userId?.name}
                        </Typography>
                      </Box>
                    </Box>

                    {/* <Typography
                        variant="h6"
                        style={{
                          marginLeft: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data?.title}
                      </Typography> */}
                  </Grid>
                  <Grid item xs={6} align="right">
                    <Typography variant="body1">
                      Collection Price: &nbsp;
                      <span
                        style={{
                          fontSize: "14px",
                          color: "#FFFFFF",
                          fontWeight: "500",
                        }}
                      >
                        {data?.amount > 1
                          ? data?.amount
                          : Number(data?.amount)?.toFixed(4)}
                        &nbsp;
                        {tokenName}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
                <Box mt={1} className={classes.deskiText}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} align="left">
                      <Typography variant="h4">
                        Duration: <span>{data?.duration}&nbsp; Days</span>
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="h4">Details:</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">{data?.title}</Typography>
                    </Grid>
                  </Grid>
                </Box>
                {auth.userData &&
                  auth.userLoggedIn &&
                  auth?.userData?._id !== data?.userId && (
                    <Box mt={3} mb={3} textAlign="center">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => {
                          setOpen3(false);
                        }}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
              </Box>
            </DialogContent>
          </Dialog>
        )}
        <Dialog
          maxWidth="sm"
          open={open4}
          onClose={() => setOpen4(false)}
          aria-labelledby="max-width-dialog-title"
        // disableBackdropClick={isLoading}
        // disableEscapeKeyDown={isLoading}
        >
          <DialogContent>
            {fileType == "image" && (
              <Box className={classes.modalBannerImage}>
                <figure>
                  <img src={viewCollectionDetails?.image} alt="" />
                </figure>
              </Box>
              // <Box
              //   // id={`imagecard${index}`}
              //   className={classes.PhotoBox}
              //   // style={{
              //   //   background: "url(" + viewCollectionDetails?.image + ")",
              //   // }}
              //   // onClick={() => {
              //   //   history.push("/about-auction");
              //   // }}
              // >
              //   <img
              //     src={viewCollectionDetails?.image}
              //     alt=""
              //     style={{
              //       width: "440px",
              //       maxWidth: "100%",
              //       height: "auto",
              //       borderRadius: "15px !important",
              //     }}
              //   />
              // </Box>
            )}
            {(fileType == "video" || fileType == "audio") && (
              <Box
                id={`imagecard${index}`}
                className={classes.PhotoBox}
              // onClick={() => {
              //   history.push("/about-auction");
              // }}
              >
                <video
                  width="100%"
                  loop={false}
                  autoPlay={false}
                  muted={true}
                  controls
                >
                  <source src={viewCollectionDetails?.image} type="video/mp4" />
                </video>
              </Box>
            )}
            {/* <Box mt={2} className={classes.bundleText} textAlign="center">
              <Typography variant="h4" className="red">
                {viewCollectionDetails?.name}
              </Typography>
            </Box> */}
            <Box mt={2}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Box className={classes.dialogProfileImage}>
                      <Box className="userImage">
                        <img
                          src={
                            data?.userId?.profilePic
                              ? data?.userId?.profilePic
                              : "/images/user.png"
                          }
                          alt="user data"
                        />
                      </Box>
                      <Box className="username">
                        <Typography
                          variant="h6"
                          style={{
                            marginLeft: "8px",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {data?.title}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} align="right">
                  <Typography variant="body1">
                    Collection Price: &nbsp;
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#FFFFFF",
                        fontWeight: "500",
                      }}
                    >
                      {data?.amount > 1
                        ? data?.amount
                        : Number(data?.amount)?.toFixed(4)}
                      &nbsp;
                      {tokenName}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              <Box mt={1} className={classes.deskiText}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h4">
                      Duration:&nbsp;
                      <span style={{ fontSize: "14px" }}>
                        {viewCollectionDetails?.duration}&nbsp; Days
                      </span>{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h4">Details:</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      style={{ color: "#A3A3A3", fontSize: "12px" }}
                    >
                      {viewCollectionDetails?.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              {auth.userData &&
                auth.userLoggedIn &&
                auth?.userData?._id !== data?.userId && (
                  <Box mt={3} mb={3} textAlign="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        setOpen4(false);
                      }}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    {/* {data?.userId?._id !== auth?.userData?._id && ( */}
                    {/* // auth.userData._id !== userId && */}
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={subscribeNowHandler}
                    >
                      Subscribe Now
                    </Button>
                  </Box>
                )}
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
}

export default StoryCard;
