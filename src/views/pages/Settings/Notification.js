import React, { useContext, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import { MdFavorite } from "react-icons/md";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import { BsFileX, BsFillChatFill } from "react-icons/bs";
import {
  MdAlternateEmail,
  MdChromeReaderMode,
  MdCollectionsBookmark,
} from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { MdOutlineEventAvailable } from "react-icons/md";
import { AuthContext } from "src/context/Auth";
import Axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { RiChatFollowUpLine } from "react-icons/ri";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .likeicons": {
      display: "flex",
      justifyContent: "left",
      alignItems: "center",
      "& p": {
        marginLeft: "5px",
      },
    },
  },
}));

function Notification() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [state, setState] = React.useState({
    like: true,
    comment: true,
    mention: true,
    post: true,
    share: true,
    follow: true,
    event: true,
    subsriber: true,
    collection: true,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setIsUpdated(true);
  };

  useEffect(() => {
    const cancelTokenSource = Axios.CancelToken.source();
    if (isUpdated) {
      updateNotificationHanlder(cancelTokenSource);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [state]);

  const updateNotificationHanlder = async (cancelTokenSource) => {
    try {
      const res = await Axios.put(
        Apiconfigs.notificationUpdate,
        {
          like: state.like.toString(),
          comment: state.comment.toString(),
          mention: state.mention.toString(),
          post: state.post.toString(),
          share: state.share.toString(),
          follow: state.follow.toString(),
          event: state.event.toString(),
        },
        {
          cancelToken: cancelTokenSource && cancelTokenSource.token,

          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (auth?.userData?.notifications) {
      setState({
        ...state,
        like: auth?.userData?.notifications?.like,
        comment: auth?.userData?.notifications?.comment,
        mention: auth?.userData?.notifications?.mention,
        post: auth?.userData?.notifications?.post,
        share: auth?.userData?.notifications?.share,
        follow: auth?.userData?.notifications?.follow,
        event: auth?.userData?.notifications?.event,
      });
    }
  }, [auth?.userData?.notifications]);

  useEffect(() => {
    return () => {
      auth.handleUserProfileApi();
    };
  }, []);

  return (
    <>
      <Box className={classes.root}>
        <Box>
          <Typography variant='h3' color='primary.main'>
            Notification
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography variant='h5' color='primary.main'>
            what notification you recieve
          </Typography>
        </Box>
        <Box mt={3}>
          <Grid container spacing={1} alignItems='center'>
            <Grid item xs={8} sm={5}>
              <Box className='likeicons'>
                <IconButton style={{ backgroundColor: "#FFF" }}>
                  <MdFavorite style={{ color: "blue" }} />{" "}
                </IconButton>
                <Box ml={3}>
                  <Typography variant='body2' color='primary.main'>
                    Like
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.like}
                    onChange={handleChange}
                    name='like'
                  />
                }
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <Box className='likeicons' mt={2}>
                <IconButton style={{ backgroundColor: "#FFF" }}>
                  <BsFillChatFill style={{ color: "green" }} />{" "}
                </IconButton>
                <Box ml={3}>
                  <Typography variant='body2' color='primary.main'>
                    Comment
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.comment}
                    onChange={handleChange}
                    name='comment'
                  />
                }
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <Box className='likeicons' mt={2}>
                <IconButton style={{ backgroundColor: "#FFF" }}>
                  <MdAlternateEmail style={{ color: "brown" }} />{" "}
                </IconButton>
                <Box ml={3}>
                  <Typography variant='body2' color='primary.main'>
                    Mention
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.mention}
                    onChange={handleChange}
                    name='mention'
                  />
                }
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <Box className='likeicons' mt={2}>
                <IconButton style={{ backgroundColor: "#FFF" }}>
                  <MdChromeReaderMode style={{ color: "brown" }} />{" "}
                </IconButton>
                <Box ml={3}>
                  <Typography variant='body2' color='primary.main'>
                    Post
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.post}
                    onChange={handleChange}
                    name='post'
                  />
                }
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <Box className='likeicons' mt={2}>
                <IconButton style={{ backgroundColor: "#FFF" }}>
                  <FaShareAlt style={{ color: "black" }} />{" "}
                </IconButton>
                <Box ml={3}>
                  <Typography variant='body2' color='primary.main'>
                    Share
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.share}
                    onChange={handleChange}
                    name='share'
                  />
                }
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <Box className='likeicons' mt={2}>
                <IconButton style={{ backgroundColor: "#FFF" }}>
                  <RiUserFollowFill style={{ color: "blue" }} />{" "}
                </IconButton>
                <Box ml={3}>
                  <Typography variant='body2' color='primary.main'>
                    Follow
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.follow}
                    onChange={handleChange}
                    name='follow'
                  />
                }
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <Box className='likeicons' mt={2}>
                <IconButton style={{ backgroundColor: "#FFF" }}>
                  <MdOutlineEventAvailable style={{ color: "purple" }} />{" "}
                </IconButton>
                <Box ml={3}>
                  <Typography variant='body2' color='primary.main'>
                    Event
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.event}
                    onChange={handleChange}
                    name='event'
                  />
                }
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <Box className='likeicons' mt={2}>
                <IconButton style={{ backgroundColor: "#FFF" }}>
                  <MdCollectionsBookmark style={{ color: "#e31a89" }} />{" "}
                </IconButton>
                <Box ml={3}>
                  <Typography variant='body2' color='primary.main'>
                    Collection
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.collection}
                    onChange={handleChange}
                    name='collection'
                  />
                }
              />
            </Grid>
            <Grid item xs={8} sm={5}>
              <Box className='likeicons' mt={2}>
                <IconButton style={{ backgroundColor: "#FFF" }}>
                  <RiChatFollowUpLine style={{ color: "brown" }} />{" "}
                </IconButton>
                <Box ml={3}>
                  <Typography variant='body2' color='primary.main'>
                    Subscriber
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={7}>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.subsriber}
                    onChange={handleChange}
                    name='subsriber'
                  />
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Notification;
