import React, { useState, useContext } from "react";
import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  IconButton,
} from "@material-ui/core";
import CommentBox from "src/component/CommentBox";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
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
import LoadingSkeleton from "src/component/LoadingSkeleton";
import { AuthContext } from "src/context/Auth";
import { websiteName } from "src/ApiConfig/ApiConfig";
import SocialShareBox from "src/component/SocialShareBox";
import Comment from "src/views/pages/Dashboard/Comment";

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
    // "& .commentBox": {
    //   //   borderTop: "0.5px solid #737373",
    //   //   borderBottom: "0.5px solid #737373",
    //   marginTop: "16px",
    //   padding: "5px 0",
    //   [theme.breakpoints.down("xs")]: {
    //     padding: "0px 0",
    //     marginTop: "10px",
    //   },
    //   "& button": {
    //     [theme.breakpoints.down("xs")]: {
    //       fontSize: "10px !important",
    //     },
    //     "& svg": {
    //       fontSize: "20px",
    //       marginRight: "5px",
    //       [theme.breakpoints.down("xs")]: {
    //         fontSize: "15px",
    //       },
    //     },
    //   },
    // },
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [reportMessage, setReportMeesae] = React.useState("");
  const [openCommentBox, setOpenCommentBox] = React.useState(false);
  const [openCommentBoxId, setOpenCommentBoxId] = React.useState();
  const HandleCommentBox = (data) => {
    setOpenCommentBox(true);
    setOpenCommentBoxId(data);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  console.log("dahgshb", data);
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

  // const handleClickOpenReport = () => {
  //   setOpenReport(true);
  //   setAnchorEl(false);
  // };

  const handleCloseReport = () => {
    setOpenReport(false);
  };
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const isVideo = data.postId.mediaUrl.includes(".mp4");
  const [minAgeCheck, setMinAge] = useState();

  return (
    <Paper>
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
          <StyledMenuItem onClick={handleClickOpenShare}>
            <ListItemText primary="Share" />
          </StyledMenuItem>
          {/* <StyledMenuItem>
    <ListItemText primary="Hide" />
  </StyledMenuItem> */}
          {/* <StyledMenuItem onClick={handleClickOpenReport}>
            <ListItemText primary="Report" />
          </StyledMenuItem> */}
          {/* <StyledMenuItem onClick={() => handleClickOpenPromoted(data?._id)}>
    <ListItemText primary="Promoted" />
  </StyledMenuItem> */}
        </StyledMenu>
        <Box className="UserBox">
          <figure>
            {isLoadingContent ? (
              <LoadingSkeleton data={8} />
            ) : (
              <img
                src={
                  data?.postId?.profilePic
                    ? data?.postId?.profilePic
                    : "/images/user.png"
                }
                onClick={() => {
                  history.push({
                    pathname: "/profile",
                    search: data?.postId?._id,
                  });
                }}
              />
            )}
          </figure>
          <Box>
            <Link to="#">
              {" "}
              <Typography variant="h6">
                {data?.postId?.userId?.userName}
              </Typography>
            </Link>
            <Typography variant="body2" component="small">
              {data?.postId?.time}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body2">{data?.text}</Typography>
        <Box mt={1} mb={1}>
          <Typography variant="h6">{data?.postId?.postTitle}</Typography>
          <Typography variant="h6">{data?.postId?.details}</Typography>
          {/* <Box className="text">
            <Typography variant="h6" color="secondary.main">
              Price :
            </Typography>
            &nbsp;&nbsp;
            <Typography variant="h6" color="secondary.main">
              {data?.postId?.amount} &nbsp;
              {tokenName}
            </Typography>
          </Box> */}
          {/* {data?.postType !== "PUBLIC" &&
            data?.userId?._id !== auth?.userData?._id && (
              <Button variant="contained" color="secondary">
                Buy
              </Button>
            )} */}
        </Box>
        <Box
        // onClick={() => HandleCommentBox(data?._id)}
        // onClick={() =>
        //   history.push({
        //     pathname: "/comment",
        //     search: data?.postId?._id,
        //   })
        // }
        >
          {isVideo ? (
            <figure className="postImg">
              <video width="100%" height="450" controls>
                <source src={data.postId?.mediaUrl} type="video/mp4" />
              </video>
            </figure>
          ) : (
            <figure className="postImg">
              {isLoadingContent ? (
                <LoadingSkeleton data={8} />
              ) : (
                <img src={data.postId?.mediaUrl} />
              )}
            </figure>
          )}
        </Box>
        <Box></Box>
        {/* <Accordion
          square
          // expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          {data &&
            data?.comment?.map((data, i) => {
              return (
                <Box>
                  <CommentBox data={data} key={i} />
                </Box>
              );
            })}
        </Accordion> */}
        <Box className="searchaddress">
          <Grid container spacing={1} alignItems="center"></Grid>
        </Box>
      </Box>
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
    </Paper>
  );
}
