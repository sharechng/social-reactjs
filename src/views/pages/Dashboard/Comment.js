import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Grid,
  Paper,
  Container,
  Button,
  IconButton,
  TextField,
  FormHelperText,
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
import { tokenName } from "src/utils";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { BsEmojiLaughing } from "react-icons/bs";
import Picker from "emoji-picker-react";
import NoDataFound from "src/component/NoDataFound";
import PageLoading from "src/component/PageLoading";

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
  rightBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "97vh",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      paddingTop: "50px",
    },
    "& img": {
      width: "auto",
      maxWidth: "100%",
      maxHeight: "90vh",
    },
    "& video": {
      width: "auto",
      maxWidth: "100%",
      maxHeight: "90vh",
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
    "& .figure": {
      margin: "0",
      marginRight: "15px",
      position: "relative",
      "& .profileimage": {
        display: "flex",
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
          minWidth: "100%",
          minHeight: "50px",
        },
      },
    },
    "& button": {
      backgroundColor: "#373636",
      height: "40px",
      borderRadius: "5px",
      [theme.breakpoints.down("xs")]: {
        height: "40px",
      },
    },
  },
  mainBox: {
    padding: "20px",
  },
  emojiBox: {
    position: "absolute",
    width: "100%",
    zIndex: "100",
    // bottom: "647px",
  },
}));

export default function (props) {
  const auth = useContext(AuthContext);
  const {
    setOpenCommentBox,
    openCommentBox,
    openCommentBoxId,
    listPublicExclusiveHandler,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [reciveOpen, setReciveOpen] = useState(false);
  const location = useLocation();
  const [Idd, setIdd] = useState();
  const [dataList, setDataList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isLoadingEmoji, setIsLoadingEmoji] = React.useState(false);
  const [isSubmit, setIsSubmit] = React.useState(false);

  // console.log("dataList", dataList);
  const handleClose = () => {
    setOpen(false);
    setReciveOpen(false);
  };

  const viewExclusivepostHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url:
          Apiconfigs.viewExclusivepost +
          `${openCommentBoxId ? openCommentBoxId : Idd}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setDataList(res.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      setDataList();
    }
  };
  // let isLike = false;
  // if (auth.userData?._id && dataList) {
  //   const likeUser = dataList?.reactOnPost?.includes()
  //   const likeUser = dataList?.reactOnPost?.map(()=>{
  //     return(
  //       data
  //     )
  //   })
  //   isLike = likeUser?.length > 0;
  // }
  const commentPostHandler = async (event) => {
    event.preventDefault();
    setIsSubmit(true);
    if (message !== "") {
      try {
        const res = await axios({
          method: "POST",
          url: Apiconfigs.commentOnpost,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            postId: dataList._id,
            message: message,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmit(false);
          viewExclusivepostHandler();
          // if (openCommentBoxId ||Idd) {

          // }
          toast.success(res.data.responseMessage);
          setMessage("");
        }
      } catch (error) {
        toast.error(error);
        setIsSubmit(false);
      }
    }
  };

  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }

    if (openCommentBoxId || Idd) {
      viewExclusivepostHandler();
    }
  }, [location.search, openCommentBoxId, Idd]);
  const likesHandler = async (id) => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.reactOnPost + id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        data: {
          postId: id,
        },
        params: {
          emoji: inputStr,
        },
      });
      if (res.data.responseCode === 200) {
        listPublicExclusiveHandler();
        viewExclusivepostHandler();

        toast.success(res.data.responseMessage);
      }
    } catch (error) {}
  };
  const isVideo = dataList?.mediaUrl?.includes(".mp4");
  const [showPicker, setShowPicker] = useState(false);
  const [inputStr, setInputStr] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setInputStr(emojiObject.emoji);
    setShowPicker(false);
    // likesHandler();
    // likesHandler(dataList._id);
  };

  useEffect(() => {
    if (inputStr) {
      likesHandler(dataList._id);
    }
  }, [inputStr]);
  let isLike = false;

  if (auth.userData?._id && dataList) {
    const likeUser = dataList?.reactOnPost?.filter(
      (data) => data.userId === auth.userData?._id
    );
    isLike = likeUser?.length > 0;
  }

  return (
    <Page title="Dashboard">
      <Container maxWidth="fixed">
        {isLoading ? (
          <Box className={classes.commentfullBox}>
            <PageLoading />
          </Box>
        ) : (
          <>
            {dataList !== undefined ? (
              <Box className={classes.commentfullBox}>
                <IconButton
                  aria-label="cancle"
                  onClick={() => {
                    if (openCommentBox) {
                      setOpenCommentBox(false);
                    } else {
                      history.goBack();
                    }
                  }}
                  // component={Link}
                  // to="/explore"
                  className="canelIcon"
                >
                  <MdCancel />
                </IconButton>
                <Grid container spacing={2}>
                  <Grid item sm={12} md={6} lg={8}>
                    <Box className={classes.rightBox}>
                      {isVideo ? (
                        <video
                          width="100%"
                          style={{ cursor: "pointer" }}
                          controls
                        >
                          <source src={dataList.mediaUrl} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={dataList?.mediaUrl}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </Box>
                  </Grid>
                  <Grid item sm={12} md={6} lg={4}>
                    <Box mt={3}>
                      <Box className={classes.mainBox}>
                        <Box mb={3}>
                          <UserProfile dataList={dataList} />
                        </Box>
                        <Box>
                          <Grid container alignItems="center">
                            <Grid item xs={5}>
                              {" "}
                              {dataList?.reactOnPostCount > 0 ? (
                                <Box>
                                  +{dataList?.reactOnPostCount}&nbsp; Likes
                                </Box>
                              ) : (
                                <Box>
                                  {dataList?.reactOnPostCount}&nbsp;Likes
                                </Box>
                              )}
                            </Grid>
                            <Grid item xs={7} align="right">
                              <label>{dataList?.totalComment} Comments</label>{" "}
                              &nbsp; &nbsp; &nbsp; &nbsp;
                              <label>
                                {dataList?.postType === "PUBLIC" && (
                                  <>
                                    {dataList?.amount}&nbsp;
                                    {tokenName}
                                  </>
                                )}{" "}
                              </label>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box className={classes.commentBox} mb={3}>
                          {showPicker && (
                            <Box className={classes.emojiBox}>
                              <Picker onEmojiClick={onEmojiClick} />
                            </Box>
                          )}
                          <Grid container>
                            <Grid item xs={6} align="left">
                              {isLoadingEmoji ? (
                                <ButtonCircularProgress />
                              ) : (
                                <Box>
                                  {isLike ? (
                                    <>
                                      {" "}
                                      {dataList?.reactOnPost
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
                                        <BsEmojiLaughing
                                          className={classes.socialbox}
                                          position="end"
                                          onClick={() =>
                                            setShowPicker((val) => !val)
                                          }
                                        />
                                      </Button>
                                    </>
                                  )}
                                </Box>
                              )}
                            </Grid>
                            <Grid item xs={6} align="center">
                              <Button color="primary" size="large">
                                {" "}
                                <BiCommentDots />
                                Comments
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box className="CommentscrollDiv">
                          {dataList?.comment &&
                            dataList?.comment?.map((data, i) => {
                              return (
                                <CommentBox
                                  key={i}
                                  listPublicExclusiveHandler={
                                    viewExclusivepostHandler
                                  }
                                  data={data}
                                  dataList={dataList}
                                />
                              );
                            })}
                        </Box>
                        <Box className={classes.searchaddress} mt={3}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={2} sm={2}>
                              <Box className="figure">
                                <Box className="profileimage">
                                  <img
                                    src={
                                      auth.userData?.profilePic
                                        ? auth.userData?.profilePic
                                        : "images/user.png"
                                    }
                                    alt="user data"
                                  />
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xs={10} sm={10}>
                              <Box className="figure">
                                <form
                                  onSubmit={(event) =>
                                    commentPostHandler(event)
                                  }
                                >
                                  <Grid container spacing={1}>
                                    <Grid item xs={9} sm={9}>
                                      <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        name="Text Field"
                                        placeholder="Write here..."
                                        type="text"
                                        value={message}
                                        onChange={(e) =>
                                          setMessage(e.target.value)
                                        }
                                        fullWidth
                                        error={isSubmit && message === ""}
                                      />
                                      <FormHelperText error>
                                        {isSubmit && message === "" && (
                                          <Box
                                            ml={1}
                                            style={{ fontSize: "12px" }}
                                          >
                                            Comment is required
                                          </Box>
                                        )}
                                      </FormHelperText>
                                    </Grid>
                                    <Grid item xs={3} sm={3} align="center">
                                      <Button
                                        size="large"
                                        color="primary"
                                        type="submit"
                                        style={{ height: "40px" }}
                                        fullWidth
                                        onClick={commentPostHandler}
                                      >
                                        <SendIcon
                                          style={{ color: "#E31A89" }}
                                        />
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </form>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <NoDataFound />
            )}
          </>
        )}
      </Container>
    </Page>
  );
}
