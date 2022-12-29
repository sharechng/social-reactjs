import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Container,
  makeStyles,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import Page from "src/component/Page";
import { useHistory, useLocation } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import AuctionTable from "./AuctionTable";
import Slide from "@material-ui/core/Slide";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import DataLoading from "src/component/DataLoading";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NoDataFound from "src/component/NoDataFound";
import { calculateTimeLeftAuction, sortAddress } from "src/utils";
import moment from "moment";
import Axios from "axios";
import { AuthContext } from "src/context/Auth";
import { MakeAuctionModal } from "./Auction";
import { toast } from "react-toastify";
import FormControl from "@material-ui/core/FormControl";
import { KeyboardDatePicker } from "@material-ui/pickers";

// import DialogActions from "@material-ui/core/DialogActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  mainbox: {
    padding: "20px",
  },
  root: {
    "& .heading": {
      padding: "20px",
    },
    "& .base": {
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      "& .allignment": {
        display: "flex",
        alignItems: "center",
        "& .Userbox": {
          display: "flex",
          alignItems: "center",
          "& figure": {
            margin: "0",
            marginLeft: "-10px",
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#101010",
            position: "relative",
            transition: "0.3s",
            cursor: "pointer",
            "&:first-child": {
              marginLeft: "0px",
            },
            "&:hover": {
              zIndex: "2",
              transform: "scale(1.2)",
            },
            "& img": {
              width: "auto",
              maxWidth: "100%",
              maxHeight: "41px",
            },
          },
        },
        "& h4": {},
      },
    },
    "& .text": {
      padding: "25px",
      "& h5": {
        whiteSpace: "pre",
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: "calc(100% - 5px)",
      },
      "& h6": {
        whiteSpace: "pre",
        textOverflow: "ellipsis",
        overflow: "hidden",
        width: "calc(100% - 5px)",
      },
    },
  },
  aboutAuction: {
    paddingBottom: "50px",
    "& .heading": {
      paddingTop: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
    },
    "& .username": {
      marginTop: "26px",
      marginLeft: "182px",
      "@media(max-width:767px)": {},
      "& p": {
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
      },
    },
    "& .postImg": {
      height: "260px",
      margin: "0 auto",
      overflow: "hidden",
      position: "relative",
      background: "rgba(0,0,0,0.7)",
      backgroundSize: "100% !important",
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
    "& .userProfile": {
      display: "flex",
      padding: "0 20px",
      marginTop: "-20px",
      alignItems: "center",
      justifyContent: "start",
      "& figure": {
        width: "175px",
        border: "3px solid #161616",
        height: "130px",
        margin: "0 auto",
        position: "relative",
        maxWidth: "130px",
        background:
          "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
        marginTop: "20px",
        borderRadius: "50%",
        backdropFilter: "blur(42px)",
      },
      "& .user": {
        position: "absolute",
        "& img": {
          width: "100%",
          borderRadius: "50%",
          height: "100%",
          objectFit: "cover",
        },
      },
    },
    "& .textbox": {
      padding: "30px",
      textAlign: "center",
    },
    "& .btnbox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 0px",
      "& Button": {
        margin: "5px",
      },
    },
  },
  iconbutton: {
    // backgroundColor: "#FFF",
    width: "20px",
    // color:"rgb(191, 191, 191)",
    height: "20px",
    marginLeft: "20px",
    "& svg": {
      fontSize: "23px",
      // color:"rgb(55, 54, 54)",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15px",
      height: "15px",
      padding: "3px",
    },
  },
  icons: {
    color: "#e24444",
    "@media(max-width:600px)": {
      fontSize: "10px",
    },
  },
  likes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  figurebox: {
    height: "460px",
    margin: "0 auto",
    overflow: "hidden",
    position: "relative",
    background: "rgba(0,0,0,0.7)",
    backgroundSize: "100% !important",
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
  profileDetails: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    marginTop: "-20px",
  },
  subscribeButton: {
    "@media(max-width:767px)": {
      maxWidth: "70px",
      fontSize: "10px",
    },
  },
  startingPrice: {
    display: "flex", alignItems: "center",
  }
}));

function AboutAuction(props) {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [auctionId, setAuctionId] = useState();
  const [auctionNFTDetails, setAuctionNFTDetails] = useState();
  const [fileType, setFileType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeftAuction());
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const [isFollowing, setisFollowing] = useState(false);
  const auth = useContext(AuthContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const { data, callbackFun, index } = props;
  const [isHidePost, setIsHidePost] = React.useState(false);
  const [isHidePost1, setIsHidePost1] = React.useState(false);
  const [bidLoader, setBidLoader] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [price, setPrice] = useState(data?.amount);
  const [fieldValue, setFieldValueDateOfBirth] = useState();
  const [isBuyPost, setIsBuyPost] = useState(false);
  const [isOpenInterest, setIsopenInterest] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const viewAuctionNFTHandler = async () => {
    try {
      // setAuctionNFTDetails();

      const res = await axios.get(Apiconfigs.viewAuction, {
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          auctionId: auctionId,
        },
      });
      if (res.data.responseCode === 200) {
        setAuctionNFTDetails(res.data.result);
        const fileExtention = res.data.result.mediaUrl.split(".").pop();
        setIsLoading(false);

        const fileType =
          fileExtention == "mp4" || fileExtention == "webp"
            ? "video"
            : fileExtention == "mp3"
              ? "audio"
              : "image";
        setFileType(fileType);
        let followersList = res?.data?.result?.userId?.followers;
        if (followersList) {
          const filterFun = followersList.filter((data) => {
            return data === auth?.userData?._id;
          });
          if (filterFun[0]) {
            setisFollowing(true);
          } else {
            setisFollowing(false);
          }
        }
      } else {
      }
      setIsLoading(false);
    } catch (error) {
      setAuctionNFTDetails();
      setIsLoading(false);
    }
  };
  const buyNftPost = async (isCheck) => {
    await axios({
      method: "POST",
      url: Apiconfigs.buyAuction,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: {
        auctionId: auctionId,
      },
    })
      .then(async (res) => {
        // setIsloading(false);
        if (res.data.responseCode === 200) {
          history.push("/auction");
          setIsBuyPost(false);
          toast.success(res.data.responseMessage);
          viewAuctionNFTHandler();
        } else {
          viewAuctionNFTHandler();
          // toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        viewAuctionNFTHandler();
        toast.error(err?.response?.data?.responseMessage);
      });
  };

  const cancelAuctionNowHandler = async (isCheck) => {
    await axios({
      method: "DELETE",
      url: Apiconfigs.deleteAuction,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      params: {
        auctionId: auctionId,
      },
    })
      .then(async (res) => {
        // setIsloading(false);
        if (res.data.responseCode === 200) {
          viewAuctionNFTHandler();
          setIsopenInterest(false);
          history.push("/auction");
          // setOpen(false);
          toast.success(" successfully deleted");
        } else {
          // toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.responseMessage);
      });
  };
  useEffect(() => {
    if (auctionId) {
      viewAuctionNFTHandler();
    }
  }, [auctionId]);

  useEffect(() => {
    const ids = location.search.split("?");
    if (ids[1]) {
      setAuctionId(ids[1]);
    } else {
      setIsLoading(false);
    }
  }, [location]);

  const bidNowHandler = async (isCheck) => {
    setIsSubmit(true);
    setBidLoader(true);
    if (Number(bidPrice) > 0 && bidPrice !== "" && Number(bidPrice) < 2000) {
      if (auctionNFTDetails?.bidId.length > 0) {
        if (bidPrice > auctionNFTDetails?.bidId[0]?.amountBid) {
          await axios({
            method: "POST",
            url: Apiconfigs.createBid,
            headers: {
              token: window.localStorage.getItem("token"),
            },
            data: {
              auctionId: auctionId,
              amountBid: bidPrice,
            },
          })
            .then(async (res) => {
              // setIsloading(false);
              if (res.data.responseCode === 200) {
                setBidLoader(false);
                setBidPrice("")
                setIsSubmit(false);
                viewAuctionNFTHandler();
                setOpen(false);
                toast.success(res.data.responseMessage);
              } else {
                setIsSubmit(false);
                setBidLoader(false)
                // toast.error("Something went wrong");
              }
            })
            .catch((err) => {
              setIsSubmit(false);
              setBidLoader(false);

              setIsSubmit(false);
              toast.error(err?.response?.data?.responseMessage);
            });
        } else {
          setBidLoader(false);

          toast.info("Bid price should be greater than from last bid");
        }
      } else {
        if (Number(bidPrice) > auctionNFTDetails?.amount) {
          await axios({
            method: "POST",
            url: Apiconfigs.createBid,
            headers: {
              token: window.localStorage.getItem("token"),
            },
            data: {
              auctionId: auctionId,
              amountBid: bidPrice,
            },
          })
            .then(async (res) => {
              // setIsloading(false);
              if (res.data.responseCode === 200) {
                viewAuctionNFTHandler();
                setOpen(false);
                toast.success(res.data.responseMessage);
              } else {
                // toast.error("Something went wrong");
              }
            })
            .catch((err) => {
              setIsSubmit(false);
              toast.error(err?.response?.data?.responseMessage);
            });
        } else {
          setBidLoader(false);
          toast.info("Bid price should be greater than amount");
        }
      }
    }
  };


  const acceptBidNowHandler = async (isCheck) => {
    await axios({
      method: "POST",
      url: Apiconfigs.acceptBid,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      params: {
        _id: auctionNFTDetails?.bidId[0]?._id,
      },
    })
      .then(async (res) => {
        // setIsloading(false);
        if (res.data.responseCode === 200) {
          setIsHidePost1(false);
          viewAuctionNFTHandler();
          history.push("/auction");
          // setOpen(false);
          toast.success(res.data.responseMessage);
        } else {
          setIsHidePost1(false);
          // toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        setIsHidePost1(false);
        toast.error(err?.response?.data?.responseMessage);
      });
  };
  const rejectBidNowHandler = async (isCheck) => {
    await axios({
      method: "PUT",
      url: Apiconfigs.rejectBid,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      params: {
        _id: auctionNFTDetails?.bidId[0]?._id,
      },
    })
      .then(async (res) => {
        // setIsloading(false);
        if (res.data.responseCode === 200) {
          viewAuctionNFTHandler();
          setIsHidePost(false);
          toast.success(res.data.responseMessage);

          // setOpen(false);
          // toast.success("You have subscribed successfully");
        } else {
          setIsHidePost(false);
          // toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        setIsHidePost(false);
        toast.error(err?.response?.data?.responseMessage);
      });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (auctionNFTDetails?.time) {
        setTimeLeft(calculateTimeLeftAuction(new Date(auctionNFTDetails.time)));
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    if (auctionNFTDetails && auth?.userData) {
      const filterFun = auctionNFTDetails.userId?.subscribers?.filter(
        (data) => {
          return data === auth?.userData?._id;
        }
      );
      if (filterFun?.length > 0) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    }
  }, [auctionNFTDetails, auth?.userData]);

  const likesHandler = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.likeDislikeAuction + auctionId,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        if (viewAuctionNFTHandler) {
          viewAuctionNFTHandler();
        }
        toast.success(res.data.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  let isLike = false;
  if (auth.userData?._id && auctionNFTDetails) {
    const likeUser = auctionNFTDetails?.likesUsers?.filter(
      (data) => data === auth.userData?._id
    );
    isLike = likeUser?.length > 0;
  }



  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const abc = () => {
    addAuctionPost();
    // setOpen1(false);
  };
  const addAuctionPost = async () => {
    setIsSubmit(true);

    if (Number(price) > 0 && fieldValue) {
      setIsLoading(true);
      try {
        const res = await Axios({
          method: "POST",
          url: Apiconfigs.addAuction,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            postId: data._id,
            title: data?.postTitle,
            mediaUrl: data?.mediaUrl,
            details: data?.details,
            amount: price,
            time: fieldValue,
          },
        });
        if (res.data.responseCode === 200) {
          if (viewAuctionNFTHandler) {
            viewAuctionNFTHandler();
          }
          toast.success(res.data.responseMessage);
          setIsLoading(false);
          setOpen1(false);
        }
      } catch (error) {
        if (error?.response?.data?.responseCode === 200) {
          if (viewAuctionNFTHandler) {
            viewAuctionNFTHandler();
          }
          toast.success(error?.response?.data?.responseMessage);
          setIsLoading(false);
          setOpen1(false);
        } else {
          toast.error(error?.response?.data?.responseMessage);
          setIsLoading(false);
          if (viewAuctionNFTHandler) {
            viewAuctionNFTHandler();
          }
          setOpen1(false);
        }
      }
    }
  };

  const followUnfollowHandler = async (id) => {
    // setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.followUnfollowUser + id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        viewAuctionNFTHandler();

        toast.success(res.data.responseMessage);
        // viewOtherProfileHandler();
      } else {
        setIsLoading(false);

        toast.error(res.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.responseMessage);
    }
  };
  return (
    <>
      {isUpdateOpen && (
        <MakeAuctionModal
          callbackFun={viewAuctionNFTHandler}
          open={isUpdateOpen}
          setOpen={(status) => setIsUpdateOpen(status)}
          isEdit={true}
          auctionNFTDetails={auctionNFTDetails}
        />
      )}
      {isLoading ? (
        <DataLoading />
      ) : (
        <Page title="About Creators">
          {auctionNFTDetails ? (
            <Paper className={classes.root} elevation={2}>
              <Box className="heading">
                <Typography variant="h3" style={{ textAlign: "left" }}>
                  Auctions
                </Typography>
              </Box>
              <Box className="imagebox">
                <figure className={classes.figurebox}>
                  {fileType == "image" && (
                    <img
                      src={
                        auctionNFTDetails?.mediaUrl
                          ? auctionNFTDetails?.mediaUrl
                          : "images/Auction/Auction.png"
                      }
                      ali="Creators Image"
                      style={{ width: "100%" }}
                    />
                  )}

                  {(fileType == "video" || fileType == "audio") && (
                    <video
                      // width='100%'
                      style={
                        fileType === "audio"
                          ? { height: 75, width: "100%" }
                          : { height: 460, width: "100%" }
                      }
                      loop={false}
                      autoPlay={false}
                      muted={true}
                      controls
                    >
                      <source
                        src={auctionNFTDetails.mediaUrl}
                        type="video/mp4"
                      />
                    </video>
                  )}
                </figure>
              </Box>
              <Box className={classes.mainbox}>
                <Box className="base">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Box className="allignment">
                        <Box className="Userbox">
                          <figure>
                            <img
                              src={
                                auctionNFTDetails?.userId?.profilePic
                                  ? auctionNFTDetails?.userId?.profilePic
                                  : "images/user.png"
                              }
                            />
                          </figure>
                          {/* <figure>
                    <img src='images/Ellipse1.png' />
                  </figure> */}
                        </Box>
                        <Box>
                          {" "}
                          <Typography
                            // 
                            variant="h4"
                            style={{ marginLeft: "7px", wordBreak: "break-all" }}
                          >
                            {auctionNFTDetails?.userId?.userName
                              ? auctionNFTDetails?.userId?.userName
                              : auctionNFTDetails?.userId?.name}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className={classes.likes}>
                        <IconButton onClick={likesHandler}>
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
                        <Box pl={1}>
                          {" "}
                          <Typography variant="body2">
                            {auctionNFTDetails?.likesCount}
                          </Typography>
                        </Box>
                      </Box>{" "}
                    </Grid>
                  </Grid>
                </Box>
                <Box className={classes.startingPrice}>
                  {auctionNFTDetails?.amount && (
                    <Typography variant="body2">
                      Starting Price
                    </Typography>
                  )}
                  &nbsp;
                  {auctionNFTDetails?.amount && (
                    <Typography
                      variant="h4"
                      style={{ marginLeft: "8px" }}
                    >
                      {/* {auctionNFTDetails?.amount} */}
                      {auctionNFTDetails?.bidId[0]?.amountBid
                        ? auctionNFTDetails?.bidId[0]?.amountBid
                        : auctionNFTDetails?.amount}&nbsp; share
                    </Typography>
                  )}
                </Box>
                <Box mt={1}>
                  {auctionNFTDetails?.isBuy || auctionNFTDetails?.isSold ? (
                    <Box textAlign={"center"}>
                      <Typography  variant="h2">
                        SOLD
                      </Typography>
                    </Box>
                  ) : (
                    <Box style={{ display: "flex", alignItems: "center" }}>
                      <Typography  variant="h6">
                        AUCTIONS ENDING IN: {""}
                      </Typography>
                      {moment().unix() >
                        moment(auctionNFTDetails.time).unix() ? (
                        <Typography
                          // 
                          variant="h6"
                          style={{ marginTop: "-8px" }}
                        >
                          Expired
                        </Typography>
                      ) : (
                        <Typography
                          // 
                          variant="h4"
                          style={{ marginLeft: "8px" }}
                        >
                          {`${timeLeft.days ? timeLeft.days : 0}d : ${timeLeft.hours ? timeLeft.hours : 0
                            }h : ${timeLeft.minutes ? timeLeft.minutes : 0}m : ${timeLeft.seconds ? timeLeft.seconds : 0
                            }s`}
                        </Typography>
                      )}
                    </Box>
                  )}
                  <Box mt={1}>
                    <Typography
                      variant="body1"
                      style={{ wordBreak: "break-all" }}
                    >
                      {auctionNFTDetails?.title}
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <Typography
                      variant="body1"
                      style={{ wordBreak: "break-all" }} 
                    >
                      {auctionNFTDetails?.details}
                    </Typography>
                  </Box>

                  <Box mt={2}>
                    <Box align="center">
                      {!(
                        moment().unix() > moment(auctionNFTDetails.time).unix()
                      ) &&
                        auctionNFTDetails?.userId?._id !== auth.userData?._id &&
                        !auctionNFTDetails?.isSold && (
                          <Button
                            variant="contained"
                            onClick={() => setIsBuyPost(true)}
                            color="primary"
                            size="large"
                          >
                            Buy
                          </Button>
                        )}
                      &nbsp;&nbsp;
                      {moment().unix() >
                        moment(auctionNFTDetails.time).unix() ||
                        (auctionNFTDetails?.buyerId === auth.userData?._id &&
                          auctionNFTDetails?.isSold && (
                            <Button
                              variant="contained"
                              // onClick={buyNftPost}
                              color="secondary"
                              size="large"
                              onClick={handleClickOpen1}
                            >
                              Resell
                            </Button>
                          ))}
                      &nbsp;&nbsp;
                      {
                        !(
                          moment().unix() >
                          moment(auctionNFTDetails.time).unix()
                        ) &&
                        // auctionNFTDetails?.bidId[0]?.userId !==
                        //   auth?.userData?._id &&
                        auctionNFTDetails?.userId?._id !==
                        auth.userData?._id &&
                        !auctionNFTDetails?.isSold && (
                          // auctionNFTDetails?.bidId[0]?.userId ===
                          // auth?.userData?._id &&
                          // auctionNFTDetails?.bidId[0]?.bidStatus ===
                          //   "REJECTED" && (
                          // auctionNFTDetails?.bidId?.length &&
                          // auctionNFTDetails?.bidId[0]?.bidStatus ===
                          // ("REJECTED"
                          <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={handleClickOpen}
                          >
                            Bid Now
                          </Button>
                        )
                        // )
                      }
                      &nbsp;&nbsp;
                      {!(
                        moment().unix() > moment(auctionNFTDetails.time).unix()
                      ) &&
                        auctionNFTDetails?.userId?._id === auth.userData?._id &&
                        !auctionNFTDetails?.isSold && (
                          <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => setIsUpdateOpen(true)}
                          >
                            Update
                          </Button>
                        )}
                      &nbsp;&nbsp;
                      {!(
                        moment().unix() > moment(auctionNFTDetails.time).unix()
                      ) &&
                        auctionNFTDetails?.userId?._id === auth.userData?._id &&
                        auctionNFTDetails?.bidId?.length > 0 &&
                        auctionNFTDetails?.bidId[0]?.bidStatus !==
                        "REJECTED" && auctionNFTDetails?.isBuy !== true && auctionNFTDetails?.isSold !== true && (
                          <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => setIsHidePost1(true)}
                          >
                            Accept Bid
                          </Button>
                        )}
                      &nbsp;&nbsp;
                      {!(
                        moment().unix() > moment(auctionNFTDetails.time).unix()
                      ) &&
                        auctionNFTDetails?.userId?._id === auth.userData?._id &&
                        auctionNFTDetails?.bidId?.length > 0 &&
                        !auctionNFTDetails?.isSold &&
                        auctionNFTDetails?.bidId[0]?.bidStatus !==
                        "REJECTED" && (
                          <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => setIsHidePost(true)}
                          // onClick={rejectBidNowHandler}
                          >
                            Reject Bid
                          </Button>
                        )}
                      &nbsp;&nbsp;
                      {!(
                        moment().unix() > moment(auctionNFTDetails.time).unix()
                      ) &&
                        auctionNFTDetails?.userId?._id === auth.userData?._id &&
                        !auctionNFTDetails?.isSold && (
                          <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => setIsopenInterest(true)}
                          >
                            Cancel Auction
                          </Button>
                        )}
                      <Dialog
                        open={isHidePost1}
                        fullWidth
                        maxWidth="xs"
                        onClose={() => setIsHidePost1(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            {/* {row.status} */}
                            {`Are you sure want to accept this bid?`}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            color="secondary"
                            variant="contained"
                            // disabled={loader2}
                            onClick={acceptBidNowHandler}
                          >
                            Yes
                            {/* {loader2 && <ButtonCircularProgress />} */}
                          </Button>
                          <Button
                            onClick={() => setIsHidePost1(false)}
                            variant="contained"
                            color="primary"
                            autoFocus
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={isHidePost}
                        onClose={() => setIsHidePost(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            {/* {row.status} */}
                            {`Are you sure want to reject this bid?`}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            color="secondary"
                            variant="contained"
                            // disabled={loader2}
                            onClick={rejectBidNowHandler}
                          >
                            Yes
                            {/* {loader2 && <ButtonCircularProgress />} */}
                          </Button>
                          <Button
                            onClick={() => setIsHidePost(false)}
                            variant="contained"
                            color="primary"
                            autoFocus
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={isOpenInterest}
                        onClose={() => {
                          setIsopenInterest(false);
                        }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth="xs"
                        fullWidth
                      >
                        <DialogContent>
                          <DialogContentText
                            id="alert-dialog-description"
                            align="center"
                          >
                            Are you sure you want to cancel this auction
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            onClick={cancelAuctionNowHandler}
                            variant="contained"
                            color="secondary"
                          >
                            Yes
                          </Button>
                          <Button
                            onClick={() => {
                              setIsopenInterest(false);
                            }}
                            color="primary"
                            variant="contained"
                            autoFocus
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        maxWidth="xs"
                        fullWidth
                      >
                        <Box p={2}>
                          <DialogTitle id="alert-dialog-slide-title"></DialogTitle>
                          <DialogContent>
                            <TextField
                              type="number"
                              placeholder="Enter bid amount"
                              fullWidth
                              variant="outlined"
                              value={bidPrice}
                              onChange={(e) => setBidPrice(e.target.value)}
                              onKeyPress={(event) => {
                                if (event?.key === "-" || event?.key === "+") {
                                  event.preventDefault();
                                }
                              }}
                              error={
                                (isSubmit && bidPrice == "") ||
                                (bidPrice !== "" && Number(bidPrice) === 0) ||
                                (bidPrice !== "" && Number(bidPrice) > 2000)
                              }
                              helperText={
                                (isSubmit &&
                                  bidPrice == "" &&
                                  "Please enter valid bid price") ||
                                (bidPrice !== "" &&
                                  Number(bidPrice) === 0 &&
                                  "Please enter valid bid price") ||
                                (bidPrice !== "" &&
                                  Number(bidPrice) > 2000 &&
                                  "Bid price should be less than or equal to 2000")
                              }
                            />
                          </DialogContent>
                          <DialogActions>
                            <Box mt={1} align="center">
                              <Button
                                onClick={handleClose}
                                size="large"
                                variant="contained"
                                color="primary"
                                style={{ marginRight: "8px" }}
                              // onClick={bidNowHandler}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={bidNowHandler}
                                variant="contained"
                                color="secondary"
                                disabled={bidLoader}
                                size="large"
                                style={{ marginLeft: "8px" }}
                              >
                                Confirm{" "}
                                {bidLoader && <ButtonCircularProgress />}
                              </Button>
                            </Box>
                          </DialogActions>
                        </Box>
                      </Dialog>
                      <Dialog
                        open={isBuyPost}
                        onClose={() => setIsBuyPost(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            {/* {row.status} */}
                            {`Are you sure want to  buy this post?`}
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            color="secondary"
                            variant="contained"
                            // disabled={loader2}
                            onClick={buyNftPost}
                          >
                            Yes
                            {/* {loader2 && <ButtonCircularProgress />} */}
                          </Button>
                          <Button
                            onClick={() => setIsBuyPost(false)}
                            color="primary"
                            variant="contained"
                            autoFocus
                          >
                            No
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        onClose={handleClose1}
                        aria-labelledby="customized-dialog-title"
                        open={open1}
                      >
                        <Box>
                          <Typography variant="h6">Price</Typography>
                          <TextField
                            type="number"
                            variant="outlined"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            style={{ width: "20rem" }}
                            error={Boolean(
                              isSubmit && (price === "" || Number(price) <= 0)
                            )}
                            onKeyPress={(event) => {
                              if (event?.key === "-" || event?.key === "+") {
                                event.preventDefault();
                              }
                            }}
                          />
                          <FormHelperText error>
                            {isSubmit &&
                              (price === "" || Number(price) <= 0) && (
                                <Box ml={1}>Enter valid price</Box>
                              )}
                          </FormHelperText>
                        </Box>
                        <Box mt={2}>
                          {" "}
                          <Typography variant="h6">Expiry Time</Typography>
                          <FormControl fullWidth>
                            <KeyboardDatePicker
                              value={fieldValue}
                              // placeholder="DD/MM/YYYY"
                              onChange={(date) => {
                                setFieldValueDateOfBirth(new Date(date));
                              }}
                              // maxDate={(date) =>
                              //   moment().diff(
                              //     moment(new Date(date)),
                              //     "years"
                              //   ) >= 18
                              // }
                              // minDate={moment().subtract(6, "months")}
                              minDate={moment().add(15, "minutes")}
                              format="DD/MM/YYYY"
                              inputVariant="outlined"
                              disablePast
                              margin="dense"
                              helperText=""
                              name="dob"
                              // onChange={_onInputChange}
                              error={Boolean(isSubmit && !fieldValue)}
                            // helperText={touched.dob && errors.dob}
                            />
                            <FormHelperText error>
                              {isSubmit && !fieldValue && (
                                <Box ml={1}>Expiry time is required</Box>
                              )}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                        <DialogActions align="center">
                          <Button
                            onClick={handleClose1}
                            color="primary"
                            variant="contained"
                            size="large"
                          >
                            Cancel
                          </Button>
                          <Button
                            // onClick={() => setOpen(false)}
                            color="secondary"
                            variant="contained"
                            size="large"
                            onClick={abc}
                          // onClickCapture={() => {
                          //   history.push("/");
                          // }}
                          >
                            Create Auction
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </Box>
                    {/* <Box align="left" mb={3} mt={2}>
                      <Typography variant="h5">
                        {" "}
                        ETH Fees and MASS Fees apply
                      </Typography>
                    </Box> */}
                    &nbsp;&nbsp;
                    <Box mb={2}>
                      <AuctionTable auctionNFTDetails={auctionNFTDetails} />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className={classes.aboutAuction} mt={2}>
                <Box className="heading">
                  <Typography variant="h3">About the Creator</Typography>
                </Box>
                <Box className="imagebox">
                  <figure className="postImg">
                    <img
                      src={
                        auctionNFTDetails?.userId?.coverPic
                          ? auctionNFTDetails?.userId?.coverPic
                          : "images/userback.png"
                      }
                      ali="Creators Image"
                    />
                  </figure>
                </Box>
                <Box className={classes.profileDetails}>
                  <Box className="userProfile">
                    <figure className="user">
                      <img
                        src={
                          auctionNFTDetails?.userId?.profilePic
                            ? auctionNFTDetails?.userId?.profilePic
                            : "images/user.png"
                        }
                      />
                    </figure>
                  </Box>
                </Box>
                <Box className="username">
                  <Typography  variant="h3">
                    {auctionNFTDetails?.userId?.userName
                      ? auctionNFTDetails?.userId?.userName
                      : auctionNFTDetails?.userId?.name}
                  </Typography>
                  <Typography variant="body1">
                    {sortAddress(
                      auctionNFTDetails?.userId?.bnbAccount?.address
                    )}{" "}
                    &nbsp;
                    <CopyToClipboard
                      text={auctionNFTDetails?.userId?.bnbAccount?.address}
                    >
                      <FaCopy
                        style={{ cursor: "pointer" }}
                        onClick={() => toast.success("Copied successfully")}
                      />
                    </CopyToClipboard>
                    {/* &nbsp; <img src="images/Creators/chaincopy.png" /> */}
                  </Typography>
                  {auctionNFTDetails?.userId?._id !== auth.userData?._id && (
                    <Box mt={1}>
                      {/* <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      style={{ marginRight: "8px" }}
                      className={classes.subscribeButton}
                    >
                      {isSubscribed ? "Unsubscribe" : "Subscribe"}
                    </Button> */}
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        style={{ marginRight: "8px" }}
                        onClick={() =>
                          followUnfollowHandler(auctionNFTDetails?.userId?._id)
                        }
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                        {isLoading && <ButtonCircularProgress />}
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() =>
                          history.push({
                            pathname: "/chat-history",
                            search: auctionNFTDetails?.userId?._id,
                          })
                        }
                        className={classes.subscribeButton}
                        style={{ marginRight: "8px" }}
                      >
                        Chat
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Paper>
          ) : (
            <NoDataFound />
          )}
        </Page>
      )}
    </>
  );
}

export default AboutAuction;
