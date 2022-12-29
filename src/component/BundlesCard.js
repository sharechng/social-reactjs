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
    // height: "200px !important",
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
  const { calBackFunc, data, particularUserList } = props;
  const auth = useContext(AuthContext);
  const [open3, setOpen3] = React.useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [subscribedUser, setSubscribedUser] = useState(false);

  const sortUserName = (user) => {
    const sortAdd = `${user?.slice(0, 5)}...${user?.slice(user.length - 5)}`;
    return sortAdd;
  };

  const updateDimensions = () => {
    var offsetWidth = document.getElementById(
      "imagecard" + data?._id
    ).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + data?._id).style.height =
      newoofsetWidth + "px";
  };
  useEffect(() => {
    updateDimensions();
  }, [data, data?._id]);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  let isLike = false;
  if (auth.userData?._id && data) {
    const likeUser = data?.likesUsers?.filter(
      (data) => data === auth.userData?._id
    );
    isLike = likeUser?.length > 0;
  }

  const likesHandler = async () => {
    try {
      const res = await Axios({
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
          calBackFunc(particularUserList);
        } else {
          calBackFunc(particularUserList);
        }
        // }

        toast.success(res.data.responseMessage);
      }
    } catch (error) { }
  };
  const subscribeNowHandler = async (isCheck) => {
    setIsloading(true);
    await Axios({
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
          setOpen3(false);

          // auth.updateUserData()
          // history.push('/profile')
          toast.success("You have subscribed successfully");
          if (calBackFunc) {
            calBackFunc();
          }
          setOpen3(false);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        setIsloading(false);
        setOpen3(false);
        if (calBackFunc) {
          calBackFunc();
        }

        toast.error(err?.response?.data?.responseMessage);

        // toast.error("Something went wrong");
      });
    // } else {
    //   toast.error("Balance is low");
    //   setIsloading(false);
    // }
  };
  // const userSubscriberd = data?.subscriptionUser.filter((data) => {
  //   return data;
  // });
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

  const fileExtention = data.image.split(".").pop();

  const fileType =
    fileExtention == "mp4" || fileExtention == "webp"
      ? "video"
      : fileExtention == "mp3"
        ? "audio"
        : "image";
  // console.log("data?._id--", data?._id);
  return (
    <>
      <Paper elevation={2} className={classes.root}>
        {fileType == "image" && (
          <Box
            id={`imagecard${data?._id}`}
            className={classes.mainimg}
            // style={{ background: "url(" + data.image + ")" }}
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
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Box>
              <Box className="timeline">
                <Typography variant="h6">
                  {data?.userId?.userName
                    ? `${data?.userId?.userName?.length > 15
                      ? sortUserName(data?.userId?.userName)
                      : data?.userId?.userName
                    }`
                    : ` ${data?.userId?.name?.length > 15
                      ? sortUserName(data?.userId?.name)
                      : data?.userId?.name
                    }`}

                  {/* sortUserName(data?.userId?.name)} */}
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
              {/* <FavoriteBorderIcon
                className={classes.socialbox}
                style={isLike ? { color: "red" } : { color: "#BFBFBF" }}
              />{" "} */}
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={1} align="left">
          <Grid item xs={6}>
            <Typography variant="body1">Collection Title</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="body1">{sortAddress(data?.title)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">Collection Price</Typography>
          </Grid>
          <Grid item xs={6} align="right">
            <Typography variant="body1">
              {data?.amount > 1
                ? data?.amount
                : Number(data?.amount)?.toFixed(4)}
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
              {data?.duration} &nbsp; Days
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} align="left">
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Box>
                {!subscribedUser && data?.userId?._id !== auth?.userData?._id && (
                  <Box>
                    <Box
                      onClick={() => setOpen3(true)}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.btnbox}
                      >
                        Subscribe
                      </Button>
                    </Box>
                  </Box>
                )}

                {subscribedUser && data?.userId?._id !== auth?.userData?._id && (
                  <Box>
                    <Box
                      // onClick={() => setOpen3(true)}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.btnbox}
                      >
                        Subscribed
                      </Button>
                    </Box>
                  </Box>
                )}

                {data?.userId?._id === auth?.userData?._id && (
                  <Box>
                    <Box
                      onClick={() => setOpen3(true)}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.btnbox}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>&nbsp;&nbsp;

              <Box
                onClick={() => {
                  history.push({
                    pathname: "/bundles-details",
                    search: data?._id,
                    state: data,
                  });
                }}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.btnbox}
                >
                  view post
                </Button>
              </Box>
            </Box>

          </Grid>

        </Grid>

      </Paper>
      {open3 && (
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={open3}
          onClose={() => setOpen3(false)}
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick={isLoading}
          disableEscapeKeyDown={isLoading}
        >
          <DialogContent>
            {fileType == "image" && (
              <Box id={`imagecard${data?._id}`} className={classes.PhotoBox}>
                <img
                  src={data?.image}
                  alt=""
                  style={{ height: "368px", width: "553px" }}
                />
              </Box>
              // <Box
              //   id={`imagecard${data?._id}`}
              //   className={classes.Dialogmainimg}
              //   style={{ background: "url(" + data.image + ")" }}
              // ></Box>
            )}
            {(fileType == "video" || fileType == "audio") && (
              <Box
                id={`imagecard${data?._id}`}
                className={classes.Dialogmainimg}
              >
                <video
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
            <Box className={classes.PhotoBox}>
              {/* {isVideo ? (
                <div>
                  <video width="100%" controls>
                    <source src={data?.nftId[0]?.mediaUrl} type="video/mp4" />
                  </video>
                </div>
              ) : ( */}
              {/* <img
                src={data?.image}
                alt=""
                style={{ height: "368px", width: "553px" }}
              /> */}
              {/* )} */}
              {/* <img src={data.mediaUrl} alt="" /> */}
            </Box>
            {/* <Box mt={2} className={classes.bundleText} textAlign="center">
              <Typography variant="h4" className="red">
                {data?.name}
              </Typography>
            </Box> */}
            <Box mt={2}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Box style={{ display: "flex", alignItems: "center" }}>
                    <Box className={classes.dialogProfileImage}>
                      <img
                        src={
                          data?.userId?.profilePic
                            ? data?.userId?.profilePic
                            : "/images/user.png"
                        }
                        alt="user data"
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        style={{
                          marginLeft: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {data?.userId?.userName
                          ? data?.userId?.userName
                          : data?.userId?.name}
                      </Typography>
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
            </Box>
            <Box mt={1} className={classes.deskiText}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Duration:&nbsp;
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        color: "#FFFFFF",
                      }}
                    >
                      {data?.duration} &nbsp; Days
                    </span>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h4">Details:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">{data?.description}</Typography>
                </Grid>
              </Grid>
            </Box>
            {auth.userData &&
              auth.userLoggedIn &&
              auth?.userData?._id !== data?.userId && (
                <Box mt={3} mb={3} textAlign="center">
                  <Button
                    className={classes.btnbox}
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
                  &nbsp;&nbsp;&nbsp;
                  {data?.userId?._id !== auth?.userData?._id && (
                    // auth.userData._id !== userId &&
                    <Button
                      className={classes.btnbox}
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={subscribeNowHandler}
                    // onClick={() => {
                    //   if (auth?.userData.userType === "User") {
                    //     subscribeNowBlockchainHandler(data);
                    //   } else {
                    //     subscribeNowHandler(true);
                    //   }
                    // }}
                    // disabled={isLoading}
                    >
                      Subscribe Now
                      {/* {isLoading ? "pending..." : "Subscribe now"}{" "}
                    {isLoading && <ButtonCircularProgress />} */}
                    </Button>
                  )}
                </Box>
              )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default BundlesCard;
