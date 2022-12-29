import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Box,
  Typography,
  Paper,
  Button,
} from "@material-ui/core";
import Axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
import { FiSettings } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import { AuthContext } from "src/context/Auth";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import NoDataFound from "src/component/NoDataFound";
import DataLoading from "src/component/DataLoading";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import { defaultClassNames } from "react-dropzone-uploader";

const useStyles = makeStyles({
  root: {
    "@media(max-width:767px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
  },
  main: {
    backgroundColor: "black",
    borderRadius: "15px",
    padding: "20px",
  },
  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "#B55A06",
  },
  mainContent: {
    display: "flex",
    // alignItems: "center",
    borderBottom: "0.25px solid #737373",
  },
  btnSection: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  btn: {
    display: "flex",
    justifyContent: "flex-end",
    "@media(max-width:767px)": {
      display: "flex",
      marginLeft: "57px",
      justifyContent: "flex-start",
    },
  },
  deskiText: {
    "& h4": {
      fontSize: "14px",
    },
  },
  dialogProfileImage: {
    display: "flex",
    alignItems: "center",
    "& .userImage": {
      minWidth: "40px",
      width: "40px",
      height: "40px",
      overflow: "hidden",
      borderRadius: "50%",
      display: "flex",
      backgroundColor: "#101010",
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    "& .username": {
      marginLeft: "8px",
      "& h6": {
        fontSize: "18px",
        fontWeight: "500",
        color: "#FFF",
      },
    },
  },
});

function NotificationList() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  console.log("auth----", auth);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isHidePost, setIsHidePost] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [collectionDataLoader, setCollectionDataLoader] = React.useState(false);
  const [collectionDetails, setCollectionDetails] = useState();
  const [promotionPostDetails, setPromotionpostDetails] = useState();
  const isVideo = collectionDetails?.mediaUrl?.includes(".mp4");
  const isVideo1 = promotionPostDetails?.mediaUrl?.includes(".mp4");

  useEffect(() => {
    Axios.get(Apiconfigs.readNotification, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }, []);

  const deleteNotification = async () => {
    setIsSubmit(true);
    try {
      const res = await Axios({
        method: "DELETE",
        url: Apiconfigs.deleteAllNotification,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setIsSubmit(false);
        setIsHidePost(false);
        auth.setNotificationList([]);
        // MyPostPromotionList();
        // setOpenReport(false);
        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      setIsHidePost(false);
      setIsSubmit(false);
    }
  };

  const handleOpen = (data) => {
    setOpen3(true);
    // setCollectionData(data)
    colletionDetails(data);
  };

  const handleOpenPromotionPost = (data) => {
    setOpen4(true);
    // setCollectionData(data)
    myPostPromotionView(data);
  };
  const colletionDetails = async (data) => {
    setCollectionDataLoader(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.viewCollection + data,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        // params:{
        //   subscriptionId:data
        // }
      });
      if (res.data.responseCode === 200) {
        setCollectionDetails(res.data.result);
      } else {
      }
      setCollectionDataLoader(false);
    } catch (error) {
      setCollectionDataLoader(false);
    }
  };
  const myPostPromotionView = async (data) => {
    setCollectionDataLoader(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.myPostPromotionView,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          _id: data,
        },
      });
      if (res.data.responseCode === 200) {
        setPromotionpostDetails(res.data.result);
      } else {
      }
      setCollectionDataLoader(false);
    } catch (error) {
      setCollectionDataLoader(false);
    }
  };

  return (
    <>
      <Box className={classes.main}>
        {isSubmit ? (
          <DataLoading />
        ) : (
          <>
            <Box className={classes.box} pb={2}>
              <Typography variant="h5">Notifications</Typography>
              {auth?.notificationList?.length > 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsHidePost(true)}
                // onClick={deleteNotification}
                >
                  Delete notification
                </Button>
              )}

              {/* <FiSettings style={{ fontSize: "20px" }} /> */}
            </Box>
            <Grid container direction={"cloumn"} spacing={1}>
              {auth?.notificationList?.length == 0 && <NoDataFound />}
              {auth?.notificationList?.map((data, i) => {
                return (
                  <Grid item xs={12} key={i}>
                    {/* <Box className={classes.root}> */}
                    <Box className={classes.mainContent}>
                      <Box className={classes.dialogProfileImage}>
                        <Box className="userImage">
                          {data?.likeBy ? (
                            <img
                              style={{ width: "50px" }}
                              src={
                                data?.likeBy?.profilePic
                                  ? data?.likeBy?.profilePic
                                  : "images/user.png"
                              }
                            />
                          ) : (
                            <img
                              style={{ width: "50px" }}
                              src={
                                data?.commentBy?.profilePic
                                  ? data?.commentBy?.profilePic
                                  : "images/user.png"
                              }
                            />
                          )}
                        </Box>
                      </Box>
                      <Box ml={2}>
                        <Typography
                          style={{
                            cursor: "pointer",
                            color: "#ffffff",
                            fontWeight: "500",
                            fontSize: "14px",
                          }}
                          onClick={() => {
                            if (
                              data?.notificationType === "POST_COMMENT" ||
                              data?.notificationType === "POST_LIKE"
                            ) {
                              history.push({
                                pathname: "/comment",
                                search: data.postId?._id,
                              });
                            } else if (
                              data?.notificationType === "COLLECTION_LIKE"
                            ) {
                              handleOpen(data?.collectionId?._id);
                            } else if (
                              data?.notificationType === "AMOUNT_DEPOSIT" ||
                              data?.notificationType === "AMOUNT_WITHDRAW"
                            ) {
                              history.push({
                                pathname: "/wallet",
                              });
                            } else if (
                              data?.notificationType === "LIKE_AUCTION"
                            ) {
                              history.push({
                                pathname: "/about-auction",
                                search: data.auctionId,
                              });
                            } else if (
                              data?.notificationType ===
                              "POST_PROMOTION_COMMENT" ||
                              data?.notificationType === "POST_PROMOTION_LIKE"
                            ) {
                              handleOpenPromotionPost(data?.promotionId?._id);
                            } else if (data?.commentBy) {
                              history.push({
                                pathname: "/about-creators",
                                search: data.commentBy?._id,
                              });
                            } else if (data?.notificationType === "BUY_POST") {
                              history.push({
                                pathname: "/about-creators",
                                search: data.buyId?._id,
                              });
                            }
                            else {
                              history.push({
                                pathname: "/about-creators",
                                search: data.likeBy?._id,
                              });
                            }
                          }}
                        // onClick={()=>{
                        //   if (data?.notificationType === "POST_COMMENT" || data?.notificationType=== "POST_LIKE") {
                        //     history.push({
                        //         pathname:"/comment",
                        //         search: data?.postId,
                        //     })
                        //   } else {
                        //     history.push({
                        //         pathname:"/about-creators",
                        //         search: data?.userId,
                        //     })

                        //   }
                        // }}
                        >
                          {data?.description}
                        </Typography>
                        <Typography style={{ marginBottom: "10px" }}>
                          {moment(data.createdAt).local().fromNow()}
                        </Typography>
                      </Box>
                    </Box>
                    {/* </Box> */}
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}
        {open3 && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={open3}
            onClose={() => setOpen3(false)}
            aria-labelledby="max-width-dialog-title"
          >
            {collectionDataLoader ? (
              <DataLoading />
            ) : (
              <DialogContent>
                <Box className="img-container">
                  {isVideo ? (
                    <div>
                      <video width="100%" controls>
                        <source
                          src={collectionDetails?.mediaUrl}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  ) : (
                    <img src={collectionDetails?.image} alt="" />
                  )}
                </Box>

                <Box mt={2}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6} align="left">
                      <Box className={classes.dialogProfileImage}>
                        <Box className="userImage">
                          <img
                            src={
                              collectionDetails?.userId?.profilePic
                                ? collectionDetails?.userId?.profilePic
                                : "/images/user.png"
                            }
                            alt="user collectionDetails"
                          />
                        </Box>
                        <Box className="username">
                          <Typography variant="h6" className={classes.text}>
                            {collectionDetails?.userId?.userName
                              ? collectionDetails?.userId?.userName
                              : collectionDetails?.userId?.name}
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
                          {collectionDetails?.amount > 1
                            ? collectionDetails?.amount
                            : Number(collectionDetails?.amount)?.toFixed(4)}
                          &nbsp;
                          {"Share"}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box mt={1} className={classes.deskiText}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} align="left">
                        <Typography variant="h4">
                          Duration:{" "}
                          <span>{collectionDetails?.duration}&nbsp; Days</span>
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h4">Details:</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6">
                          {collectionDetails?.title}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box mt={3} mb={3} textAlign="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        setOpen3(false);
                      }}
                    // disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </DialogContent>
            )}
          </Dialog>
        )}
        {open4 && (
          <Dialog
            fullWidth="sm"
            maxWidth="sm"
            open={open4}
            onClose={() => setOpen4(false)}
            aria-labelledby="max-width-dialog-title"
          >
            {collectionDataLoader ? (
              <DataLoading />
            ) : (
              <DialogContent>
                <Box className="img-container">
                  {isVideo1 ? (
                    <div>
                      <video width="100%" controls>
                        <source
                          src={promotionPostDetails?.mediaUrl}
                          type="video/mp4"
                        />
                      </video>
                    </div>
                  ) : (
                    <img src={promotionPostDetails?.mediaUrl} alt="" />
                  )}
                </Box>

                <Box mt={2}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={6} align="left">
                      <Box className={classes.dialogProfileImage}>
                        <Box className="userImage">
                          <img
                            src={
                              promotionPostDetails?.userId?.profilePic
                                ? promotionPostDetails?.userId?.profilePic
                                : "/images/user.png"
                            }
                            alt="user promotionPostDetails"
                          />
                        </Box>
                        <Box className="username">
                          <Typography variant="h6" className={classes.text}>
                            {promotionPostDetails?.userId?.userName
                              ? promotionPostDetails?.userId?.userName
                              : promotionPostDetails?.userId?.name}
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
                          {promotionPostDetails?.amount > 1
                            ? promotionPostDetails?.amount
                            : Number(promotionPostDetails?.amount)?.toFixed(4)}
                          &nbsp;
                          {"Share"}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box mt={1} className={classes.deskiText}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} align="left">
                        <Typography variant="h4">
                          Duration:{" "}
                          <span>
                            {promotionPostDetails?.dateTime}&nbsp; Days
                          </span>
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="h4">Details:</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          style={{ wordBreak: "break-all" }}
                        >
                          {promotionPostDetails?.details}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box mt={3} mb={3} textAlign="center">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        setOpen4(false);
                      }}
                    // disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </DialogContent>
            )}
          </Dialog>
        )}
        <Dialog
          open={isHidePost}
          onClose={() => setIsHidePost(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* {row.status} */}
              {`Are you sure want to  delete this notifications?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              variant="contained"
              // disabled={loader2}
              onClick={deleteNotification}
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
      </Box>
    </>
  );
}

export default NotificationList;
