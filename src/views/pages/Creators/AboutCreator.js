import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
} from "@material-ui/core";
import Page from "src/component/Page";
import { useHistory, useLocation } from "react-router-dom";
import Bundles1 from "../Bundles/Bundles1";
import axios from "axios";
import { toast } from "react-toastify";
import Particularusertransactionhistory from "../Admin/Particularusertransactionhistory";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { MdOutlineCollections } from "react-icons/md";
import BundlesDetailCard from "src/component/BundlesDetailCard";
import { Pagination } from "@material-ui/lab";
import MyPost from "src/component/MyPost";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { BiCopy } from "react-icons/bi";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { sortAddress } from "src/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .heading": {
      padding: "20px",
    },
    "& .username": {
      marginTop: "26px",
      marginLeft: "182px",
    },
    "& .postImg": {
      height: "260px",
      overflow: "hidden",
      position: "relative",
      background: "rgba(0,0,0,0.7)",
      margin: "0 auto",
      backgroundSize: "100% !important",
      backgroundRepeat: "no-repeat !important",
      backgroundPosition: "center !important",
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
    "& .userProfile": {
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      marginTop: "-20px",
      padding: "0 20px",
      "& figure": {
        borderRadius: "50%",
        border: "2px solid #f1f1f1",
        maxWidth: "150px",
        width: "100%",
        // height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0 auto 13px",
      },
      "& .user": {
        position: "absolute",
        "& img": {
          width: "100%",
        },
      },
      // "& .user": {
      //   position: "absolute",
      //   "& img": {
      //     width: "100%",
      //   },
      // },
    },
    "& .textbox": {
      padding: "10px 15px",
      textAlign: "center",
    },
    "& .btnbox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px 0px",
      "& Button": {
        margin: "0px 8px",
      },
    },
    "& .cards": {
      padding: "25px",
      [theme.breakpoints.down("xs")]: {
        padding: "10px",
      },
    },
  },

  TabButtonsBox: {
    borderTop: "0.5px solid gray",
    marginBottom: "29px",
    textAlign: "center",
    "& button": {
      color: "#9E9E9E",
      fontSize: "16px",
      borderBottom: "2px solid transparent",
      borderRadius: 0,
      "&.active": {
        color: "#fff",
        borderTop: "1px solid #fff",
        marginTop: "-1px",
      },
    },
  },
  profileDetails: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    marginTop: "-20px",
  },
  unfollow: {
    marginRight: "8px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "5px",
      padding: "6px 6px !important",
      marginRight: "4px",
    },
  },
  btnbox: {
    fontSize: "10px !important",
    padding: "6px 10px !important",
    [theme.breakpoints.down("xs")]: {
      fontSize: "5px !important",
    },
  },
}));

function AboutCreator({ data }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [donate, setDonate] = useState(false);
  const [tabview, setTabView] = useState("collection");
  const [userId, setUserId] = useState();
  const [otherUserData, setOtherUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setisFollowing] = useState(false);
  const [isBlocking, setisBlocking] = useState();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [loader, setLoader] = useState(false);
  const [idd, setIDD1] = React.useState(false);
  const [blocklist, setBlockList] = React.useState();
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [setPostLists] = useState([]);
  const handleClickOpen = (data) => {
    setOpen(true);
    setIDD1(data?.otherUserData?._id);
  };
  const handleClickOpen1 = (data) => {
    setOpen1(true);
    setIDD1(data?.otherUserData?._id);
  };
  const viewOtherProfileHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.getOtheruserprofile + userId,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setOtherUserData(res.data.result);
        let followersList = res?.data?.result?.followers;
        if (followersList) {
          const filterFun = followersList.filter((data) => {
            return data === auth?.userData?._id;
          });
          if (filterFun[0]) {
            setisFollowing(true);
          } else {
            setisFollowing(false);
          }
        }
      } else {
        setOtherUserData();
      }
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (userId) {
      viewOtherProfileHandler();
    }
    let blockList = auth?.userData?.blockedUser;

    if (blockList) {
      const filterFun = blockList.filter((data) => {
        return data === otherUserData?._id;
      });
      if (filterFun[0]) {
        setisBlocking(true);
      } else {
        setisBlocking(false);
      }
    }
  }, [userId, auth?.userData?._id, auth?.userData?.blockedUser]);

  useEffect(() => {
    const creatorId = location.search.split("?");
    if (creatorId[1]) {
      setUserId(creatorId[1]);
    }
  }, [location.search]);

  const followUnfollowHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.followUnfollowUser + userId,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);

        toast.success(res.data.responseMessage);
        viewOtherProfileHandler();
      } else {
        setIsLoading(false);

        toast.error(res.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.responseMessage);
    }
  };

  const blockuser = async (id) => {
    // setLoader(true)
    axios({
      method: "POST",
      url: Apiconfigs.userBlockUnblock,
      data: {
        _id: userId,
      },
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setLoader(false);
        if (res.data.responseCode === 200) {
          history.goBack();
          // onClick={() => history.goBack()}
          // if (viewOtherProfileHandler) {
          //   viewOtherProfileHandler();
          // }
          setBlockList(res.data.result);
          if (auth?.handleUserProfileApi()) {
            auth.handleUserProfileApi();
          }
          toast.success(res.data.responseMessage);
          setOpen(false);
          setLoader(false);

          if (res.data.result.docs) {
            toast.success(res.response_message);
            setLoader(false);
          }
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };
  const blockuserAdim = async () => {
    axios({
      method: "POST",
      url: Apiconfigs.userBlockUnblockAdmin,
      data: {
        _id: userId,
      },
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.responseCode === 200) {
          history.push("/admin");
          //   if (adminUserListHandler) {
          //     adminUserListHandler();
          //   }
          toast.success(res.data.responseMessage);
          setOpen1(false);
          //   setloader2(false);

          if (res.data.result.docs) {
            toast.success(res.response_message);
            // setloader2(false);
          }
        }
      })
      .catch(() => {
        // setloader2(false);
      });
  };
  const listUserWithpostHanlder = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listUserWithpost,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          userId: userId,
          page: page,
        },
      });
      if (res.data.responseCode === 200) {
        setPostList(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);
    }
  };
  const listUserWithpostHanldersnft = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.postListWithUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          userId: userId,
          page: page,
        },
      });
      if (res.data.responseCode === 200) {
        setPostLists(res.data.result.docs);
      }
      setIsLoadingData(false);
    } catch (error) {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (userId) {
      listUserWithpostHanlder();
      listUserWithpostHanldersnft();
    }
  }, [userId, auth?.userData?._id, page]);
  const [tagPostList] = useState([]);

  return (
    <>
      {" "}
      {isLoadingData ? (
        <DataLoading />
      ) : (
        <Page title="About Creators">
          {otherUserData ? (
            <Paper className={classes.root} elevation={2}>
              <Box className="heading">
                <Typography variant="h3">About the Creator</Typography>
              </Box>
              <Box className="imagebox">
                <figure className="postImg">
                  <img
                    src={
                      otherUserData?.coverPic
                        ? otherUserData?.coverPic
                        : "images/userback.png"
                    }
                    ali="Creators Image"
                  />
                </figure>
                <Box className="userProfile">
                  <figure
                    style={{
                      width: "133px",
                      height: "130px",
                      overflow: "hidden",
                    }}
                    className="user"
                  >
                    <img
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                      src={
                        otherUserData?.profilePic
                          ? otherUserData?.profilePic
                          : "/images/user.png"
                      }
                    />
                  </figure>
                  <Typography variant="body1">hjhvj</Typography>
                </Box>
              </Box>
              <Box className={classes.profileDetails}>
                <Box className="username">
                  <Typography color="primary.main" variant="h3">
                    {otherUserData?.userName
                      ? otherUserData?.userName
                      : otherUserData?.name}
                  </Typography>
                  <Typography variant="body2" color="primary.main">
                    {otherUserData?.bio}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  >
                    {sortAddress(otherUserData?.bnbAccount?.address)}
                    <CopyToClipboard text={otherUserData?.bnbAccount?.address}>
                      <BiCopy
                        style={{
                          color: "#fff",
                          fontSize: " 14px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => toast.info("Copied successfully")}
                      />
                    </CopyToClipboard>{" "}
                    &nbsp;
                  </Typography>
                  {otherUserData?._id !== auth?.userData?._id && (
                    <Box mt={1}>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={followUnfollowHandler}
                        className={classes.unfollow}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                        {isLoading && <ButtonCircularProgress />}
                      </Button>

                      {isBlocking === false && (
                        <>
                          {auth?.userData?.userType === "Admin" ? (
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => handleClickOpen1(data)}
                              className={classes.unfollow}
                            >
                              {isBlocking === false ? "Block" : "Blocked"}
                            </Button>
                          ) : (
                            ""
                            // <Button
                            //   variant="contained"
                            //   color="primary"
                            //   size="large"
                            //   onClick={() => handleClickOpen(data)}
                            //   className={classes.unfollow}
                            // >
                            //   {isBlocking === false && "Block"}
                            // </Button>
                          )}
                        </>
                      )}
                      {isBlocking && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          // onClick={() => handleClickOpen(data)}
                          className={classes.unfollow}
                        >
                          {isBlocking && "Blocked"}
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.unfollow}
                        onClick={() =>
                          history.push({
                            pathname: "chat-history",
                            search: otherUserData?._id,
                          })
                        }
                      >
                        Chat
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
              <Box className="cards" mt={4}>
                <Box className={classes.TabButtonsBox}>
                  <Button
                    className={tabview === "collection" ? "active" : ""}
                    onClick={() => setTabView("collection")}
                  >
                    <MdOutlineCollections style={{ marginRight: "5px" }} />
                    Collection
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button
                    className={tabview === "nft" ? "active" : ""}
                    onClick={() => setTabView("nft")}
                  >
                    <BsFillFileEarmarkPostFill style={{ marginRight: "5px" }} />
                    Post
                  </Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {auth?.userData?.userType === "Admin" ||
                  (auth?.userData?.userType === "Subadmin" &&
                    auth.userData.permissions.userManagement) ? (
                    <>
                      <Button
                        className={tabview === "transaction" ? "active" : ""}
                        onClick={() => setTabView("transaction")}
                      >
                        <BsFillFileEarmarkPostFill
                          style={{ marginRight: "5px" }}
                        />
                        Transaction History
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {/* <Button
                        className={tabview === "auction" ? "active" : ""}
                        onClick={() => setTabView("auction")}
                      >
                        <BsFillFileEarmarkPostFill
                          style={{ marginRight: "5px" }}
                        />
                        Auction List
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button
                        className={tabview === "activity" ? "active" : ""}
                        onClick={() => setTabView("activity")}
                      >
                        <BsFillFileEarmarkPostFill
                          style={{ marginRight: "5px" }}
                        />
                        Activity Log
                      </Button> */}
                    </>
                  ) : (
                    ""
                  )}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {/* <Button
                    className={tabview === "tagPost" ? "active" : ""}
                    onClick={() => setTabView("tagPost")}
                  >
                    <BsFillFileEarmarkPostFill style={{ marginRight: "5px" }} />
                    Tag Post
                  </Button> */}
                </Box>
                {tabview === "collection" && (
                  <Box mt={3}>
                    <Bundles1
                      collectionListBundle={viewOtherProfileHandler}
                      viewOtherProfileHandler={otherUserData}
                    />
                  </Box>
                )}

                {tabview === "transaction" && (
                  <Box mt={3}>
                    <Particularusertransactionhistory
                      type="card"
                      userId={userId}
                    />
                  </Box>
                )}
                {tabview === "activity" && (
                  <Box mt={3}>
                    <Bundles1
                      collectionListBundle={viewOtherProfileHandler}
                      viewOtherProfileHandler={otherUserData}
                    />
                  </Box>
                )}
                {tabview === "auction" && (
                  <Box mt={3}>
                    <Bundles1
                      collectionListBundle={viewOtherProfileHandler}
                      viewOtherProfileHandler={otherUserData}
                    />
                  </Box>
                )}
                {tabview === "nft" && (
                  <Box mt={3}>
                    <Typography variant="h3" style={{ marginBottom: "30px" }}>
                      {" "}
                      Post
                    </Typography>

                    <Grid container spacing={2}>
                      {postList && postList?.length > 0 ? (
                        <>
                          {postList &&
                            postList?.map((data, i) => {
                              return (
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                  <BundlesDetailCard
                                    listPublicExclusiveHandler={
                                      listUserWithpostHanlder
                                    }
                                    type="card"
                                    data={data}
                                    key={i}
                                    index={i}
                                  />
                                </Grid>
                              );
                            })}
                        </>
                      ) : (
                        <NoDataFound />
                      )}
                    </Grid>
                    {postList && postList.length >= 10 && (
                      <Box mt={2} display="flex" justifyContent="center">
                        <Pagination
                          count={noOfPages}
                          page={page}
                          onChange={(e, v) => setPage(v)}
                        />
                      </Box>
                    )}
                  </Box>
                )}
                {tabview === "tagPost" && (
                  <Box mt={3}>
                    <Typography variant="h3"> Tag Post</Typography>

                    <Grid container spacing={2}>
                      {tagPostList && tagPostList?.length > 0 ? (
                        <>
                          {tagPostList &&
                            tagPostList?.map((data, index) => {
                              return (
                                <Grid item xs={12} sm={6} md={4} lg={4}>
                                  <MyPost
                                    data={data}
                                    type="card"
                                    index={index}
                                    // listPublicExclusiveHandler={
                                    //   listTagPostHandler
                                    // }
                                  />
                                </Grid>
                              );
                            })}
                        </>
                      ) : (
                        <NoDataFound />
                      )}
                    </Grid>
                    {postList && postList.length >= 10 && (
                      <Box mt={2} display="flex" justifyContent="center">
                        <Pagination
                          count={noOfPages}
                          page={page}
                          onChange={(e, v) => setPage(v)}
                        />
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Paper>
          ) : (
            <NoDataFound />
          )}
          <Dialog
            onClose={() => setOpen(false)}
            // onClose={() => setOpen(false)}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <Box mb={2}>
              {`Are you sure you want to ${
                isBlocking ? "Unblock" : "Block"
              } this user?`}
            </Box>

            <Box style={{ display: "flex", justifyContent: "center" }} mt={2}>
              <Button
                className={classes.btnbox}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              &nbsp;&nbsp;
              <Button
                className={classes.btnbox}
                variant="contained"
                onClick={() => blockuser()}
                color="secondary"
              >
                Yes
              </Button>
            </Box>
          </Dialog>
          <Dialog
            onClose={() => setOpen1(false)}
            // onClose={() => setOpen(false)}
            aria-labelledby="customized-dialog-title"
            open={open1}
          >
            <Box mb={2}>
              {`Are you sure you want to ${
                isBlocking ? "Unblock" : "Block"
              } this user?`}
            </Box>

            <Box style={{ display: "flex", justifyContent: "center" }} mt={2}>
              <Button
                className={classes.btnbox}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => setOpen1(false)}
              >
                Cancel
              </Button>
              &nbsp;&nbsp;
              <Button
                className={classes.btnbox}
                variant="contained"
                onClick={() => blockuserAdim()}
                color="secondary"
              >
                Yes
              </Button>
            </Box>
          </Dialog>
          <Dialog
            onClose={() => setDonate(false)}
            // onClose={() => setOpen(false)}
            aria-labelledby="customized-dialog-title"
            open={donate}
          >
            <Box mb={2} style={{ height: "250px", overflow: "hidden" }}>
              <img
                src="images/bundles/Bundles1.png"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
            <Grid container>
              <Grid item lg={6} sm={6} md={6} xs={12}>
                <Box style={{ display: "flex" }}>
                  <img src="images/User1.png" />

                  <Typography
                    variant="h6"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "10px",
                    }}
                  >
                    Zunda Mochi
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                lg={6}
                sm={6}
                md={6}
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <Box style={{ display: "flex" }}>
                  <Typography>Bundles Price:</Typography>&nbsp;
                  <Typography>0.004</Typography>
                </Box>
              </Grid>
            </Grid>
            &nbsp;
            <Box style={{ display: "flex" }} mb={2}>
              <Typography>Duration: </Typography>&nbsp;
              <Typography>60 days</Typography>
            </Box>
            <Typography variant="h6">Details:</Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor
              donec in dictumst luctus ipsum tempor. Id duis quisque dolor
              vestibulum elit hendrerit ut lobortis. In tempus sapien volutpat
              enim ac. Et sit quisque accumsan amet eget in in.s
            </Typography>
            <Box style={{ display: "flex", justifyContent: "center" }} mt={2}>
              <Box mr={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => setDonate(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Dialog>
        </Page>
      )}
    </>
  );
}

export default AboutCreator;
