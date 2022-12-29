import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import CommentBox from "./CommentBox";
import {
  sortAddressPostTitle,
  sortAddressForPrice,
  calculateTimeLeft,
} from "src/utils";
import MultyUser from "./MultyUser";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDots } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { FaHeart } from "react-icons/fa";
import DialogTitle from "@material-ui/core/DialogTitle";
// import SendIcon from "@material-ui/icons/Send";
import { Link, useHistory } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { AiFillTwitterCircle } from "react-icons/ai";
import Axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { toast } from "react-toastify";
import LoadingSkeleton from "./LoadingSkeleton";
import { AuthContext } from "src/context/Auth";
import { websiteName } from "src/ApiConfig/ApiConfig";
import moment from "moment";
import { tokenName } from "src/utils";
import { BsEmojiLaughing } from "react-icons/bs";
import Picker from "emoji-picker-react";

import {
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  TwitterShareButton,
} from "react-share";
import SocialShareBox from "./SocialShareBox";
import ReactHashtag from "react-hashtag";
import Comment from "src/views/pages/Dashboard/Comment";
import { UserContext } from "src/context/User";
import EditPostModal from "./EditPostModal";

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "0",
    },
  },
  expanded: {},
})(MuiAccordion);
const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: "auto",
    "&$expanded": {
      minHeight: "auto",
    },
  },
  content: {
    margin: "0px 0 ",
    justifyContent: "center",
    "&$expanded": {
      margin: "0px 0 ",
    },
  },
  expanded: {},
})(MuiAccordionSummary);
const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: "10px 0 !important",
    },
  },
}))(MuiAccordionDetails);
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
    backgroundColor: "theme",
    position: "relative",
    padding: "25px",
    // marginBottom: "50px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& p": {
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
    "& .price": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& .text": {
        display: "flex",
        alignItems: "center",
        "& h6": {
          fontWeight: "700",
        },
      },
    },
    "& .postImg": {
      width: "100%",
      margin: "16px 0",
      borderRadius: "20px",
      backgroundColor: "#000",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("xs")]: {
        margin: "5px 0",
        borderRadius: "10px",
      },
      "& img": {
        // width: "100%",
        // maxHeight: "380px",
        // objectFit: "cover",
        width: "100%",
        objectFit: "contain",
        maxWidth: "600px",
        height: "100%",
        maxHeight: "700px",
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
    "& .searchaddress": {
      paddingTop: "24px",
      "& .figure": {
        margin: "0",
        marginRight: "15px",
        position: "relative",
        "& .profileimage": {
          height: "45px",
          width: "45px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#101010",
          [theme.breakpoints.down("xs")]: {
            height: "30px",
            width: "30px",
          },
          "& img": {
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "50px",
            [theme.breakpoints.down("xs")]: {
              maxHeight: "30px",
            },
          },
        },
      },
      "& button": {
        backgroundColor: "#373636",
        height: "40px",
        borderRadius: "5px",
        [theme.breakpoints.down("xs")]: {
          height: "30px",
          "& svg": {
            fontSize: "16px",
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
          width: "100%",
          height: "100%",
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
    right: "5px",
    top: "24px",
    [theme.breakpoints.down("xs")]: {
      right: "0px",
      top: "0px",
    },
  },

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
  deskiText: {
    "& h4": {
      fontSize: "14px",
      lineHeight: "22px",
    },
  },
  subBox: {
    backgroundColor: "#e31a89",
    borderRadius: " 4px",
    padding: "10px 30px",
    textAlign: "center",
    cursor: " pointer",
    "& h6": {
      fontSize: "15px",
      fontWeight: 600,
    },
  },
  emojiBox: {
    position: "absolute",
    width: "100%",
    // bottom: "100%",
    zIndex: "999",
    marginTop: "50px",
  },
  hash: {
    "& span": {
      color: "#E31A89",
      cursor: "pointer",
    },
    "& h6": {
      WordBreak: "break-all",
    },
  },
  PhotoBox: {
    width: "100%",

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
}));

export default function (props) {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();
  const { data, listPublicExclusiveHandler, isLoadingContent, index } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isBuyLoading, setIsBuyLoading] = useState(false);
  const [expanded, setExpanded] = React.useState("panel1");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [open3, setOpen3] = React.useState(false);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [isLoadingReport, setIsLoadingReport] = React.useState(false);
  const [isLoadingEmoji, setIsLoadingEmoji] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [reportMessage, setReportMeesae] = React.useState("");
  const [openCommentBox, setOpenCommentBox] = React.useState(false);
  const [openCommentBoxId, setOpenCommentBoxId] = React.useState();
  const [isHidePost, setIsHidePost] = React.useState(false);
  const [updateData, setUpdateData] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (data) => {
    setOpen(true);
    setUpdateData(data);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  let isLike = false;
  if (auth.userData?._id && data) {
    const likeUser = data?.likesUsers?.filter(
      (data) => data === auth.userData?._id
    );
    isLike = likeUser?.length > 0;
  }

  let isLikeEmoji = false;
  if (auth.userData?._id && data) {
    const likeUser = data?.reactOnPost?.filter(
      (data) => data.userId === auth.userData?._id
    );
    // console.log("likeUser", likeUser);
    isLikeEmoji = likeUser?.length > 0;
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClickOpenShare = () => {
    setOpenShare(true);
    setAnchorEl(false);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const HandleCommentBox = (data) => {
    setOpenCommentBox(true);
    setOpenCommentBoxId(data);
  };

  const handleClickOpenReport = () => {
    setOpenReport(true);
    setAnchorEl(false);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const commentPostHandler = async (event) => {
    setIsSubmit(true);
    event.preventDefault();
    if (message !== "") {
      try {
        const res = await Axios({
          method: "POST",
          url: Apiconfigs.commentOnpost,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            postId: data._id,
            message: message,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmit(false);

          listPublicExclusiveHandler();
          toast.success(res.data.responseMessage);
          setIsLoading(false);
          setMessage("");
        }
      } catch (error) {
        toast.error(error);
        setIsSubmit(false);

        setIsLoading(false);
      }
    }
    // setIsLoading(true);
  };

  const likesHandler = async () => {
    setIsLoadingEmoji(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.reactOnPost + data?._id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          emoji: inputStr,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoadingEmoji(false);

        listPublicExclusiveHandler();
        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      setIsLoadingEmoji(false);

      toast.success(error?.response?.data?.responseMessage);
    }
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
    setIsLoadingReport(true);
    if (reportMessage !== "") {
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
          setIsLoadingReport(false);
          setReportMeesae("");
          setOpenReport(false);
        }
      } catch (error) {
        toast.error(error);
        setIsLoadingReport(false);
      }
    }
  };

  const isVideo = data?.mediaUrl.includes(".mp4");
  const [isHidePost1, setIsHidePost1] = React.useState(false);

  const [isHidePostdata, setIsHidePostData] = React.useState();
  const handleDeleteFunction = (data) => {
    setIsHidePost1(true);
    setIsHidePostData(data);
  };

  const buyPostHandler = async (postId) => {
    try {
      setIsBuyLoading(true);
      setIsHidePost1(false);
      const res = await Axios.post(
        Apiconfigs.buyPost,
        {
          postId: isHidePostdata?._id,
          description: "NA",
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.responseCode === 200) {
        setIsHidePost1(false);
        history.push("/profile");

        listPublicExclusiveHandler();
        auth.handleUserProfileApi();

        toast.success(res.data.responseMessage);
      } else {
        // toast.error(res.data.responseMessage);
      }

      setIsBuyLoading(false);
    } catch (error) {
      setIsHidePost1(false);

      setIsBuyLoading(false);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };

  const subscribeNowHandler = async (isCheck) => {
    // setIsloading(true);
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
        // setIsloading(false);
        if (res.data.responseCode === 200) {
          // auth.updateUserData()
          // history.push('/profile')
          toast.success("You have subscribed successfully");
          if (listPublicExclusiveHandler) {
            listPublicExclusiveHandler();
          }
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        // setIsloading(false);
        toast.error(err?.response?.data?.responseMessage);

        if (listPublicExclusiveHandler) {
          listPublicExclusiveHandler();
        }

        // toast.error("Something went wrong");
      });
    // } else {
    //   toast.error("Balance is low");
    //   setIsloading(false);
    // }
  };

  const handleCollection = () => {
    colletionDetails();
    setOpen3(true);
  };

  const [viewCollectionDetails, setVieCollectionDetails] = useState();

  const fileExtention = viewCollectionDetails?.image.split(".").pop();

  const fileType =
    fileExtention == "mp4" || fileExtention == "webp"
      ? "video"
      : fileExtention == "mp3"
        ? "audio"
        : "image";

  const colletionDetails = async () => {
    setIsLoading(true);
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.viewCollection + data?.collectionId,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setVieCollectionDetails(res.data.result);
        setIsLoading(false);
      } else {
        // toast.error(res.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      // toast.error(error.response.data.responseMessage);
    }
  };

  const [showPicker, setShowPicker] = useState(false);

  const [inputStr, setInputStr] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setInputStr(emojiObject.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    if (inputStr) {
      likesHandler();
    }
  }, [inputStr]);

  const [endTime, setEndtime] = useState(
    moment(data.createdAt).add(15, "m").unix()
  );
  const [timeLeft, setTimeLeft] = useState("");
  const [currentMoment, setCurrentMoment] = useState("");

  useEffect(() => {
    let endTimes = moment(data.createdAt).add(15, "m").unix();
    if (endTimes) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTimes));
        setCurrentMoment(moment().unix());
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <Paper>
      {data && (
        <>
          {data?.postType === "PRIVATE" && !data?.isSubscribed ? (
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

                <Box className="UserBox">
                  <figure>
                    {isLoadingContent ? (
                      <LoadingSkeleton data={8} />
                    ) : (
                      <img
                        src={
                          data?.profilePic
                            ? data?.profilePic
                            : "images/user.png"
                        }
                      />
                    )}
                  </figure>
                  <Box>
                    <Typography
                      variant="h6"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        history.push({
                          pathname: "/about-creators",
                          search: data?.userId?._id,
                        })
                      }
                    >
                      {data?.userId?.userName
                        ? data?.userId?.userName
                        : data?.userId?.name}
                    </Typography>
                    {/* </Link> */}
                    <Typography variant="body2" component="small">
                      {data?.time}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  style={
                    data?.isSubscribed && data?.postType !== "PRIVATE"
                      ? {}
                      : { filter: "blur(15px)" }
                  }
                >
                  <Box className={classes.hash}>
                    {" "}
                    <ReactHashtag
                      onHashtagClick={(val) =>
                        history.push({
                          pathname: "/hashtag",
                          search: val,
                        })
                      }
                    >
                      {data?.details}
                    </ReactHashtag>
                  </Box>

                  <Box>
                    <Box mt={1} mb={1} className="price">
                      <Box className="text">
                        <Typography variant="h6">
                          {data?.postType !== "PUBLIC" && <> Price :</>}
                        </Typography>

                        <Typography variant="h6">
                          {data?.postType !== "PUBLIC" && (
                            <>
                              {data?.amount.length >= 5 ? sortAddressForPrice(data?.amount) : data?.amount}&nbsp;
                              {tokenName}
                            </>
                          )}
                        </Typography>
                      </Box>

                      {data?.postType !== "PUBLIC" &&
                        data?.userId?._id !== auth?.userData?._id && (
                          <Button
                            variant="contained"
                            color="secondary"
                            disabled={isBuyLoading || !data?.isSubscribed}
                          >
                            Buy {isBuyLoading && <ButtonCircularProgress />}
                          </Button>
                        )}
                    </Box>

                    <Box>
                      <figure className="postImg">
                        {isVideo ? (
                          <video width="100%" height="450" controls>
                            <source src={data.mediaUrl} type="video/mp4" />
                          </video>
                        ) : (
                          <>
                            {data?.mediaType !== "TEXT" && (
                              <img
                                src={data?.mediaUrl}
                                style={{ cursor: "pointer" }}
                              />
                            )}
                          </>
                        )}
                      </figure>
                    </Box>
                    <Box>
                      <Grid container alignItems="center">
                        <Grid item xs={5}>
                          {" "}
                          {data?.reactOnPostCount > 0 ? (
                            <Box>+{data?.reactOnPostCount}&nbsp; Likes</Box>
                          ) : (
                            <Box>{data?.reactOnPostCount}&nbsp;Likes</Box>
                          )}
                        </Grid>
                        <Grid item xs={7} align="right">
                          <label>{data?.totalComment} Comments</label> &nbsp;
                          &nbsp; &nbsp; &nbsp;
                          <label>0 Share</label>
                        </Grid>
                      </Grid>
                    </Box>
                    <Accordion square>
                      <Box className="commentBox">
                        <Grid container>
                          <Grid item xs={4}>
                            <BsEmojiLaughing
                              position="end"
                              style={{
                                fontSize: "20px",
                                cursor: "pointer",
                              }}
                              onClick={() => setShowPicker((val) => !val)}
                            />
                            <Button color="primary" size="large">
                              <FaHeart
                                className={classes.socialbox}
                                style={isLike ? { color: "red" } : {}}
                              />{" "}
                              Like
                            </Button>
                          </Grid>
                          <Grid item xs={4} align="center">
                            <AccordionSummary
                              aria-controls="panel1d-content"
                              id="panel1d-header"
                            >
                              <Button color="primary" size="large">
                                <BiCommentDots />
                                Comments
                              </Button>
                            </AccordionSummary>
                          </Grid>
                          <Grid item xs={4} align="right">
                            <Button color="primary" size="large">
                              {" "}
                              <RiShareForwardLine />
                              Share
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Accordion>
                    <Box className="searchaddress">
                      <Grid container spacing={1} alignItems="center">
                        <Grid item xs={2} sm={1}>
                          <Box className="figure">
                            <Box className="profileimage">
                              <img
                                src={
                                  auth?.userData?.profilePic
                                    ? auth?.userData?.profilePic
                                    : "images/user.png"
                                }
                                alt="user data"
                              />
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={8} sm={10}>
                          <TextField
                            id="outlined-basic"
                            variant="outlined"
                            name="Text Field"
                            placeholder="Write here..."
                            disabled={true}
                            type="text"
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={2} sm={1} align="center">
                          <Button
                            size="large"
                            color="primary"
                            fullWidth
                            disabled={isLoading}
                          >
                            <SendIcon
                              style={{ color: "#E31A89" }}
                              disabled={isLoading}
                            />
                            {/* {isLoading && <ButtonCircularProgress />} */}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "250px",
                }}
              >
                <Box onClick={handleCollection} className={classes.subBox}>
                  <Typography variant="h6"> Subscribe Collection</Typography>
                  <Typography variant="body2">
                    Price : {data?.amount.length >= 5 ? sortAddressForPrice(data?.amount) : data?.amount} {tokenName}
                  </Typography>
                </Box>
                {/* <Button
              variant="contained"
              onClick={handleCollection}
              color="secondary"
            >
              Subscribe Collection
              <br /> &nbsp;
       data?.amount.length >= 5 ? data?.amount :        <Typography>{data?.amount}</Typography>
            </Button> */}
              </Box>
              {open3 && (
                <Dialog
                  fullWidth
                  maxWidth="sm"
                  open={open3}
                  onClose={() => setOpen3(false)}
                  aria-labelledby="max-width-dialog-title"
                  disableBackdropClick={isLoading}
                  disableEscapeKeyDown={isLoading}
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
                        <img
                          src={viewCollectionDetails?.image}
                          alt=""
                          style={{ height: "368px", width: "553px" }}
                        />
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
                          <source
                            src={viewCollectionDetails?.image}
                            type="video/mp4"
                          />
                        </video>
                      </Box>
                    )}
                    <Box
                      mt={2}
                      className={classes.bundleText}
                      textAlign="center"
                    >
                      <Typography variant="h4" className="red">
                        {viewCollectionDetails?.name}
                      </Typography>
                    </Box>

                    <Box mt={1} className={classes.deskiText} align="left">
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Typography variant="h6">
                            Collection amount:{" "}
                          </Typography>
                        </Grid>
                        <Grid item xs={6} align="right">
                          <Typography variant="body1">
                            {viewCollectionDetails?.amount}&nbsp;{tokenName}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6">Duration: </Typography>
                        </Grid>
                        <Grid item xs={6} align="right">
                          <Typography variant="body1">
                            {viewCollectionDetails?.duration} &nbsp; Days
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="h6">Details: </Typography>{" "}
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1">
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
                              setOpen3(false);
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
                          {/* // )} */}
                        </Box>
                      )}
                  </DialogContent>
                </Dialog>
              )}
            </Box>
          ) : (
            <Box className={classes.PostBox}>
              <Box style={{ marginRight: "15px" }}>
                {currentMoment < moment(data.createdAt).add(15, "m").unix() && (
                  <>
                    {data?.userId?._id === auth?.userData?._id && (
                      <Box display="flex" justifyContent="end">
                        <Button
                          onClick={() => handleClickOpen(data)}
                          variant="contained"
                          color="secondary"
                        >
                          Edit In{" "}
                          <span style={{ paddingLeft: "3px" }}>
                            {timeLeft.minutes && timeLeft.minutes}m :{" "}
                            {timeLeft.seconds && timeLeft.seconds}s
                          </span>
                        </Button>
                      </Box>
                    )}
                  </>
                )}
              </Box>
              &nbsp;
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
                <StyledMenuItem onClick={handleClickOpenShare}>
                  <ListItemText primary="Share" />
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
                  {isLoadingContent ? (
                    <LoadingSkeleton data={8} />
                  ) : (
                    <img
                      src={
                        data?.userId?.profilePic
                          ? data?.userId?.profilePic
                          : "images/user.png"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        history.push({
                          pathname: "/about-creators",
                          search: data?.userId?._id,
                        })
                      }
                    />
                  )}
                </figure>
                <Box>
                  {/* <Link to="#"> */}{" "}
                  <Typography
                    variant="h6"
                    style={{
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                    onClick={() =>
                      history.push({
                        pathname: "/about-creators",
                        search: data?.userId?._id,
                      })
                    }
                  >
                    {data?.userId?.userName
                      ? data?.userId?.userName
                      : data?.userId?.name}
                  </Typography>
                  <Typography variant="body1" style={{ color: "#BFBFBF" }}>
                    {moment(data?.createdAt).local().fromNow()}
                  </Typography>
                  {/* </Link> */}
                  <Typography variant="body2" component="small">
                    {data?.time}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                style={{ fontSize: "17px", paddingBottom: "6px", wordBreak: "break-all" }}
              >
                {data?.postTitle}
              </Typography>
              <Box className={classes.hash}>
                <Typography variant="h6" style={{ wordBreak: "break-all" }}>
                  <ReactHashtag
                    onHashtagClick={(val) =>
                      history.push({
                        pathname: "/hashtag",
                        search: val,
                      })
                    }
                  >
                    {data?.details}
                  </ReactHashtag>
                </Typography>
              </Box>
              {data?.tag.length > 0 && (
                <Typography variant="body2" style={{ display: "flex" }}>
                  Tag with:&nbsp;
                  {data?.tag?.map((data) => {
                    return (
                      <Typography
                        variant="body2"
                        onClick={() => {
                          history.push({
                            pathname: "/about-creators",
                            search: data?._id,
                          });
                        }}
                        style={{
                          marginLeft: "2px",
                          cursor: "pointer",
                          color: "#E31A89",
                        }}
                      >
                        {data?.userName ? data?.userName : data?.name}
                      </Typography>
                    );
                  })}
                </Typography>
              )}
              <Box>
                {data?.userId?._id !== auth?.userData?._id && (
                  <Box mt={1} mb={1} className="price">
                    <Box style={{ display: "flex" }}>
                      <span style={{ lineHeight: 1.6, width: "45px" }}>Price :</span>
                      &nbsp;
                      <Typography variant="h6">
                        {data?.amount.length >= 5 ? sortAddressForPrice(data?.amount) : data?.amount}&nbsp;
                        {tokenName}
                      </Typography>
                    </Box>

                    {currentMoment <
                      moment(data.createdAt).add(15, "m").unix() ? (
                      <>
                        <Box display="flex" justifyContent="end">
                          <Typography>
                            You can buy after{" "}
                            <span style={{ paddingLeft: "3px" }}>
                              {timeLeft.minutes && timeLeft.minutes}m :{" "}
                              {timeLeft.seconds && timeLeft.seconds}s
                            </span>
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        {data?.userId?._id !== auth?.userData?._id && (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleDeleteFunction(data)}
                            // onClick={() => buyPostHandler(data._id)}
                            disabled={isBuyLoading}
                          >
                            Buy {isBuyLoading && <ButtonCircularProgress />}
                          </Button>
                        )}
                      </>
                    )}
                  </Box>
                )}
                <Dialog
                  open={isHidePost1}
                  onClose={() => setIsHidePost1(false)}
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
                      onClick={buyPostHandler}
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
                <Box
                  onClick={() => HandleCommentBox(data?._id)}
                // onClick={() =>
                //   history.push({
                //     pathname: "/comment",
                //     search: data?._id,
                //   })
                // }
                >
                  <figure className="postImg">
                    {isVideo ? (
                      <video
                        width="100%"
                        height="450"
                        // style={{ cursor: "pointer" }}
                        controls
                      // onClick={handleClickOpen2}
                      >
                        <source src={data.mediaUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <>
                        {data?.mediaType !== "TEXT" && (
                          <img
                            src={data?.mediaUrl}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </>
                    )}
                  </figure>
                </Box>
                <Box>
                  <Grid container alignItems="center">
                    <Grid item xs={5}>
                      {" "}
                      {data?.reactOnPostCount > 0 ? (
                        <Box>+{data?.reactOnPostCount}&nbsp; Likes</Box>
                      ) : (
                        <Box>{data?.reactOnPostCount}&nbsp;Likes</Box>
                      )}
                      {/* <MultyUser data={data?.likesCount} /> */}
                    </Grid>
                    <Grid item xs={7} align="right">
                      <label>{data?.totalComment} Comments</label> &nbsp; &nbsp;
                      &nbsp; &nbsp;
                      <label>
                        {data?.postType === "PUBLIC" && (
                          <>
                            {data?.amount.length >= 5 ? sortAddressForPrice(data?.amount) : data?.amount}&nbsp;
                            {tokenName}
                          </>
                        )}{" "}
                      </label>
                    </Grid>
                  </Grid>
                </Box>
                <Accordion
                  square
                  // expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <Box className="commentBox">
                    {showPicker && (
                      <Box className={classes.emojiBox}>
                        <Picker onEmojiClick={onEmojiClick} />
                      </Box>
                    )}
                    <Grid
                      container
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid item xs={4}>
                        {isLoadingEmoji ? (
                          <ButtonCircularProgress />
                        ) : (
                          <Box>
                            {isLikeEmoji ? (
                              <>
                                {" "}
                                {data?.reactOnPost
                                  ?.filter(
                                    (data) =>
                                      data.userId === auth?.userData?._id
                                    // console.log(
                                    //   "dat>>>>>a",
                                    //   data.userId === auth?.userData?._id
                                    // )
                                  )
                                  .map((data, i) => {
                                    return (
                                      <>
                                        <Button
                                          key={i}
                                          style={{
                                            fontSize: "20px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>
                                            setShowPicker((val) => !val)
                                          }
                                          className={classes.socialbox}
                                        >
                                          {data?.emoji}
                                        </Button>
                                      </>
                                    );
                                  })}
                              </>
                            ) : (
                              <>
                                <Button
                                  style={{
                                    fontSize: "20px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Box className="postCardEmoji">
                                    <BsEmojiLaughing
                                      className={classes.socialbox}
                                      position="end"
                                      onClick={() =>
                                        setShowPicker((val) => !val)
                                      }
                                    />
                                  </Box>
                                </Button>
                              </>
                            )}
                          </Box>
                        )}
                      </Grid>
                      <Grid item xs={4} align="center">
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                        >
                          <Button color="primary" size="large">
                            {" "}
                            <BiCommentDots />
                            Comments
                          </Button>
                        </AccordionSummary>
                      </Grid>
                      <Grid item xs={4} align="right">
                        <Button
                          color="primary"
                          size="large"
                          onClick={handleClickOpenShare}
                        >
                          {" "}
                          <RiShareForwardLine />
                          Share
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  {data &&
                    data?.comment?.map((dataList, i) => {
                      return (
                        <AccordionDetails key={i}>
                          <CommentBox
                            dataList={data}
                            listPublicExclusiveHandler={
                              listPublicExclusiveHandler
                            }
                            data={dataList}
                          />
                        </AccordionDetails>
                      );
                    })}
                </Accordion>
                <Box
                  className="searchaddress"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={2} sm={1}>
                      <Box className="figure">
                        <Box className="profileimage">
                          <img
                            src={
                              auth?.userData?.profilePic
                                ? auth?.userData?.profilePic
                                : "images/user.png"
                            }
                            alt="user data"
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={10} sm={11}>
                      <form onSubmit={(event) => commentPostHandler(event)}>
                        <Grid container spacing={1}>
                          <Grid item xs={9} sm={10}>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              name="Text Field"
                              placeholder="Write here..."
                              type="text"
                              value={message}
                              error={isSubmit && message === ""}
                              // multiline={true}
                              onChange={(e) => setMessage(e.target.value)}
                              fullWidth
                            />
                            <FormHelperText error>
                              {isSubmit && message === "" && (
                                <Box ml={1}>Comment is required</Box>
                              )}
                            </FormHelperText>
                            {/* isSubmit */}
                          </Grid>
                          <Grid item xs={3} sm={2} align="center">
                            <Button
                              size="large"
                              color="primary"
                              type="submit"
                              fullWidth
                              onClick={commentPostHandler}
                            >
                              <SendIcon style={{ color: "#E31A89" }} />
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
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
              <SocialShareBox
                url={websiteName + "/about-auction?" + data._id}
              />
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
            <IconButton
              className={classes.cancelBtn}
              onClick={handleCloseReport}
            >
              <MdCancel />
            </IconButton>
            <Box px={2}>
              <DialogTitle id="alert-dialog-title" align="center">
                {"Report Post"}
              </DialogTitle>
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
                    error={isLoadingReport && reportMessage === ""}
                    // rows={5}
                    value={reportMessage}
                    onChange={(e) => setReportMeesae(e.target.value)}
                  />
                  <FormHelperText error>
                    {isLoadingReport && reportMessage === "" && (
                      <Box ml={1} style={{ fontSize: "12px" }}>
                        Report message is required
                      </Box>
                    )}
                  </FormHelperText>
                </Box>
              </Box>
              <Box mb={2} align="right">
                <Button
                  variant="contained"
                  onClick={handleCloseReport}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={reportPostHandler}
                  style={{ marginLeft: "10px" }}
                >
                  Report
                </Button>
              </Box>
            </Box>
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
            {/* <DialogTitle id="alert-dialog-title">{"Share Post"}</DialogTitle>
            <DialogContent>
              <IconButton
                className={classes.cancelBtn}
                onClick={() => setOpenCommentBox(false)}
              >
                <MdCancel />
              </IconButton>
              <SocialShareBox
                url={websiteName + "/about-auction?" + data._id}
              />
            </DialogContent> */}
          </Dialog>
          <EditPostModal
            listPublicExclusiveHandler={listPublicExclusiveHandler}
            updateData={updateData}
            open={open}
            setOpen={(item) => setOpen(item)}
          />
        </>
      )}
    </Paper>
  );
}
