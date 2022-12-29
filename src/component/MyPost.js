import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  FormHelperText,
  Avatar,
  FormControl,
  IconButton,
  withStyles,
  Menu,
  makeStyles,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { calculateTimeLeft, sortAddress, sortAddressPostTitle, tokenName } from "src/utils";
import axios from "axios";
import CommentBox from "./CommentBox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link, useHistory } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "./ButtonCircularProgress";
import { toast } from "react-toastify";
import LoadingSkeleton from "./LoadingSkeleton";
import { AuthContext } from "src/context/Auth";
import { websiteName } from "src/ApiConfig/ApiConfig";
import moment from "moment";
import Axios from "axios";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Comment from "src/views/pages/Dashboard/Comment";
import SocialShareBox from "./SocialShareBox";
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
  UserBox: {
    display: "flex",
    alignItems: "center",
    "& h6": {
      fontWeight: "600",
    },
    "& select": {
      backgroundColor: "#595a5a",
      color: "#cac7c7",
      padding: "5px 10px",
      borderRadius: "3px",
      border: "none",
      "&:focus-visible": {
        outline: "none",
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
      "& img": {
        width: "auto",
        maxWidth: "100%",
        maxHeight: "60px",
      },
    },
  },
  PostBox: {
    backgroundColor: "theme",
    position: "relative",
    padding: "15px",

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
      backgroundColor: "#000",
      margin: "16px 0",
      borderRadius: "10px",

      overflow: "hidden",
      [theme.breakpoints.down("xs")]: {
        margin: "5px 0",
        borderRadius: "10px",
      },
      "& img": {
        width: "100%",
        height: "255px",
        transform: "scale(1.025)",
        maxHeight: "380px",
        objectFit: "cover",
      },
      "& video": {
        width: "100%",
        height: "255px",
        maxHeight: "380px",
        objectFit: "cover",
      },
    },
    "& label": {
      color: "#BFBFBF",
      [theme.breakpoints.down("xs")]: {
        fontSize: "10px",
      },
    },
    "& .commentBox": {
      //   borderTop: "0.5px solid #737373",
      //   borderBottom: "0.5px solid #737373",
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
      paddingTop: "16px",
      "& .figure": {
        margin: "0",
        marginRight: "15px",
        position: "relative",
        "& .profileimage": {
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#101010",
          [theme.breakpoints.down("xs")]: {
            height: "30px",
            width: "30px",
          },
          "& img": {
            width: "auto",
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
        height: "48px",
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
        height: "40px",
        width: "40px",
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
          height: "40px",
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
  donation: {
    "& span": {
      fontSize: "12px",
      padding: "2px 5px",
      border: "1px solid #e31a89",
      cursor: "pointer",
      "&.active": {
        backgroundColor: "#e31a89",
      },
    },
  },
}));

export default function (props) {
  const auth = useContext(AuthContext);
  const { data, listPublicExclusiveHandler, isLoadingContent } = props;
  const classes = useStyles();
  const [titlePost, setTitlePost] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [duration, setDuration] = useState("7 Days");
  const [loader, setLoader] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = useState();
  const [isOpenInterest, setIsopenInterest] = useState(false);
  const [intrestValue, setIntrest] = useState("");
  const [intrestList, setIntrestList] = useState([]);
  const [durationList, setSurationList] = useState([]);
  const [durationAmount, setAmounDuration] = useState();
  const [expanded, setExpanded] = React.useState("panel1");
  const [openShare, setOpenShare] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [openPromoted, setOpenPromoted] = React.useState(false);
  const [promotedId, setPromotedId] = React.useState(false);
  const [openCommentBox, setOpenCommentBox] = React.useState(false);
  const [openCommentBoxId, setOpenCommentBoxId] = React.useState();
  const [isHidePost, setIsHidePost] = React.useState(false);
  const [isDeletePost, setIsDeletePost] = React.useState(false);
  const [isDeletePostData, setIsDeletePostData] = React.useState();
  const [portUrl, setPortUrl] = useState("");
  const [openExport, setOpenExport] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [idData, setIdData] = useState({});
  const [updateData, setUpdateData] = useState({})
  const [open, setOpen] = React.useState(false);
  const [isLoadingFunction, setIsLoadingFunc] = React.useState(false);
  const setAllData = (data) => {
    console.log("data----", data);
    setIdData(data)
  }

  const validPromotionUrl = (value) => {
    const re = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    return re.test(value);
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
  const handleClickOpenPromoted = (id) => {
    setOpenPromoted(true);
    setPromotedId(id);
    setAnchorEl(false);
  };
  const handleCloseReport = () => {
    setOpenReport(false);
  };
  const handleClosePromoted = () => {
    setOpenPromoted(false);
  };
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const isVideo = data.mediaUrl.includes(".mp4");

  const [minAgeCheck, setMinAge] = useState();
  const myAge = (date) => {
    const age = moment().diff(moment(date), "years") >= 16;
    return age;
  };
  const [maxAgeCheck, setMaxAge] = useState();
  const listDurationHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listDuration,
        // headers: {
        //   token: window.localStorage.getItem("token"),
        // },
        // data: {
        //   name: id,
        // },
      });
      if (res.data.responseCode === 200) {
        setSurationList(res.data.result.docs);
      }
    } catch (error) { }
  };

  const listInterestHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listInterest,
        // headers: {
        //   token: window.localStorage.getItem("token"),
        // },
        // data: {
        //   name: id,
        // },
      });
      if (res.data.responseCode === 200) {
        setIntrestList(res.data.result.docs);
      }
    } catch (error) { }
  };
  useEffect(() => {
    listInterestHandler();
    listDurationHandler();
  }, []);
  const addInterestHandler = async (id) => {
    const intrestValueArr =
      intrestValue.length > 0 ? intrestValue.split(",") : [];
    for (let i = 0; i < intrestValueArr.length; i++) {
      const singlerIntrestValue = intrestValueArr[i];
      try {
        const res = await axios({
          method: "POST",
          url: Apiconfigs.createInterest,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            name: singlerIntrestValue,
          },
        });
        if (res.data.responseCode === 200) {
        }
      } catch (error) { }
    }
  };
  const createPromotionleHandle = async () => {
    setIsSubmit(true);
    const selectuser = selectedTeam
      ? selectedTeam?.map((data, i) => data.name)
      : [];

    if (
      minAgeCheck !== "" &&
      maxAgeCheck !== "" &&
      portUrl !== "" &&
      validPromotionUrl(portUrl) &&

      Number(minAgeCheck) < Number(maxAgeCheck) &&
      (selectuser || intrestValue != "")
    ) {
      setLoader(true);

      const intrestValueArr =
        intrestValue.length > 0 ? intrestValue.split(",") : [];
      if (intrestValueArr.length > 0) {
        await addInterestHandler();
      }
      axios({
        method: "POST",
        url: Apiconfigs.createPostPromotion,
        data: {
          postId: promotedId,
          dateTime: duration,
          amount: durationAmount,
          url: portUrl,
          interest: selectuser.concat(intrestValueArr),
          minAge: minAgeCheck,
          maxAge: maxAgeCheck,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          if (res.data.responseCode === 200) {
            setIsSubmit(false);
            setOpenPromoted(false);
            setMaxAge("");
            setMinAge("");
            setSelectedTeam();
            if (listPublicExclusiveHandler) {
              listPublicExclusiveHandler();
            }
            // listPublicExclusiveHandler();
            toast.success(res.data.responseMessage);
            setLoader(false);
            if (res.data.result.docs) {
              toast.success(res.response_message);
              setLoader(false);
            }
          }
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          toast.error(error?.response?.data?.responseMessage);
        });
    }
  };
  const [durationId, setDurationId] = useState();

  const handleDurationFunc = (data) => {
    setDuration(data?.duration);
    setAmounDuration(data?.amount);
    setDurationId(data?._id);
  };

  const HandleDeletFun = (data) => {
    setIsDeletePost(true);
    setIsDeletePostData(data);
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
  const deletPostHandler = async () => {
    try {
      const res = await Axios({
        method: "DELETE",
        url: Apiconfigs.deletePost,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          postId: isDeletePostData,
        },
      });
      if (res.data.responseCode === 200) {
        listPublicExclusiveHandler();
        setAnchorEl(false);
        setIsDeletePost(false);

        toast.success(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error?.response?.data?.responseMessage);
      setAnchorEl(false);
      setIsDeletePost(false);
    }
  };

  const HandleCommentBox = (data) => {
    setOpenCommentBox(true);
    setOpenCommentBoxId(data);
  };

  const handleClickOpenExport = () => {
    setOpenExport(true);
    setAnchorEl(false);
  };

  const handleCloseExport = () => {
    setOpenExport(false);
  };


  const exportToAddress = async () => {
    setIsSubmit(true);

    if (walletAddress !== "") {
      try {
        setIsLoadingFunc(true)
        const res = await Axios({
          method: 'POST',
          url: Apiconfigs.exportOnMarketPlace,
          headers: {
            token: sessionStorage.getItem("token")
          },
          data: {
            postId: idData?._id,
            walletAddress: walletAddress
          }
        })
        if (res.data.responseCode === 200) {
          setIsLoadingFunc(false)
          toast.success(res.data.responseMessage)
          listPublicExclusiveHandler();
          setOpenExport(false)

        }

      } catch (error) {
        setIsLoadingFunc(false)

      }

    } else {
      toast.warn("Please Enter Wallet Address")
    }

  }

  const handleClickOpen = (data) => {
    setOpen(true);
    setUpdateData(data);
  };

  const [endTime, setEndtime] = useState(moment(data.createdAt).add(15, "m").unix());
  const [timeLeft, setTimeLeft] = useState("");
  const [currentMoment, setCurrentMoment] = useState("");


  useEffect(() => {
    let endTimes = moment(data.createdAt).add(15, "m").unix()
    if (endTimes) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTimes));
        setCurrentMoment(moment().unix())
      }, 1000);
      return () => clearTimeout(timer);

    }


  });



  return (
    <Paper>
      <Box className={classes.PostBox}>
        <IconButton
          onClick={(event) => {
            setAllData(data)
            handleClick(event)
          }}
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
          {!data?.isExport && !data?.isSold && !data?.isauction && (
            <StyledMenuItem onClick={handleClickOpenExport}>
              <ListItemText primary="Export" />
            </StyledMenuItem>
          )}

          <StyledMenuItem onClick={handleClickOpenShare}>
            <ListItemText primary="Share" />
          </StyledMenuItem>
          <StyledMenuItem>
            <ListItemText onClick={() => setIsHidePost(true)} primary="Hide" />
          </StyledMenuItem>
          {data?.userId?._id === auth?.userData?._id && (
            <StyledMenuItem>
              <ListItemText
                onClick={() => HandleDeletFun(data?._id)}
                primary="Delete"
              />
            </StyledMenuItem>
          )}

          <StyledMenuItem onClick={() => handleClickOpenPromoted(data?._id)}>
            <ListItemText primary="Promote" />
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
                    : "/images/user.png"
                }
              />
            )}
          </figure>
          <Box>
            <Link to="#">
              {" "}
              <Typography variant="h6">
                {data?.userId?.userName
                  ? `${data?.userId?.userNam?.length > 25
                    ? sortAddress(data?.userId?.userName)
                    : data?.userId?.userName
                  }`
                  : `${data?.userId?.namel?.length > 25
                    ? sortAddress(data?.userId?.name)
                    : data?.userId?.name
                  }`}
              </Typography>
            </Link>
            <Typography variant="body2" component="small">
              {data?.time}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2" style={{ wordBreak: "break-all" }}>
          {data?.postTitle?.length < 40
            ? data?.postTitle
            : sortAddress(data?.postTitle)}
        </Typography>



        <Box mt={1} mb={1} className="price">
          <Box className="text">
            <Typography variant="h6">Price :</Typography>

            <Typography variant="h6">
              {data?.amount} &nbsp;
              {tokenName}
            </Typography>
          </Box>
          {currentMoment < moment(data.createdAt).add(15, "m").unix() && (
            <>
              {data?.userId?._id === auth?.userData?._id && (
                <Box display="flex" justifyContent="end">

                  <Button style={{ padding: "0px 8px" }} onClick={() => handleClickOpen(data)}
                    variant="contained"
                    color="secondary"
                  >
                    Edit In <span style={{ paddingLeft: "3px" }}>
                      {timeLeft.minutes && timeLeft.minutes}m : {timeLeft.seconds && timeLeft.seconds}s
                    </span>
                  </Button>
                </Box>

              )}
            </>

          )}
          {data?.postType !== "PUBLIC" &&
            data?.userId?._id !== auth?.userData?._id && (
              <Button variant="contained" color="secondary">
                Buy
              </Button>
            )}
        </Box>
        <Box onClick={() => HandleCommentBox(data?._id)}>
          {isVideo ? (
            <figure className="postImg">
              <video width="100%" height="450" controls>
                <source src={data.mediaUrl} type="video/mp4" />
              </video>
            </figure>
          ) : (
            <figure className="postImg">
              {isLoadingContent ? (
                <LoadingSkeleton data={8} />
              ) : (
                <img src={data?.mediaUrl} />
              )}
            </figure>
          )}
        </Box>
        <Box></Box>
        <Accordion
          square
          // expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <Box className="commentBox"></Box>
          {data &&
            data?.comment?.map((data, i) => {
              return (
                <AccordionDetails>
                  <CommentBox data={data} />
                </AccordionDetails>
              );
            })}
        </Accordion>
        <Box className="searchaddress">
          <Grid container spacing={1} alignItems="center"></Grid>
        </Box>
      </Box>
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
        open={isDeletePost}
        onClose={() => setIsDeletePost(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* {row.status} */}
            {`Are you sure want to  delete this post?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            // disabled={loader2}
            onClick={deletPostHandler}
          >
            Yes
            {/* {loader2 && <ButtonCircularProgress />} */}
          </Button>
          <Button
            onClick={() => setIsDeletePost(false)}
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
          <IconButton className={classes.cancelBtn} onClick={handleCloseShare}>
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
          <IconButton className={classes.cancelBtn} onClick={handleCloseReport}>
            <MdCancel />
          </IconButton>

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
              />
            </Box>
          </Box>
          <Box mb={2} align="right">
            <Button variant="contained" color="primary">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "10px" }}
            >
              Report
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openPromoted}
        onClose={handleClosePromoted}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5">Create Promotion</Typography>
        </DialogTitle>
        <DialogContent>
          <IconButton
            className={classes.cancelBtn}
            onClick={handleClosePromoted}
          >
            <MdCancel />
          </IconButton>
          <Box className={classes.mainmodalBox}>
            <Box className={classes.UserBox}>
              <Avatar
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
                src={
                  auth?.userData?.profilePic
                    ? auth?.userData?.profilePic
                    : "images/user.png"
                }
              />

              <Typography variant="h6">
                {" "}
                {auth?.userData?.userName
                  ? auth?.userData?.userName
                  : auth?.userData?.name}
              </Typography>
            </Box>
            <Box mt={2}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={intrestList}
                value={selectedTeam}
                onChange={(_event, newTeam) => {
                  setSelectedTeam(newTeam);
                }}
                getOptionLabel={(option) => option?.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Interest"
                    placeholder="Users"
                    error={Boolean(isSubmit && !selectedTeam)}
                    helperText={
                      isSubmit &&
                      !selectedTeam &&
                      "Please select atleast one intrest"
                    }
                  />
                )}
              />
              <FormHelperText error>
                {/* {isSubmit && activities === "" && (
                  <Box ml={1}>Please select atleast on intrest</Box>
                )} */}
              </FormHelperText>
            </Box>
            <Box mt={2}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="Text Field"
                  placeholder="Minimum age"
                  type="number"
                  onKeyPress={(event) => {
                    if (event?.key === "-" || event?.key === "+") {
                      event.preventDefault();
                    }
                  }}
                  fullWidth
                  value={minAgeCheck}
                  error={Boolean(isSubmit && minAgeCheck === "")}
                  onChange={(e) => setMinAge(e.target.value)}
                />
                <FormHelperText error>
                  {isSubmit &&
                    (minAgeCheck === "" ||
                      Number(minAgeCheck) > Number(maxAgeCheck)) && (
                      <Box ml={1}>
                        Min age is required, It should be less then max age
                      </Box>
                    )}
                </FormHelperText>
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="Text Field"
                  placeholder="MaximumAge age"
                  type="number"
                  onKeyPress={(event) => {
                    if (event?.key === "-" || event?.key === "+") {
                      event.preventDefault();
                    }
                  }}
                  fullWidth
                  value={maxAgeCheck}
                  error={Boolean(isSubmit && maxAgeCheck === "")}
                  onChange={(e) => setMaxAge(e.target.value)}
                />
                <FormHelperText error>
                  {isSubmit &&
                    (maxAgeCheck === "" ||
                      Number(maxAgeCheck) < Number(minAgeCheck)) && (
                      <Box ml={1}>
                        Max age is required, It should be greater then min age
                      </Box>
                    )}
                </FormHelperText>
              </FormControl>
            </Box>
            <Box mt={2}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="Text Field"
                placeholder="Promotion Url"
                type="text"
                fullWidth
                error={
                  Boolean(isSubmit && portUrl === "") ||
                  (portUrl !== "" && !validPromotionUrl(portUrl))
                }
                onChange={(e) => setPortUrl(e.target.value)}
              />
              {/* <FormHelperText error>
                      {isSubmit && titlePost === "" && (
                        <Box ml={1}>Title is required</Box>
                      )}
                    </FormHelperText> */}
              <FormHelperText error>
                {(isSubmit && portUrl === "" && (
                  <Box ml={1}>Promotion url is required</Box>
                )) ||
                  (portUrl !== "" && !validPromotionUrl(portUrl) && (
                    <Box ml={1}>
                      Please enter valid promotion url
                    </Box>
                  ))}
              </FormHelperText>
            </Box>
            <Box mt={3}>
              <Grid container spacing={1}>
                <Grid item xs={4} align="left">
                  <Typography variant="h6">Duration</Typography>
                </Grid>
                <Grid item xs={12} className={classes.donation}>
                  <Box>
                    <Grid container spacing={3} style={{ paddingRight: "20px" }}>
                      {durationList &&
                        durationList?.map((data, i) => {
                          const statusData = data._id === durationId;
                          return (
                            <Grid item xs={6} key={i}>
                              <span
                                style={{
                                  fontSize: "14px",
                                  marginRight: "8px",
                                  width: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "5px",
                                  height: "100%",
                                }}
                                className={statusData ? "active" : null}
                                onClick={() => handleDurationFunc(data)}
                              >
                                {data?.duration}&nbsp; Days,{" "}
                                {data?.amount} Share
                              </span>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <FormHelperText error>
                {isSubmit && !duration && (
                  <Box align="left">Please add duration </Box>
                )}
              </FormHelperText>
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={createPromotionleHandle}
                fullWidth
              >
                Submit {loader && <ButtonCircularProgress />}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      {openCommentBoxId && openCommentBox && (
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
      )}
      <Dialog
        onClose={() => {
          if (!isLoadingFunction) {
            handleCloseExport()

          }
        }}
        aria-labelledby="customized-dialog-title"
        open={openExport}
      >
        <Box p={1}>
          <Typography variant="h6">Wallet Address</Typography>
          <Box my={2}>
            <TextField

              variant="outlined"
              value={walletAddress}
              placeholder="Enter wallet address"
              onChange={(e) => setWalletAddress(e.target.value)}
              style={{ width: "20rem" }}
              disabled={isLoadingFunction}

              onKeyPress={(event) => {
                if (event?.key === "-" || event?.key === "+") {
                  event.preventDefault();
                }
              }}
            />
            <FormHelperText error>
              {(isSubmit && (walletAddress === "") && (
                <Box ml={1}>Enter wallet address</Box>
              ))}
            </FormHelperText>
          </Box>
        </Box>

        <Box style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleCloseExport}
            color="primary"
            variant="contained"
            size="large"
            disabled={isLoadingFunction}
          >
            Cancel
          </Button>&nbsp;
          <Button

            color="secondary"
            variant="contained"
            size="large"
            disabled={isLoadingFunction}

            onClick={() => exportToAddress()}

          >
            Export  {isLoadingFunction && <ButtonCircularProgress />}
          </Button>
        </Box>

      </Dialog>
      <EditPostModal listPublicExclusiveHandler={listPublicExclusiveHandler} updateData={updateData} open={open} setOpen={(item) => setOpen(item)} />
    </Paper>
  );
}
