import React, { useState } from "react";
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
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory, Link } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import SocialShareBox from "src/component/SocialShareBox";
import { websiteName } from "src/ApiConfig/ApiConfig";
import { MdCancel } from "react-icons/md";
import Axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "./ButtonCircularProgress";
import DataLoading from "./DataLoading";
import Comment from "src/views/pages/Dashboard/Comment";
import { getBase64, sortAddress } from "src/utils";

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
  PostBox: {
    padding: "15px",
    transition: "0.5s",
    backgroundColor: "#373636",
    borderRadius: "14px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& p": {
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
    "& .postImg": {
      position: "relative",
      width: "100%",
      height: "200px",
      margin: "16px 0",
      borderRadius: "10px",
      overflow: "hidden",
      backgroundColor: "#000",
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
        height: "60px",
        width: "60px",
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
          // maxHeight: "60px",
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
}));
export default function (props) {
  const { data, listPublicExclusiveHandler } = props;
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [openSubscribeModal, setOpenSubscribeModal] = React.useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [collectionDetails, setCollectionDetails] = useState();
  const [reportMessage, setReportMeesae] = React.useState("");
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
  const [openShare, setOpenShare] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [isHidePost, setIsHidePost] = React.useState(false);
  const [openCommentBox, setOpenCommentBox] = React.useState(false);
  const [openCommentBoxId, setOpenCommentBoxId] = React.useState();
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
      setAnchorEl(false);
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
          toast.success("You have subscribed successfully");
          if (listPublicExclusiveHandler) {
            listPublicExclusiveHandler();
          }
        } else {
          toast.error("Something went wrong");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.responseMessage);
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

  return (
    <Paper>
      <Box style={{ position: "relative" }}>
        <Box className={classes.PostBox}>
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
            <StyledMenuItem onClick={handleClickOpenReport}>
              <ListItemText primary="Report" />
            </StyledMenuItem>
          </StyledMenu>
          <Box className="UserBox">
            <figure>
              <img
                src={
                  data?.userId?.profilePic
                    ? data?.userId?.profilePic
                    : "images/User.png"
                }
              />
            </figure>
            <Box>
              <Link to="/profile">
                {" "}
                <Typography variant="h6">
                  {data?.userId?.userName
                    ? data?.userId?.userName
                    : data?.userId?.name}
                </Typography>
              </Link>
              <Typography variant="body1">
                {moment(data?.createdAt).local().fromNow()}
                &nbsp; {data?.postType}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2">
            {data?.details?.length < 40
              ? data?.details
              : sortAddress(data?.details)}
          </Typography>
          <figure className="postImg">
            {fileType == "image" && <img src={data?.mediaUrl} />}
            {(fileType == "video" || fileType == "audio") && (
              <video
                width="100%"
                loop={false}
                autoPlay={false}
                muted={true}
                controls
              >
                <source src={data.mediaUrl} type="video/mp4" />
              </video>
            )}
          </figure>
          <Box align="center">
            <Button
              color="secondary"
              variant="contained"
              // disabled={!data?.isSubscribed && data?.postType === "PRIVATE"}
              // onClick={() => {
              //   history.push({
              //     pathname: "/details",
              //     search: data?._id,
              //   });
              // }}
              onClick={() => HandleCommentBox(data?._id)}
            >
              Detail
            </Button>
          </Box>
        </Box>
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
        open={openReport}
        onClose={handleCloseReport}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <Box align="right">
          <IconButton className={classes.cancelBtn} onClick={handleCloseReport}>
            <MdCancel />
          </IconButton>
        </Box>
        {/* <DialogTitle id="alert-dialog-title">{"Report Post"}</DialogTitle>
        <DialogContent> */}
        <Box pb={2} px={2}>
          <Box mb={2} textAlign="cenetr">
            <Typography variant="h5">Report Post</Typography>
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
                // rows={5}
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

        {/* </DialogContent> */}
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
    </Paper>
  );
}
