import React, { useContext, useEffect, useState } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
  withStyles,
  MenuItem,
  Menu,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import { MdCancel } from "react-icons/md";
import { calculateTimeLeft, tokenName } from "src/utils";
import moment from "moment";
import SocialShareBox from "./SocialShareBox";
import Apiconfigs, { websiteName } from "src/ApiConfig/ApiConfig";
import Axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import ButtonCircularProgress from "./ButtonCircularProgress";

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
    "& .top": {
      paddingBottom: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
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
            height: "100%",
            objectFit: "cover",
          },
        },
      },
    },
  },
  mainimg: {
    width: "100%",
    height: "200px !important",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "10px",
    backgroundColor: "#ccc !important",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "10px",
      height: "130px !important",
    },
  },
  likes: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  textstyle: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 5px)",
  },
  // ,menuShare: {
  //   position: "absolute",
  //   right: "16px",
  //   top: "16px",
  // },

  sharemodal: {
    "& button": {
      textAlign: "center",
      "& svg": {
        fontSize: "25px",
      },
    },
  },
  cancelBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  iconbutton: {
    backgroundColor: "#FFF",
    width: "20px",
    height: "20px",
    marginRight: "3px",
    "& svg": {
      fontSize: "14px",
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
}));

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

function AuctionCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { data, callbackFun, index, myAuction } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [reportMessage, setReportMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [openShare, setOpenShare] = React.useState(false);

  const handleClickOpenShare = () => {
    setOpenShare(true);
    setAnchorEl(false);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const [openReport, setOpenReport] = React.useState(false);

  const handleClickOpenReport = () => {
    setOpenReport(true);
    setAnchorEl(false);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };
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
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(new Date(data.time)));
    }, 1000);
    return () => clearTimeout(timer);
  });

  const likesHandler = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.likeDislikeAuction + data?._id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        myAuction();
        if (callbackFun) {
          callbackFun();
        }
        toast.success(res.data.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const hideUnhideAuctionHandler = async () => {
    try {
      const res = await Axios({
        method: "PUT",
        url: Apiconfigs.hide_unhideAuction,
        data: {
          auctionId: data?._id,
        },
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        if (callbackFun) {
          callbackFun();
        }
        toast.success(res.data.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createAuctionReportHandler = async () => {
    setIsSubmit(true);
    if (reportMessage != "" && reportMessage.length > 10) {
      try {
        setIsLoading(true);
        const res = await Axios({
          method: "POST",
          url: Apiconfigs.createAuctionReport,
          data: {
            auctionId: data?._id,
            message: reportMessage,
          },
          headers: {
            token: window.localStorage.getItem("token"),
          },
        });
        if (res.data.responseCode === 200) {
          if (callbackFun) {
            callbackFun();
          }
          toast.success(res.data.responseMessage);
          handleCloseReport();
        } else {
          toast.error(res.data.responseMessage);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    }
  };
  let isLike = false;
  if (auth.userData?._id && data) {
    const likeUser = data?.likesUsers?.filter(
      (data) => data === auth.userData?._id
    );
    isLike = likeUser?.length > 0;
  }
  const fileExtention = data.mediaUrl.split(".").pop();

  const fileType =
    fileExtention == "mp4" || fileExtention == "webp"
      ? "video"
      : fileExtention == "mp3"
      ? "audio"
      : "image";

  return (
    <>
      <Paper elevation={2} className={classes.root}>
        <Box className="top">
          <Box className="Userbox">
            {/* <figure>
              <img src='images/Ellipse1.png' />
            </figure> */}
            <figure>
              <img
                src={
                  data?.userId?.profilePic
                    ? data?.userId?.profilePic
                    : "images/Ellipse1.png"
                }
              />
            </figure>
          </Box>
          <IconButton
            onClick={handleClick}
            aria-controls="customized-menu"
            aria-haspopup="true"
            className={classes.menuShare}
          >
            <MoreVertIcon />
          </IconButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={handleClickOpenShare}>
              <ListItemText primary="Share" />
            </StyledMenuItem>
            {/* <StyledMenuItem
              onClick={() => {
                handleClose();
                hideUnhideAuctionHandler();
              }}
            >
              <ListItemText primary="Hide" />
            </StyledMenuItem> */}
            <StyledMenuItem onClick={handleClickOpenReport}>
              <ListItemText primary="Report" />
            </StyledMenuItem>
          </StyledMenu>
        </Box>
        {fileType == "image" && (
          <Box
            id={`imagecard${index}`}
            className={classes.mainimg}
            style={{ background: "url(" + data.mediaUrl + ")" }}
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
        <Box mt={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="h5" className={classes.textstyle}>
                {data?.title}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.likes}>
                <IconButton
                  className={classes.iconbutton}
                  onClick={likesHandler}
                >
                  <FavoriteOutlinedIcon
                    className={classes.icons}
                    style={isLike ? { color: "red" } : { color: "#373636" }}
                  />
                </IconButton>
                <Typography
                  variant="h6"
                  // color="secondary.main"
                  style={{ marginLeft: "5px" }}
                >
                  {data?.likesCount}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body1" color="primary.main">
                STARTING BID
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              <Typography variant="body1" color="primary.main">
                {data?.amount}&nbsp;
                {tokenName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="body1" color="primary.main">
                AUCTION ENDING IN
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              {moment().unix() > moment(data.time).unix() ? (
                <Typography
                  variant="body1"
                  // color="primary.main"
                  className={classes.textstyle}
                >
                  Expired
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  // color="primary.main"
                  className={classes.textstyle}
                >
                  {`${timeLeft.days ? timeLeft.days : 0}d : ${
                    timeLeft.hours ? timeLeft.hours : 0
                  }h : ${timeLeft.minutes ? timeLeft.minutes : 0}m : ${
                    timeLeft.seconds ? timeLeft.seconds : 0
                  }s`}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
        <Box align="center">
          <Button
            style={{ padding: "6px 10px !important", fontSize: "10px" }}
            variant="contained"
            color="secondary"
            size="medium"
            onClick={() =>
              history.push({
                pathname: "/about-auction",
                search: data?._id,
              })
            }
          >
            {" "}
            View{" "}
          </Button>
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
            <IconButton
              className={classes.cancelBtn}
              onClick={handleCloseShare}
            >
              <MdCancel />
            </IconButton>
            <SocialShareBox url={websiteName + "/about-auction?" + data._id} />
          </DialogContent>
        </Dialog>

        <Dialog
          open={openReport}
          onClose={handleCloseReport}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Report Post"}</DialogTitle>
          <DialogContent>
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
                  error={
                    isSubmit &&
                    (reportMessage == "" || reportMessage.length <= 10)
                  }
                  // rows={5}
                  onChange={(e) => setReportMessage(e.target.value)}
                  inputProps={{
                    readOnly: isLoading,
                  }}
                />
              </Box>
              {isSubmit &&
                (reportMessage == "" || reportMessage.length <= 10) && (
                  <FormHelperText error>
                    Please enter valid message, enter minimum 10 character
                  </FormHelperText>
                )}
            </Box>
            <Box mb={2} align="right">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseReport}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "10px" }}
                onClick={createAuctionReportHandler}
                disabled={isLoading}
              >
                Report {isLoading && <ButtonCircularProgress />}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
}

export default AuctionCard;
