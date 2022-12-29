import React, { useState, useEffect, useContext } from "react";

import {
  Box,
  Grid,
  Paper,
  Container,
  Button,
  IconButton,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import Page from "src/component/Page";
import { useHistory, useLocation } from "react-router-dom";
import CommentBox from "src/component/CommentBox";
import UserProfile from "src/component/UserProfile";
import { BiCommentDots } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { FaHeart } from "react-icons/fa";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordion from "@material-ui/core/Accordion";
import DataLoading from "src/component/DataLoading";
import { BsEmojiLaughing } from "react-icons/bs";
import Picker from "emoji-picker-react";
const useStyles = makeStyles((theme) => ({
  commentfullBox: {
    position: "relative",
    "& .canelIcon": {
      position: "fixed",
      top: "20px",
      left: "20px",
      fontSize: "30px",
    },
  },
  emojiBox: {
    position: "absolute",
    // width: "100%",
    bottom: "47px",
  },
  rightBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "97vh",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      paddingTop: "50px",
    },
    "& img": {
      width: "auto",
      maxWidth: "100%",
    },
  },
  commentBox: {
    borderTop: "0.5px solid #737373",
    borderBottom: "0.5px solid #737373",
    marginTop: "16px",
    padding: "5px 0",
    "& button": {
      "& svg": {
        fontSize: "20px",
        marginRight: "5px",
      },
    },
  },
  searchaddress: {
    paddingTop: "16px",
    position: "sticky",
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
          height: "40px",
          width: "40px",
        },
        "& img": {
          width: "auto",
          maxWidth: "100%",
          maxHeight: "50px",
        },
      },
    },
    "& button": {
      backgroundColor: "#373636",
      height: "48px",
      borderRadius: "5px",
      [theme.breakpoints.down("xs")]: {
        height: "40px",
      },
    },
  },
  mainBox: {
    padding: "20px",
  },
}));
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
export default function () {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [idd, setIdd] = useState();
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);

  const viewExclusivepostHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.viewExclusivepost + idd,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setDataList(res.data.result);
      }
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);
    }
  };

  let isLike = false;

  if (auth.userData?._id && dataList) {
    const likeUser = dataList?.likesUsers?.filter(
      (data) => data === auth.userData?._id
    );
    isLike = likeUser?.length > 0;
  }
  const commentPostHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: Apiconfigs.commentOnpost,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          postId: idd,
          message: message,
        },
      });
      if (res.data.responseCode === 200) {
        if (idd) {
          viewExclusivepostHandler();
        }
        toast.success(res.data.responseMessage);
        setIsLoading(false);
        setMessage("");
      }
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };
  const likesHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.postLikeDislike + idd,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          postId: id,
        },
      });
      if (res.data.responseCode === 200) {
        if (idd) {
          viewExclusivepostHandler();
        }
        toast.success(res.data.responseMessage);
      }
    } catch (error) { }
  };
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
    if (idd) {
      viewExclusivepostHandler();
    }
  }, [location.search, idd]);

  const isvideo = dataList?.mediaUrl?.includes(".mp4");
  const [showPicker, setShowPicker] = useState(false);

  const [inputStr, setInputStr] = useState("");
  const onEmojiClick = (event, emojiObject) => {
    setInputStr((data) => data + emojiObject.emoji);
    setShowPicker(false);
    // likesHandler();
    likesHandler(dataList._id);
  };
  return (
    <Page title="Dashboard">
      <Container maxWidth="fixed">
        <Box className={classes.commentfullBox}>
          <IconButton aria-label="cancle" className="canelIcon">
            <MdCancel onClick={() => history.goBack()} />
          </IconButton>
          {isLoadingData ? (
            <DataLoading />
          ) : (
            <Grid container spacing={2}>
              <Grid item sm={12} md={12} lg={8}>
                {dataList?.postType === "PUBLIC" ||
                  dataList?.isSubscribed ||
                  auth?.userData?.userType === "Admin" ||
                  auth?.userData?.userType === "Subadmin" ? (
                  <Box className={classes.rightBox}>
                    {isvideo ? (
                      <video
                        width="100%"
                        style={{
                          cursor: "pointer",
                          height: window.innerHeight,
                        }}
                        controls
                      >
                        <source src={dataList.mediaUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        style={{ maxHeight: "20vh" }}
                        src={dataList?.mediaUrl}
                      />
                    )}
                  </Box>
                ) : (
                  <Box
                    className={classes.rightBox}
                    style={{ filter: "blur(15px)" }}
                  >
                    {isvideo ? (
                      <video
                        width="100%"
                        style={{
                          cursor: "pointer",
                          height: window.innerHeight,
                        }}
                        controls
                      >
                        <source src={dataList.mediaUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        style={{ maxHeight: "20vh" }}
                        src={dataList?.mediaUrl}
                      />
                    )}
                  </Box>
                )}
              </Grid>
              <Grid item sm={12} md={12} lg={4}>
                <Box mt={3}>
                  <Paper>
                    <Box className={classes.mainBox}>
                      <Box mb={3}>
                        <UserProfile dataList={dataList} />
                      </Box>
                      <Accordion square>
                        <Box className={classes.commentBox} mb={3}>
                          {showPicker && (
                            <Box className={classes.emojiBox}>
                              <Picker onEmojiClick={onEmojiClick} />
                            </Box>
                          )}
                          <Grid container>
                            <Grid item xs={6} align="center">
                              <Box>
                                {inputStr && inputStr ? (
                                  <Button
                                    style={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                    // onClick={() => setShowPicker((val) => !val)}
                                    className={classes.socialbox}
                                  >
                                    {inputStr}
                                  </Button>
                                ) : (
                                  <Button
                                    style={{
                                      fontSize: "20px",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <BsEmojiLaughing
                                      className={classes.socialbox}
                                      position="end"
                                      onClick={() =>
                                        setShowPicker((val) => !val)
                                      }
                                    />
                                  </Button>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={6} align="center">
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
                          </Grid>
                        </Box>
                        <Box className="CommentscrollDiv">
                          {dataList &&
                            dataList?.comment?.map((data, i) => {
                              return (
                                <AccordionDetails>
                                  <CommentBox
                                    dataList={dataList}
                                    listPublicExclusiveHandler={
                                      viewExclusivepostHandler
                                    }
                                    data={data}
                                  />
                                </AccordionDetails>
                              );
                            })}
                        </Box>
                      </Accordion>
                      <Box className={classes.searchaddress} >
                        <Grid container spacing={1} alignItems="center">
                          <Grid item xs={2} sm={2}>
                            <Box className="figure">
                              <Box className="profileimage">
                                <img src="images/user.png" alt="user data" />
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={7} sm={8}>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              name="Text Field"
                              placeholder="Write here..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              type="text"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={3} sm={2} align="center">
                            <Button
                              size="large"
                              color="primary"
                              fullWidth
                              onClick={commentPostHandler}
                              disabled={isLoading}
                            >
                              <SendIcon style={{ color: "#E31A89" }} />
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </Page>
  );
}
