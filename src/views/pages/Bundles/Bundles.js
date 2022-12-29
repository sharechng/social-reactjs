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
import moment from "moment";
import { MdAddToPhotos } from "react-icons/md";
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
import { KeyboardDatePicker } from "@material-ui/pickers";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
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
    cursor: "pointer",
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
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(1);

  const [name, setname] = useState("");
  const [date, setdate] = useState("");
  const auth = useContext(AuthContext);
  const [cover, setcover] = useState();
  const [userId, setUserId] = useState();
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [fire, setfire] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("");
  const [details, setdetails] = useState("");
  const [donation, setdonation] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [isClear, setIsClear] = useState(false);
  const [noOfPages, setNoOfPages] = useState(1);
  const [process, setprocess] = useState(false);
  const [duration, setDuration] = useState("7");
  const [timeFilter, setTimeFilter] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [collectionId, setCollection] = useState();
  const [typeactivty, setTypeactivty] = useState("");
  const [toTimeFilter, setToTimeFilter] = useState();
  const [isLoadingContent, setIsLoading] = useState(true);
  const [collectionlistAll, setCollectionlist] = useState([]);
  const [collectionlistAlll, setCollectionlistt] = useState([]);
  const [errorMessageresend, setErrorMesageResend] = useState();
  const [particularUserList, setParticularUserList] = useState();
  const [tokenImage, setTokenImage] = React.useState("/images/tokens/1.png");

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) { };
  };

  const post = async (event) => {
    event.preventDefault();

    // if (auth?.userData?.bnbBalace > 0) {
    //   setIsSubmit(true);
      if (
        image !== "" &&
        title !== "" &&
        details !== "" &&
        Number(donation) > 0 &&
        Number(donation) <= 2000 &&
        details.length <= 200 &&
        title.length <= 60 &&
        // donation !== ""
        parseFloat(donation) > 0
      ) {
        try {
          setmessage("Creating Collection...");
          setprocess(true);
          const formData = new FormData();
          formData.append("image", cover);
          formData.append("symbol", title);
          formData.append("duration", duration);
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
                setTimeout(() => {
                  auth.handleUserProfileApi(
                    window.localStorage.getItem("token")
                  );
                }, 10000);
                setIsSubmit(false);
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
          limit: 12,
          fromDate: timeFilter ? `${moment(timeFilter)}` : null,
          toDate: toTimeFilter ? `${moment(toTimeFilter)}` : null,
          //type: typeactivty ? typeactivty : null,
        },
      });
      if (response.data.responseCode === 200) {
        setIsClear(false);
        setCollectionlist(response.data.result.docs);
        setNoOfPages(response.data.result.pages);
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsClear(false);
      setCollectionlist([]);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    collectionList();
  }, [isClear, page]);

  const clearHandler = () => {
    collectionList();
    setTimeFilter();
    setToTimeFilter();
    setTypeactivty("");
    setIsClear(true);
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
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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

  const pageCheck = page === 1 ? 12 : 0;


  return (
    <>
      <Page title="Collection">
        <Paper className={classes.root} elevation={2}>
          <Box className="heading">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Typography variant="h3">Collection</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} align="center">
                <Box className="buttonbox">
                  {/* <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    onClick={() => history.push("/bundles-share")}
                    style={{ marginRight: "16px" }}
                  >
                    Share
                  </Button> */}
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => setOpen(true)}
                  >
                    Add Collection
                  </Button>
                </Box>{" "}
              </Grid>
            </Grid>
          </Box>
          <Box
            mt={3}
            mb={3}
            style={{
              background: "#000",
              padding: "20px",
              borderRadius: "15px",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <span>From Date:</span>

                <Box mt={1}>
                  <KeyboardDatePicker
                    value={timeFilter}
                    onChange={(date) => {
                      setTimeFilter(new Date(date));
                    }}
                    format="DD/MM/YYYY"
                    // maxDate={toTimeFilter ? toTimeFilter:" "}
                    disableFuture
                    className={classes.textField}
                    margin="dense"
                    helperText=""
                    name="dob"
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <span>To Date:</span>
                <Box mt={1}>
                  <KeyboardDatePicker
                    value={toTimeFilter}
                    onChange={(date) => {
                      setToTimeFilter(new Date(date));
                    }}
                    minDate={timeFilter}
                    format="DD/MM/YYYY"
                    disableFuture
                    className={classes.textField}
                    margin="dense"
                    helperText=""
                    name="dob"
                    fullWidth
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Box
                  style={{
                    display: "flex",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => {
                      setIsLoading(true);
                      collectionList();
                    }}
                    size="large"
                    color="secondary"
                    style={{ marginRight: "10px" }}
                    className={classes.textField}
                  >
                    Submit
                  </Button>

                  <Button
                    variant="contained"
                    onClick={clearHandler}
                    color="secondary"
                    size="large"
                    style={{ width: "90px" }}
                    className={classes.textField}
                  >
                    Clear
                  </Button>
                </Box>
              </Grid>
            </Grid>
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
                        calBackFunc={collectionList}
                        particularUserList={particularUserList}
                        userId={userId}
                        data={data}
                        type="card"
                        index={i}
                        key={i}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          )}

          {collectionlistAll && collectionlistAll.length >= pageCheck && (
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
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "15px",
                }}
              >
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
              <Box p={2}>
                <form onSubmit={(event) => post(event)}>
                  <Grid container direction={"column"} spacing={3}>
                    <Grid item xs={12}>
                      <Box>
                        <Grid container spacing={1}>
                          {/* <Grid item xs={4} align="left">
                        <Typography variant="h6">Collection Title</Typography>
                      </Grid> */}
                          <Grid item xs={12}>
                            <TextField
                              id="standard-basic"
                              placeholder="Collection title"
                              fullWidth
                              variant="outlined"
                              className={classes.input_fild2}
                              onChange={(e) => settitle(e.target.value)}
                              error={
                                (isSubmit && title === "") ||
                                (title !== "" && title.length > 60)
                              }
                            // helperText={
                            //   (isSubmit &&
                            //     title === "" &&
                            //     "Please enter valid title") ||
                            //   (title !== "" &&
                            //     title.length > 60 &&
                            //     "Title should be less than or equal to 60 characters")
                            // }
                            />
                            <FormHelperText error>
                              {(isSubmit && title === "" && (
                                <Box ml={1}>Title is required</Box>
                              )) ||
                                (title !== "" && title.length > 60 && (
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
                    {/* <Grid item xs={12}> */}
                    {/* <Box> */}
                    {/* <Grid container spacing={1}>
                         
                          <Grid item xs={12}>
                            <TextField
                              id="standard-basic"
                              variant="outlined"
                              placeholder="Collection name"
                              onChange={(e) => setname(e.target.value)}
                              className={classes.input_fild2}
                              error={
                                (isSubmit && name === "") ||
                                (name !== "" && name.length > 60)
                              }
                              fullWidth
                             
                            />
                            <FormHelperText error>
                              {(isSubmit && name === "" && (
                                <Box ml={1}>Collection name is required</Box>
                              )) ||
                                (name !== "" && name.length > 60 && (
                                  <Box ml={1}>
                                    Collection name should be less than or equal
                                    to 60 characters
                                  </Box>
                                ))}
                            </FormHelperText>
                          </Grid>
                        </Grid> */}
                    {/* </Box> */}
                    {/* </Grid> */}
                    <Grid item xs={12}>
                      <Box>
                        <Grid container spacing={1}>
                          {/* <Grid item xs={4} align="left">
                        <Typography variant="h6">
                          Collection Description
                        </Typography>
                      </Grid> */}
                          <Grid item xs={12}>
                            <TextField
                              id="standard-basic"
                              variant="outlined"
                              placeholder="Collection description"
                              onChange={(e) => setdetails(e.target.value)}
                              className={classes.input_fild2}
                              error={
                                (isSubmit && details === "") ||
                                (details !== "" && details.length > 200)
                              }
                              fullWidth
                            // helperText={
                            //   (isSubmit &&
                            //     details === "" &&
                            //     "Collection description is required") ||
                            //   (details !== "" &&
                            //     details.length > 200 &&
                            //     "Collection description should be less than or equal to 200 characters")
                            // }
                            />
                            <FormHelperText error>
                              {(isSubmit && details === "" && (
                                <Box ml={1}>
                                  Collection description is required
                                </Box>
                              )) ||
                                (details !== "" && details.length > 200 && (
                                  <Box ml={1}>
                                    Collection description should be less than
                                    or equal to 200 characters
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
                              name="Text Field"
                              placeholder="Collection amount"
                              type="number"
                              fullWidth
                              value={donation}
                              error={
                                (isSubmit && donation === "") ||
                                (donation !== "" && Number(donation) < 1) ||
                                (donation !== "" && Number(donation) > 2000)
                              }
                              onChange={(e) => setdonation(e.target.value)}
                              onKeyPress={(event) => {
                                if (event?.key === "-" || event?.key === "+") {
                                  event.preventDefault();
                                }
                              }}
                            // helperText={
                            //   (isSubmit &&
                            //     donation == "" &&
                            //     "donation amount is required") ||
                            //   (donation !== "" &&
                            //     Number(donation) < 1 &&
                            //     "Please enter valid donation amount") ||
                            //   (donation !== "" &&
                            //     Number(donation) > 2000 &&
                            //     " Donation amount should be less than or equal to 2000")
                            // }
                            />
                            <FormHelperText error>
                              {(isSubmit && donation == "" && (
                                <Box ml={1}>Collection amount is required</Box>
                              )) ||
                                (donation !== "" && Number(donation) > 2000 && (
                                  <Box ml={1}>
                                    Collection amount should be less than or equal
                                    to 2000
                                  </Box>
                                )) ||
                                (donation !== "" && Number(donation) == 0 && (
                                  <Box ml={1}>
                                    Please enter valid  Collection amount
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
                            <Box style={{ cursor: "pointer" }}>
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
                                className={
                                  duration === "60 Days" ? "active" : null
                                }
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
                                        getBase64(
                                          e.target.files[0],
                                          (result) => {
                                            setcover(result);
                                          }
                                        );
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
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid item xs={6} align="left">
                          <Typography variant="h6">
                             You will get profit only on private Post.
                            </Typography>
                            {/* <Typography variant="h6">
                              Collection fee&nbsp;
                              {collectionId && collectionId[0]?.amount}{" "}
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
                          type="submit"
                          // onClick={post}
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
              </Box>
            </DialogContent>
          </Dialog>
        </Paper>
      </Page>
    </>
  );
}

export default Collection;
