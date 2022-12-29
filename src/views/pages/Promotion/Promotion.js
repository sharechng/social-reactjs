import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import {
  Box,
  Typography,
  makeStyles,
  Paper,
  Container,
  IconButton,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Avatar,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import JoditEditor from "jodit-react";

import Button from "@material-ui/core/Button";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { MdPhoto, MdCancel, MdAddToPhotos } from "react-icons/md";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { MdOutlineAddBox } from "react-icons/md";
import axios from "axios";
import moment from "moment";
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  heading: {
    "& h4": {
      color: "#696969",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
      },
    },

    "& p": {
      color: "#696969",
      maxWidth: "384px",
      lineHeight: "24px",
      marginTop: "10px",
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
  bannerBox: {
    padding: "150px 0",
    [theme.breakpoints.down("xs")]: {
      padding: "90px 0",
    },
    "& label": {
      fontSize: "14px",
      cursor: "pointer",
    },
  },
  root: {
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },
  button: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    borderBottom: "0",
    borderRadius: "0",
    height: "40px",
    background: "transparent",
    color: "#7E6196 ",
    "& svg": {
      width: "34px",
      height: "35px",
      background: "#FCF2FA",
      borderRadius: "10px",
      padding: "5px 6px",
      color: "rgba(152, 126, 171, 0.5)",
    },
    "&:hover": {
      backgroundColor: "#E6E6E6",
      boxShadow: "none",
      borderRadius: "5px",
    },
  },
  Buttonbox: {
    "& Button": {
      marginRight: "5px",
      minWidth: "106px",
      boxSizing: "border-box",
      fontWeight: "400",
      borderRadius: "10px",
      padding: "11px 16px",
      background: "#242526",
      color: "#9E9E9E",
      fontFamily: "'Montserrat'",
      marginTop: "7px",
      fontSize: "14px",
      "&:hover": {
        background: "#EC167F",
        color: "#fff",
      },
      "&:active": {
        background: "#EC167F",
        color: "#fff",
      },
    },
  },
  cancelBtn: {
    position: "absolute",
    top: 0,
    right: 0,
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
  addphotos: {
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
}));

export default function Interest() {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setimage] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [open, setOpen] = React.useState(false);
  const [coverPost, setcoverPost] = useState("");
  const [collectionlistAll, setCollectionlist] = useState([]);
  const [duration, setDuration] = useState("");
  const [list, setlist] = useState("");
  const [statusList, setStatus] = useState(false);
  const [titlePost, setTitlePost] = useState("");
  const [portUrl, setPortUrl] = useState("");

  const [cover, setcover] = useState();
  const [loader, setLoader] = React.useState(false);

  const updateSelectedBundle = (data) => {
    setStatus(true);
    setlist(data);
  };

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
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [activities, setActivities] = useState("Select intreset");

  const editor = useRef(null);

  const config = {
    readonly: false,
  };
  const [minAgeCheck, setMinAge] = useState("");
  const [maxAgeCheck, setMaxAge] = useState("");
  const [selectedTeam, setSelectedTeam] = useState();
  const [isOpenInterest, setIsopenInterest] = useState(false);
  const [intrestValue, setIntrest] = useState("");
  const [intrestList, setIntrestList] = useState([]);
  const [durationList, setSurationList] = useState([]);
  const [durationId, setDurationId] = useState();
  const [durationAmount, setAmounDuration] = useState();
  const validPromotionUrl = (value) => {
    const re = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    return re.test(value);
  };
  const handleDurationFunc = (data) => {
    setDuration(data?.duration);
    setAmounDuration(data?.amount);
    setDurationId(data?._id);
  };
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
  const [durationDays, setDurationDays] = useState("Days");
  const [durationCount, setDurationCount] = useState(0);
  useEffect(() => {
    const ab = durationList?.map((data) => {
      if (data.duration == 365) {
        setDurationDays("Year");
        setDurationCount(1);
      } else if (data.duration < 30) {
        if (data.duration < 7) {
          setDurationDays("Days");
          setDurationCount(data.duration / 1);
        } else {
          setDurationDays("Week");
          setDurationCount(data.duration / 7);
        }
      } else if (data.duration > 30 && data.duration < 365) {
        setDurationDays("Month");
        setDurationCount(data.duration / 30);
      } else if (data.duration > 365) {
        if (data.duration == 365) {
          setDurationDays("Year");
          setDurationCount(1);
        } else {
          setDurationDays("Year");
          setDurationCount(data.duration / 365);
        }
      }
      return data;
    });
  }, [durationList]);

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

  const createPromotionleHandle = async (event) => {
    event.preventDefault();
    setIsSubmit(true);
    const selectuser = selectedTeam
      ? selectedTeam?.map((data) => data.name)
      : [];

    if (
      description !== "" &&
      titlePost !== "" &&
      portUrl !== "" &&
      cover !== "" &&
      minAgeCheck !== "" &&
      maxAgeCheck !== "" &&
      duration &&
      validPromotionUrl(portUrl) &&
      description.length <= 200 &&
      titlePost.length <= 60 &&
      Number(minAgeCheck) >= 1 &&
      Number(minAgeCheck) < 99 && // Number(minAgeCheck) < Number(maxAgeCheck) &&
      Number(maxAgeCheck) >= 1 &&
      Number(maxAgeCheck) <= 99 &&
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
        url: ApiConfig.createPostPromotion,
        data: {
          details: description,
          mediaUrl: cover,
          postTitle: titlePost,
          url: portUrl,
          dateTime: duration,
          amount: durationAmount,
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
            // listPublicExclusiveHandler();
            setDescription("");
            setTitlePost("");
            setcoverPost("");
            setimageurl("");
            setimage("");
            toast.success(res.data.responseMessage);
            setOpen(false);
            setLoader(false);
            if (res.data.result.docs) {
              toast.success(res.response_message);
              setLoader(false);
            } else {
              toast.error(res.response_message);
            }
          }
          setLoader(false);
        })
        .catch((error) => {
          setLoader(false);
          if (error?.response?.data?.responseMessage) {
            toast.error(error?.response?.data?.responseMessage);
          } else {
            toast.error(error.message);
          }
        });
    }
  };

  return (
    <>
      <Box className={classes.bannerBox}>

        <Paper className={classes.root} elevation={2}>
          <Box className={classes.root}>
            <Grid container spacing>
              <Grid item lg={6} xs={6} align="left">
                <Box className={classes.heading}>
                  <Typography variant="h3">Promotion</Typography>
                  <Box mt={2}>
                    <Button onClick={handleClickOpen}>
                      {" "}
                      <MdPhoto
                        style={{ color: "#e31a89", marginRight: "10px" }}
                      />{" "}
                      <label>Photo / Video</label>
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={6} xs={6} align="right">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#e31a89", color: "#fff" }}
                  onClick={handleClickOpen}
                  disabled={isLoading}
                >
                  Create Promotion
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h5">Create Promotion</Typography>
          </DialogTitle>
          <DialogContent>
            <IconButton className={classes.cancelBtn} onClick={handleClose}>
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
                  {auth?.userData?.userName
                    ? auth?.userData?.userName
                    : auth?.userData?.name}
                </Typography>
              </Box>
              <form onSubmit={(event) => createPromotionleHandle(event)}>
                <Box mt={2}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="Text Field"
                    placeholder="Title"
                    type="text"
                    fullWidth
                    error={
                      Boolean(isSubmit && titlePost === "") ||
                      (titlePost !== "" && titlePost.length > 60)
                    }
                    onChange={(e) => setTitlePost(e.target.value)}
                  />
                  {/* <FormHelperText error>
                      {isSubmit && titlePost === "" && (
                        <Box ml={1}>Title is required</Box>
                      )}
                    </FormHelperText> */}
                  <FormHelperText error>
                    {(isSubmit && titlePost === "" && (
                      <Box ml={1}>Title is required</Box>
                    )) ||
                      (titlePost !== "" && titlePost.length > 60 && (
                        <Box ml={1}>
                          Title should be less than or equal to 60 characters
                        </Box>
                      ))}
                  </FormHelperText>
                </Box>
                <Box mt={2}>
                  {/* <JoditEditor
                    ref={editor}
                    // disabled={isEdit}
                    value={description}
                    config={config}
                    name="descritionValue"
                    variant="outlined"
                    fullWidth
                    size="small"
                    tabIndex={1}
                    error={Boolean(isSubmit && !description)}
                    onBlur={(e) => setDescription(e)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {
                      // setDescription(newContent);
                      // onChange(newContent);
                    }}
                  /> */}
                  <TextField
                    type="text"
                    multiline
                    minRows={4}
                    onChange={(e) => setDescription(e.target.value)}
                    name="descritionValue"
                    variant="outlined"
                    placeholder="Description"
                    fullWidth
                    error={
                      Boolean(isSubmit && !description) ||
                      (description !== "" && description.length > 200)
                    }
                  />
                  {/* <FormHelperText error>
                      {isSubmit && !description && (
                        <Box ml={1}>Description is required</Box>
                      )}
                    </FormHelperText> */}
                  <FormHelperText error>
                    {(isSubmit && description === "" && (
                      <Box ml={1}>Description is required</Box>
                    )) ||
                      (description !== "" && description.length > 200 && (
                        <Box ml={1}>
                          Description should be less than or equal to 200
                          characters
                        </Box>
                      ))}
                  </FormHelperText>
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
                    {isSubmit && activities === "" && (
                      <Box ml={1}>Please select atleast on intrest</Box>
                    )}
                  </FormHelperText>

                  {/* <Box mt={1} style={{ display: "flex", alignItems: "center" }}>
                    {" "}
                    <MdOutlineAddBox
                      onClick={() => setIsopenInterest(true)}
                      style={{
                        fontSize: "23px",
                        color: "rgb(227, 26, 137)",
                        cursor: "pointer",
                      }}
                    />
                    <small style={{ fontSize: "13px", marginLeft: "7px" }}>
                      {" "}
                      Add Intrest
                    </small>
                  </Box> */}
                </Box>
                {/* {intrestList.length === 0 && (
                  <Box mt={2} align="center">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      name="Text Field"
                      placeholder="Intrest name, Please enter comma separated values"
                      type="text"
                      fullWidth
                      value={intrestValue}
                      // error={Boolean(isSubmit && intrestValue === "")}

                      onChange={(e) => setIntrest(e.target.value)}
                    />
                    <Button
                      onClick={() => {
                        setIsopenInterest(false);
                        setIntrest("");
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                )} */}
                {/* {isOpenInterest && (
                  <Box mt={2}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      name="Text Field"
                      placeholder="Intrest name, Please enter comma separated values"
                      type="text"
                      fullWidth
                      value={intrestValue}
                      onChange={(e) => setIntrest(e.target.value)}
                    />
                    <Button
                      onClick={() => {
                        setIsopenInterest(true);
                        setIntrest("");
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                )} */}
                <Box mt={2}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      name="Text Field"
                      placeholder="Minimum age (year)"
                      type="number"
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                      fullWidth
                      value={minAgeCheck}
                      error={
                        Boolean(isSubmit && minAgeCheck === "") ||
                        (minAgeCheck !== "" && Number(minAgeCheck) > 99) ||
                        (minAgeCheck !== "" && Number(minAgeCheck) < 1)
                      }
                      onChange={(e) => setMinAge(e.target.value)}
                    />
                    <FormHelperText error>
                      {(isSubmit &&
                        (minAgeCheck === "" ||
                          Number(minAgeCheck) > Number(maxAgeCheck)) && (
                          <Box ml={1}>
                            Min age is required, It should be less then max
                            age
                          </Box>
                        )) ||
                        (minAgeCheck !== "" && Number(minAgeCheck) < 1 && (
                          <Box ml={1}>Min age should be greator then 0</Box>
                        )) ||
                        (minAgeCheck !== "" && Number(minAgeCheck) > 99 && (
                          <Box ml={1}>Min age should be less then 100</Box>
                        ))}
                    </FormHelperText>
                  </FormControl>
                </Box>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      name="Text Field"
                      placeholder="Maximum age (year)"
                      type="number"
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                      fullWidth
                      value={maxAgeCheck}
                      error={
                        Boolean(isSubmit && maxAgeCheck === "") ||
                        (maxAgeCheck !== "" && Number(maxAgeCheck) < 1) ||
                        (maxAgeCheck !== "" && Number(maxAgeCheck) > 99)
                      }
                      onChange={(e) => setMaxAge(e.target.value)}
                    />
                    <FormHelperText error>
                      {(isSubmit &&
                        (maxAgeCheck === "" ||
                          Number(maxAgeCheck) < Number(minAgeCheck)) && (
                          <Box ml={1}>
                            Max age is required, It should be greater than min
                            age
                          </Box>
                        )) ||
                        (maxAgeCheck !== "" && Number(maxAgeCheck) < 1 && (
                          <Box ml={1}>Max age should be greator then 0</Box>
                        )) ||
                        (maxAgeCheck !== "" && Number(maxAgeCheck) > 99 && (
                          <Box ml={1}>Max age should be less then 100</Box>
                        ))}
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
                  <FormHelperText error >
                    {isSubmit && !duration && (
                      <Box style={{ marginTop: '10px', marginLeft: "6px" }}>Please add duration </Box>
                    )}
                  </FormHelperText>
                </Box>

                <Box>
                  <Grid container direction={"column"} spacing={2}>
                    <Grid item xs={12}>
                      <Box mt={4} className={classes.addphotos}>
                        <input
                          // accept="video/*"
                          accept=".jpg,.gif,.png,.svg,.jpeg,.mp4"
                          // accept="image/*"
                          type="file"
                          error={Boolean(isSubmit && image === "")}
                          onChange={(e) => {
                            setimage(e.target.files[0]);
                            setimageurl(
                              URL.createObjectURL(e.target.files[0])
                            );
                            getBase64(e.target.files[0], (result) => {
                              setcover(result);
                            });
                          }}
                        />
                        <Box>
                          {image?.type === "video/mp4" ||
                            image?.type === "image/jpeg" ||
                            image?.type === "image/png" ||
                            image?.type === "image/gif" ||
                            image?.type === "image/jpg" ||
                            image?.type === "image/svg" ? (
                            <>
                              {image?.type === "video/mp4" ? (
                                <>
                                  <video
                                    style={{
                                      width: "100%",
                                      maxHeight: "213px",
                                    }}
                                    controls
                                  >
                                    <source src={cover} type="video/mp4" />
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
                                      setimageurl("");
                                      setimage("");
                                      setcover("");
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <img src={cover} alt="" width="200px" />
                                  <Box mt={2} mb={2}>
                                    Uploaded Successfully
                                  </Box>
                                  <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    type="submit"
                                    onClick={() => {
                                      setimageurl("");
                                      setimage("");
                                      setcover("");
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
                                Add photos/videos
                              </Typography>
                              {/* <small>or drag and drop</small> */}
                            </>
                          )}
                        </Box>
                      </Box>
                      <Box mt={1}>
                        <FormHelperText error>
                          {isSubmit && image === "" && (
                            <Box ml={1}>Image is required</Box>
                          )}
                        </FormHelperText>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box mt={2}>
                  <Button
                    variant="contained"
                    // onClick={createPromotionleHandle}
                    color="secondary"
                    type="submit"
                    fullWidth
                    disabled={loader}
                  >
                    Submit {loader && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </form>

              <Box
                style={{
                  display: "flex",
                  overflowY: "hidden",
                  overflowX: "auto",
                  direction: "ltr",
                }}
              >
                {/* <Slider {...settings}> */}
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
                            height: "150px",
                            background: "#710d44",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "10px",
                          }
                          : {
                            width: "200px",
                            minWidth: "200px",
                            height: "150px",
                            background: "#710d44",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "10px",
                          }
                      }
                      onClick={() => {
                        updateSelectedBundle(data._id);
                      }}
                    >
                      {/* {status && (
                        <figure style={{ width: "200px", height: "150px" }}>
                          <img
                            style={{ width: "150px", height: "150px" }}
                            src={data?.image}
                            alt=""
                          />
                        </figure>
                      )} */}

                      {/* <Typography>{data.name}</Typography> */}

                      {!statusData ? (
                        <figure style={{ height: "147px", margin: "0 auto" }}>
                          {isVideo ? (
                            <video
                              width="100%"
                              style={{
                                width: "100%",
                                maxHeight: "150px",
                                borderRadius: "11px",
                                background: "rgb(0, 0, 0)",
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
                                maxHeight: "150px",
                                borderRadius: "11px",
                                background: "rgb(0, 0, 0)",
                              }}
                              src={data?.image}
                              alt=""
                            />
                          )}
                        </figure>
                      ) : (
                        <span>selected</span>
                      )}
                    </Box>
                  );
                })}

                {/* <Select
                  fullWidth
                  value={selectedCollectionId}
                  onChange={(e) => setSelectedCollectionId(e.target.value)}
                >
                  <MenuItem value={"select"}>Select</MenuItem>
                  {collectionlistAll &&
                    collectionlistAll.map((data, i) => {
                      return (
                        <MenuItem key={i} value={data._id}>
                          {data.name}
                        </MenuItem>
                      );
                    })}
                </Select> */}
                {/* </Slider> */}
              </Box>
            </Box>
          </DialogContent>
        </Dialog>

      </Box>
    </>
  );
}
