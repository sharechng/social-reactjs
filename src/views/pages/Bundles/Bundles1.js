import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  FormHelperText,
  Container,
} from "@material-ui/core";
import { MdAddToPhotos } from "react-icons/md";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Page from "src/component/Page";
import BundlesCard from "src/component/BundlesCard";
import axios from "axios";
import { toast } from "react-toastify";
import ApiConfig from "src/ApiConfig/ApiConfig";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import {
  useHistory,
  Link as RouterComponent,
  useLocation,
} from "react-router-dom";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .heading": {
      marginBottom: "20px",
      display: "flex",
      justifyContent: "space-between",
      "& .buttonbox": {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      },
    },
  },
  create: {
    textAlign: "center",
    marginBottom: "50px",
  },
  upload: {
    height: "75px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listbutton: {
    "& ul": {
      display: "flex",
      alignItems: "center",
      "& li": {
        border: "0.25px solid #FFF",
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

function Collection({ viewOtherProfileHandler, collectionListBundle }) {
  const classes = useStyles();
  const [title, settitle] = useState("");
  const [name, setname] = useState("");
  const [donation, setdonation] = useState("");
  const [date, setdate] = useState("");
  const [image, setimage] = useState("");
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [imageurl, setimageurl] = useState("");
  const [details, setdetails] = useState("");
  const [process, setprocess] = useState(false);
  const [message, setmessage] = useState("");
  const [fire, setfire] = useState(false);
  const [duration, setDuration] = useState("7");
  const [isSubmit, setIsSubmit] = useState(false);
  const [collectionlistAll, setCollectionlist] = useState([]);
  const [isLoadingContent, setIsLoading] = useState(true);
  const [particularUserList, setParticularUserList] = useState();
  const [userId, setUserId] = useState();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [tokenImage, setTokenImage] = React.useState("/images/tokens/1.png");

  const history = useHistory();
  const [open, setOpen] = useState(false);
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {};
  };
  const [cover, setcover] = useState();

  const post = async () => {
    setIsSubmit(true);
    if (
      image !== "" &&
      title !== "" &&
      details !== "" &&
      donation !== "" &&
      parseFloat(donation) > 0
    ) {
      try {
        setmessage("Creating Collection...");
        setprocess(true);
        const formData = new FormData();
        formData.append("image", cover);
        formData.append("symbol", title);
        formData.append("duration", duration);
        // formData.append("bundleName", name);
        formData.append("description", details);
        formData.append("amount", donation);

        axios
          .request({
            method: "POST",
            url: ApiConfig.addNft,
            data: {
              image: cover,
              title: title,
              duration: duration,
              description: details,
              amount: donation,
            },
            // data: formData,
            headers: {
              token: window.localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if (res.data.responseCode === 200) {
              collectionList();
              // if (callbackFun) {
              //   callbackFun();
              // }

              // user.updateUserData();
              setOpen(false);
              setprocess(false);
              toast.success("Collection created");
              setfire(!fire);
              // handleClose();
              setname("");
              settitle("");
              setdonation("");
              setimage();
              setdetails("");
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
      } catch {}
    }
  };

  const collectionList = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.listCollection,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: page,
          limit: 9,
        },
      });
      if (response.data.responseCode === 200) {
        setCollectionlist(response.data.result.docs);
        setNoOfPages(response.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const getParticularUserCollectionList = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.getOtheruserCollection,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          userId: id,
        },
      });
      if (response.data.responseCode === 200) {
        setCollectionlist(response.data.result.docs);
        setNoOfPages(response.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const [collectionId, setCollection] = useState();
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
  useEffect(() => {
    feelistHandler();
    const locationCheck = location.search.split("?");
    if (locationCheck[1]) {
      getParticularUserCollectionList(locationCheck[1]);
      setParticularUserList(locationCheck[1]);
    } else {
      collectionList();
      setUserId(locationCheck);
    }
  }, [location, page]);

  return (
    <>
      <Page title="Collection">
        <Box className={classes.root} elevation={2}>
          <Box>
            <Typography variant="h3" style={{ marginBottom: "30px" }}>
              Collection
            </Typography>
          </Box>
          {isLoadingContent ? (
            <DataLoading />
          ) : (
            <Grid container spacing={2}>
              {collectionlistAll && collectionlistAll.length === 0 && (
                <NoDataFound />
              )}
              {collectionlistAll &&
                collectionlistAll?.map((data, i) => {
                  return (
                    <Grid item lg={3} md={4} sm={6} xs={6}>
                      <BundlesCard
                        collectionListBundle={collectionListBundle}
                        calBackFunc={getParticularUserCollectionList}
                        
                        particularUserList={particularUserList}
                        userId={userId}
                        data={data}
                        type="card"
                        key={i}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          )}

          {collectionlistAll && collectionlistAll.length >9 && (
            <Box mt={2} display="flex" justifyContent="center">
              <Pagination
                count={noOfPages}
                page={page}
                onChange={(e, v) => setPage(v)}
              />
            </Box>
          )}

          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle id="alert-dialog-title" align="left">
              {"Create a collection"}
            </DialogTitle>
            <DialogContent align="center">
              <Grid container direction={"column"} spacing={3}>
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={4} align="left">
                        <Typography variant="h6">Collection Title</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id="standard-basic"
                          placeholder="Collection 1"
                          fullWidth
                          variant="outlined"
                          className={classes.input_fild2}
                          onChange={(e) => settitle(e.target.value)}
                          error={isSubmit && title === ""}
                          helperText={
                            isSubmit &&
                            title === "" &&
                            "Please enter valid title"
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                {/* <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={4} align="left">
                        <Typography variant="h6">Collection Name</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id="standard-basic"
                          variant="outlined"
                          placeholder="Basic Collection"
                          onChange={(e) => setname(e.target.value)}
                          className={classes.input_fild2}
                          error={isSubmit && name === ""}
                          fullWidth
                          helperText={
                            isSubmit && name === "" && "Please enter valid name"
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid> */}
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={4} align="left">
                        <Typography variant="h6">
                          Collection Description
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id="standard-basic"
                          variant="outlined"
                          placeholder="Basic Collection"
                          onChange={(e) => setdetails(e.target.value)}
                          className={classes.input_fild2}
                          error={isSubmit && details === ""}
                          fullWidth
                          helperText={
                            isSubmit &&
                            details === "" &&
                            "Please enter valid details"
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={4} align="left">
                        <Typography variant="h6">Donation Amount</Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          name="Text Field"
                          placeholder="300"
                          type="number"
                          fullWidth
                          value={donation}
                          error={isSubmit && donation === ""}
                          onChange={(e) => setdonation(e.target.value)}
                          onKeyPress={(event) => {
                            if (event?.key === "-" || event?.key === "+") {
                              event.preventDefault();
                            }
                          }}
                          helperText={
                            isSubmit &&
                            donation === "" &&
                            "Please enter valid donation amount"
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <Grid container spacing={1}>
                      <Grid item xs={4} align="left">
                        <Typography variant="h6">Duration</Typography>
                      </Grid>
                      <Grid item xs={8} className={classes.donation}>
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
                            className={duration === "60" ? "active" : null}
                            onClick={() => setDuration("60")}
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
                                  image?.type == "image/jpeg" ||
                                  image?.type == "image/png" ||
                                  image?.type == "image/gif" ||
                                  image?.type == "image/jpg" ||
                                  image?.type == "image/svg" ? (
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
                                            <source
                                              src={cover}
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
                                          <img
                                            src={cover}
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
                            <Grid item xs={6} align="left">
                              <Typography variant="h6">
                                Collection fee&nbsp;
                                {collectionId && collectionId[0]?.amount}{" "}
                                &nbsp;Share
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
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
                        setOpen(false);
                      }}
                      style={{ marginRight: "8px" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
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
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="body2">Fees</Typography>
                <Link
                  onClick={() => {
                    setOpen(false);
                  }}
                  style={{ marginLeft: "5px" }}
                >
                  Apply
                </Link>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </Page>
    </>
  );
}

export default Collection;