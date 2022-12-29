import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Avatar,
  FormHelperText,
  Link,
  Select,
} from "@material-ui/core";
// import { MdVideoCameraFront } from "react-icons/md";
import { MdPhoto, MdCancel, MdAddToPhotos } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import reactStringReplace from "react-string-replace";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreatePostUser from "src/component/CreatePostUser";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import axios from "axios";
import Slider from "react-slick";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ReactHashtag from "react-hashtag";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
// import ReactVideoTrimmer from "react-video-trimmer";
// import "react-video-trimmer/dist/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .headingBox": {
      padding: "10px 0px",
      "& h6": {
        fontSize: "16px",
        fontWeight: "600",
        color: "#FFFFFF",
      },
    },
    padding: "15px 25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& .base": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "15px",
      "& button": {
        fontSize: "14px",
        [theme.breakpoints.down("xs")]: {
          fontSize: "12px",
        },
        "& svg": {
          color: "#e31a89",
          marginRight: "10px",
          [theme.breakpoints.down("xs")]: {
            fontSize: "25px",
          },
        },
      },
    },
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
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "60px",
      },
    },
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
  hash: {
    "& span": {
      color: "#E31A89",
      cursor: "pointer",
    },
  },
  addphotosCollection: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    padding: "30px 20px",
    border: "0.25px solid #525455",
    borderRadius: "14px",
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
  cancelBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  publicbox: {},
}));

function Collection({ listPublicExclusiveHandler }) {
  const auth = useContext(AuthContext);
  const { userData } = auth;
  const currencies = [
    {
      value: "PUBLIC",
      label: "PUBLIC",
    },
    {
      value: "PRIVATE",
      label: "PRIVATE",
    },
  ];
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [isValidTitle, setIsValidTitle] = useState(true)
  const [activities, setActivities] = useState("PUBLIC");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setimage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [openAddBundle, setOpenAddBundle] = useState(false);
  const [isDurationLess, setIsDurationLess] = useState(false);
  const [imageurl, setimageurl] = useState("");
  const [imageCollection, setimageCollection] = useState("");
  const [coverCollection, setcoverCollection] = useState("");
  const [process, setprocess] = useState(false);
  const [coverPost, setcoverPost] = useState("");
  const [titlePost, setTitlePost] = useState("");

  const [message, setmessage] = useState("");
  const [duration, setDuration] = useState("7");

  const [searchUserList, setSearchUserList] = useState([]);
  const [isSubmit1, setIsSubmit1] = useState();
  const [collectionlistAll, setCollectionlist] = useState([]);
  const [list, setlist] = useState("");
  const [searchedTag, setSearchedTag] = useState("");
  const [hashtagData, setHashtagData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState();
  const [errorMessageresend, setErrorMesageResend] = useState();
  const [collectionIdData, setCollection] = useState();
  const [selectedHashTagName, setSelectedHashTagName] = useState("");
  const [startPosition, setStartPosition] = useState(false);
  const [royality, setRoyality] = useState("");
  const [textImage, setTextImage] = useState();

  const [formValueCollection, setFormValueCollection] = useState({
    image: "",
    name: "",
    title: "",
    details: "",
    donation: "",
    duration: "",
  });



  const textToImage = require("text-to-image");


  const teatdataHandler = async () => {
    const text = document.getElementById("titlePost").value;



    const dataUri = textToImage.generateSync(text, {
      fontFamily: "Montserrat, sans-serif",
      bgColor: "#E31A89",
      textColor: "white",
      fontSize: 22,
      customHeight: 1080,
      width: 1080,
      maxWidth: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      verticalAlign: "center"
    });
    setTextImage(dataUri);

  };
  useEffect(() => {
    if (titlePost != "") teatdataHandler();
  }, [titlePost]);

  const videoEl = useRef(null);

  const checkVideoSize = () => {

    const video = videoEl.current;
    if (!video) return;
    console.log(`The video is ${video.duration} seconds long.`, video.duration);
    let durations = Number(video.duration) > 180

    setIsDurationLess(Number(video.duration) > 180)
  }
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) { };
  };
  const handleClickOpen = () => {
    setOpen(true);
    collectionList();
  };

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValueCollection, [name]: value };
    setFormValueCollection(temp);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const collectionList = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.myCollectionList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (response.data.responseCode === 200) {
        setCollectionlist(response.data.result.docs);
      }
    } catch (error) { }
  };
  useEffect(() => {
    collectionList();
  }, []);

  const creatorListHandler = async () => {
    try {
      const res = await axios.get(
        ApiConfig.listFollowingUser,

        {
          headers: {
            token: window.localStorage.getItem("token"),
          },
        }
      );

      if (res.data.responseCode === 200) {
        if (res.data.result) {
          setSearchUserList(
            res.data.result.following.filter((data) => data !== null)
          );
        }
      } else {
        setSearchUserList([]);
      }
    } catch (error) {
      setSearchUserList([]);
    }
  };

  useEffect(() => {
    creatorListHandler();
  }, []);

  const createBundleHandle = async (event) => {
    event.preventDefault();
    console.log("dfajsgdfjs");

    setIsSubmit(true);
    const selectuser = selectedTeam?.map((data, i) => data._id);

    if (activities === "PRIVATE") {
      if (
        activities !== "" &&
        description !== "" &&
        titlePost !== "" &&
        list !== "" &&
        amount !== "" &&
        Number(amount) > 0 &&
        titlePost.length <= 280 &&
        Number(amount) <= 2000 &&

        collectionlistAll.length !== 0
      ) {
        const hastag = description.match(/#[a-z\d]+/gi);


        setLoader(true);
        axios({
          method: "POST",
          url: ApiConfig.createPost,
          data: {
            postType: activities,
            details: description,
            mediaUrl: coverPost ? coverPost : textImage,
            postTitle: titlePost,
            collectionId: list,
            amount: amount,
            tag: selectuser,
            royality: royality,
            hashTagName: hastag ? hastag : [],
            mediaType: coverPost ? "MEDIA" : "TEXT",
          },
          headers: {
            token: localStorage.getItem("token"),
          },
        })
          .then(async (res) => {
            setLoader(false);
            if (res.data.responseCode === 200) {
              setIsSubmit(false);
              listPublicExclusiveHandler();
              setActivities("");
              setDescription("");
              setTitlePost("");
              setcoverPost("");
              setlist("");
              setimageurl("");
              setimage("");
              setAmount("");
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
            toast.error("Something went wrong. please try again later");
            setOpen(false);
            setLoader(false);
          });
      }
    } else {
      if (
        activities !== "" &&
        description !== "" &&
        titlePost !== "" &&
        list !== "" &&
        amount !== "" &&
        Number(amount) > 0 &&
        titlePost.length <= 280 &&
        Number(amount) <= 2000 &&

        collectionlistAll.length !== 0
      ) {
        const hastag = description.match(/#[a-z\d]+/gi);


        setLoader(true);
        axios({
          method: "POST",
          url: ApiConfig.createPost,
          data: {
            postType: activities,
            details: description,
            mediaUrl: coverPost ? coverPost : textImage,
            postTitle: titlePost,
            collectionId: list,
            amount: amount,
            tag: selectuser,
            royality: royality,
            hashTagName: hastag ? hastag : [],
            mediaType: coverPost ? "MEDIA" : "TEXT",
          },
          headers: {
            token: localStorage.getItem("token"),
          },
        })
          .then(async (res) => {
            setLoader(false);
            if (res.data.responseCode === 200) {
              setIsSubmit(false);
              listPublicExclusiveHandler();
              setActivities("");
              setDescription("");
              setTitlePost("");
              setcoverPost("");
              setlist("");
              setimageurl("");
              setimage("");
              setAmount("");
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
            toast.error("Something went wrong. please try again later");
            setOpen(false);
            setLoader(false);
          });
      }
    }
  };

  const feelistHandler = async () => {
    // setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.feeList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (response.data.responseCode === 200) {
        setCollection(
          response.data.result.filter((data) => data?.type === "COLLECTION")
        );
        // setIsLoading(false);
      }
    } catch (error) {
      // setIsLoading(false);
    }
  };

  const post = async (event) => {
    event.preventDefault();

    // if (auth?.userData?.bnbBalace > 0) {
    //   setIsSubmit1(true);

    if (
      coverCollection !== "" &&
      formValueCollection.title !== "" &&
      formValueCollection.title.length < 60 &&
      formValueCollection.details !== "" &&
      Number(formValueCollection.donation) > 0 &&
      formValueCollection.details.length < 200 &&
      parseFloat(formValueCollection.donation) > 0 &&
      parseFloat(formValueCollection.donation) < 2000
    ) {
      try {
        setmessage("Creating Collection...");
        setprocess(true);
        const formData = new FormData();
        formData.append("image", coverCollection);
        formData.append("title", formValueCollection.title);
        formData.append("duration", duration);
        // formData.append("bundleName", name);
        formData.append("description", formValueCollection.details);
        formData.append("amount", formValueCollection.donation);
        formData.append("tag", formValueCollection.donation);

        axios
          .request({
            method: "POST",
            url: ApiConfig.addNft,
            data: {
              image: coverCollection,
              title: formValueCollection.title,
              duration: duration,
              description: formValueCollection.details,
              amount: formValueCollection.donation,
            },
            // data: formData,
            headers: {
              token: window.localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.data.responseCode === 200) {
              // if (callbackFun) {
              //   callbackFun();
              // }
              setOpenAddBundle(false);
              collectionList();
              // user.updateUserData();
              setOpen(false);
              setprocess(false);
              toast.success("Collection created");
              // handleClose();
            } else {
              setprocess(false);
              toast.error("error");
            }
          })

          .catch((err) => {
            setprocess(false);
            toast.error(err?.response?.data?.responseMessage);

            // toast.error("error");
          });
      } catch { }
    }
    // } else {
    //   setTimeout(() => {
    //     setErrorMesageResend(""); // count is 0 here
    //   }, 5000);
    //   setErrorMesageResend("Insufficient balance");
    //   // toast.info("Insufficient balance");
    // }
  };

  const updateSelectedBundle = (data) => {
    setlist(data);
  };

  const hashtagHandler = async (hashtagSearchParam) => {
    setSearchedTag(hashtagSearchParam);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.HashTagSearchWithList,
        // headers: {
        //   token: window.localStorage.getItem("token"),
        // },
        params: {
          search: hashtagSearchParam ? hashtagSearchParam : null,
        },
      });
      if (res.data.responseCode === 200) {
        setHashtagData(res.data.result.docs);
      }
    } catch (error) {
      setHashtagData([]);
    }
  };

  useEffect(() => {
    feelistHandler();
    let localDescription = description;
    var myElement = document.getElementById("text-element");
    if (myElement && localDescription.length > 0) {
      var startPosition = myElement.selectionStart;
      if (startPosition == myElement.value.length) {
        // if get hashtag at end of the string

        const hashList = localDescription.match(/#[a-z\d]+/gi);
        const lastIndexOfSpace = localDescription.lastIndexOf(" ");
        setStartPosition(lastIndexOfSpace);

        if (hashList && hashList.length > 0) {
          const item = hashList[hashList.length - 1];
          if (selectedHashTagName == "") {
            hashtagHandler(item);
          } else {
          }
        }
      } else {
        // if get hashtag anywere in th string

        // get substing from start postion to current curser
        const descriptionTrim = localDescription.slice(0, startPosition);

        const lastIndexSpace = descriptionTrim.lastIndexOf(" ");
        const lastIndexOfSpace = lastIndexSpace >= 0 ? lastIndexSpace : 0;

        setStartPosition(lastIndexOfSpace);

        const descriptionTrimlast = localDescription.slice(
          lastIndexOfSpace,
          myElement.value.length
        );

        const hashList = descriptionTrimlast.match(/#[a-z\d]+/gi);

        if (hashList && hashList.length > 0) {
          const item = hashList[0];
          if (selectedHashTagName == "") {
            hashtagHandler(item);
          } else {
          }
        }
      }
    } else {
      setDescription("");
    }
  }, [description, selectedHashTagName]);
  // console.log(
  //   "********************************************************titlePost.length----------------",
  //   titlePost.length
  // );
  useEffect(() => {
    // to update and replace tag
    if (searchedTag != "" && selectedHashTagName != "") {
      let localDescription = description.replaceAt(
        startPosition == 0 ? startPosition : startPosition + 1,
        searchedTag.length,
        selectedHashTagName
      );

      setDescription(localDescription);
      setSearchedTag("");
      setSelectedHashTagName("");
      setHashtagData([]);
    }
  }, [searchedTag, selectedHashTagName]);

  String.prototype.replaceAt = function (index, toLength, replacement) {
    if (index >= this.length) {
      return this.valueOf();
    }
    return (
      this.substring(0, index) + replacement + this.substring(index + toLength)
    );
  };
  const [isValidRoyalty, setIsValidRoyalty] = useState(false);





  // const handleVideoEncode = useCallback(result => {
  //   console.log("Encoding Result:", result);
  // });

  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Box className="headingBox">
          <Typography variant="h6">Create New Bundles</Typography>
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="Text Field"
            placeholder="Write here..."
            type="text"
            fullWidth
            multiline
            maxRows={5}
            // rows={3}
            onClick={handleClickOpen}
          />
        </Box>

        <Box className="base">
          <Grid
            container
            spacing={2}
          // style={{ marginTop: "10px", marginLeft: "-12px" }}
          >
            {/* <Grid item xs={4} sm={4}>
              <Button>
                {" "}
                <FaVideo /> <label>Live Video</label>
              </Button>
            </Grid> */}
            <Grid item xs={8} sm={4}>
              <Button onClick={handleClickOpen}>
                {" "}
                <MdPhoto /> <label>Photo / Video</label>
              </Button>
            </Grid>
            <Grid item xs={4} sm={8} align="right">
              <Button
                variant="contained"
                onClick={handleClickOpen}
                color="secondary"
              >
                Post
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
          disabled={loader}
        >
          <DialogTitle id="alert-dialog-title">{"Create Post"}</DialogTitle>
          <DialogContent>
            <IconButton
              className={classes.cancelBtn}
              onClick={handleClose}
              disabled={loader}
            >
              <MdCancel />
            </IconButton>
            <form onSubmit={(event) => createBundleHandle(event)}>
              <Box className={classes.mainmodalBox}>
                <Box mb={2}>
                  <Box className={classes.UserBox}>
                    <Avatar
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                      src={
                        userData?.profilePic
                          ? userData?.profilePic
                          : "images/user.png"
                      }
                    />
                    <Box>
                      <Typography variant="h6">{userData?.userName}</Typography>

                      <TextField
                        className={classes.publicbox}
                        style={{}}
                        id="outlined-select-currency"
                        select
                        fullWidth
                        onChange={(e) => setActivities(e.target.value)}
                        value={activities}
                        variant="outlined"
                      >
                        {currencies.map((option, i) => (
                          <MenuItem
                            style={{ maxHeight: "35px" }}
                            key={i}
                            value={option.value}
                          >
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  </Box>
                </Box>

                <textarea
                  spellCheck="true"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="formControl"
                  // rows={3}
                  placeholder="Write here..."
                  id="text-element"
                ></textarea>
                <FormHelperText error>
                  {(isSubmit && description === "" && (
                    <Box mt={1}>Description is required</Box>
                  ))

                  }
                </FormHelperText>
                {hashtagData?.length > 0 && (
                  <>
                    {hashtagData?.map((data, i) => {
                      return (
                        <li
                          key={i}
                          className="list-group-item"
                          style={{ textAlign: "left", zIndex: 999 }}
                        >
                          <Box display={"flex"} justifyContent="space-between">
                            <Box display={"flex"}>
                              <Box className={classes.hash}>
                                {" "}
                                <ReactHashtag
                                  onHashtagClick={() => {
                                    setSelectedHashTagName(data.hashTagName);
                                  }}
                                >
                                  {data?.hashTagName}
                                </ReactHashtag>
                              </Box>
                            </Box>
                          </Box>
                        </li>
                      );
                    })}
                  </>
                )}
                <Box mt={2}>
                  <TextField
                    id="titlePost"
                    variant="outlined"
                    name="Text Field"
                    placeholder="Title"
                    type="text"
                    multiline
                    rows={2}
                    fullWidth

                    onChange={(e) => {
                      let temp = e.target.value
                      setTitlePost(temp);
                      if (temp.length > 280) {
                        setIsValidTitle(false)
                      } else {
                        setIsValidTitle(true)
                      }
                    }}

                  />
                  {isSubmit && titlePost === "" && (
                    <FormHelperText error>Please enter title.</FormHelperText>
                  )}
                  {!isValidTitle && titlePost !== "" && (
                    <FormHelperText error>You can not enter more than 280 charachters.</FormHelperText>
                  )}
                </Box>



                <Box mt={2}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="Text Field"
                    placeholder="Price"
                    type="number"
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                    fullWidth
                    value={amount}
                    error={
                      (isSubmit && amount === "") ||
                      (amount !== "" && Number(amount) == 0) ||
                      (amount !== "" && Number(amount) > 2000)
                    }
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <FormHelperText error>
                    {(isSubmit && amount === "" && (
                      <Box ml={1}>Amount is required</Box>
                    )) ||
                      (amount !== "" && Number(amount) <= 0 && (
                        <Box ml={1}>Enter valid amount</Box>
                      )) ||
                      (amount !== "" && Number(amount) > 2000 && (
                        <Box ml={1}>
                          Post amount should be less than or equal to 2000
                        </Box>
                      ))}
                  </FormHelperText>
                </Box>
                <Box mt={2}>
                  <TextField
                    variant="outlined"
                    name="Text Field"
                    placeholder="Royality between 0 to 10%"
                    type="number"
                    onKeyPress={(event) => {
                      if (event.key === "-" || event.key === "+") {
                        event.preventDefault();
                      }
                    }}
                    fullWidth
                    value={royality}
                    onChange={(e) => {
                      if (e.target.value > 10 || e.target.value < 0) {
                        setIsValidRoyalty(false);
                      } else {
                        setIsValidRoyalty(true);
                      }
                      setRoyality(e.target.value);
                    }}
                  />
                  {!isValidRoyalty && royality === "" && (
                    <FormHelperText error>
                      Please enter royalty between 0 to 10
                    </FormHelperText>
                  )}
                </Box>



                <Box mt={2}>
                  {/* {searchUserList && searchUserList?.map()} */}
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={searchUserList}
                    value={selectedTeam}
                    onChange={(_event, newTeam) => {
                      setSelectedTeam(newTeam);
                    }}
                    getOptionLabel={(option) => option?.userName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Tag users"
                        placeholder="Users"
                      />
                    )}
                  />
                </Box>
                <Box mt={2} className="addphotos">
                  <input
                    // accept="video/*"
                    accept=".jpg,.gif,.png,.svg,.jpeg,.mp4"
                    // accept="image/*"
                    type="file"
                    error={Boolean(isSubmit && image === "")}
                    onChange={(e) => {
                      setimage(e.target.files[0]);
                      setimageurl(URL.createObjectURL(e.target.files[0]));
                      getBase64(e.target.files[0], (result) => {
                        setcoverPost(result);
                      });
                    }}
                  />
                  <Box>
                    {image?.type === "video/mp4" ||
                      image?.type == "image/jpeg" ||
                      image?.type == "image/png" ||
                      image?.type == "image/gif" ||
                      image?.type == "image/jpg" ||
                      image?.type == "image/svg" ? (
                      <>
                        {image?.type === "video/mp4" ? (
                          <>
                            <video
                              ref={videoEl}
                              onLoadedMetadata={checkVideoSize}
                              style={{ width: "100%", maxHeight: "213px" }}
                              controls
                            >
                              <source src={imageurl} type="video/mp4" />
                            </video>
                            <Box>
                              {isDurationLess ? (<Typography

                                style={{ color: "red" }}
                              >
                                Video duration does not exceed more than 3 min
                              </Typography>) : (
                                <Button
                                  variant="outined"
                                  color="primary"
                                  component="span"
                                >
                                  Uploaded Successfully
                                </Button>)}
                            </Box>
                            <Button
                              variant="contained"
                              size="large"
                              color="secondary"
                              type="submit"
                              onClick={() => {
                                setimageurl("");
                                setimage("");
                              }}
                            >
                              Remove
                            </Button>
                          </>
                        ) : (
                          <>
                            <img src={imageurl} alt="" width="200px" />
                            <Box>

                              <Button
                                variant="outined"
                                color="primary"
                                component="span"
                              >
                                Uploaded Successfully
                              </Button>

                            </Box>
                            <Button
                              variant="contained"
                              size="large"
                              color="secondary"
                              type="submit"
                              onClick={() => {
                                setimageurl("");
                                setimage("");
                              }}
                            >
                              Remove
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {" "}
                        <MdAddToPhotos />
                        <Typography variant="h5">Add photos/videos</Typography>
                        {/* <small>or drag and drop</small> */}
                      </>
                    )}
                  </Box>
                </Box>
                <Box mt={1}></Box>
                {collectionlistAll && collectionlistAll.length === 0 && (
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      style={{ minWidth: "200px" }}
                      onClick={() => setOpenAddBundle(true)}
                    >
                      Create A Collection
                    </Button>
                    <FormHelperText error>
                      {isSubmit && collectionlistAll.length === 0 && (
                        <Box ml={1}>Please Create Collection</Box>
                      )}
                    </FormHelperText>
                  </Box>
                )}
                {collectionlistAll && collectionlistAll.length > 0 && (
                  <Box mt={2} mb={1}>
                    Select a collection to share with:
                  </Box>
                )}

                <Box
                  style={{
                    display: "flex",
                    overflowY: "hidden",
                    overflowX: "auto",
                    direction: "ltr",
                  }}
                >
                  {/* <Slider {...Settings} style={{ width: "100%" }}> */}
                  {collectionlistAll.map((data, i) => {
                    const statusData = data._id === list;
                    // const status = list.includes(data._id);
                    const isVideo = data.image.includes(".mp4");
                    return (
                      <Box
                        key={i}
                        mr={2}
                        style={
                          list
                            ? {
                              width: "200px",
                              minWidth: "200px",
                              height: "179px",
                              background: "#710d44",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              corsor: "pointer !important",
                              borderRadius: "10px",
                            }
                            : {
                              width: "200px",
                              minWidth: "200px",
                              height: "179px",
                              background: "#710d44",
                              corsor: "pointer",
                              // display: "flex",
                              // justifyContent: "center",
                              // alignItems: "center",
                              borderRadius: "10px",
                            }
                        }
                        onClick={() => {
                          updateSelectedBundle(data._id);
                        }}
                      >
                        {!statusData ? (
                          <>
                            <figure
                              style={{ height: "147px", margin: "0 auto" }}
                            >
                              {isVideo ? (
                                <video
                                  width="100%"
                                  style={{
                                    width: "100%",
                                    maxHeight: "140px",
                                    borderRadius: "11px",
                                  }}
                                  controls
                                // onClick={handleClickOpen2}
                                >
                                  <source src={data.image} type="video/mp4" />
                                </video>
                              ) : (
                                <img
                                  style={{
                                    width: "100%",
                                    maxHeight: "140px",
                                    borderRadius: "11px",
                                  }}
                                  src={data?.image}
                                  alt=""
                                />
                              )}
                            </figure>
                            <Typography
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              variant="h6"
                            >
                              {data?.title}
                            </Typography>
                          </>
                        ) : (
                          <Box
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span>selected</span>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                  {/* </Slider> */}
                </Box>
                <FormHelperText error>
                  {isSubmit && collectionlistAll?.length > 0 && list === "" && (
                    <Box ml={1}>Please select collection name</Box>
                  )}
                </FormHelperText>

                <Box mt={3} mb={2}>


                  <Button
                    variant="contained"
                    fullWidth
                    disabled={
                      loader ||
                      description === "" ||
                      royality < 0 ||
                      royality > 10 || isDurationLess ||
                      amount <= 0
                    }
                    color="secondary"
                    type="submit"
                  // onClick={createBundleHandle}
                  >
                    Post {loader && <ButtonCircularProgress />}
                  </Button>


                </Box>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog
          open={openAddBundle}
          onClose={() => {
            setOpenAddBundle(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  // backgroundColor: "navy",
                }}
              >
                {" "}
                {"Create a collection"}
              </Typography>
              {errorMessageresend ? (
                <Typography
                  style={{
                    // fontSize: "18px",
                    fontWeight: 500,
                    color: "#ed4235",
                    // backgroundColor: "navy",
                  }}
                >
                  {" "}
                  {errorMessageresend}
                </Typography>
              ) : (
                " "
                // <Typography variant="h6">
                //   Your balance &nbsp;{auth?.userData?.bnbBalace > 0 ? (parseInt(auth?.userData?.bnbBalace)) : 0}
                // </Typography>
              )}
            </Box>
          </DialogTitle>
          <DialogContent align="center">
            <form onSubmit={(event) => post(event)}>
              <Grid container direction={"column"} spacing={3}>
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          id="standard-basic"
                          placeholder="Collection title"
                          fullWidth
                          name="title"
                          variant="outlined"
                          className={classes.input_fild2}
                          onChange={_onInputChange}
                          error={
                            (isSubmit1 && formValueCollection.title === "") ||
                            (formValueCollection.title !== "" &&
                              formValueCollection.title.length > 60)
                          }
                        />
                        <FormHelperText error>
                          {(isSubmit1 && formValueCollection.title === "" && (
                            <Box ml={1}>Title is required</Box>
                          )) ||
                            (formValueCollection.title !== "" &&
                              formValueCollection.title.length > 60 && (
                                <Box ml={1}>
                                  Title should be less than or equal to 60
                                  characters
                                </Box>
                              ))}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                {/* <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          id="standard-basic"
                          variant="outlined"
                          name="name"
                          placeholder="Collection name"
                          onChange={_onInputChange}
                          className={classes.input_fild2}
                          error={
                            (isSubmit1 && formValueCollection.name === "") ||
                            (formValueCollection.name !== "" &&
                              formValueCollection.name.length > 60)
                          }
                          fullWidth
                        />
                        <FormHelperText error>
                          {(isSubmit1 && formValueCollection.name === "" && (
                            <Box ml={1}> name is required</Box>
                          )) ||
                            (formValueCollection.name !== "" &&
                              formValueCollection.name.length > 60 && (
                                <Box ml={1}>
                                  Collection name should be less than or equal
                                  to 60 characters
                                </Box>
                              ))}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid> */}
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <TextField
                          id="standard-basic"
                          variant="outlined"
                          name="details"
                          placeholder="Collection description"
                          onChange={_onInputChange}
                          className={classes.input_fild2}
                          error={
                            (isSubmit1 && formValueCollection.details === "") ||
                            (formValueCollection.details !== "" &&
                              formValueCollection.details.length > 200)
                          }
                          fullWidth
                        // helperText={
                        //   (isSubmit1 &&
                        //     formValueCollection.details === "" &&
                        //     "Collection description is required") ||
                        //   (formValueCollection.details !== "" &&
                        //     formValueCollection.details.length > 200 &&
                        //     "Collection description should be less than or equal to 200 characters")
                        // }
                        />
                        <FormHelperText error>
                          {(isSubmit1 && formValueCollection.details === "" && (
                            <Box ml={1}>Collection description is required</Box>
                          )) ||
                            (formValueCollection.details !== "" &&
                              formValueCollection.details.length > 200 && (
                                <Box ml={1}>
                                  Collection description should be less than or
                                  equal to 200 charactersM
                                </Box>
                              ))}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      {/* <Grid item xs={4} align="left">
            <Typography variant="h6">Donation Amount</Typography>
          </Grid> */}
                      <Grid item xs={12}>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          name="donation"
                          placeholder="Collection amount"
                          type="number"
                          fullWidth
                          value={formValueCollection.donation}
                          error={
                            (isSubmit1 &&
                              formValueCollection.donation === "") ||
                            (formValueCollection.donation !== "" &&
                              Number(formValueCollection.donation) == 0) ||
                            (formValueCollection.donation !== "" &&
                              Number(formValueCollection.donation) > 2000)
                          }
                          onChange={_onInputChange}
                          onKeyPress={(event) => {
                            if (event?.key === "-" || event?.key === "+") {
                              event.preventDefault();
                            }
                          }}
                        />
                        <FormHelperText error>
                          {(isSubmit1 && formValueCollection.donation == "" && (
                            <Box ml={1}>Collection amount is required</Box>
                          )) ||
                            (formValueCollection.donation !== "" &&
                              Number(formValueCollection.donation) > 2000 && (
                                <Box ml={1}>
                                  Collection amount should be less than or equal
                                  to 2000
                                </Box>
                              )) ||
                            (formValueCollection.donation !== "" &&
                              Number(formValueCollection.donation) == 0 && (
                                <Box ml={1}>
                                  Please enter valid collection amount
                                </Box>
                              ))}
                        </FormHelperText>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={6} align="left">
                        <Typography variant="h6">Duration</Typography>
                      </Grid>
                      &nbsp;
                      <Grid item xs={12} className={classes.donation}>
                        &nbsp;
                        <Box>
                          <span
                            style={{ fontSize: "14px", marginRight: "8px" }}
                            className={duration === "7" ? "active" : null}
                            onClick={() => setDuration("7")}
                          >
                            7 Days
                          </span>
                          <span
                            style={{ fontSize: "14px", marginRight: "8px" }}
                            className={duration === "14" ? "active" : null}
                            onClick={() => setDuration("14")}
                          >
                            14 Days
                          </span>
                          <span
                            style={{ fontSize: "14px", marginRight: "8px" }}
                            className={duration === "30" ? "active" : null}
                            onClick={() => setDuration("30")}
                          >
                            30 Days
                          </span>
                          <span
                            style={{ fontSize: "14px", marginRight: "8px" }}
                            className={duration === "60 Days" ? "active" : null}
                            onClick={() => setDuration("60 Days")}
                          >
                            60 Days
                          </span>
                          <span
                            style={{ fontSize: "14px", marginRight: "8px" }}
                            className={duration === "365" ? "active" : null}
                            onClick={() => setDuration("365")}
                          >
                            1 Year
                          </span>
                        </Box>
                        <Box>
                          <Grid container direction={"column"} spacing={2}>
                            <Grid item xs={12}>
                              <Box
                                mt={4}
                                className={classes.addphotosCollection}
                              >
                                <input
                                  // accept="video/*"
                                  accept=".jpg,.gif,.png,.svg,.jpeg"
                                  // accept="image/*"
                                  type="file"
                                  error={Boolean(isSubmit1 && image === "")}
                                  onChange={(e) => {
                                    setimageCollection(e.target.files[0]);

                                    getBase64(e.target.files[0], (result) => {
                                      setcoverCollection(result);
                                    });
                                  }}
                                />
                                <Box>
                                  {imageCollection?.type === "video/mp4" ||
                                    imageCollection?.type == "image/jpeg" ||
                                    imageCollection?.type == "image/png" ||
                                    imageCollection?.type == "image/gif" ||
                                    imageCollection?.type == "image/jpg" ||
                                    imageCollection?.type == "image/svg" ? (
                                    <>
                                      {imageCollection?.type === "video/mp4" ? (
                                        <>
                                          <video
                                            style={{
                                              width: "100%",
                                              maxHeight: "213px",
                                            }}
                                            controls
                                          >
                                            <source
                                              src={coverCollection}
                                              type="video/mp4"
                                            />
                                          </video>
                                          <Box mt={2} mb={2}>
                                            Uploaded Successfully
                                          </Box>
                                          <Button
                                            variant="contained"
                                            size="large"
                                            color="secondary"
                                            type="submit"
                                            onClick={() => {
                                              setimageCollection("");
                                              setcoverCollection("");
                                            }}
                                          >
                                            Remove
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <img
                                            src={coverCollection}
                                            alt=""
                                            width="200px"
                                          />
                                          <Box mt={2} mb={2}>
                                            Uploaded Successfully
                                          </Box>
                                          <Button
                                            variant="contained"
                                            size="large"
                                            color="secondary"
                                            type="submit"
                                            onClick={() => {
                                              setimageCollection("");
                                              setcoverCollection("");
                                            }}
                                          >
                                            Remove
                                          </Button>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <MdAddToPhotos />
                                      <Typography variant="h5">
                                        Add photos
                                      </Typography>
                                      {/* <small>or drag and drop</small> */}
                                    </>
                                  )}
                                </Box>
                              </Box>
                              <Box mt={1}>
                                <FormHelperText error>
                                  {isSubmit1 && imageCollection === "" && (
                                    <Box ml={1}>Image is required</Box>
                                  )}
                                </FormHelperText>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                      <Grid item xs={6} align="left">
                        <Typography variant="h6">
                          You will get profit only on private Post.
                        </Typography>
                        {/* <Typography variant="h6">
                          Collection fee&nbsp;
                          {collectionIdData && collectionIdData[0]?.amount}{" "}
                          &nbsp;Share
                        </Typography> */}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box align="center" mt={2} mb={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={() => {
                        setOpenAddBundle(false);
                      }}
                      style={{ marginRight: "8px" }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      type="submit"
                      onClick={post}
                      disabled={process}
                      style={{ marginLeft: "8px" }}
                    >
                      {!process ? "Create" : message}{" "}
                      {process && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
}

export default Collection;
