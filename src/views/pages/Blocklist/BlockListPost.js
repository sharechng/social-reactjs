import React, { useState } from "react";
import {
  makeStyles,
  withStyles,
  Typography,
  Box,
  Grid,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Button,
  TextField,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
import SocialShareBox from "src/component/SocialShareBox";
import { websiteName } from "src/ApiConfig/ApiConfig";
import { MdCancel } from "react-icons/md";
import Axios from "axios";
import { sortAddress } from "src/utils";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { calculateTimeLeft, tokenName } from "src/utils";

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
        [theme.breakpoints.down("xs")]: {
          height: "40px",
          width: "40px",
        },
        "& img": {
          width: "auto",
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
  modalBox: {
    height: "260px",
    overflow: "hidden",
    position: "relative",
    background: "rgba(0,0,0,0.7)",
    borderRadius: "15px",
    backgroundSize: "100% !important",
    backgroundRepeat: "no-repeat !important",
    backgroundPosition: "center !important",
    margin: "0 auto",

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
}));
export default function (props) {
  const { data, listPublicExclusiveHandler, index } = props;
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [openSubscribeModal, setOpenSubscribeModal] = React.useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [collectionDetails, setCollectionDetails] = useState();
  const [reportMessage, setReportMeesae] = React.useState("");
  const [openShare, setOpenShare] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [isBlock, setBlock] = React.useState(false);
  const [loader2, setloader2] = React.useState(false);
  const [idds, setIdd] = useState("");
  const [isPost, setPost] = useState(false);

  const sortDescription = (description) => {
    if (description) {
      const sortAdd = `${description.slice(0, 20)}...${description.slice(
        description.length - 20
      )}`;
      return sortAdd;
    } else {
      return description;
    }
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

  const handleClickOpenShare = () => {
    setOpenShare(true);
    setAnchorEl(false);
  };
  const closeBlock = () => {
    setBlock(false);
  };
  const handleBlock = (id) => {
    setIdd(id?.postId?._id);
    setBlock(true);
    setAnchorEl(false);


  };
  const handlePost = (id) => {
    setIdd(id?.postId?._id);
    setPost(true);
    setAnchorEl(false);


  };
  const handleClickOpenReport = () => {
    setOpenReport(true);
    setAnchorEl(false);
  };
  const blockuser = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: Apiconfigs.blockpost,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          postId: idds,
        },
      });
      if (res.data.responseCode === 200) {
        listPublicExclusiveHandler();
        setAnchorEl(false);

        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      setAnchorEl(false);
    }
  };
  const postIngoreHandler = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: Apiconfigs.postIngore,

        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          postId: idds,
        },
      });
      if (res.data.responseCode === 200) {
        listPublicExclusiveHandler();
        setAnchorEl(false);

        toast.success("Post ignore successfully");
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
  const [open3, setOpen3] = useState(false);
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

  const fileExtention = data?.postId?.mediaUrl?.split(".").pop();

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
          {/* <IconButton
            onClick={handleClick}
            aria-controls="customized-menu"
            aria-haspopup="true"
            className={classes.menuShare}
          >
            <FaEllipsisH />
          </IconButton> */}
          {/* <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem
            >
              <ListItemText onClick={() => handleBlock(data)} primary="Block" />
            </StyledMenuItem>
         
          </StyledMenu> */}
          <Box className="UserBox">
            <figure>
              <img
                src={
                  data?.postId?.userId?.profilePic
                    ? data?.postId?.userId?.profilePic
                    : "images/user.png"
                }
              />
            </figure>
            <Box>
              <Link to="/profile">
                {" "}
                <Typography variant="h6">
                  {data?.postId?.userId?.userName
                    ? sortAddress(data?.postId?.userId?.userName)
                    : sortAddress(data?.postId?.userId?.name)}
                </Typography>
              </Link>

              <Typography variant="body1" component="small">
                {moment(data?.postId?.createdAt).local().fromNow()}
                {data?.postId?.postType}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2">
            {sortDescription(data?.postId?.postTitle)}
          </Typography>
          <Typography variant="body2">
            {sortAddress(data?.postId?.details)}
          </Typography>

          <figure className="postImg">
            {fileType == "image" && <img src={data?.postId?.mediaUrl} />}
            {(fileType == "video" || fileType == "audio") && (
              <video
                width="100%"
                loop={false}
                autoPlay={false}
                muted={true}
                controls
              >
                <source src={data?.postId?.mediaUrl} type="video/mp4" />
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
              //     search: data?.postId?._id,
              //   });
              // }}
              onClick={() => setOpen3(true)}
            >
              Detail
            </Button>&nbsp;

            <Button
              color="secondary"
              variant="contained"
              onClick={() => handlePost(data)}
            >
              Post Ignore
            </Button>&nbsp;
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleBlock(data)}
            >
              Block Post
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
        open={isBlock}
        onClose={closeBlock}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* {row.status} */}
            {`Are you sure want to  Block this post?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            disabled={loader2}
            onClick={blockuser}
          >
            Yes {loader2 && <ButtonCircularProgress />}
          </Button>
          <Button onClick={closeBlock} variant="contained" color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
      {isPost && (
        <Dialog
          open={isPost}
          onClose={() => setPost(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/* {row.status} */}
              {`Are you sure want to  ignore this post?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="secondary"
              variant="contained"
              disabled={loader2}
              onClick={postIngoreHandler}
            >
              Yes {loader2 && <ButtonCircularProgress />}
            </Button>
            <Button onClick={closeBlock} variant="contained" color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>

      )}


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
            {fileType == "image" && (
              <Box
                // id={`imagecard${index}`}
                className={classes.PhotoBox}
              // style={{
              //   background: "url(" + viewCollectionDetails?.image + ")",
              // }}
              // onClick={() => {
              //   history.push("/about-auction");
              // }}
              >
                <figure className={classes.modalBox}>
                  <img
                    src={data?.postId?.mediaUrl}
                    alt=""
                    style={{
                      height: "368px",
                      width: "553px",
                      borderRadius: "10px",
                    }}
                  />
                </figure>
              </Box>
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
                  <source src={data?.postId?.mediaUrl} type="video/mp4" />
                </video>
              </Box>
            )}
            <Box mt={2} className={classes.bundleText} textAlign="center">
              <Typography variant="h4" className="red">
                {data?.postId?.userName}
              </Typography>
            </Box>

            <Box mt={1} className={classes.deskiText} align="left">
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="h6" style={{ color: "#fff", fontWeight: "500" }}>Post amount: </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  <Typography variant="body1">
                    {data?.postId?.amount} &nbsp;
                    {tokenName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" style={{ color: "#fff", fontWeight: "500" }}>Reported by: </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  <Typography variant="body1">
                    {data?.userId?.userName
                      ? data?.userId?.userName
                      : data?.userId?.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" style={{ color: "#fff", fontWeight: "500" }}>Reported Time: </Typography>
                </Grid>
                <Grid item xs={6} align="right">
                  <Typography variant="body1">
                    {moment(data?.createdAt).local().fromNow()}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" style={{ color: "#fff", fontWeight: "500" }}>Message:</Typography>
                </Grid>
                <Grid item xs={12} align="left">
                  <Typography variant="body1">{data?.message}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Box mt={3} mb={3} align="center">
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
          </DialogContent>
        </Dialog>
      )}
    </Paper>
  );
}
