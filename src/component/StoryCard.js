import React, { useState } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  Link,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreatePostUser from "src/component/CreatePostUser";
import { MdAddToPhotos } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import StoriesPages from "./StoriesPages";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "center",
    "& figure": {
      height: "80px",
      width: "100%",
      maxWidth: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
      borderRadius: "50%",
      justifyContent: "center",
      background: "rgb(40,71,255)",
      background:
        "linear-gradient(102deg, rgba(40,71,255,1) 0%, rgba(243,6,253,1) 80%)",
      padding: "4px",
      margin: "0 auto",
      "& h6": {
        position: "absolute",
        zIndex: 2,
        bottom: "10px",
        left: "10px",
        // width: "100%",
        fontSize: "14px",
        wordBreak: " break-word",
      },
      "&::after": {
        content: "''",
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 31.6%, #000000 100%)",
        width: "100%",
        height: "100%",
        zIndex: 1,
        position: "absolute",
      },
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .addstory": {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "40%",
        textAlign: "center",
        backgroundColor: "#000",
        color: "#fff",
        zIndex: 2,
        "& button": {
          backgroundColor: "#e31a89",
          color: "#fff !important",
          marginTop: "-15px",
          fontSize: "20px",
          marginBottom: "15px",
          "& svg": {
            color: "#fff !important",
          },
        },
      },
    },
  },
  mainmodalBox: {
    "& .formControl": {
      width: "100%",
      backgroundColor: "transparent",
      border: "none",
      color: "#fff",
      "&:focus-visible": {
        outline: "none",
      },
    },
    "& .addphotos": {
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
      padding: "30px 20px",
      border: "1px dashed",
      cursor: "pointer",
      position: "relative",
      "& input": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
      },
      "& svg": {
        fontSize: "30px",
      },
    },
  },
  cancelBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },

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
}));

function StoryCard(props) {
  const { data, storyLists, i } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const [secure_url, setsecure_url] = useState("");
  const [storyType, setstoryType] = useState("");
  const [details, setdetails] = useState("");
  const [openCommentBox, setOpenCommentBox] = React.useState(false);
  const [openCommentBoxId, setOpenCommentBoxId] = React.useState();
  const HandleCommentBox = (data) => {
    setOpenCommentBox(true);
    setOpenCommentBoxId(data);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getBase64 = (file, cb) => {
    // setprofileImageBlob(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {};
  };

  const handleFiles = async (e, file) => {
    var banner = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", banner);
      const res = await axios({
        method: "POST",
        url: ApiConfig.uploadFile,
        data: formData,
      });
      if (res.data.responseCode === 200) {
        setsecure_url(res.data.result.secure_url);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };
  const SubmitAddStory = async () => {
    // setIsUpdatingData(true);
    await axios({
      method: "POST",
      url: ApiConfig.addStory,

      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        storyType: storyType,
        details: details,
        story: [
          secure_url,
          // "https://res.cloudinary.com/dytxy932u/image/upload/v1649999211/myn5ahhaieywymkuo3yf.png",
        ],
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          handleClose();
          // toast.success(response.data.responseMessage);
          // listRuleEventfun();
        } else {
          // toast.success(response.data.responseMessage);
        }
        // setIsUpdatingData(false);
      })
      .catch((error) => {
        // toast.success(error.message);
        // setIsUpdatingData(false);
      });
  };
  // const fileExtention = data?.story[0]?.includes(".").pop();
  // const isvideo = data?..includes(".mp4");

  // const fileType =
  //   fileExtention == "mp4" || fileExtention == "webp"
  //     ? "video"
  //     : fileExtention == "mp3"
  //     ? "audio"
  //     : "image";

  const history = useHistory();
  return (
    <>
      <Paper className={classes.root} elevation={0} style={{}}>
        <Link
          style={{ textDecoration: "none", color: "#fff", cursor: "pointer" }}
          onClick={() => HandleCommentBox(data?._id)}
          // onClick={() =>
          //   history.push({
          //     pathname: "/stories",
          //     search: data?._id,
          //     state: { storyLists: storyLists, i },
          //   })
          // }
        >
          <figure>
            {" "}
            <img
              src={data?.profilePic ? data?.profilePic : "images/add.png"}
              alt=""
            />
            {/* {data.addstory ? (
            <Box className="addstory">
              <IconButton onClick={handleClickOpen}>
                <img src="images/add.png" alt="" />
              </IconButton>
              <Typography variant="body2">Add Story</Typography>
            </Box>
          ) : (
            ""
          )} */}
          </figure>
          {/* {data?.userName ? ( */}
            <Typography variant="h6">{data?.userName?data?.userName:data?.name}</Typography>
          {/* // ) : (
          //   ""
          // )} */}
        </Link>
        <Dialog
          open={openCommentBox}
          onClose={() => setOpenCommentBox(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullScreen
        >
          <StoriesPages
            // listPublicExclusiveHandler={listPublicExclusiveHandler}
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
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">{"Create post"}</DialogTitle>
          <DialogContent>
            <IconButton className={classes.cancelBtn} onClick={handleClose}>
              <MdCancel />
            </IconButton>
            <Box className={classes.mainmodalBox}>
              <Box mb={2}>
                {/* <CreatePostUser /> */}
                <Box className={classes.UserBox}>
                  <figure>
                    <img src="images/user.png" alt="" />
                  </figure>
                  <Box>
                    <Typography variant="h6">Umair Siddiqui</Typography>
                    <select onChange={(e) => setstoryType(e.target.value)}>
                      <option value={"PUBLIC"}>Public</option>
                      <option value={"PRIVATE"}>Private</option>
                    </select>
                  </Box>
                </Box>
              </Box>
              <textarea
                className="formControl"
                // rows={3}
                placeholder="Write here..."
                onChange={(e) => setdetails(e.target.value)}
              ></textarea>
              <Box mt={2} className="addphotos">
                <input
                  type="file"
                  maxLength={1}
                  // onChange={(e) => handleFiles(e)}
                  onChange={(e, files) => {
                    // HandleSubmit1(e.target.files[0]);
                    handleFiles(e);
                    // setprofileImageBlob(e.target.files[0]);
                    getBase64(e.target.files[0], (result) => {
                      setBannerImage(result);
                    });
                  }}
                />
                {!bannerImage ? (
                  <>
                    <Box>
                      <MdAddToPhotos />
                      <Typography variant="h5">Add photos/videos</Typography>
                      <small>or drag and drop</small>
                    </Box>
                  </>
                ) : (
                  <Box>
                    <img
                      src={bannerImage}
                      alt=""
                      // style={{ maxheight: "200px" }}
                    />
                  </Box>
                )}
              </Box>
              <Box mt={3} mb={2}>
                <Button
                  variant="contained"
                  fullWidth
                  color="secondary"
                  onClick={SubmitAddStory}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
}

export default StoryCard;
