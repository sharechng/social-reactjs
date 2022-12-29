import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Button,
  TextField,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import moment from "moment";
import Comment from "src/views/pages/Dashboard/Comment";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import SocialShareBox from "src/component/SocialShareBox";
import { websiteName } from "src/ApiConfig/ApiConfig";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import DataLoading from "./DataLoading";
import { toast } from "react-toastify";
import { tokenName } from "src/utils";
import Axios from "axios";

// import ButtonCircularPro
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #484849 !important",
    backgroundColor: "#101010 !important",
    minWidth: "120px !important",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    backgroundColor: "#373636",
  },
  PostBox: {
    backgroundColor: "theme",
    position: "relative",
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& p": {
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
    "& .postImg": {
      height: "260px",
      overflow: "hidden",
      margin: "0 auto",
      position: "relative",
      background: "rgba(0,0,0,0.7)",
      borderRadius: "10px",
      backgroundSize: "100% !important",
      backgroundRepeat: "no-repeat !important",
      backgroundPosition: "center !important",
      [theme.breakpoints.down("xs")]: {
        margin: "5px 0",
        borderRadius: "10px",
      },
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
    "& label": {
      color: "#BFBFBF",
      [theme.breakpoints.down("xs")]: {
        fontSize: "10px",
      },
    },
    "& .commentBox": {
      borderTop: "0.5px solid #737373",
      borderBottom: "0.5px solid #737373",
      marginTop: "16px",
      padding: "5px 0",
      [theme.breakpoints.down("xs")]: {
        padding: "0px 0",
        marginTop: "10px",
      },
      "& button": {
        [theme.breakpoints.down("xs")]: {
          fontSize: "10px !important",
        },
        "& svg": {
          fontSize: "20px",
          marginRight: "5px",
          [theme.breakpoints.down("xs")]: {
            fontSize: "15px",
          },
        },
      },
    },
    "& .UserBox": {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "10px",
      },
      "& a": {
        textDecoration: "none",
        "& h6": {
          fontWeight: "600",
          color: "#fff",
          [theme.breakpoints.down("xs")]: {
            fontSize: "12px",
          },
        },
      },
      "& small": {
        color: "#BFBFBF",
        [theme.breakpoints.down("xs")]: {
          fontSize: "10px",
        },
      },
      "& figure": {
        margin: "0",
        marginRight: "15px",
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#101010",
        display: "flex",
        [theme.breakpoints.down("xs")]: {
          height: "40px",
          width: "40px",
        },
        "& img": {
          width: "100%",
          maxWidth: "100%",
          maxHeight: "60px",
          [theme.breakpoints.down("xs")]: {
            maxHeight: "40px",
          },
        },
      },
    },
  },
  menuShare: {
    position: "absolute",
    right: "16px",
    top: "16px",
    [theme.breakpoints.down("xs")]: {
      right: "0px",
      top: "0px",
    },
  },
  subBox: {
    backgroundColor: "#e31a89",
    borderRadius: " 4px",
    textAlign: "center",
    cursor: " pointer",
    padding: "10px 30px",
    "& h6": {
      fontSize: "15px",
      fontWeight: 600,
    },
  },
  cancelBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  deskiText: {
    "& h4": {
      fontSize: "14px",
      lineHeight: "22px",
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
  mainimg: {
    width: "100%",
    overflow: "hidden",
    borderRadius: "10px",
    backgroundSize: "cover !important",
    backgroundColor: "#000",
    backgroundRepeat: "no-repeat !important",
    backgroundPosition: "center !important",
  },
}));
export default function (props) {
  const { data, listPublicExclusiveHandler, index } = props;
  console.log("data---", data);
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openShare, setOpenShare] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [isHidePost, setIsHidePost] = React.useState(false);
  const [reportMessage, setReportMeesae] = React.useState("");
  const [collectionDetails, setCollectionDetails] = useState();
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [openCommentBoxId, setOpenCommentBoxId] = React.useState();
  const [openCommentBox, setOpenCommentBox] = React.useState(false);
  const [openSubscribeModal, setOpenSubscribeModal] = React.useState(false);

  const sortAddress = (add) => {
    const sortAdd = `${add?.slice(0, 15)}...${add?.slice(add.length - 15)}`;
    return sortAdd;
  };
  const sortUserName = (user) => {
    const sortAdd = `${user?.slice(0, 5)}...${user?.slice(user.length - 5)}`;
    return sortAdd;
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };
  const handleCloseReport = () => {
    setOpenReport(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const HandleCommentBox = (data) => {
    setOpenCommentBox(true);
    setOpenCommentBoxId(data);
  };
  const handleClickOpenShare = () => {
    setOpenShare(true);
    setAnchorEl(false);
  };

  const handleClickOpenReport = () => {
    setOpenReport(true);
    setAnchorEl(false);
  };
  const hidePostHandler = async () => {
    try {
      const res = await Axios({
        method: "PUT",
        url: Apiconfigs.hideUnHidePost,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          postId: data?._id,
        },
      });
      if (res.data.responseCode === 200) {
        listPublicExclusiveHandler();
        setAnchorEl(false);
        setIsHidePost(false);

        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error?.response?.data?.responseMessage);
      setAnchorEl(false);
      setIsHidePost(false);
    }
  };

  const reportPostHandler = async () => {
    setIsSubmit(true);
    if (reportMessage != "" && reportMessage.length > 10) {
      setIsLoading(true);

      try {
        const res = await Axios({
          method: "POST",
          url: Apiconfigs.createReport,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            postId: data._id,
            message: reportMessage,
          },
        });
        if (res.data.responseCode === 200) {
          listPublicExclusiveHandler();
          setAnchorEl(false);
          toast.success(res.data.responseMessage);
          setReportMeesae("");
          setOpenReport(false);
        } else {
          toast.error(res.data.responseMessage);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error(error);
        setIsLoading(false);
      }
    }
  };

  const handleCollection = () => {
    colletionDetails();
    setOpenSubscribeModal(true);
  };
  const colletionDetails = async () => {
    setIsFetchingData(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.viewCollection + data?.collectionId,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setCollectionDetails(res.data.result);
      } else {
      }
      setIsFetchingData(false);
    } catch (error) {
      setIsFetchingData(false);
    }
  };

  const subscribeNowHandler = async () => {
    setIsLoading(true);
    await Axios({
      method: "POST",
      url: Apiconfigs.subscribeNow,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: {
        collectionId: data.collectionId,
      },
    })
      .then(async (res) => {
        if (res.data.responseCode === 200) {
          setOpenSubscribeModal(false);
          toast.success("You have subscribed successfully");
          if (listPublicExclusiveHandler) {
            listPublicExclusiveHandler();
          }
        } else {
          setOpenSubscribeModal(false);

          toast.error("Something went wrong");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.responseMessage);
        setOpenSubscribeModal(false);

        // toast.error(err.response.data.responseMessage);
        setIsLoading(false);
        if (listPublicExclusiveHandler) {
          listPublicExclusiveHandler();
        }
      });
  };

  const fileExtention = data.mediaUrl.split(".").pop();

  const fileType =
    fileExtention == "mp4" || fileExtention == "webp"
      ? "video"
      : fileExtention == "mp3"
        ? "audio"
        : "image";
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
  console.log("data.mediaUrl--", data?.userId?.name);
  return (
    <Paper className={classes.root}>
      <Box style={{ position: "relative" }}>
        <Box
          className={classes.PostBox}
          style={
            !data?.isSubscribed &&
              data?.postType === "PRIVATE" &&
              auth?.userData?.userType === "User"
              ? { filter: "blur(15px)" }
              : {}
          }
        >
          <IconButton
            onClick={handleClick}
            aria-controls="customized-menu"
            aria-haspopup="true"
            className={classes.menuShare}
          >
            <FaEllipsisH />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem
            // onClick={handleClickOpenShare}
            >
              <ListItemText onClick={handleClickOpenShare} primary="Share" />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemText
                onClick={() => setIsHidePost(true)}
                primary="Hide"
              />
            </StyledMenuItem>
            {auth?.userData?._id !== data?.userId?._id && (
              <StyledMenuItem onClick={handleClickOpenReport}>
                <ListItemText primary="Report" />
              </StyledMenuItem>
            )}

          </StyledMenu>
          <Box className="UserBox">
            <figure>
              <img
                src={
                  data?.userId?.profilePic
                    ? data?.userId?.profilePic
                    : "images/user.png"
                }
              />
            </figure>
            <Box>
              {/* <Link to="/profile"> */}{" "}
              <Typography
                onClick={() => {
                  history.push({
                    pathname: "/about-creators",
                    search: data?.userId?._id,
                  });
                }}
                variant="h6"
                style={{
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                {data?.userId?.userName
                  ? `${data?.userId?.userName?.length > 25
                    ? sortUserName(data?.userId?.userName)
                    : data?.userId?.userName
                  }`
                  : `${data?.userId?.name?.length > 25
                    ? sortUserName(data?.userId?.name)
                    : data?.userId?.name
                  }`}
                {/* {sortAddress(data?.postTitle)} */}
              </Typography>
              {/* </Link> */}
              <Typography variant="body1">
                {moment(data?.createdAt).local().fromNow()}&nbsp;{" "}
                {data?.postType}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" style={{ marginBottom: "10px" }}>
            {data?.details?.length < 40
              ? data?.details
              : sortAddress(data?.details)}
            {/* {sortAddress(data?.details)} */}
          </Typography>
          {/* <img src={data.mediaUrl} /> */}
          {/* <figure className="postImg"> */}
          {fileType == "image" && (
            <Box
              id={`imagecard${index}`}
              className={classes.mainimg}
              style={{
                background: "url(" + data.mediaUrl + ")",
              }}
            // onClick={() => {
            //   history.push("/about-auction");
            // }}
            ></Box>
          )}
          {(fileType == "video" || fileType == "audio") && (
            <Box
              id={`imagecard${index}`}
              className={classes.mainimg}
            // onClick={() => {
            //   history.push("/about-auction");
            // }}
            >
              <video
                width="100%"
                height="100%"
                loop={false}
                autoPlay={false}
                muted={true}
                controls
              >
                <source src={data.mediaUrl} type="video/mp4" />
              </video>
            </Box>
          )}
          <Box align="center" mt={2}>
            <Button
              color="secondary"
              variant="contained"
              disabled={
                !data?.isSubscribed &&
                data?.postType === "PRIVATE" &&
                auth?.userData?.userType === "User"
              }
              onClick={() => HandleCommentBox(data?._id)}
            // onClick={() => {
            //   history.push({
            //     pathname: "/details",
            //     search: data?._id,
            //   });
            // }}
            >
              Detail
            </Button>
          </Box>
        </Box>
        {!data?.isSubscribed &&
          data?.postType === "PRIVATE" &&
          auth?.userData?.userType === "User" && (
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "250px",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                width: "250px",
              }}
            >
              <Box onClick={handleCollection} className={classes.subBox}>
                <Typography variant="h6"> Subscribe Collection</Typography>
                <Typography variant="body2">
                  Price : {data?.amount}&nbsp;
                  {tokenName}
                </Typography>
              </Box>
            </Box>
          )}
      </Box>
      <Dialog
        open={openShare}
        onClose={handleCloseShare}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">{"Share Post"}</DialogTitle>
        <DialogContent>
          <IconButton className={classes.cancelBtn} onClick={handleCloseShare}>
            <MdCancel />
          </IconButton>
          <SocialShareBox url={websiteName + "/about-auction?" + data?._id} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openCommentBox}
        onClose={() => setOpenCommentBox(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen
      >
        <Comment
          openCommentBox={openCommentBox}
          listPublicExclusiveHandler={listPublicExclusiveHandler}
          setOpenCommentBox={setOpenCommentBox}
          openCommentBoxId={openCommentBoxId}
        />
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
            {`Are you sure want to  hide this post?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            // disabled={loader2}
            onClick={hidePostHandler}
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
        open={openReport}
        onClose={handleCloseReport}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <Box align="left">
          <IconButton className={classes.cancelBtn} onClick={handleCloseReport}>
            <MdCancel />
          </IconButton>
        </Box>
        <Box p={2}>
          <Box align="center" mb={2}>
            <Typography variant="h6">Report Post</Typography>
          </Box>
          <Box mb={3}>
            <Typography variant="body2" style={{ fontSize: "12px" }}>
              Describe why you think this item should be removed from
              marketplace
            </Typography>
            <Box mt={2}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="Text Field"
                placeholder="Tell us some details..."
                type="text"
                fullWidth
                multiline
                maxRows={5}
                value={reportMessage}
                onChange={(e) => setReportMeesae(e.target.value)}
              />
              {isSubmit &&
                (reportMessage == "" || reportMessage.length <= 10) && (
                  <FormHelperText error>
                    Please enter valid message, enter minimum 10 character
                  </FormHelperText>
                )}
            </Box>
          </Box>
          <Box mb={2} align="right">
            <Button variant="contained" color="primary" disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "10px" }}
              onClick={reportPostHandler}
              disabled={isLoading}
            >
              Report {isLoading && <ButtonCircularProgress />}
            </Button>
          </Box>
        </Box>
      </Dialog>

      {openSubscribeModal && collectionDetails && (
        <Dialog
          fullWidth="sm"
          maxWidth="sm"
          open={openSubscribeModal}
          onClose={() => setOpenSubscribeModal(false)}
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick={isLoading}
          disableEscapeKeyDown={isLoading}
        >
          <DialogContent>
            {isFetchingData ? (
              <DataLoading />
            ) : (
              <>
                <Box className={classes.PhotoBox}>
                  <img
                    src={collectionDetails?.image}
                    alt=""
                    style={{ height: "368px", width: "553px" }}
                  />
                </Box>
                {/* <Box mt={3} className={classes.bundleText} textAlign="center">
                  <Typography variant="h4" className="red">
                    {collectionDetails?.name}
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
                            {data?.userId?.name}
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
                          {collectionDetails?.amount}&nbsp;
                          {tokenName}
                        </span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={2} className={classes.deskiText} align="center">
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        align="left"
                      // color="textSecondary"
                      >
                        Duration:{" "}
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#FFFFFF",
                            fontWeight: "500",
                          }}
                        >
                          {" "}
                          {collectionDetails?.duration}&nbsp; Days
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" align="left">
                        Details:
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body1"
                        align="left"
                      // style={{color:"#BFBFBF"}}
                      >
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
                      setOpenSubscribeModal(false);
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={subscribeNowHandler}
                    disabled={isLoading}
                  >
                    Subscribe Now {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>{" "}
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </Paper>
  );
}
